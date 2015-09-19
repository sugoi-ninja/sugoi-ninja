/**
 * super obj object
 */
// アニメーション用
tm.define('obj.superAnimationSprite', {
  superClass: 'tm.app.AnimationSprite',
  
  init: function(sprite, count, mapgroup, size) {
    var _size = size;
    if (_size == null) {
      _size = {};
      _size.w = SCREEN.CELL.WIDTH+(SCREEN.CELL.PADDING*2);
      _size.h = SCREEN.CELL.HEIGHT+(SCREEN.CELL.PADDING*2);
    }
    this.superInit(sprite, _size.w, _size.h);
    
    this.count = count;
    
    this.mapgroup = mapgroup;
    this.setPositionBy(this.count);
    
    this.setBoundingType('rect');
    
    
  },
  
  setPositionBy: function(count) {
    var pos = this.getPosition(count);
    this.setPosition(pos.x, pos.y);
  },
  
  getPosition: function(count) {
    return this.mapgroup.theCell(count).getPosition();
  },
  
  
});

// 画像用
tm.define('obj.superSprite', {
  superClass: 'tm.app.Sprite',
  
  init: function(sprite, count, mapgroup, size) {
    var _size = size;
    if (_size == null) {
      _size = {};
      _size.w = SCREEN.CELL.WIDTH+(SCREEN.CELL.PADDING*2);
      _size.h = SCREEN.CELL.HEIGHT+(SCREEN.CELL.PADDING*2);
    }
    this.superInit(sprite, _size.w, _size.h);
    
    this.mapgroup = mapgroup;
    this.setPositionBy(count);
    
  },
  
  setPositionBy: function(count) {
    var pos = this.getPosition(count);
    this.setPosition(pos.x, pos.y);
  },
  
  getPosition: function(count) {
    return this.mapgroup.theCell(count).getPosition();
  },
  
  
});
