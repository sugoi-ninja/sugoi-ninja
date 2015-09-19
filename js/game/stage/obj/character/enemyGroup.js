/**
 * Samurai 達
 */
tm.define('character.EnemyGroup', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(parent, enemyData, enemyCount, mapgroup, andongroup) {
    this.superInit();
    this.mapgroup = mapgroup;
    this.andongroup = andongroup;
    
    // エネミーを配列で所持
    // (親にaddするようにしてthis.childrenで取得できなくなったため)
    this.mc = [];
    
    var self = this;
    enemyCount.each(function(count) {
      var theEnemy = enemyData[count.index];
      // mcに入れつつ親のobjGroupにaddChild
      self.mc.push(character.Enemy({x: count.x, y: count.y}, theEnemy, mapgroup, andongroup)
        .addChildTo(parent));
    });
    
  },
  
  myTurn: function(turnCount, isPlayerInAndon, endOfAllTurnCallback, updateUI) {
    
    var _mc = this.mc;
    var _lastChild = this.mc.last;
    
    var isEndOfTheTurn = false;
    function endOfTheTurn() {
      if (isPlayerInAndon()) {
        endOfAllTurnCallback();
        return;
      }
        
      isEndOfTheTurn = true;
      if (updateUI != null)
        updateUI();
    }
    
    // 順番にアニメーション
    var nextEnemyTurn = function(i) {
      var child = _mc[i];
      if (child === _lastChild) {
        
        child.myTurn(turnCount, endOfAllTurnCallback);
        
      } else {
        
        child.myTurn(turnCount, endOfTheTurn);
        
        var timer1 = setInterval(function() {
          if (isEndOfTheTurn) {
            isEndOfTheTurn = false;
            nextEnemyTurn(i+1);
            clearInterval(timer1);
            timer1 = null;
          }
        }, 600);
        
      }
    };
    nextEnemyTurn(0);
    
  },
  
});

/**
 * Enemy Class
 */
tm.define('character.Enemy', {
  superClass: 'character.SuperCharacter',
  
  init: function(count, theEnemy, mapgroup, andongroup) {
    var _size = null;
    if (theEnemy.type.SPRITE == 'samuraiSS_dekai')
      _size = 150;
    this.superInit(count, theEnemy.direct, mapgroup, theEnemy.type.SPRITE, _size);
    
    this.theEnemy = theEnemy;
    
    andongroup.makeAndon(this);
    
    this.updateAndon();
    
  },
  
  myTurn: function(turnCount, callback) {
    var self = this;
    
    var endOfTurn = function() {
      return function() {
        self.updateAndon();
        callback();
      };
    };
  
    
    // 1ターンにたくさん動くSamuraiに対応(配列判定→中身処理する)
    var moveType = this.theEnemy.type.RULE[turnCount%this.theEnemy.type.RULE.length];

    if ( moveType instanceof Array) {

      var isEndOfTheMove = false;
      function endOfTheMove() {
        isEndOfTheMove = true;
      }
      
      // 順番にアニメーション
      
      var nextMove = function(i) {
        if (i == moveType.length-1) {
          self.oneMove(moveType[i], endOfTurn);

        } else {

          self.oneMove(moveType[i], endOfTheMove);

          var timer2 = setInterval(function() {
            if (isEndOfTheMove) {
              isEndOfTheMove = false;
              nextMove(i + 1);
              clearInterval(timer2);
              timer2 = null;
            }
          }, 310);
        }
      };
      nextMove(0);

    } else {
      this.oneMove(moveType, endOfTurn);
    }

  },
  
  oneMove: function(moveType, callback) {
    
    var self = this;
    var move = {x:0, y:0};
    switch (moveType) {
      case MOVE.FORWARD:
        switch (self.direct) {
          case DIRECTION.TOP:
            move.y = -1;
            break;
          
          case DIRECTION.RIGHT:
            move.x = 1;
            break;
          
          case DIRECTION.BOTTOM:
            move.y = 1;
            break;
          
          case DIRECTION.LEFT:
            move.x = -1;
            break;    
        }
        break;
        
      case MOVE.TURN.RIGHT:
        self.turnBy(1);
        break;
        
      case MOVE.TURN.LEFT:
        self.turnBy(-1);
        break;
    }
    
    self.moveTo({
      x : self.count.x + move.x,
      y : self.count.y + move.y
    }, callback());

  },
  
  updateAndon: function() {
    // TODO: 演出としての行燈をどう実装するか…
    var rate = {
      x: 1,
      y: 1,
      reverse: false,
    };
    switch (this.direct) {
      case DIRECTION.TOP:
        
        break;

      case DIRECTION.RIGHT:
        rate.y = -1;
        rate.reverse = true;
        break;

      case DIRECTION.BOTTOM:
        rate.y = -1;
        break;

      case DIRECTION.LEFT:
        rate.reverse = true;
        break;
    }
    
    var andonArr = this.theEnemy.andon.COUNT;
    for (var i = 0; i < andonArr.length; i ++) {
      var andon = andonArr[i];
      var count = {x: this.count.x+andon.x*rate.x, y: this.count.y+andon.y*rate.y};
      if (rate.reverse) {
        count = {x: this.count.x+andon.y*rate.y, y: this.count.y+andon.x*rate.x};
      }
      var cell = this.mapgroup.theCell(count);
      if (cell != null) {
        cell.setAndon(this);
      }
    }
    
  },
  
});

