/**
 * タイトルとレベル選択画面で共通で使う背景素材をまとめて扱うクラスだよ
 */
tm.define('ui.bgElementGroup', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(parent) {
    this.superInit();
    
    this.bgGrad = tm.app.Sprite('titleBg', SCREEN.WIDTH, SCREEN.HEIGHT).addChildTo(this);
    this.bgGrad.setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y);
    
    this.moon = tm.app.Sprite('moon', SCREEN.GRID.OUT*2, SCREEN.GRID.OUT*2).addChildTo(this);
    this.moon.setPosition(SCREEN.PADDING.LEFT, SCREEN.PADDING.TOP);
    
    this.cloudBack = ui.CloudGroup(parent, 1, 4).addChildTo(this);
    
    this.castle = ui.Castle(parent).addChildTo(this);
    
  },
  
  scrollZoomTo: function(target, duration) {
    if (target == null) 
      target = n.getScrollTarget();
    this.castle.scrollZoomTo(target, duration);
    this.cloudBack.scrollZoomTo(target, duration);
    this.scrollPosition = target;
  },
  
  scrollTo: function(target) {
    if (target == null) 
      target = n.getScrollTarget();
    this.castle.scrollTo(target);
    this.cloudBack.scrollTo(target);
    this.scrollPosition = target;
  },
  
});