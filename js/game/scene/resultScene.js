/**
 * Result Scene
 */
tm.define('scene.ResultScene', {
  superClass: 'tm.app.Scene',
  
  init: function(stageNum, isClear, numberOfMoves, hasKoban, shortestNumberOfMoves) {
    this.superInit();
    
    var self = this;
    
    // クリアフラグアップデート
    n.stageResult(stageNum, isClear, 
      (numberOfMoves <= shortestNumberOfMoves), hasKoban);
    
    this.bg = tm.app.Sprite('resultBg', SCREEN.WIDTH, SCREEN.HEIGHT)
      .setOrigin(0, 0)
      .setPosition(-SCREEN.WIDTH, 0)
      .addChildTo(this);
    
    // 絵
    var spritename = 'resultFail';
    if (isClear) {
      // TODO: ボス戦クリアグラフィック
      spritename = 'resultClear';
      
      
      if (numberOfMoves <= shortestNumberOfMoves)
        // 最短手アイコン
        tm.app.Sprite('resultShortestClear', 154, 154)
          .setPosition(922, 190)
          .addChildTo(this.bg);
        
      if (hasKoban)
        // 小判アイコン
        tm.app.Sprite('resultKobanClear', 154, 154)
          .setPosition(922, 360)
          .addChildTo(this.bg);
          
      // ターン数
      this.turnCountDisp = tm.app.CanvasElement(180, 180)
        .setPosition(1082, 190)
        .setOrigin(0, 0)
        .addChildTo(this.bg);
      
      tm.app.Label(numberOfMoves.toString())
        .setFontSize(100)
        .setFontFamily(n.fontfamily)
        .setAlign('right')
        .setBaseline('middle')
        .setFillStyle('#000')
        .setPosition(-5, 0)
        .addChildTo(this.turnCountDisp);
    
      tm.app.Label('/ '+shortestNumberOfMoves.toString())
        .setFontSize(40)
        .setFontFamily(n.fontfamily)
        .setAlign('center')
        .setBaseline('middle')
        .setFillStyle('#000')
        .setPosition(30, 30)
        .addChildTo(this.turnCountDisp);
      
    }
    tm.app.Sprite(spritename, 526, 324)
      .setPosition(544, 274)
      .addChildTo(this.bg);
    
    
    this.btns = tm.app.CanvasElement();
    
    var self = this;
    function popScene() {
      n.playAudio('select', false);
      self.btns.remove();
      tm.anim.Tween(self.bg, {x: -SCREEN.WIDTH}, 300, 'easeInOutQuart')
        .addEventListener('finish', function(e) {
          self.app.frame = 0;
          self.app.popScene();
        })
        .start();
      
    };
    
    
    // セレクト画面に戻る
    tm.app.Sprite('resultBtnBack', 154, 154)
      .setPosition(470, 537)
      .setInteractive(true)
      .addEventListener('pointingend', function(e) {
        n.setResult2select(false, null);
        popScene();
      })
      .addEventListener('mouseover', function(e) {
        n.changeCursor('pointer');
      })
      .addEventListener('mouseout', function(e) {
        n.changeCursor('auto');
      })
      .addChildTo(this.btns);
    
    // リトライ
    tm.app.Sprite('resultBtnRetry', 154, 154)
      .setPosition(640, 537)
      .setInteractive(true)
      .addEventListener('pointingend', function(e) {
        n.setResult2select(true, stageNum);
        popScene();
      })
      .addEventListener('mouseover', function(e) {
        n.changeCursor('pointer');
      })
      .addEventListener('mouseout', function(e) {
        n.changeCursor('auto');
      })
      .addChildTo(this.btns);
    
    // 次のステージ
    if (isClear && stageNum != 14)
      tm.app.Sprite('resultBtnNext', 154, 154)
        .setPosition(810, 537)
        .setInteractive(true)
        .addEventListener('pointingend', function(e) {
          n.setResult2select(true, stageNum+1);
          popScene();
        })
        .addEventListener('mouseover', function(e) {
          n.changeCursor('pointer');
        })
        .addEventListener('mouseout', function(e) {
          n.changeCursor('auto');
        })
        .addChildTo(this.btns);
    
  },
  
  onenter: function() {
    n.playAudio('start', false);
    
    tm.anim.Tween(this.bg, {x: 0}, 1000, 'easeOutBounce')
    .addEventListener('finish', function(e) {
      this.btns.addChildTo(this.bg);
    }.bind(this)).start();
  },
  
  
  
  
});

