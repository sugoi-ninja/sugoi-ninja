/**
 * Title Scene
 */
tm.define('scene.TitleScene', {
  superClass: 'tm.app.TitleScene',
  init: function() {
    this.superInit({
      title: '',
      width: SCREEN.WIDTH,
      height: SCREEN.HEIGHT,
    });
    
    this.bgElementGroup = ui.bgElementGroup(this).addChildTo(this);
    
    
    this.cloudFront = ui.CloudGroup(this, -1, 3).addChildTo(this);
    
    //this.makimono = ui.Makimono().addChildTo(this);
    
    this.shuriken = ui.Shuriken().addChildTo(this);
    
    this.logo = ui.Logo().addChildTo(this);
    
    // fadeIn
    this.alpha = 0.0;
    this.tweener.clear().fadeIn(500).call( function() {
      
    }.bind(this));
    
    n.playAudio('title', true);
    
  },
  
  onShurikenClick: function() {
    
    n.playAudio('start', false);
    
    this.bgElementGroup.scrollZoomTo();
    this.cloudFront.clear();
    
    var tween = tm.anim.Tween(this.logo, {'width': this.logo.width*1.2, 'height': this.logo.height*1.2, 'alpha': 0.0}, 600, 'easeOutCubic');
    tween.start();
    
    this.shuriken.tween();
  },
  
  replaceScene: function() {
    this.app.replaceScene(scene.SelectScene(this.bgElementGroup));
  },
  
});

