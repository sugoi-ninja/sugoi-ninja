/**
 * Map Group
 */
tm.define('map.Group', {
  superClass: 'tm.app.CanvasElement',
  
  init: function() {
    this.superInit();
    /*
    this.setOrigin(
      (SCREEN.WIDTH-(SCREEN.CELL.WIDTH+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.X)/2, 
      (SCREEN.HEIGHT-(SCREEN.CELL.HEIGHT+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.Y)/2);
    */
  },
  
  parseMap: function(p_map) {
    // AAのマップからマスの情報を取得
    // ついでにマス目を生成しちゃうよ～w
    var map_cells = [[]];
    for (var i = 0; i < p_map.length; i++) {
      map_cells[i] = p_map[i].split('');
    }
    
    // 上に乗るオブジェクト達の座標を返す
    var result = {
      start: {},
      goal: {},
      koban: {},
      enemyCount: [],
      wall: [],
      
    };
    
    for (var i = 0; i < map_cells.length; i++) {
      for (var j = 0; j < map_cells[i].length; j++) {
        var data = {
          isFloor: true,
          isGoal: false,
          isKoban: false,
          count: {x: j, y: i},
        };
        
        switch (map_cells[i][j]) {
          case CELL.FLOOR:
            
            break;
            
          case CELL.WALL:
            data.isFloor = false;
            result.wall.push({x: j, y: i});
            break;
          
          case CELL.START:
            result.start = {x: j, y: i};
            break;
          
          case CELL.GOAL:
            result.goal = {x: j, y: i};
            data.isGoal = true;
            break;
            
          case CELL.KOBAN:
            result.koban = {x: j, y: i};
            data.isKoban = true;
            break;
            
          default : // 定義されてない=数字=サムライ番号
            // TODO: switch-case文でkeyをとるのって美しい方法ないっけ？
            result.enemyCount.push({x: j, y: i, index: Number(map_cells[i][j])});
            break;
        }
        
        this.makeCell(data);
      }
    }
    return result;
    
  },
  
  makeCell: function(data) {
    
    var cell = map.Cell(data).addChildTo(this);
    
    
  },
  
  theCell: function(count) {
    var result = null;
    this.eachFunc(function() {
      return function(child) {
        if (JSON.stringify(count) == JSON.stringify(child.count)) {
          result = child;
          // TODO: 止めるには？
          return;
        }
      };
    });
    return result;
  },
  
  // プレイヤーの移動選択解除
  clearMoveSelect: function() {
    this.eachFunc(function() {
      return function(child) {
        if (child.isFloor && !child.isAndon) {
          child.setInteractive(false);
          child.clearEventListener('pointingend');
          child.clearEventListener('mouseover');
          child.clearEventListener('mouseout');
          child.alpha = 0.0;
          
        }
      };
    });
  },
  
  // 行燈に照らされている範囲をクリア
  clearAndon: function() {
    this.eachFunc(function() {
      return function(child) {
        child.clearAndon();
      };
    });
  },

  highlightAndon: function() {
    this.eachFunc(function() {
      return function(child) {
        child.highlightAndon();
      };
    });
  },
  
  unhighlightAndon: function() {
    this.eachFunc(function() {
      return function(child) {
        child.unhighlightAndon();
      };
    });
  },
  
  
  
  eachFunc: function(func) {
    var mc = this.children;
    mc.each(func());
  },
  
  
});


/**
 * Map Cell
 */
tm.define('map.Cell', {
  superClass: 'tm.app.Shape',
  
  isFloor: false,
  isGoal: false,
  isKoban: false,
  isAndon: false,
  
  init: function(data) {
    this.superInit(SCREEN.CELL.WIDTH, SCREEN.CELL.HEIGHT);
    
    this.count = data.count;
    this.isFloor = data.isFloor;
    this.isGoal = data.isGoal;
    this.isKoban = data.isKoban;
    this.isAndon = false;
    
    this.setPosition(
      (SCREEN.WIDTH - (SCREEN.CELL.WIDTH+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.X)/2 +
        SCREEN.CELL.WIDTH/2+SCREEN.CELL.MARGIN +
        (SCREEN.CELL.WIDTH+SCREEN.CELL.MARGIN*2) * this.count.x,
      (SCREEN.HEIGHT - (SCREEN.CELL.HEIGHT+SCREEN.CELL.MARGIN*2)*SCREEN.CELL.COUNT.Y)/2 +
        SCREEN.CELL.HEIGHT/2+SCREEN.CELL.MARGIN +
        (SCREEN.CELL.HEIGHT+SCREEN.CELL.MARGIN*2) * this.count.y);
      
    this.alpha = 0.0;
    this.canvas.clearColor(COLOR.WHITE);
    this.setBoundingType('rect');
  },
  
  getPosition: function() {
    return {x: this.x, y: this.y};
  },
  
  moveSelect: function(pointingendListener, mouseoverListener) {
    if (this.isFloor && !this.isAndon) {
      this.setInteractive(true);
      this.alpha = 0.5;
      this.canvas.clearColor(COLOR.BLUE_LIGHT);
      // TODO: 隣り合うマスで競合する時がある
      this.addEventListener('mouseover', function(e) {
        n.changeCursor('pointer');
        mouseoverListener(this.count);
      });
      this.addEventListener('mouseout', function(e) {
        n.changeCursor('auto');
      });
      
      this.addEventListener('pointingend', function(e) {
        n.changeCursor('auto');
        pointingendListener(this.count);
      });
    }
  },
  
  setAndon: function(enemy) {
    this.isAndon = true;
  },
  
  clearAndon: function() {
    if (this.isAndon) {
      this.unhighlightAndon();
      this.isAndon = false;
    }
  },
  
  highlightAndon: function() {
    if (this.isAndon) {
      //this.alpha = 0.7;
      //this.canvas.clearColor(COLOR.RED);
    }
  },
  
  unhighlightAndon: function() {
    if (this.isAndon) {
      this.alpha = 0.0;
    }
  },
  
  
});

