/**
 * Main UI
 */
tm.define('game.UI', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(mainGame, return2SelectScene) {
    this.superInit();
    
    this.mainGame = mainGame;
    this.mainGame.initUI(function(type) {
      return this.updateUI(type);
    }.bind(this));
    
    
    // poseボタン
    this.poseBtn = ui.btn('mainUIback', 180, 180, 90, 90)
      .addEventListener('pointingend', function(e) {
        //pushPoseFunc(this.mainGame.stageNum);
        return2SelectScene();
      }.bind(this))
      .addChildTo(this);
    
   
    // 小判取得表示
    this.kobanDisp = tm.app.CanvasElement(180, 180)
      .setPosition(90, 630)
      .addChildTo(this);
    tm.app.Sprite('mainUIkobanNotYet', 180, 180)
      .addChildTo(this.kobanDisp);
    this.kobanDone = tm.app.Sprite('mainUIkobanDone', 180, 180)
      .setAlpha(0.0)
      .addChildTo(this.kobanDisp);
    
    // ターン数
    this.turnCount = 0;
    
    this.turnCountDisp = tm.app.CanvasElement(180, 180)
      .setPosition(1190, 90)
      .setOrigin(0, 0)
      .addChildTo(this);
      
    this.turnCountLabel = tm.app.Label(this.turnCount.toString())
      .setFontSize(100)
      .setFontFamily(n.fontfamily)
      .setAlign('right')
      .setBaseline('middle')
      .setFillStyle('#fff')
      .setPosition(-10, 0)
      .addChildTo(this.turnCountDisp);
    
    tm.app.Label('/ '+mainGame.stage.shortestNumberOfMoves.toString())
      .setFontSize(40)
      .setFontFamily(n.fontfamily)
      .setAlign('center')
      .setBaseline('middle')
      .setFillStyle('#fff')
      .setPosition(30, 30)
      .addChildTo(this.turnCountDisp);
    
    // ターン顔
    this.turnFaceDisp = tm.app.CanvasElement(180, 180)
      .setPosition(1190, 630)
      .setOrigin(0, 0)
      .addChildTo(this);
    
    // うわあああああああああああああああ
    var enemies = this.mainGame.objGroup.enemyGroup.mc;
    for (var i = enemies.length-1; i >= 0; i--) {
      tm.app.Sprite(enemies[i].theEnemy.type.FACE, 180, 180)
        .addChildTo(this.turnFaceDisp);
    }
    
    tm.app.Sprite('turnDispNinja', 180, 180)
        .addChildTo(this.turnFaceDisp);
    
    this.animFace();
  },
  
  updateUI: function(type) {
    switch (type) {
      case 'getKoban':
        tm.anim.Tween(this.kobanDone, {alpha: 1.0}, 200).start();
        break;
      
      case 'endOfPlayerTurn':
        this.turnCount++;
        this.turnCountLabel.text = this.turnCount.toString();
        this.updateFace();
        break;
      
      case 'endOfEnemyTurn':
        this.updateFace();
        break;
      
    }
  },
  
  updateFace: function() {
    var mc = this.turnFaceDisp.children;
    mc.unshift(mc.last);
    mc.pop();
    this.animFace();
  },
  
  animFace: function() {
    var mc = this.turnFaceDisp.children;
    for (var i = 0; i < mc.length; i++) {
      var index = mc.length - i - 1;
      mc[i].setPosition(30*index, 20*index)
        .setScale(0.8-0.2*index);
    }
    
  },
  
  
});
