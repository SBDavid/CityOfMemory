var game = require('../game'),
    gConfig = require('../globalConfig'),
    chapterPanel = require('../comps/chapterPanel'),
    titlePanel = require('../comps/titlePanel'),
    mazeData = require('../mazeData/index');

let chooseChapter = function() {


}

chooseChapter.prototype.init = function(level) {
    console.info('chooseChapter level: ' + level);
    this.levelNo = level;
    this.chapterGroup = new Phaser.Group(game);
}

chooseChapter.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

chooseChapter.prototype.create = function() {

    // 屏幕宽度
    const screenW = game.width;
    // 上边距
    const paddingTop = 25;
    const paddingLeft = 50;

    var titleGroup = new titlePanel(`${this.levelNo} X ${this.levelNo}`, function() {
        game.state.start('choseLevel');
    }).group;
    this.chapterGroup.add(titleGroup);

    // 增加关卡
    var chapterSelectorGroup = new Phaser.Group(game);
    chapterSelectorGroup.top = titleGroup.height;
    this.chapterGroup.add(chapterSelectorGroup);

    var Chapters = mazeData['level'+this.levelNo];

    const margin = 50;
    const pannelSize = (screenW - margin)/3 -margin;
    for (let i=0; i<Chapters.length; i++) {
        let chapter = new chapterPanel(this.levelNo, i, pannelSize, pannelSize).group;
        chapter.top = (parseInt(i/3)+1) * margin + parseInt(i/3)*pannelSize;
        chapter.left = (i%3)*pannelSize + (i%3+1)*margin;
        chapterSelectorGroup.add(chapter);
    }
}

module.exports = chooseChapter;