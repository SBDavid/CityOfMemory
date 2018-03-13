var game = require('../game'),
    gConfig = require('../globalConfig'),
    titlePanel = require('../comps/titlePanel'),
    btnPanel = require('../comps/btnPanel'),
    mazeData = require('../mazeData/index'),
    markPanel = require('../comps/markPanel');

let win = function() {


}

win.prototype.init = function({level, chapter, time, step}) {
    console.info(`win level: ${level} chapter: ${chapter}`);
    this.levelNo = level;
    this.chapterNo = chapter;
    this.time = time;
    this.step = step;
    this.winGroup = new Phaser.Group(game);
}

win.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

win.prototype.create = function() {
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
    let pic = new Phaser.Image(game, 0,0, 'win');
    pic.width = 500;
    pic.height = 500;
    pic.top = titleGroup.height + 120;
    pic.left = (screenW - pic.width) / 2;
    this.winGroup.add(pic);

    // 用时、部署
    let markP = new markPanel(this.time, this.step).group;
    markP.top = pic.height + 300;
    markP.left = (screenW - markP.width) / 2;
    this.winGroup.add(markP);

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

    // 下一关
    if (mazeData['level'+self.levelNo].length - 1 > self.chapterNo ) {
        var nextGroup = new btnPanel('下一关', 400, function() {
            game.state.start('play', true, false, {
                level: self.levelNo,
                chapter: self.chapterNo + 1
            });
        }).group;
        nextGroup.top = game.height*0.75;
        nextGroup.left = (screenW-nextGroup.width)/2;
        this.winGroup.add(nextGroup);
    }
}

module.exports = win;