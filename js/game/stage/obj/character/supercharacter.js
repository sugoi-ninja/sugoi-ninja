/**
 * Super Character Class
 */
tm.define('character.SuperCharacter', {
  superClass: 'obj.superAnimationSprite',
  
  init: function(count, direct, mapgroup, ss, size) {
    //var _ss = 'characterSS'.image = sa;
    this.superInit(ss, count, mapgroup, size);
    
    this.direct = direct;
    
    // TODO: これどうにかならんの？
    this.gotoAndPlay(this.direct+'wait');
    
  },
  
  easing: 'linear',
  duration: 300,
  moveTo: function(count, callback) {
    
    this.count = count;
    var tween = tm.anim.Tween(this, this.getPosition(this.count), this.duration, this.easing);
    tween.onfinish = callback;
    tween.start();
    
  },
  
  turnBy: function(p_direct) {
    var _direct = this.direct;
    _direct += p_direct;
    
    this.turnTo(_direct);
  },
  
  turnToCount: function(p_count) {
    this.turnTo(this.getDirection(p_count));
    
  },
  
  turnTo: function(p_direct) {
    var _direct = p_direct;
    if (_direct > DIRECTION.LEFT_TOP || _direct < DIRECTION.TOP) 
      _direct = (_direct + 4) % 4 ;
      
    this.direct = _direct;
    
    this.gotoAndPlay(this.direct+'wait');
    
  },
  
  getDirection: function(p_count) {
    var _x = p_count.x - this.count.x;
    var _y = p_count.y - this.count.y;
    if (_x == 0) {
      return _y + 1;
    } else {
      return Math.abs(_x - 2) + _y * .5 * _x;
    }
  },

  
  // TODO: 奥のマスでインデックスが後ろになるようにする
  

});
