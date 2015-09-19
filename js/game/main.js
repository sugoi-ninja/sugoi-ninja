/*==============================
 * 
 * THE SUGOI NINJA 
 * v0.1.0
 * 
 * (c) 2014 Team THE SUGOI NINJA.
 * 
 *==============================*/

/**
 * init
 */
tm.main(function() {
  var app = tm.app.CanvasApp('#'+n.canvasId);
  app.fps = 30;
  app.resize(SCREEN.WIDTH, SCREEN.HEIGHT);
  app.fitWindow();
  app.background = COLOR.WHITE;
  
  app.replaceScene(scene.LoadingScene({
    assets: ASSETS,
    sounds: SOUNDS,
    width: SCREEN.WIDTH,
    height: SCREEN.HEIGHT,
    nextScene: scene.LogoScene,
  }));

  app.run();
});

