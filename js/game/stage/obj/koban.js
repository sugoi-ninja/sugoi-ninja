/**
 * Koban
 */
tm.define('obj.Koban', {
  superClass: 'obj.superSprite',
  
  
  init: function(count, mapgroup) {
    this.superInit('koban', count, mapgroup);
    
  },
  
  easing: 'linear',
  duration: 200,
  doTakeAnimation: function() {
    var self = this;
    var tween = tm.anim.Tween(this, {alpha: 0.0, y: this.y-20}, this.duration, this.easing);
    tween.onfinish = function() {
      self.remove();
    };
    tween.start();
  },
  
});
