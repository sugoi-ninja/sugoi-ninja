/*
 * おれおれクラス
 */

var n = n || {};
n.global = window || global || this;

(function(ns) {
  
  /*
   * public
   */
  ns.canvasId = 'gameCanvas';
  
  /**
   * マウスカーソルを変える
   * @param {String} style
   */
  ns.changeCursor = function(style) {
    document.getElementById(this.canvasId).style.cursor = style;
  };
  /* Usage
  this.addEventListener('mouseover', function(e) {
    n.changeCursor('pointer');
  });
  this.addEventListener('mouseout', function(e) {
    n.changeCursor('auto');
  });
  this.addEventListener('pointingend', function(e) {
    n.changeCursor('auto');
  });
  */
  
  
  ns.fontfamily = "'Times', 'serif'";
  
  /**
   * フラグ管理
   * わざわざfor回すのもアレかなってのとデバッグ用にベタ書きしちゃった☆
   */
  // ローカルテスト用
/*
  var _isConnectAPI = false;
  var _isUseLocalStorage = false;
  
  ns.hiscore = 0;
  ns.gamelevel = 4;// TODO

  var _clearFlags = [true,true,true,true,false,
    false,false,false,false,false,
    false,false,false,false,false,];
  var _kobanClearFlags = [false,false,false,false,false,
    false,false,false,false,false,
    false,false,false,false,false,];
  var _shortestClearFlags = [false,false,false,false,false,
    false,false,false,false,false,
    false,false,false,false,false,];
*/

  // 本番用
    
  
  var _isConnectAPI = false;
  var _isUseLocalStorage = true;
  ns.hiscore = 0;
  ns.gamelevel = 0;
  
  var _clearFlags = [false,false,false,false,false,
    false,false,false,false,false,
    false,false,false,false,false,];
  var _kobanClearFlags = [false,false,false,false,false,
    false,false,false,false,false,
    false,false,false,false,false,];
  var _shortestClearFlags = [false,false,false,false,false,
    false,false,false,false,false,
    false,false,false,false,false,];
  

  ns.getFlag = function(num) {
    return {
      gamelevel: ns.gamelevel,
      isClear: _clearFlags[num],
      isKoban: _kobanClearFlags[num],
      isShortest: _shortestClearFlags[num],
    };
  };
  
  var _flag2score = function() {
    var resultKoban = '';
    var resultShortest = '';
    
    var parseBool = function(pb) {
      if(pb)
        return '1';
      return '0';
    };
    for (var i = 0; i < 15; i++) {
      resultKoban += parseBool(_kobanClearFlags[i]);
      resultShortest += parseBool(_shortestClearFlags[i]);
    }
    var newVal = parseInt(resultKoban + resultShortest, 2);
    
    return newVal;
  };
  
  var isFirstSend = true;
  var _hiscoreHack4API = function(score) {
    if (score < ns.hiscore)
      return 0;
    
    if (isFirstSend) {
      return score;
      isFirstSend = false;
    } else {
      return score - ns.hiscore;
    }
  };
  
  var _score2flag = function(score) {
    var parsed = parseInt(score, 10).toString(2);
    var flagArr = parsed.split('');
    for (;flagArr.length<30;) {
      flagArr.unshift('0');
    }
    for (var i = 0; i < 15; i++) {
      _kobanClearFlags[i] = (flagArr[i] === '1');
      _shortestClearFlags[i] = (flagArr[i+15] === '1');
    }
    
  };
  
  var _level2flags = function(level) {
    for (var i = 0; i < level; i++) {
      _clearFlags[i] = true;
    }
  };
  
  var _checkBadge = function(clearStageNum) {
    var result = [];
    
    switch(clearStageNum) {
      case 4:
        result.push(0);
        break;
      case 9:
        result.push(1);
        break;
      case 14:
        result.push(2);
        break;
    }
    
    if (_shortestClearFlags.indexOf(false) == -1)
      result.push(3);
      
    if (_kobanClearFlags.indexOf(false) == -1)
      result.push(4);
    
    return result;
  };
  
    
  ns.stageResult = function(stageNum, isClear, isShortest, hasKoban) {
    
    if (isClear) {
      _clearFlags[stageNum] = true;
      if (isShortest)
        _shortestClearFlags[stageNum] = true;
      if (hasKoban)
        _kobanClearFlags[stageNum] = true;
      
      if (stageNum == ns.gamelevel)
        ns.gamelevel++;
      
      var _score = _flag2score();
      var _getbadge = _checkBadge(stageNum);
      
      // API通信♪
      _sendResultData({
        gametitle: 'THE SUGOI NINJA',
        gamelevel: stageNum+1,// クリアしたレベル
        score: _hiscoreHack4API(_score), // 取得したスコア
        getbadgeid: _getbadge, // クリアによって取得したバッジがあればIDを
      });
      
      ns.hiscore = _score;
      
      _saveDataToLocalStorage({
        gamelevel: stageNum+1,
        score: _score,
      });
    
    }
  };
  
  
  
  /**
   * セレクトのスクロール位置をクリア進捗から決める
   */
  ns.getScrollTarget = function() {
    if (_clearFlags[9])
      return SCROLL.HIGH;
    if (_clearFlags[4])
      return SCROLL.MIDDLE;
    return SCROLL.LOWER;
  };
  
  /**
   * resultからselectへ♡
   */
  var _isResultSelectRetry = false;
  var _resultSelectStageNum = 0;
  
  ns.setResult2select = function(isRetry, stageNum) {
    _isResultSelectRetry = isRetry;
    _resultSelectStageNum = stageNum;
  
  };
  
  ns.getResult2select = function() {
    return {'isRetry':_isResultSelectRetry, 'stageNum':_resultSelectStageNum};
  };
  
  /**
   * API通信 / localStorage
   */
  ns.gameStart = function() {
    if (_isConnectAPI) {
      _apiGameStart();
    }
    
    if (_isUseLocalStorage) {
      if (!window.localStorage) {
        _isUseLocalStorage = false;
      } else {
        _getDataByLocalStorage();
      }
    }
    
  };
  
  var _apiGameStart = function() {
    // ゲーム開始時に呼んでください。
    ngm.gameStart();

    // hiscoreを取得します。
    ns.hiscore = ngm.getHiscore();

    // hiscoreからサブクエクリアフラグを取得
    _score2flag(ns.hiscore);

    // gamelevelをGETします。callback関数を引数にしてください。
    ngm.getGamelevel(function(gamelevel) {
      ns.gamelevel = gamelevel;
      _level2flags(ns.gamelevel);
    });

  }; 

  ns.stageStart = function() {
    if (_isConnectAPI) {
      // レベルプレイ開始ごとに呼んでください。POSTする時間を保持しています。
      ngm.stageStart();
    }
  };

  var _sendResultData = function(data) {
    if (_isConnectAPI) {
      // クリア結果をPOSTします。
      ngm.stageResult(data);
    }
  };
  
  // hiscoreとgamelevelで
  var _getDataByLocalStorage = function() {
    ns.hiscore = getItem('hiscore') || 0;
    _score2flag(ns.hiscore);
    
    ns.gamelevel = getItem('gamelevel') || 0;
    _level2flags(ns.gamelevel);
    
  };
  
  var _saveDataToLocalStorage = function(data) {
    
    setItem('hiscore', data.score);
    
    if (data.gamelevel > (getItem('gamelevel')||0) && _isUseLocalStorage)
      setItem('gamelevel', data.gamelevel);
    
  };

  // localStorageに値を保存
  function setItem(key, val) {
    try {
      window.localStorage.setItem(key, val);
      return true;
    } catch(e) {
      return false;
    }
    
  }

  // localStorageから値を取得
  var getItem = function(key) {
    
    return window.localStorage.getItem(key);
  };
  
  // バルス
  //window.localStorage.clear();


  /**
   * audio
   */
  var _src = 'sound/';
  var _ext = '.ogg';
  var _ua = window.navigator.userAgent.toLowerCase();
  if ('' == new Audio('').canPlayType("audio/ogg"))
    _ext = '.m4a';
  
  var _audio = {  
    'main': new Audio(_src+'main'+_ext),
    'select': new Audio(_src+'select'+_ext),
    'start': new Audio(_src+'start'+_ext),
    'title': new Audio(_src+'title'+_ext),
  };

  var _volume = 0.5;

  var play = function(audio) {
    if (isPlaying(audio))
      return;

    audio.load();
    audio.volume = _volume;
    audio.play();
  }

  ns.playAudio = function(name, isLoop) {
    play(_audio[name]);

    if (isLoop) {
      _audio[name].addEventListener('ended', function(e) {
        e.target.pause();
        e.target.currentTime = 0;
        play(e.target);
      }, false);
    }
  };
  
  var isPlaying = function(audio) {
    return !audio.paused;
  };
  
  ns.stopAudio = function(name) {
    if (isPlaying(_audio[name])) {
      try {
      _audio[name].pause();
      _audio[name].currentTime = 0;
      } catch(e) {
        
      }
    }
  };
  
  
})(n);
