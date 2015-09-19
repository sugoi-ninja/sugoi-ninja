/**
 * loadingScene デフォルトのものを改変
 */
tm.define("scene.LoadingScene", {
  superClass : "tm.app.Scene",

  init : function(param) {
    this.superInit();

    this.bg = tm.display.Shape(param.width, param.height).addChildTo(this);
    this.bg.canvas.clearColor(COLOR.NIGHT_SKY_LIGHT);
    this.bg.setOrigin(0, 0);

    // スリケン
    var suriken = tm.display.Shape(100, 100);
    suriken.setPosition(0, param.height*.6);
    suriken.canvas.setColorStyle('white', '#3cc5d8')
      .beginPath().moveTo(50, 0).lineTo(35, 35).lineTo(0, 50)
      .lineTo(35, 65).lineTo(50, 100).lineTo(65, 65)
      .lineTo(100, 50).lineTo(65, 35).lineTo(50, 0)
      .closePath().fill();
    suriken.canvas.setColorStyle('white', '#6d7173')
      .beginPath()
      .moveTo(48, 5).lineTo(33, 40)
      .lineTo(5, 52).lineTo(40, 66)
      .lineTo(52, 95).lineTo(66, 60)
      .lineTo(95, 48).lineTo(60, 33)
      .lineTo(48, 5).closePath().fill();
    suriken.canvas.setColorStyle('white', COLOR.NIGHT_SKY_LIGHT).fillCircle(50, 50, 7);
    suriken.update = function(app) {
      suriken.rotation += 20;
      suriken.x += 20;
      if (suriken.x > param.width+100)
        suriken.x = -100;
    };
    suriken.addChildTo(this.bg);
    
    this.alpha = 0.0;
    this.bg.tweener.clear().fadeIn(100).call( function() {
      n.gameStart();
      
      if (param.assets) {
        var loader = tm.asset.Loader();

        loader.onload = function() {
          this.bg.tweener.clear().wait(200).fadeOut(200).call( function() {
            if (param.nextScene) {
              this.app.replaceScene(param.nextScene());
            }
            var e = tm.event.Event("load");
            this.fire(e);
          }.bind(this));
        }.bind(this);

        loader.onprogress = function(e) {
          var event = tm.event.Event("progress");
          event.progress = e.progress;
          this.fire(event);
        }.bind(this);

        loader.load(param.assets);
      }
    }.bind(this));
  },
});
