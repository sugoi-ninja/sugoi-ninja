/**
 * Main Scene
 */
tm.define('scene.MainScene', {
  superClass: 'tm.app.Scene',
  
  init: function(stageNum) {
    this.superInit();
    
    var self = this;
    
    this.stageNum = stageNum;
    this.stage = STAGE_DATA[this.stageNum];
    
    this.bg = tm.display.Shape(SCREEN.WIDTH, SCREEN.HEIGHT).addChildTo(this);
    this.bg.setOrigin(0, 0);
    this.bg.setScale(0.1);
    this.bg.setPosition(SCREEN.CENTER.X-this.width/2, SCREEN.CENTER.Y-this.height/2);
    this.bg.setAlpha(0.1);
    
    tm.app.Sprite('titleBg', SCREEN.WIDTH, SCREEN.HEIGHT)
      .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
      .addChildTo(this.bg);
    
    /**
     * ゲーム本体
     */
    this.mainGame = game.Main(this.stage, this.stageNum, 
      function(isClear, turnCount, hasKoban) {
        return self.gameover(isClear, turnCount, hasKoban);
      }, false).addChildTo(this.bg);
    
    // TODO: UI関連のグループクラス
    this.mainUI = game.UI(this.mainGame, function() {
      //return this.pushPose();
      return this.return2SelectScene();
    }.bind(this)).addChildTo(this.bg);
    
    n.stageStart();
    
    n.playAudio('main', true);
  },
  
  currentSceneIndex: 0,
  onenter: function(e) {
    switch (this.currentSceneIndex) {
      case 0:
        /**
         * ポップアップするアニメーション
         */
        this.bg.tweener.clear().to({scaleX:1, scaleY:1, x:0, y:0, alpha:1.0}, 200).call(function() {
          this.pushHint();
        }.bind(this));
        
        break;
        
      case 1: // Hint
        this.mainGame.startFirstTurn();
        break;
      
      case 2: // resultScene
        this.pop(1000);
        break;
      
      case 3: // pose
        this.bg.tweener.clear().fadeOut(300).call(function() {
          this.app.popScene();
        }.bind(this));
        break;
    }
    
  },
  
  pop: function(waitTime) {
    this.mainGame.objGroup.player.warp();
    this.bg.tweener.clear().wait(waitTime).fadeOut(300).call( function() {
      n.stopAudio('main');
      this.app.popScene();
    }.bind(this));
},
  
  gameover: function(isClear, turnCount, hasKoban) {
    var numberOfMoves = turnCount + 1;
    
    this.tweener.clear().wait(1000).call(function() {
      // result
      this.currentSceneIndex = 2;
      this.app.pushScene(scene.ResultScene(
        this.stageNum, isClear, numberOfMoves, hasKoban, this.stage.shortestNumberOfMoves));
    }.bind(this));
    
  },
  
  pushHint: function() {
    this.currentSceneIndex = 1;
    // mainGameをヒントモードで生成してあげる♡
    this.app.pushScene(scene.HintScene(game.Main(this.stage, this.stageNum, null, true)));
  },
  
  pushPose: function() {
    this.currentSceneIndex = 3;
    this.app.pushScene(scene.PoseScene());
    
  },
  
  return2SelectScene: function() {
    n.setResult2select(false, null);
    this.pop(0);
  },

});

