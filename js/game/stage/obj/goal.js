/**
 * Goal
 */
tm.define('obj.Goal', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(parent, count, mapgroup) {
    this.superInit();
    
    /*
     * 手前用と奥用にそれぞれ1pxずつズラした画像を読み込んでいる
     * で、Y座標をズラして揃えることでZsortByYに手をいれずに中にNinjaを入れる
     */
    
    this.goalBack = obj.superAnimationSprite('goalBackSS', count, mapgroup)
      .addChildTo(parent);
    this.goalBack.setY(this.goalBack.y - 1);
    
    this.goalFront = obj.superAnimationSprite('goalFrontSS', count, mapgroup)
      .addChildTo(parent);
    this.goalFront.setY(this.goalFront.y + 1);
    
    
    this.goalBack.gotoAndPlay('normal');
    this.goalFront.gotoAndPlay('normal');
  },
  
});
