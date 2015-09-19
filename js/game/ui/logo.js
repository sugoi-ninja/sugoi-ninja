tm.define('ui.Logo', {
  superClass: 'tm.app.Sprite',
  
  init: function() {
    this.superInit('logo', SCREEN.WIDTH, SCREEN.HEIGHT);
    this.setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y);
  },
  
});