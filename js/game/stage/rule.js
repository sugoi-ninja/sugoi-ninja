/**
 * SAMURAIの移動規則定義
 */

// 移動
var MOVE = {
  FORWARD: 0,
  TURN: {
    RIGHT: 1,
    LEFT: 2,
  },
  BACK: 3,
};

// 方向
var DIRECTION = {
  TOP: 0,
  TOP_RIGHT: .5,
  RIGHT: 1,
  RIGHT_BOTTOM: 1.5,
  BOTTOM: 2,
  BOTTOM_LEFT: 2.5,
  LEFT: 3,
  LEFT_TOP: 3.5,
};

// 行燈で照らせる範囲・TOPを向いてる状態で
var ANDON = {
  NORMAL: {
    COUNT: [
      {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},
      {x:-1, y:0}, {x:0, y:0}, {x:1, y:0},
    ],
    SPRITE: {
      name: 'andonNormal',
      size: 3,
      },
    },
  DEKAI: {
    COUNT: [
                    {x:-1, y:-2}, {x:0, y:-2}, {x:1, y:-2},
      {x:-2, y:-1}, {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}, {x:2, y:-1},
      {x:-2, y:0},  {x:-1, y:0},  {x:0, y:0},  {x:1, y:0},  {x:2, y:0},
    ],
    SPRITE: {
      name: 'andonDekai',
      size: 5,
      },
    },
  BEAM: {
    
    COUNT: [
                      {x: 0, y: -5},
                      {x: 0, y: -4},
      {x: -2, y: -3}, {x: -1, y: -3}, {x: 0, y: -3}, {x: 1, y: -3}, {x: 2, y: -3},
                      {x: 0, y: -2},
                      {x: 0, y: -1},
                      {x: 0, y: 0},
    ],
    SPRITE: {
      name: 'andonBeam',
      size: 11,
      },
  }
};

// 移動規則
var ENEMY = {
  ZAKOI: {
    RIGHT: {
      FACE: 'turnDispZako',
      SPRITE: 'samuraiSS_zako_r',
      RULE: [
        MOVE.FORWARD,
        MOVE.FORWARD,
        MOVE.FORWARD,
        MOVE.TURN.RIGHT,
        MOVE.TURN.RIGHT,
        ]
      },
    LEFT: {
      FACE: 'turnDispZako',
      SPRITE: 'samuraiSS_zako_l',
      RULE: [
        MOVE.FORWARD,
        MOVE.FORWARD,
        MOVE.FORWARD,
        MOVE.TURN.LEFT,
        MOVE.TURN.LEFT,
        ]
      },
  },
  
  MAWARU: {
    RIGHT: {
      FACE: 'turnDispMawaru',
      SPRITE: 'samuraiSS_mawaru_r',
      RULE: [
        MOVE.TURN.RIGHT,
        ]
      },
    LEFT: {
      FACE: 'turnDispMawaru',
      SPRITE: 'samuraiSS_mawaru_l',
      RULE: [
        MOVE.TURN.LEFT,
        ]
      },
  },
  
  HASHIRU: {
    RIGHT: {
      FACE: 'turnDispHashiru',
      SPRITE: 'samuraiSS_hashiru_r',
      RULE: [
        [MOVE.FORWARD, MOVE.FORWARD],
        MOVE.TURN.RIGHT,
        ]
      },
    LEFT: {
      FACE: 'turnDispHashiru',
      SPRITE: 'samuraiSS_hashiru_l',
      RULE: [
        [MOVE.FORWARD, MOVE.FORWARD],
        MOVE.TURN.LEFT,
        ]
      },
  },
  
  HAYAI: {
    SPRITE: 'samuraiSS_hayai',
    FACE: 'turnDispHayai',
    RULE: [
      [MOVE.FORWARD, MOVE.FORWARD],
      [MOVE.FORWARD, MOVE.FORWARD],
      [MOVE.TURN.LEFT, MOVE.TURN.LEFT],
    ],
  },
  
  DEKAI: {
    SPRITE: 'samuraiSS_dekai',
    FACE: 'turnDispDekai',
    RULE: [
      MOVE.FORWARD,
      MOVE.TURN.RIGHT,
      MOVE.TURN.RIGHT,
    ],
  },
  
  TONO: {
    FACE: 'turnDispTono',
    SPRITE: 'samuraiSS_tono',
    RULE: [
      [MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.TURN.LEFT],// 右に1
      [MOVE.TURN.LEFT, MOVE.FORWARD, MOVE.FORWARD, MOVE.TURN.RIGHT],// 左に2
      [MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.FORWARD, MOVE.FORWARD, MOVE.TURN.LEFT],//右に3
      [MOVE.TURN.RIGHT, MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.TURN.RIGHT,],
      [MOVE.TURN.LEFT, MOVE.FORWARD, MOVE.TURN.RIGHT],// 左に1
      [MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.FORWARD, MOVE.TURN.LEFT],// 右に2
      [MOVE.TURN.LEFT, MOVE.FORWARD, MOVE.FORWARD, MOVE.FORWARD, MOVE.TURN.RIGHT],//左に3
      [MOVE.TURN.RIGHT, MOVE.FORWARD, MOVE.TURN.LEFT, MOVE.FORWARD, ]
      
      
    ]
  },
};
