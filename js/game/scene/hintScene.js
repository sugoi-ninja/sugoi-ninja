/**
 * Hint Scene
 */
tm.define('scene.HintScene', {
  superClass: 'tm.app.Scene',
  
  init: function(mainGame) {
    this.superInit();
    
    /*
     * TODO: とりあえず超適当に作った
     */
    
    this.bg = tm.display.Shape(SCREEN.WIDTH, SCREEN.HEIGHT).addChildTo(this);
    this.bg.setOrigin(0, 0);
    this.bg.setAlpha(0.0);
    
    tm.display.RectangleShape(SCREEN.WIDTH, SCREEN.HEIGHT, 
      {fillStyle: COLOR.BLACK})
      .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
      .setAlpha(0.7)
      .addChildTo(this.bg);
    
    this.mainGame = mainGame
      //.setAlpha(0.8)
      .addChildTo(this.bg);
      
    this.mainGame.setEndOfHintModeCallback(function() {
      return this.pop();
    }.bind(this));
      
  },
  
  currentSceneIndex: 0,
  onenter: function() {
    // TODO: ボス戦カットイン
    if (this.mainGame.stageNum == 0 && this.currentSceneIndex == 0) {
        this.bg.tweener.clear().wait(100).call(function() {
          this.currentSceneIndex++;
          this.app.pushScene(scene.descriptionScene());
        }.bind(this));
        return;
      }
      
    this.bg.tweener.clear().fadeIn(200).wait(100).call(function() {
      
      this.mainGame.startFirstTurn();
      this.addEventListener('pointingend', function(e) {
        this.removeEventListener('pointingend');
        this.pop();
      });
      
    }.bind(this));
    
  },
  
  pop: function() {
    this.bg.tweener.clear().wait(100).fadeOut(200).call(function() {
      this.app.frame = 0;
      this.app.popScene();
    }.bind(this));
    
  }
  
  
});

