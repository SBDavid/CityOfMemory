var game = require('../game'),
    gConfig = require('../globalConfig'),
    mazeManager = require('../mazeManager/index'),
    mazeData = require('../mazeData/index');

var utils = require('./utils');

function mazePanel(level, chapter, dashBoard) {
    this.group = new Phaser.Group(game);
    this.screenWidth = game.width;
    this.mazeM = new mazeManager(level, chapter, this.screenWidth, dashBoard);
    this.init();
}

mazePanel.prototype.init = function() {
    // 地图
    this.initMaze(() => {
        // 遮罩
        this.initMask(() => {
            // 按钮
            this.initControl();
        });
    });
}

mazePanel.prototype.initMaze = function(afterInit) {
    this.mazeGroup = new Phaser.Group(game);
    this.group.add(this.mazeGroup);
    this.drawMaze(afterInit);
}

mazePanel.prototype.initMask = function(afterInit) {
    this.maskGroup = new Phaser.Group(game);
    this.group.add(this.maskGroup);
    this.drawMask(afterInit);
}

mazePanel.prototype.initControl = function() {
    this.controlGroup = new Phaser.Group(game);
    this.controlGroup.inputEnableChildren = true;
    this.group.add(this.controlGroup);
    this.drawControl();
}

mazePanel.prototype.editMaze = function() {
    // 绘制背景
    this.maze = new Phaser.Graphics(game, 0, 0);
    this.maze.beginFill(gConfig.color.mazeBgNum);
    this.maze.drawRect(0,0,this.mazeM.mazeSize,this.mazeM.mazeSize);
    this.maze.endFill();

    // 绘制墙体
    for(let x=0; x<this.mazeM.mazeLevel; x++) {
        for(let y=0; y<this.mazeM.mazeLevel; y++) {
            this.dramMazeUnit(x, y);
        }
    }

    this.maze.width = game.width;
    this.maze.height = game.width;
    this.mazeGroup.add(this.maze);
}

mazePanel.prototype.drawMaze = function(afterInit) {
    // 绘制背景
    this.maze = new Phaser.Graphics(game, 0, 0);
    this.maze.beginFill(gConfig.color.mazeBgNum);
    this.maze.drawRect(0,0,this.mazeM.mazeSize,this.mazeM.mazeSize);
    this.maze.endFill();

    // 绘制墙体
    for(let x=0; x<this.mazeM.mazeLevel; x++) {
        for(let y=0; y<this.mazeM.mazeLevel; y++) {
            this.dramMazeUnit(x, y);
        }
    }

    // 地图展示
    this.mazeImg = new Phaser.Image(game, 0, 0, this.maze.generateTexture());
    const exitCo = {
        x: this.mazeM.borderWidth + this.mazeM.unitSize * (this.mazeM.exitCo.x + 0.5) - this.screenWidth/2,
        y: this.mazeM.borderWidth + this.mazeM.unitSize * (this.mazeM.exitCo.y + 0.5) - this.screenWidth/2
    }
    const startCo = {
        x: this.mazeM.borderWidth + this.mazeM.unitSize * (this.mazeM.currentCo.x + 0.5) - this.screenWidth/2,
        y: this.mazeM.borderWidth + this.mazeM.unitSize * (this.mazeM.currentCo.y + 0.5) - this.screenWidth/2
    }
    this.mazeImg.cropRect = new Phaser.Rectangle(exitCo.x, exitCo.y, this.mazeM.screenWidth,this.mazeM.screenWidth);
    this.mazeImg.updateCrop();
    this.mazeGroup.add(this.mazeImg);

    let moveTween = new Phaser.Tween(this.mazeImg.cropRect, game, game.tweens);
    let tweenTarget = {
        x: startCo.x,
        y: startCo.y
    }
    moveTween.to(tweenTarget, 300 * this.mazeM.mazeLevel, Phaser.Easing.Quadratic.InOut);
    
    let event = game.time.events.loop(0, () => {
        this.mazeImg.updateCrop();
    });

    moveTween.onComplete.add(() => {
        this.mazeImg.updateCrop();
        game.time.events.remove(event);
        afterInit();
    });

    moveTween.start(); 
}

