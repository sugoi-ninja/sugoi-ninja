/**
 * Player Class
 */
tm.define('character.Player', {
  superClass: 'character.SuperCharacter',
  
  init: function(count, mapgroup) {
    this.superInit(count, DIRECTION.RIGHT, mapgroup, 'ninjaSS');
    
  },
  
  myTurn: function(onMoveSelectCallback, onMouseoverCallback, noMovableCellCallback) {
    var movable_cells = [
      {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},
      {x:-1, y:0},               {x:1, y:0},
      {x:-1, y:1},  {x:0, y:1},  {x:1, y:1},
    ];
    var self = this;
    var movableCellCount = 0;
    for (var i = 0; i < movable_cells.length; i++) { 
      var _cell = this.mapgroup.theCell({x: this.count.x+movable_cells[i].x, y: this.count.y+movable_cells[i].y});
      if (_cell != null && _cell.isFloor && !_cell.isAndon) {
        _cell.moveSelect(function(count) {
          return onMoveSelectCallback(count);
        }, function(count) {
          return onMouseoverCallback(count);
        });
        movableCellCount++;
      }
    }
    
    // 動けるセルがなかったらゲームオーバー
    if (movableCellCount < 1) {
      noMovableCellCallback();
    }
    
  },
  
  // andonあたり判定
  isInAndon: function() {
    return this.mapgroup.theCell(this.count).isAndon;
  },
  
  // goal判定
  isInGoal: function() {
    return this.mapgroup.theCell(this.count).isGoal;
  },
  
  // koban取得判定
  isInKoban: function() {
    return this.mapgroup.theCell(this.count).isKoban;
  },
  
  warp: function() {
    if (this.isInGoal()) {
      this.gotoAndPlay('spin');
      this.tweener.clear().wait(200).call( function() {
        tm.anim.Tween(this, {
          alpha : 0.0,
          y : this.y - 50
        }, 500, 'easeInOutQuart').start();
      }.bind(this));
    }

  },
  
});
