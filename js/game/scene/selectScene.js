/**
 * Select Scene
 */
tm.define('scene.SelectScene', {
  superClass: 'tm.app.Scene',
  
  init: function(p_bgElementGroup) {
    this.superInit();
    
    this.bgElementGroup = p_bgElementGroup.addChildTo(this);
    this.scrollPosition = this.bgElementGroup.scrollPosition;
    
    var self = this;
    
    // スクロールボタン
    this.btn0selected = tm.app.Sprite('stageSelectCastlemapTopSelected',
      240, 160)
      .setPosition(1107, 200)
      .addChildTo(this);
    this.btn1selected = tm.app.Sprite('stageSelectCastlemapMiddleSelected',
      240, 160)
      .setPosition(1107, 360)
      .addChildTo(this);
    this.btn2selected = tm.app.Sprite('stageSelectCastlemapBottomSelected',
      240, 160)
      .setPosition(1107, 520)
      .addChildTo(this);
      
    this.btn0default = ui.btn('stageSelectCastlemapTopDefault',
      240, 160, 1107, 200)
      .addEventListener('pointingend', function(e) {
        btnScroll(SCROLL.HIGH);
        self.scrollTo(SCROLL.HIGH);
      })
      .addChildTo(this);
    
    this.btn1default = ui.btn('stageSelectCastlemapMiddleDefault',
      240, 160, 1107, 360)
      .addEventListener('pointingend', function(e) {
        btnScroll(SCROLL.MIDDLE);
        self.scrollTo(SCROLL.MIDDLE);
      })
      .addChildTo(this);
    
    this.btn2default = ui.btn('stageSelectCastlemapBottomDefault',
      240, 160, 1107, 520)
      .addEventListener('pointingend', function(e) {
        btnScroll(SCROLL.LOWER);
        self.scrollTo(SCROLL.LOWER);
      })
      .addChildTo(this);
    
    var btnScroll = function(target) {
      
      self.btn0default
        .setInteractive(true)
        .setAlpha(1.0);
      self.btn0selected.setAlpha(0.0);
      
      self.btn1default
        .setInteractive(true)
        .setAlpha(1.0);
      self.btn1selected.setAlpha(0.0);
      
      self.btn2default
        .setInteractive(true)
        .setAlpha(1.0);
      self.btn2selected.setAlpha(0.0);
      
      switch (target){
        case SCROLL.HIGH:
          self.btn0default
            .setInteractive(false)
            .setAlpha(0.0);
          self.btn0selected.setAlpha(1.0);
          break;
        
        case SCROLL.MIDDLE:
          self.btn1default
            .setInteractive(false)
            .setAlpha(0.0);
          self.btn1selected.setAlpha(1.0);
          break;
        
        case SCROLL.LOWER:
          self.btn2default
            .setInteractive(false)
            .setAlpha(0.0);
          self.btn2selected.setAlpha(1.0);
          break;
      }
      
    };
    btnScroll(this.scrollPosition);


    // マキモノを生成
    //this.makimono = ui.Makimono().addChildTo(this);

    // ステージ選択ボタン
    this.stageSelectButtonGroup = ui.StageSelectButtonGroup(this.scrollPosition).addChildTo(this);

  },
  
  currentSceneIndex: 0,
  onenter: function() {
    
    switch (this.currentSceneIndex) {
      case 0:
        
        break;
      
      case 1: // game-result
        this.updateBtns();
        var r2s = n.getResult2select();
        if (r2s.isRetry) {
          this.selectedStage(r2s.stageNum);
        } else {
          n.playAudio('title', true);
        }
        break;
      
      case 2:
        
        break;
    }
  },
  
  updateBtns: function() {
    // クリアフラグから解放とサブクエ達成情報の更新
    this.stageSelectButtonGroup.updateBtns();
    
  },
  
  scrollTo: function(target) {
    this.bgElementGroup.scrollTo(target);
    this.stageSelectButtonGroup.scrollTo(target);
    this.scrollPosition = target;
  },
  
  selectedStage: function(number) {
    
    n.stopAudio('title');
    n.playAudio('select', false);
    
    // TODO: クリアフラグから解放されてるかチェックしたほうがいいかな？
    this.currentSceneIndex = 1;
    this.app.pushScene(scene.MainScene(number));
  },
  
});