/**
 * Makimono Scene
 */
tm.define('scene.MakimonoScene', {
  superClass: 'tm.app.Scene',
  
  init: function() {
    this.superInit();
    
    var self = this;
    
    /*
     * TODO: とりあえず超適当に作った
     */
    
    this.bg = tm.app.Shape(SCREEN.WIDTH*.9, SCREEN.HEIGHT*.9).addChildTo(this);
    this.bg.setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y);
    this.bg.canvas.clearColor(COLOR.NIGHT_SKY_LIGHT);
    this.setBoundingType('rect');
    
    
    this.bg.setInteractive(true);
    this.bg.addEventListener('pointingend', function(e) {
      e.app.frame = 0;
      e.app.popScene();
    });
    
    
  },
  
  
});

