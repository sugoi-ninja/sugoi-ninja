/**
 * マキモノ
 */
tm.define('ui.Makimono', {
  superClass: 'tm.app.AnimationSprite',
  
  init: function() {
    this.superInit('makimonoSS', 142, SCREEN.GRID.OUT);
    
    this.setPosition(SCREEN.PADDING.LEFT+SCREEN.GRID.IN/2, SCREEN.HEIGHT-(SCREEN.PADDING.BOTTOM+SCREEN.GRID.IN/2));
    
    this.setInteractive(true);
    
    this.addEventListener('mouseover', function(e) {
      this.gotoAndPlay('open');
      n.changeCursor('pointer');
    });
    this.addEventListener('mouseout', function(e) {
      this.gotoAndPlay('close');
      n.changeCursor('auto');
    });
    
    this.addEventListener('pointingend', function(e) {
      
      n.changeCursor('auto');
      
      e.app.pushScene(scene.MakimonoScene());
      
    });
  },
  
  update: function() {

  },
  
  tween: function() {
    
  },
  
  
});