/* 获取单元格左上角基准坐标点 */
mazePanel.prototype.getUnitBaseCo = function(_x, _y) {
    var self = this;
    var offSetX = this.mazeM.borderWidth -Math.floor(this.mazeM.wallWidth/2);
    var offSetY = offSetX;

    return {
        x: offSetX + _x * self.mazeM.unitSize,
        y: offSetY + _y * self.mazeM.unitSize
    }
}

/* 获取单元格中心坐标点 */
mazePanel.prototype.getUnitCenterCo = function(_x, _y) {
    var self = this;
    var offSetX = Math.floor(this.mazeM.borderWidth + this.mazeM.unitSize/2);
    var offSetY = offSetX;

    return {
        x: offSetX + _x * self.mazeM.unitSize,
        y: offSetY + _y * self.mazeM.unitSize
    }
}

// 迷宫单元格
mazePanel.prototype.dramMazeUnit = function(_x, _y) {
    const unitBaseCo = this.getUnitBaseCo(_x, _y);
    const centerCo = this.getUnitCenterCo(_x, _y);
    // 绘制左边
    if (this.mazeM.hasWall(_x, _y, 'l')) {
        this.maze.beginFill(gConfig.color.mazeWallNum);
        this.maze.drawRect(unitBaseCo.x, unitBaseCo.y, this.mazeM.wallWidth, this.mazeM.unitSize+this.mazeM.wallWidth);
        this.maze.endFill();
    }

    // 上面
    if (this.mazeM.hasWall(_x, _y, 't')) {
        this.maze.beginFill(gConfig.color.mazeWallNum);
        this.maze.drawRect(unitBaseCo.x, unitBaseCo.y, this.mazeM.unitSize+this.mazeM.wallWidth, this.mazeM.wallWidth);
        this.maze.endFill();
    }
    // 绘制右边，只有最右的单元格需要绘制
    if (_x === this.mazeM.mazeLevel-1 && this.mazeM.hasWall(_x, _y, 'r')) {
        this.maze.beginFill(gConfig.color.mazeWallNum);
        this.maze.drawRect(unitBaseCo.x + this.mazeM.unitSize, unitBaseCo.y, this.mazeM.wallWidth, this.mazeM.unitSize+this.mazeM.wallWidth);
        this.maze.endFill();
    }
    // 绘制下面，只有最下的单元格需要绘制
    if (_y === this.mazeM.mazeLevel-1 && this.mazeM.hasWall(_x, _y, 'b')) {
        this.maze.beginFill(gConfig.color.mazeWallNum);
        this.maze.drawRect(unitBaseCo.x, unitBaseCo.y + this.mazeM.unitSize, this.mazeM.unitSize+this.mazeM.wallWidth, this.mazeM.wallWidth);
        this.maze.endFill();
    }
    // 绘制出口标识
    if (this.mazeM.isExit(_x, _y)) {
        this.maze.beginFill(gConfig.color.mazeExitNum);
        this.maze.drawCircle(centerCo.x, centerCo.y, this.mazeM.pathWidth/2);
        this.maze.endFill();
    }
}

mazePanel.prototype.moveMaze = function(dir) {
    const self = this;
    if (!this.mazeM.validateMove(dir)) {
        return;
    }

    let moveTween = new Phaser.Tween(this.mazeImg.cropRect, game, game.tweens);
    let tweenTarget = {
        x: this.mazeImg.cropRect.x,
        y: this.mazeImg.cropRect.y
    }
    if (dir === 't') {
        tweenTarget.y -= this.mazeM.unitSize;
    } else if (dir === 'b') {
        tweenTarget.y += this.mazeM.unitSize;
    } else if (dir === 'l') {
        tweenTarget.x -= this.mazeM.unitSize;
    } else if (dir === 'r') {
        tweenTarget.x += this.mazeM.unitSize;
    }
    moveTween.to(tweenTarget, 300, Phaser.Easing.Quadratic.InOut);
    
    let event = game.time.events.loop(0, function() {
        self.mazeImg.updateCrop();
    });

    moveTween.onComplete.add(function() {
        self.mazeImg.updateCrop();
        game.time.events.remove(event);
        self.mazeM.move(dir);
        self.showArrow();
    });

    moveTween.start(); 
}

mazePanel.prototype.drawControl = function() {
    this.drawPeople();
    this.drawArrow();
    this.showArrow();
}

