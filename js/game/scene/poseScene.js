/**
 * Pose Scene
 */
tm.define('scene.PoseScene', {
  superClass: 'tm.app.Scene',
  
  init: function(stageNum) {
    this.superInit();
    
    var self = this;
    this.stageNum = stageNum;
    
    /*
     * TODO: とりあえず超適当に作った
     */
    
    this.bg = tm.app.Sprite('resultBg', SCREEN.WIDTH, SCREEN.HEIGHT)
      .setOrigin(0, 0)
      .setPosition(-SCREEN.WIDTH, 0)
      .setInteractive(true)
      .addEventListener('pointingend', function(e) {
        e.app.frame = 0;
        e.app.popScene();
      })
      .addChildTo(this);
    
    
    this.description = ui.description()
      .setPosition(SCREEN.CENTER.X, SCREEN.CENTER.Y)
      .addChildTo(this.bg);
    
    
    this.btns = tm.app.CanvasElement();
    
    var self = this;
    var  popScene = function() {
      self.btns.remove();
      tm.anim.Tween(self.bg, {x: -SCREEN.WIDTH}, 500, 'easeInOutQuart')
        .addEventListener('finish', function(e) {
          e.app.frame = 0;
          e.app.popScene();
        })
        .start();
      
    };
    
    // セレクト画面に戻る
    ui.btn('resultBtnBack', 154, 154, 120, 240)
      .addEventListener('pointingend', function(e) {
        n.setResult2select(false, null);
        popScene();
      })
      .addChildTo(this.btns);
    
    // リトライ
    ui.btn('resultBtnRetry', 154, 154, 120, 480)
      .addEventListener('pointingend', function(e) {
        n.setResult2select(true, self.stageNum);
        popScene();
      })
      .addChildTo(this.btns);
    
  },
  
  onenter: function() {
    tm.anim.Tween(this.bg, {x: 0}, 1000, 'easeOutBounce')
    .addEventListener('finish', function(e) {
      this.btns.addChildTo(this.bg);
    }.bind(this)).start();
  },
  
  
  
  
});

