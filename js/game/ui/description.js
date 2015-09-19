/**
 * description
 */
tm.define('ui.description', {
  superClass: 'tm.app.CanvasElement',
  
  init: function() {
    this.superInit(750, 450);
    
    for (var i = 10; i >= 0; i--) {
      tm.app.Sprite('description'+i, 750, 450)
        .addChildTo(this);
    }
  },
  
  frameCount: 0,
  update: function() {
    this.frameCount++;
    if (this.frameCount>30) {
      this.frameCount = 0;
      
      var mc = this.children;
      mc.unshift(mc.last);
      mc.pop();
    }
    
  },
  
});
