var game = require('../game'),
    gConfig = require('../globalConfig'),
    chapterPanel = require('../comps/chapterPanel'),
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

    var titleGroup = new Phaser.Group(game);
    this.chapterGroup.add(titleGroup);
    // 背景
    var bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.headerNum);
    bg.drawRect(0,0,screenW,150);
    bg.endFill();
    titleGroup.add(bg);

    // 返回键
    let quitBtn = new Phaser.Button(game, paddingTop, 25, 'quit', function() {
        game.state.start('choseLevel');
    });
    quitBtn.width = 100;
    quitBtn.height = 100;
    titleGroup.add(quitBtn); 

    // 标题
    var title = new Phaser.Text(game,150, paddingTop, `${this.levelNo} X ${this.levelNo}`, {
        fontSize: '100px',
        fontStyle: 'italic',
        fill: gConfig.color.defaultBgTxt
    });
    titleGroup.add(title);

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
    /* let chapterOne = new chapterPanel(this.levelNo, 1, 300, 300).group;
    chapterOne.top = 0;
    chapterOne.left = 20;
    this.chapterGroup.add(chapterOne);

    let chapterTwo = new chapterPanel(this.levelNo, 2, 300, 300).group;
    chapterTwo.top = 0;
    chapterTwo.left = 340;
    this.chapterGroup.add(chapterTwo);

    let chapterThree = new chapterPanel(this.levelNo, 3, 300, 300).group;
    chapterThree.top = 0;
    chapterThree.left = 660;
    this.chapterGroup.add(chapterThree); */
}

module.exports = chooseChapter;