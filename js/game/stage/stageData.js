/**
 * マップの定義
 */
var CELL = {
  FLOOR: '_',
  WALL: '#',
  START: 'S',
  GOAL: 'G',
  KOBAN: 'K',
  
};

/**
 * stageのデータ
 */
var STAGE_DATA = [
  /**
   * 0
   * チュートリアル
   */ 
  {
    map: [
      '__________',
      '_____G____',
      '__________',
      '__S___K___',
      '________0_',
      '__________',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 3,
  },
  /**
   * 1
   * 縦
   */
  {
    map: [
      '__________',
      '__________',
      '______K_G_',
      '_S________',
      '_____0____',
      '__________',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.TOP,
      },
      ],
    shortestNumberOfMoves: 7,
  },
  /**
   * 2
   * 左周り
   */
  {
    map: [
      '__________',
      '_S________',
      '______G___',
      '____0_____',
      '______K___',
      '__________',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.LEFT,
        direct: DIRECTION.RIGHT,
      },
      ],
    shortestNumberOfMoves: 8,
  },
  /**
   * 3
   * 2体
   */
  {
    map: [
      '________K_',
      '_______1__',
      '________G_',
      '_S________',
      '___0______',
      '__________',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.LEFT,
        direct: DIRECTION.RIGHT,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 7,
  },
  /**
   * 4
   * THE HAYAI SAMURAI
   * 2回移動+雑魚
   */
  {
    map: [
      '_____K____',
      '___1______',
      '__________',
      '_S________',
      '_______0__',
      '______G___',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.HAYAI,
        direct: DIRECTION.LEFT,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.LEFT,
        direct: DIRECTION.RIGHT,
      },
      ],
    shortestNumberOfMoves: 10,
  },
  /**
   * 5
   * ここから中層
   * 障害物チュートリアル
   */
  {
    map: [
      '______#___',
      '______#_G_',
      '###___#___',
      '#S______##',
      '#_#____0__',
      '___#_K____',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 7,
  },
  /**
   * 6
   * 障害物ZAKO_R+L詰み有
   */
  {
    map: [
      '__#K##_#__',
      '______1___',
      '_S________',
      '________G_',
      '___0______',
      '__#_##_#__',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.LEFT,
        direct: DIRECTION.TOP,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.BOTTOM,
      },
      ],
    shortestNumberOfMoves: 10,
  },
  /**
   * 7
   * MAWARU初登場
   */
  {
    map: [
      '__________',
      '_____0G___',
      '__________',
      '_S________',
      '____1_____',
      '_____K____',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.MAWARU.RIGHT,
        direct: DIRECTION.TOP,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.MAWARU.LEFT,
        direct: DIRECTION.TOP,
      },
      ],
    shortestNumberOfMoves: 12,
  },
  /**
   * 8
   * 障害物応用
   */
  {
    map: [
      '###__#_###',
      '####_#_###',
      '##_____###',
      '##__0__###',
      '##S__KG###',
      '##_#_#_###',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.MAWARU.RIGHT,
        direct: DIRECTION.TOP,
      },
      ],
    shortestNumberOfMoves: 9,
  },
  /**
   * 9
   * THE DEKAI SAMURAI
   * 8応用+変則行灯
   */
  {
    map: [
      '__#___#___',
      '_G_K____#_',
      '###__0____',
      '###______#',
      '_S________',
      '__#_#___#_',
      ],
    enemy: [
      {
        andon: ANDON.DEKAI,
        type: ENEMY.DEKAI,
        direct: DIRECTION.BOTTOM,
      },
      ],
    shortestNumberOfMoves: 24,
  },
  /**
   * 10
   * ここから上層
   * HASHIRU2回移動初登場
   */
  {
    map: [
      '__________',
      '__________',
      '__________',
      '_______G__',
      '__S_____0_',
      '_________K',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.HASHIRU.RIGHT,
        direct: DIRECTION.LEFT,
      },
      
      ],
    shortestNumberOfMoves: 6,
  },
  /**
   * 13
   * HASHIRU+ZAKO
   */
  {
    map: [
      '__________',
      '______1___',
      '________G_',
      '_S________',
      '______0___',
      '_____K____',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.LEFT,
        direct: DIRECTION.LEFT,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.HASHIRU.LEFT,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 18,
  },
  /**
   * 12
   * HASHIRU+MAWARU障害物
   */
  {
    map: [
      '_###___###',
      '_#K___####',
      '_###___###',
      '_____0__G#',
      '_S____1###',
      '___##____#',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.MAWARU.RIGHT,
        direct: DIRECTION.BOTTOM,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.HASHIRU.LEFT,
        direct: DIRECTION.TOP,
      },
      ],
    shortestNumberOfMoves: 15,
  },
  /**
   * 13
   * 勢揃い
   */
  {
    map: [
      '_________#',
      '_________K',
      '________1_',
      '_S____2_G_',
      '________0_',
      '_________#',
      ],
    enemy: [
      {
        andon: ANDON.NORMAL,
        type: ENEMY.ZAKOI.RIGHT,
        direct: DIRECTION.LEFT,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.MAWARU.LEFT,
        direct: DIRECTION.LEFT,
      },
      {
        andon: ANDON.NORMAL,
        type: ENEMY.HASHIRU.RIGHT,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 20,
  },
  /**
   * 14
   * THE TONO
   */
  {
    map: [
      '_#_#_#_###',
      '__________',
      '______G___',
      '_S____K_0_',
      '__________',
      '_#_#_#_###',
      ],
    enemy: [
      {
        andon: ANDON.BEAM,
        type: ENEMY.TONO,
        direct: DIRECTION.LEFT,
      },
      ],
    shortestNumberOfMoves: 9,
  },
];

