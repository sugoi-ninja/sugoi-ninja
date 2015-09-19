tm.define('obj.Group', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(mapData, mapgroup, enemy, andongroup, isHintMode) {
    this.superInit();
    
    this.mapgroup = mapgroup;
    this.andongroup = andongroup;
    this.isHintMode = isHintMode;
    
    /**
     * ninja
     */
    this.player = character.Player(mapData.start, this.mapgroup).addChildTo(this);

    // 壁
    this.makeWall(mapData.wall);

    // ゴール
    // 向こうからここにaddChildしている
    // 手前と奥に分けている
    this.goal = obj.Goal(this, mapData.goal, this.mapgroup);

    // 小判
    this.koban = obj.Koban(mapData.koban, this.mapgroup).addChildTo(this);
    

    if (this.isHintMode) {
      tm.display.RectangleShape(SCREEN.WIDTH, SCREEN.HEIGHT, 
        {fillStyle: COLOR.BLACK})
        .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
        .setAlpha(0.6)
        .addChildTo(this);
      this.setAlpha(0.6);
    }
    
    /**
     * samurai
     * 向こうからここにaddChildしている
     */
    this.enemyGroup = character.EnemyGroup(this, enemy, mapData.enemyCount, this.mapgroup, this.andongroup);


  },
  
  makeWall: function(wallCount) {
    for (var i=0; i < wallCount.length; i++) {
      obj.Wall(wallCount[i], this.mapgroup).addChildTo(this);
    }
  },
  
  ZsortByY: function() {
    this.children.sort(function(a, b) {
      // y座標順にそーっとソートしてね♡
      // 一緒ならxの大きい方に
      if (a.y == b.y)
        return a.x - b.x;
      return a.y - b.y;
    });
  },
  
  
  update: function() {
    // updateの度に呼ぶのもどうかと思ってはいる。けど、斜め抜けのアニメーションの最中とかさ……
    if (!this.isHintMode)
      this.ZsortByY();
  },
  
});