/* 绘制小人 */
mazePanel.prototype.drawPeople = function() {
    this.people = new Phaser.Graphics(game, 0, 0);
    const center = Math.floor(this.mazeM.screenWidth/2);
    this.people.beginFill(gConfig.color.mazePeopleNum);
    this.people.drawCircle(center,center,this.mazeM.pathWidth/2);
    this.people.endFill();

    this.controlGroup.add(this.people);
}

/* 绘制箭头 */
mazePanel.prototype.drawArrow = function() {
    const self = this;
    const center = Math.floor(this.mazeM.screenWidth/2);
    const size = this.mazeM.unitSize/3;

    this.arraws = {};

    // 上箭头
    this.arraws.upArraw = utils.drawUpArrow({x: center, y: center - this.mazeM.unitSize}, size);
    this.arraws.upArraw.inputEnabled = true;
    this.arraws.upArraw.events.onInputUp.add(function() {
        self.hideArrow();
        self.moveMaze('t');
    })
    // 右箭头
    this.arraws.rightArraw = utils.drawRightArrow({x: center + this.mazeM.unitSize, y: center}, size);
    this.arraws.rightArraw.inputEnabled = true;
    this.arraws.rightArraw.events.onInputUp.add(function() {
        self.hideArrow();
        self.moveMaze('r');
    })
    // 下箭头
    this.arraws.bottomArraw = utils.drawBottomArrow({x: center, y: center + this.mazeM.unitSize}, size);
    this.arraws.bottomArraw.inputEnabled = true;
    this.arraws.bottomArraw.events.onInputUp.add(function() {
        self.hideArrow();
        self.moveMaze('b');
    })
    // 左箭头
    this.arraws.leftArraw = utils.drawLeftArrow({x: center - this.mazeM.unitSize, y: center}, size);
    this.arraws.leftArraw.inputEnabled = true;
    this.arraws.leftArraw.events.onInputUp.add(function() {
        self.hideArrow();
        self.moveMaze('l');
    })
}

/* 隐藏箭头 */
mazePanel.prototype.hideArrow = function() {
    this.controlGroup.remove(this.arraws.upArraw);
    this.controlGroup.remove(this.arraws.rightArraw);
    this.controlGroup.remove(this.arraws.bottomArraw);
    this.controlGroup.remove(this.arraws.leftArraw);
}
/* 显示箭头 */
mazePanel.prototype.showArrow = function() {
    const currentCo = this.mazeM.currentCo;
    // 上箭头
    if (!this.mazeM.hasWall(currentCo.x, currentCo.y, 't') && currentCo.y !== 0) {
        this.controlGroup.add(this.arraws.upArraw);
    } 
    // 右箭头
    if (!this.mazeM.hasWall(currentCo.x, currentCo.y, 'r') && currentCo.x !== this.mazeM.mazeLevel-1) {
        this.controlGroup.add(this.arraws.rightArraw);
    } 
    // 下箭头
    if (!this.mazeM.hasWall(currentCo.x, currentCo.y, 'b') && currentCo.y !== this.mazeM.mazeLevel-1) {
        this.controlGroup.add(this.arraws.bottomArraw);
    } 
    // 左箭头
    if (!this.mazeM.hasWall(currentCo.x, currentCo.y, 'l') && currentCo.x !== 0) {
        this.controlGroup.add(this.arraws.leftArraw);
    } 
}

// 绘制遮罩
mazePanel.prototype.drawMask = function(afterInit) {
    let visSize = this.mazeM.visSize;
    if (visSize === 5) {
        afterInit();
        return;
    } 
    let mask = new Phaser.Graphics(game, 0, 0);
    let unitSize = this.mazeM.unitSize;
    mask.lineStyle(unitSize, gConfig.color.mazeMaskNum);
    mask.drawRect(unitSize/2,unitSize/2,this.screenWidth-unitSize,this.screenWidth-unitSize);
    mask.endFill();
    this.maskGroup.alpha = 0;
    this.maskGroup.add(mask);

    let moveTween = new Phaser.Tween(this.maskGroup, game, game.tweens);
    let tweenTarget = {
        alpha: 1
    }
    moveTween.to(tweenTarget, 800, Phaser.Easing.Quadratic.InOut);
    moveTween.onComplete.add(function() {
        afterInit();
    });
    moveTween.start(); 
}

module.exports = mazePanel;