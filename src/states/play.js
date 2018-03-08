var game = require('../game'),
    gConfig = require('../globalConfig'),
    titlePanel = require('../comps/titlePanel'),
    mazePanel = require('../comps/mazePanel'),
    mazeData = require('../mazeData/index'),
    dashBoardPanel = require('../comps/dashBoardPanel');

let play = function() {


}

play.prototype.init = function({level, chapter}) {
    console.info(`play level: ${level} chapter: ${chapter}`);
    this.levelNo = level;
    this.chapterNo = chapter;
    this.chapterGroup = new Phaser.Group(game);
    this.mazeM = mazeData['level'+level][chapter];
}

play.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

play.prototype.create = function() {
    var self = this;
    this.playGroup = new Phaser.Group(game);

    const screenW = game.width;

    // title
    let titleP = new titlePanel(`${this.levelNo} X ${this.levelNo} X ${this.chapterNo+1}`, function() {
        game.state.start('chooseChapter', true, false, self.levelNo);
    }).group;
    this.playGroup.add(titleP);
    // dash board
    let dashBoard = new dashBoardPanel(this.mazeM,screenW);
    dashBoard.group.top = titleP.height;
    dashBoard.group.left = 0;
    this.playGroup.add(dashBoard.group);
    // maze
    let mazeP = new mazePanel(this.levelNo, this.chapterNo, dashBoard).group;
    mazeP.top = titleP.height + dashBoard.group.height;
    mazeP.left = 0;
    this.playGroup.add(mazeP);
}

module.exports = play;