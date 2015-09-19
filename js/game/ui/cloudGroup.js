/**
 * くもくもくもく
 */
tm.define('ui.CloudGroup', {
  superClass: 'tm.app.CanvasElement',
  
  isSelectScene: false,
  
  
  init: function(parent, direct, count) {
    this.superInit();
    
    // TODO: parentからクラス名かなんかでタイトルから呼ばれた時とセレクトから呼ばれたときのサイズと位置処理の切り分けをする
    var parentClassName = '';
    this.makeClouds(parentClassName, direct, count);
  },
  
  makeClouds: function(parentClassName, direct, count) {
    for (var i = 0; i < count; i++){
      var cloud = ui.Cloud(parentClassName, direct).addChildTo(this);
    }
  },
  
  scrollZoomTo: function(p_target, p_duration) {
    var _target = p_target;
    if (_target == null)
      _target = SCROLL.LOWER;
    this.eachFunc(function() {
        return function(child) {
          child.scrollZoomTo(_target, p_duration);
        };
      });
    this.isSelectScene = true;
  },
  
  clear: function() {
    this.eachFunc(function() {
        return function(child) {
          child.clear();
        };
      });
  },
  
  scrollTo: function(target, p_duration) {
    this.eachFunc(function() {
        return function(child) {
          child.scrollTo(target, p_duration);
        };
      });
      
  },
  
  eachFunc: function(func) {
    var mc = this.children;
    mc.each(func());
  },
  
  update: function() {
    
  },
  
});

tm.define('ui.Cloud', {
  superClass: 'tm.app.Sprite',
  
  speed: 1,
  
  init: function(parentClassName, direct) {
    var size = Math.rand(30, 100);
    this.superInit('cloud01', size*6, size*5);
    this.position.set(Math.rand(0, SCREEN.WIDTH), Math.rand(0, SCREEN.HEIGHT));
    
    this.speed *= direct;
  },
  
  update: function() {
    this.x += this.speed;
    
    if (this.x > SCREEN.WIDTH + this.width || this.x < -this.width) {
      
      if (this.parent.isSelectScene) {
        this.relativeCoordY = Math.rand(-SCREEN.CENTER.Y, SCREEN.HEIGHT*3/2);
        this.position.set(-(this.x-SCREEN.WIDTH), this.relativeCoordY + SCREEN.CENTER.Y);
      } else {
        this.position.set(-(this.x-SCREEN.WIDTH), Math.rand(0, SCREEN.HEIGHT));
      }
      
    }
    
  },
  
  easing: 'easeInOutQuart',
  
  scrollZoomTo: function(p_target, p_duration) {
    var _duration = p_duration;
    if (_duration == null)
      _duration = 700;
    
    var tween = {'width': this.width*1.3, 'height': this.height*1.3};
    
    this.relativeCoordY = (this.y - SCREEN.CENTER.Y)*3;
    this.scrollTo(p_target, p_duration);
    
    if (_duration == 0) {
      this.width = tween.width;
      this.height = tween.height;
    } else {
      tm.anim.Tween(this, tween, _duration, this.easing).start();
    }
  },
  
  relativeCoordY: 0,
  
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
        tween = {'y': (this.relativeCoordY+SCREEN.HEIGHT*3/2)*.3};
        break;
        
      case SCROLL.MIDDLE:
        tween = {'y': (this.relativeCoordY+SCREEN.CENTER.Y)*.3};
        break;
        
      case SCROLL.LOWER:
        tween = {'y': (this.relativeCoordY-SCREEN.CENTER.Y)*.3};
        break;
    }
    
    if (_duration == 0) {
      this.setPosition(this.x, tween.y);
    } else {
      tm.anim.Tween(this, tween, _duration, this.easing).start();
    }
  },
  
  clear: function() {
    var tween;
    if (this.x < SCREEN.CENTER.X) {
      tween = tm.anim.Tween(this, 
        {'x': -this.width}, 
        700, 
        this.easing);
    
    } else {
        tween = tm.anim.Tween(this, 
        {'x': SCREEN.WIDTH+this.width}, 
        700, 
        this.easing);
    }
    tween.start();
  },
  
});

