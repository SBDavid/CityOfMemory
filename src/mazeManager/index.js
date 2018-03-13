var game = require('../game'),
    MazeData = require('../mazeData/index');    

function mazeManager(level, chapter, screenWidth, dashBoard) {
    this.levelNo = level;
    this.chapterNo = chapter;
    this.mazeData = MazeData['level'+level][chapter];
    this.screenWidth = screenWidth;
    this.dashBoard = dashBoard;
    this.init();
}

mazeManager.prototype.init = function() {
    var self = this;
    // 当前坐标
    this.currentCo = {
        x: self.mazeData.entryX,
        y: self.mazeData.entryY
    };
    this.exitCo = {
        x: self.mazeData.exitX,
        y: self.mazeData.exitY
    }
    // 迷宫尺寸
    this.mazeLevel = this.mazeData.pathData.length;
    // 单元格宽度
    this.unitSize = Math.ceil(this.screenWidth/31*6);
    // 边框宽度
    this.borderWidth = this.unitSize*3;
    // 墙体厚度
    this.wallWidth = Math.floor(this.screenWidth/30);
    // 通道宽度
    this.pathWidth = this.unitSize - this.wallWidth;
    // 迷宫中宽高
    this.mazeSize = this.borderWidth*2 + this.unitSize*this.mazeLevel;

    // 游戏开始时间
    this.startTime = null;
    this.timeLimitTimer = game.time.create(false);
    // 游戏步数
    this.stepCount = 0;

    // 定义属性
    this.initProperty();
}

mazeManager.prototype.initProperty = function() {
    Object.defineProperty(this, 'visSize', {
        get: function() {
            return this.mazeData.visSize;
        }
    })
}

mazeManager.prototype.validateCo = function(_x, _y) {
    if (!this.mazeData.pathData[_x]) {
        console.error('X坐标溢出');
        return false;
    }
    if (!this.mazeData.pathData[_x][_y]) {
        console.error('Y坐标溢出');
        return false;
    }
    return true;
}

mazeManager.prototype.validateMove = function(dir) {
    const nextCo = this.getMoveCo(dir);

    return this.validateCo(nextCo.x, nextCo.y);
}

mazeManager.prototype.getMoveCo = function(dir) {
    const nextCo = {
        x: this.currentCo.x,
        y: this.currentCo.y
    }

    if (dir === 't') {
        nextCo.y--;
    } else if (dir === 'r') {
        nextCo.x++;
    } else if (dir === 'b') {
        nextCo.y++;
    } else if (dir === 'l') {
        nextCo.x--;
    }

    return nextCo;
}

mazeManager.prototype.move = function(dir) {

    if (dir === 't') {
        this.currentCo.y--;
    } else if (dir === 'r') {
        this.currentCo.x++;
    } else if (dir === 'b') {
        this.currentCo.y++;
    } else if (dir === 'l') {
        this.currentCo.x--;
    }

    // 设置开始时间
    if(this.startTime === null) {
        this.startTime = Date.now();
        this.timeLimitTimer.loop(1000, () => {
            let left = this.getTimeLeft();
            this.dashBoard.setTimeLimit(left);
            if (left <= 0) {
                this.gameOver();
            }
        })
        this.timeLimitTimer.start();
    }

    this.stepCount++;
    let stepLeft = this.mazeData.stepLimit - this.stepCount;
    this.dashBoard.setStepLimit(stepLeft);
    if (stepLeft <= 0 || this.isExit(this.currentCo.x, this.currentCo.y)) {
        this.gameOver();
    }
}

mazeManager.prototype.getTimeLeft = function() {
    let now = Date.now();
    let pass = Math.floor((now - this.startTime) / 1000);
    let left = this.mazeData.timeLimit - pass;
    return left;
}

mazeManager.prototype.getTimePassed = function() {
    let now = Date.now();
    let pass = Math.ceil((now - this.startTime) / 1000);
    return pass;
}

// 是否是出口位置
mazeManager.prototype.isExit = function(_x, _y) {
    return _x === this.mazeData.exitX && _y === this.mazeData.exitY;
}

mazeManager.prototype.hasWall = function(_x, _y, dir) {
    if (!this.validateCo(_x, _y)) {
        return;
    }
    // 左
    if (dir === 'l') {
        if (_x === 0) {
            return !this.isExit(_x, _y);
        } else {
            const path = this.mazeData.pathData[_x][_y];
            return path.l;
        }
    } else if (dir === 't'){
        if (_y === 0) {
            return !this.isExit(_x, _y);
        } else {
            const path = this.mazeData.pathData[_x][_y];
            return path.t;
        }
    } else if (dir === 'r'){
        // 右边框
        if(_x === this.mazeLevel - 1) {
            return !this.isExit(_x, _y);
        } else {
            const path = this.mazeData.pathData[_x+1][_y];
            return path.l;
        }
    } else if (dir === 'b'){
        // 下边框
        if(_y === this.mazeLevel - 1) {
            return !this.isExit(_x, _y);
        } else {
            const path = this.mazeData.pathData[_x][_y+1];
            return path.t;
        }
    }
}

mazeManager.prototype.gameOver = function() {
    this.timeLimitTimer.stop();

    if (this.isExit(this.currentCo.x, this.currentCo.y)) {
        game.state.start('win', true, false, {
            level: this.levelNo,
            chapter: this.chapterNo,
            time: this.getTimePassed(),
            step: this.stepCount
        });
    } else {
        game.state.start('lose', true, false, {
            level: this.levelNo,
            chapter: this.chapterNo
        });
    }
}

module.exports = mazeManager;