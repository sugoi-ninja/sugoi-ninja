/**
 * tmlib Logo
 */
tm.define("scene.LogoScene", {
  superClass : "tm.app.Scene",

  init : function() {
    this.superInit();

    this.bg = tm.display.Shape(SCREEN.WIDTH, SCREEN.HEIGHT).addChildTo(this);
    this.bg.canvas.clearColor(COLOR.WHITE);
    this.bg.setOrigin(0, 0);

    // logo
    tm.display.Sprite('tmlibLogo')
      .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
      .addChildTo(this.bg);
        
    this.bg.alpha = 0.0;
    this.bg.tweener.clear().fadeIn(100).call( function() {
      
      this.bg.tweener.clear().wait(1000).fadeOut(200).call( function() {
        this.app.replaceScene(scene.TitleScene());
      }.bind(this));
    }.bind(this));
  },
  
  

});
