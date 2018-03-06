var game = require('../game'),
    gConfig = require('../globalConfig');

function chapterPanel(level, chapter, width, height) {
    var self = this;
    this.levelNo = level;
    this.chapterNo = chapter;

    this.group = new Phaser.Group(game);
    this.group.inputEnableChildren = true;

    let bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.defaultPanelBgNum);
    bg.drawRoundedRect(0,0,width,height,20);
    bg.endFill();

    this.group.add(bg);

    let chapterTitle = new Phaser.Text(game, 0, 25, chapter+1+'', {
        fontSize: '80px',
        fill: gConfig.color.defaultBgTxt
    });
    chapterTitle.x = (bg.width - chapterTitle.width) / 2;
    this.group.add(chapterTitle);

    // 事件
    this.group.onChildInputUp.add(function() {
        game.state.start('play', true, false, {
            level: self.levelNo,
            chapter: self.chapterNo
        });
    })
}

module.exports = chapterPanel;