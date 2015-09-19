/**
 * descript Scene
 */
tm.define('scene.descriptionScene', {
  superClass: 'tm.app.Scene',
  
  init: function() {
    this.superInit();
    
    this.bg = tm.app.CanvasElement().setAlpha(0.0).addChildTo(this);
    
    ui.description()
      .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
      .addChildTo(this.bg);
    
    
    ui.btn('closeBtn', 120, 120, 280, 150)
      .addEventListener('pointingend', function(e) {
        this.bg.tweener.clear().fadeOut(200).call(function() {
          e.app.frame = 0;
          e.app.popScene();
        }.bind(this));
      }.bind(this)).addChildTo(this.bg);
    
  },
  
  onenter: function() {
    this.bg.tweener.clear().fadeIn(200).call(function() {
      
    }.bind(this));
  },
  
  
  
});

