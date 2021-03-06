var game = require('../game'),
    gConfig = require('../globalConfig'),
    btnPanel = require('../comps/btnPanel'),
    titlePanel = require('../comps/titlePanel');

let lose = function() {


}

lose.prototype.init = function({level, chapter, time, step}) {
    console.info(`win level: ${level} chapter: ${chapter}`);
    this.levelNo = level;
    this.chapterNo = chapter;
    this.winGroup = new Phaser.Group(game);
}

lose.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

lose.prototype.create = function() {
    let self = this;
    // 屏幕宽度
    const screenW = game.width;
    // 上边距
    const paddingTop = 25;
    const paddingLeft = 50;

    var titleGroup = new titlePanel(`${this.levelNo} X ${this.levelNo} X ${this.chapterNo+1}`, () => {
        game.state.start('chooseChapter', true, false, this.levelNo);
    }).group;
    this.winGroup.add(titleGroup);

    // 图片
    let pic = new Phaser.Image(game, 0,0, 'lose');
    pic.width = 500;
    pic.height = 500;
    pic.top = titleGroup.height + 120;
    pic.left = (screenW - pic.width) / 2;

    this.winGroup.add(pic);

    // 重玩
    var replayGroup = new btnPanel('重玩', 400, function() {
        game.state.start('play', true, false, {
            level: self.levelNo,
            chapter: self.chapterNo
        });
    }).group;
    replayGroup.top = game.height*0.65;
    replayGroup.left = (screenW-replayGroup.width)/2;
    this.winGroup.add(replayGroup);
}

module.exports = lose;