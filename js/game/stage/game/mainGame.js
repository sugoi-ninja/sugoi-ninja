/**
 * Main Game
 */
tm.define('game.Main', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(stage, stageNum, callback, isHintMode) {
    this.superInit();
    
    this.stage = stage;
    this.stageNum = stageNum;
    this.gameoverCallback = callback;
    
    this.isHintMode = isHintMode;
    
    /**
     * map背景画像
     */
    this.mapBg = tm.app.Sprite('mapBg'+this.stageNum, (SCREEN.CELL.WIDTH+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.X, 
      (SCREEN.CELL.HEIGHT+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.Y).addChildTo(this);
    this.mapBg.setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y);
    
    
    /**
     * マス目を司る神
     */
    this.mapgroup = map.Group().addChildTo(this);
    
    var mapData = this.mapgroup.parseMap(this.stage.map);
    
    /**
     * ANDONを司る
     */
    this.andongroup = obj.AndonGroup().addChildTo(this);
    
    /**
     * マップ上にあるものを司る神
     */
    this.objGroup = obj.Group(mapData, this.mapgroup, this.stage.enemy, this.andongroup, this.isHintMode).addChildTo(this);
    
  },
  
  initUI: function(callback) {
    this.updateUI = callback;
  },
  
  startFirstTurn: function() {
    // 最初のターン開始
    this.isPlayerTurn = false;
    this.hasKoban = false;
    this.turnCount = 0;
    this.mapgroup.highlightAndon();
    this.startPlayerTurn();
    
  },
  
  startPlayerTurn: function() {
    if (this.isHintMode) {
      this.startEnemyTurn();
      return ;
    }
    var self = this;
    /*
     * ターン終了のコールバックメソッドを渡してターン開始実行
     * →移動可能なマスに選択時のリスナーを渡してボタン有効化
     * →リスナーが呼ばれてアニメーションにコールバックを渡して実行
     * →アニメーション終了でターン終了のコールバックを呼ぶ
     */
    this.objGroup.player.myTurn(
      function(count, callback) {
        return self.onMoveSelectListener(count);
      }, function(count) {
        return self.onMouseoverListener(count);
      },
      function() {
        return self.noMovableCell();
      });
    this.isPlayerTurn = true;
  },
  
  // 移動先クリックしたら呼ばれる
  onMoveSelectListener: function(count) {
    
    this.isPlayerTurn = false;
    
    // セルのハイライトをクリア
    this.mapgroup.clearMoveSelect();
    this.mapgroup.unhighlightAndon();
    
    this.objGroup.player.turnToCount(count);

    this.objGroup.player.moveTo(count, function() {
      return this.onEndOfPlayerTurn();
    }.bind(this));
  }, 
  
  // 移動先マウスオーバー
  onMouseoverListener: function(count) {
    this.objGroup.player.turnToCount(count);
  },
  
  // 移動できるセルがなかった場合(詰み)
  noMovableCell: function() {
    this.gameoverCallback(false, this.turnCount, this.hasKoban);
  },
  
  // 移動アニメーション終了
  onEndOfPlayerTurn: function() {
    
    // UI update
    this.updateUI('endOfPlayerTurn');
    
    // 小判取得判定
    if (this.objGroup.player.isInKoban() && !this.hasKoban) {
      this.hasKoban = true;
      this.objGroup.koban.doTakeAnimation();
      this.updateUI('getKoban');
    }
    
    // ゴール判定
    if (this.objGroup.player.isInGoal()) {
      this.gameoverCallback(true, this.turnCount, this.hasKoban);
    } else {
      this.startEnemyTurn();
    }
  },
  
  
  
  startEnemyTurn: function() {
    
    var self = this;
    
    // wait
    this.tweener.clear().wait(300).call(function() {
      this.mapgroup.clearAndon();
      this.andongroup.hideBeam();
      this.objGroup.enemyGroup.myTurn(this.turnCount, 
        function() {
          return self.isPlayerInAndon();
        },
        function() {
          return self.onEndOfAllEnemyTurn();
        },
        function() {
          if (self.isHintMode)
            return null;
          return self.updateUI('endOfEnemyTurn');
        }
        );
    }.bind(this));
  },
    
  onEndOfAllEnemyTurn: function() {
    
    this.mapgroup.highlightAndon();
    this.andongroup.showBeam();
    if (this.isPlayerInAndon()) {
      this.tweener.clear().wait(300).call(function() {
        this.gameoverCallback(false, this.turnCount, this.hasKoban);
      }.bind(this));
    } else {
      this.turnCount++;
      if (this.isHintMode) {
        // hintモードおわり
        if (this.turnCount >= this.maxEnemyRuleLength*2) {
          this.endOfHintModeCallback();
          return;
        }
      } else {
        // UI update
        this.updateUI('endOfEnemyTurn');
      }
      var wt = 0;
      if (this.isHintMode) wt = 500;
      this.tweener.clear().wait(wt).call(function() {
        this.startPlayerTurn();  
      }.bind(this));
    }
    
  },
  
  isPlayerInAndon: function() {
    if (this.isHintMode)
      return false;
    
    return this.objGroup.player.isInAndon();
  },
  
  setEndOfHintModeCallback: function(callback) {
    this.endOfHintModeCallback = callback;
    
    this.maxEnemyRuleLength = 1;
    var enemies = this.stage.enemy;
    for (var i = 0; i < enemies.length; i++) {
      var theLength = enemies[i].type.RULE.length;
      if (theLength > this.maxEnemyRuleLength) {
        this.maxEnemyRuleLength = theLength;
      }
    }
  },
  
});





