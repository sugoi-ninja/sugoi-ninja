/**
 * Stage Select Button
 */

var STAGE_SELECT_BUTTON = {
  COUNT: 5,
  WIDTH: 664,
  HEIGHT: 128,
  MARGIN: 6,
  
};

tm.define('ui.StageSelectButtonGroup', {
  superClass: 'tm.app.CanvasElement',
  
  init: function(scrollPosition) {
    this.superInit();
    
    this.make(scrollPosition);
    
  },
  
  _initBtns: function() {
    var min;
    switch (this.scrollPosition) {
      case SCROLL.HIGH:
        min = 10;
        break;
        
      case SCROLL.MIDDLE:
        min = 5;
        break;
        
      case SCROLL.LOWER:
        min = 0;
        break;
    }
    
    for (var i = min; i < min+STAGE_SELECT_BUTTON.COUNT; i++) {
      var btn = ui.StageSelectButton(i).addChildTo(this);
    }
  },
  
  make: function(scrollPosition) {
    this.scrollPosition = scrollPosition;
    this.alpha = 0.0;
    this._initBtns();
    this.tweener.clear().fadeIn(100).call( function() {
      
    }.bind(this));
    
  },
  
  scrollTo: function(scrollPosition) {
    var self = this;
    
    this.tweener.clear().fadeOut(100).call( function() {
      self.removeChildren();
    }.bind(this)).wait(900).call( function() {
      self.make(scrollPosition);
    }.bind(this));
  },
  
  updateBtns: function() {
    this.removeChildren();
    this._initBtns(this.scrollPosition);
    
  },
  
  
  
  eachFunc: function(func) {
    var mc = this.children;
    mc.each(func());
  },
  
  
});



tm.define('ui.StageSelectButton', {
  superClass: 'tm.app.Sprite',
  
  init: function(number) {
    
    var sprite = 'stageSelectUnavailable';
    
    var flags = n.getFlag(number);
    if (number <= flags.gamelevel) {
      sprite = 'stageSelectNoAccessory';
      
      if (flags.isKoban)
        sprite = 'stageSelectWithKoban';
      if (flags.isShortest)
        sprite = 'stageSelectWithShortest';
      if (flags.isKoban && flags.isShortest)
        sprite = 'stageSelectWithShortestAndKoban';
    }
    
    this.superInit(sprite, STAGE_SELECT_BUTTON.WIDTH, STAGE_SELECT_BUTTON.HEIGHT);
    this.setPosition(SCREEN.CENTER.X, 
      SCREEN.HEIGHT - (SCREEN.PADDING.BOTTOM+STAGE_SELECT_BUTTON.HEIGHT/2
      +(STAGE_SELECT_BUTTON.HEIGHT+STAGE_SELECT_BUTTON.MARGIN)*(number%STAGE_SELECT_BUTTON.COUNT)));
      
    tm.app.Label(number.toString())
      .setFontSize(80)
      .setFontFamily(n.fontfamily)
      .setAlign('center')
      .setBaseline('middle')
      .setFillStyle('#fff')
      .setPosition(-250, 0)
      .addChildTo(this);
    
    if (number <= flags.gamelevel || flags.isClear) {

      this.setInteractive(true);
      this.setBoundingType('rect');

      this.addEventListener('mouseover', function(e) {
        n.changeCursor('pointer');
      });
      this.addEventListener('mouseout', function(e) {
        n.changeCursor('auto');
      });
      this.addEventListener('pointingend', function(e) {
        n.changeCursor('auto');
        this.parent.parent.selectedStage(number);
      });
    }

  },
  
});
