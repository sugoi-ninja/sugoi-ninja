/**
 * import
 */

/*
document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>');
window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"></script>');
*/

document.write('<script src="js/plugins.js"></script>');

// 美しいけどパフォーマンス的にちょ～っと怪しい？
function importJS() {
  if (! new Array().push) return false;
  var scripts = new Array(
    // lib
    'lib/tmlib.js',
    'lib/neogm.js',
    
    // const
    'const/screen.js',
    'const/defaultParam.js',
    'const/color.js',
    'const/font.js',
    'const/assets.js',
    'const/scroll.js',
    
    // ui
    'ui/logo.js',
    'ui/shuriken.js',
    'ui/makimono.js',
    'ui/bgElementGroup.js',
    'ui/cloudGroup.js',
    'ui/castle.js',
    'ui/stageSelectButtonGroup.js',
    'ui/superUIbtn.js',
    'ui/description.js',
    
    // stage
    'stage/rule.js',
    'stage/stageData.js',
    'stage/map/map.js',
    'stage/game/mainGame.js',
    'stage/game/mainUI.js',
    'stage/obj/andonGroup.js',
    'stage/obj/objGroup.js',
    'stage/obj/super.js',
    'stage/obj/goal.js',
    'stage/obj/wall.js',
    'stage/obj/koban.js',
    
    
    // character
    'stage/obj/character/supercharacter.js',
    'stage/obj/character/player.js',
    'stage/obj/character/enemyGroup.js',
    
    // scene
    'scene/loadingScene.js',
    'scene/LogoScene.js',
    'scene/titleScene.js',
    'scene/selectScene.js',
    'scene/mainScene.js',
    'scene/hintScene.js',
    'scene/resultScene.js',
    'scene/makimonoScene.js',
    'scene/poseScene.js',
    'scene/descriptionScene.js',
    
    
    // オレオレクラス
    'myFunc.js',
    
    
    // main
    'main.js'
  );
  for (var i=0; i<scripts.length; i++) {
    document.write('<script src="js/game/'+scripts[i]+'"></script>');
  }
}
importJS();