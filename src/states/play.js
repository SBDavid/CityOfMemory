var game = require('../game'),
    gConfig = require('../globalConfig'),
    globalStatePanel = require('../comps/globalStatePanel'),
    titlePanel = require('../comps/titlePanel'),
    mazePanel = require('../comps/mazePanel');

let play = function() {


}

play.prototype.init = function({level, chapter}) {
    console.info(`play level: ${level} chapter: ${chapter}`);
    this.levelNo = level;
    this.chapterNo = chapter;
    this.chapterGroup = new Phaser.Group(game);
}

play.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

play.prototype.create = function() {
    var self = this;
    this.playGroup = new Phaser.Group(game);

    // title
    let titleP = new titlePanel(`${this.levelNo} X ${this.levelNo} X ${this.chapterNo+1}`, function() {
        game.state.start('chooseChapter', true, false, self.levelNo);
    }).group;
    this.playGroup.add(titleP);
    // game state
    // maze
    let mazeP = new mazePanel(this.levelNo, this.chapterNo).group;
    mazeP.top = titleP.height;
    mazeP.left = 0;
    this.playGroup.add(mazeP);
}

module.exports = play;