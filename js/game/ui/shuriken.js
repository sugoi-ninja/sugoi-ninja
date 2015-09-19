/**
 * 手裏剣
 */
tm.define('ui.Shuriken', {
  superClass: 'tm.app.AnimationSprite',
  
  init: function() {
    this.superInit('shurikenSS', SCREEN.GRID.OUT, SCREEN.GRID.OUT);
    
    this.setPosition(SCREEN.CENTER.X, SCREEN.PADDING.TOP+SCREEN.GRID.IN*3+SCREEN.GRID.MARGIN*2);
    this.gotoAndPlay('stop');
    
    this.setInteractive(true);
    
    this.addEventListener('mouseover', function(e) {
      this.gotoAndPlay('spin');
      n.changeCursor('pointer');

    });
    this.addEventListener('mouseout', function(e) {
      n.changeCursor('auto');
      this.gotoAndPlay('stop');
    });
    
    this.addEventListener('pointingend', function(e) {
      
      this.parent.onShurikenClick();
      
      //this.gotoAndPlay('spin');
      n.changeCursor('auto');
      
      //これがないとclearEventListener()できない謎
      this.setInteractive(false);
      this.clearEventListener();
      
      //this.tween();
      
    });
  },
  
  update: function() {

  },
  
  tween: function() {
    var tween = tm.anim.Tween(this, {'x': SCREEN.WIDTH/4, 'y': SCREEN.HEIGHT*5/6, 'width': 400, 'height': 400}, 300, 'easeOutCubic');
    tween.start();
    var self = this;
    tween.onfinish = function() {
      tween = tm.anim.Tween(self, {'x': SCREEN.WIDTH+50, 'y': -25, 'width': 50, 'height': 50}, 800, 'easeInOutCubic');
      tween.onfinish = function() {
        self.parent.replaceScene();
      };
      tween.start();
    };
    
  },
  
  
});
