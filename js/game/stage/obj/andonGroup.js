/**
 * ANDON
 */
tm.define('obj.AndonGroup', {
  superClass: 'tm.app.CanvasElement',
  
  init: function() {
    this.superInit();
    
    
  },
  
  makeAndon: function(enemy) {
    obj.Andon(enemy).addChildTo(this);
  },
  
  showBeam: function() {
    this.eachFunc(function() {
      return function(child) {
        child.showBeam();
      };
    });
  },
  
  hideBeam: function() {
    this.eachFunc(function() {
      return function(child) {
        child.hideBeam();
      };
    });
  },
  
  eachFunc: function(func) {
    var mc = this.children;
    mc.each(func());
  },
  
  
});

tm.define('obj.Andon', {
  superClass: 'tm.app.Sprite',
  
  init: function(enemy) {
    this.enemy = enemy;
    var sprite = this.enemy.theEnemy.andon.SPRITE;
    this.superInit(sprite.name, sprite.size*(SCREEN.CELL.WIDTH+SCREEN.CELL.MARGIN*2)
      , sprite.size*(SCREEN.CELL.HEIGHT+SCREEN.CELL.MARGIN*2));
    //this.setAlpha(0.8);
    this.setBlendMode('lighter');
    
    this.isBeam = (sprite.name == 'andonBeam');
  },
  
  update: function() {
    this.setPosition(this.enemy.x, this.enemy.y);
    this.setRotation(this.enemy.direct * 90);
  },
  
  
  showBeam: function() {
    if (this.isBeam) {
      this.setAlpha(1.0);
    }
  },
  
  hideBeam: function() {
    if (this.isBeam) {
      this.setAlpha(0.0);
    }
  },
  
  
  
});

