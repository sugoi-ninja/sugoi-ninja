/**
 * 城
 */
tm.define('ui.Castle', {
  superClass: 'tm.app.Sprite',
  
  dw: 696,
  dh: 2160,
  
  init: function(parent) {
    // TODO: parentからサイズと位置の処理切り分け
    this.superInit('castle', SCREEN.GRID.IN*2, this.dh*SCREEN.GRID.IN*2/this.dw);
    this.setPosition(SCREEN.PADDING.LEFT+(SCREEN.GRID.IN+SCREEN.GRID.MARGIN)*5+this.width/2, SCREEN.PADDING.TOP+this.height/2);
    
    // TODO: SelectSceneから呼ばれた時、適切なスクロール位置にする
    
  },
  
  scrollZoomTo: function(p_target, p_duration) {
    this.scrollTo(p_target, p_duration);
    this.zoom(p_duration);
  },
  
  easing: 'easeInOutQuart',
  scrollTo: function(p_target, p_duration) {
    var _target = p_target;
    if (_target == null)
      _target = SCROLL.LOWER;
    
    var _duration = p_duration;
    if (_duration == null)
      _duration = 900;
    
    var tween;
    switch (_target) {
      case SCROLL.HIGH:
        tween = {'x': SCREEN.CENTER.X, 'y': SCREEN.HEIGHT*3/2};
        break;
        
      case SCROLL.MIDDLE:
        tween = {'x': SCREEN.CENTER.X, 'y': SCREEN.CENTER.Y};
        break;
        
      case SCROLL.LOWER:
        tween = {'x': SCREEN.CENTER.X, 'y': -SCREEN.CENTER.Y};
        break;
    }
    
    if (_duration == 0) {
      this.setPosition(tween.x, tween.y);
    } else {
      tm.anim.Tween(this, tween, _duration, this.easing).start();
    }
    
  },
  
  zoom: function(p_duration) {
    var _duration = p_duration;
    if (_duration == null)
      _duration = 900;
    
    if (_duration == 0) {
      this.width = this.dw;
      this.height = this.dh;
    } else {
      var tween = tm.anim.Tween(this, 
        {'width': this.dw, 'height': this.dh}, 
        _duration, 
        this.easing);
      tween.start();
    }
    
  },
  
  
});