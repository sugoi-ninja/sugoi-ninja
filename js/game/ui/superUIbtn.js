/**
 * UI button
 * onmouseでカーソル変更対応したボタン
 */
tm.define('ui.btn', {
  superClass: 'tm.app.Sprite',
  
  init: function(sprite, w, h, posX, posY) {
    this.superInit(sprite, w, h);
    this.setPosition(posX, posY)
      .setInteractive(true)
      .addEventListener('mouseover', function(e) {
        n.changeCursor('pointer');
      })
      .addEventListener('mouseout', function(e) {
        n.changeCursor('auto');
      })
      .addEventListener('pointingend', function(e) {
        n.changeCursor('auto');
      });
      
  },
  
});
