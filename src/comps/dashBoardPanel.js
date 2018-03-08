var game = require('../game'),
    gConfig = require('../globalConfig');

function dashBoardPanel(mazeData, screenW) {
    var self = this;

    this.group = new Phaser.Group(game);
    this.group.inputEnableChildren = true;

    // 仪表盘高度 3:4比例

    this.margin = 10;
    this.boardW = (screenW-6*this.margin) / 5;
    this.boardH = this.boardW * 3 / 4;
    this.bgH = 2 * this.margin + this.boardH;


    let bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.dashBoardBgNum);
    bg.drawRect(0,0,screenW,this.bgH);
    bg.endFill();

    this.group.add(bg);

    this.initTimeLimit(mazeData.timeLimit);
}

dashBoardPanel.prototype.initTimeLimit = function(timeLimit) {
    this.timeBoard = new Phaser.Group(game);
    this.timeBoard.top = this.margin;
    this.timeBoard.left = this.margin;
    this.group.add(this.timeBoard);
    // 背景
    let bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.dashPanelBgNum);
    bg.drawRoundedRect(0,0,this.boardW,this.boardH, 20);
    bg.endFill();
    this.timeBoard.add(bg);
    // title
    let titleText = new Phaser.Text(game, 0, 0, 'Time', {
        fontSize: '40px',
        fill: gConfig.color.dashPanelTitleTxt
    });
    titleText.top = 20;
    titleText.left = (this.boardW - titleText.width) / 2;
    this.timeBoard.add(titleText);
    // content
    this.timeLimitTxt = new Phaser.Text(game, 0, 0, timeLimit+'', {
        fontSize: '60px',
        fill: gConfig.color.dashPanelContentTxt
    });
    this.timeLimitTxt.top = 60;
    this.timeLimitTxt.left = (this.boardW - this.timeLimitTxt.width) / 2;
    this.timeBoard.add(this.timeLimitTxt);
}

dashBoardPanel.prototype.setTimeLimit = function(timeLimit) {
    this.timeLimitTxt.text = timeLimit+'';
    this.timeLimitTxt.left = (this.boardW - this.timeLimitTxt.width) / 2;
}

module.exports = dashBoardPanel;