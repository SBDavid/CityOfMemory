var game = require('../game'),
    gConfig = require('../globalConfig');

function levelPanel(title ,level, width, height) {
    this.group = new Phaser.Group(game);
    this.group.inputEnableChildren = true;
    // 背景
    let bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.defaultPanelBgNum);
    bg.drawRoundedRect(0,0,width,height, '20');
    bg.endFill();
    this.group.add(bg);
    // 标题
    let titleText = new Phaser.Text(game, 30, 30, title, {
        fontSize: '60px',
        fill: '#ffffff'
    });
    this.group.add(titleText);
    // 描述
    let descText = new Phaser.Text(game, 0, 0, `${level} X ${level}`, {
        fontSize: '200px',
        fill: '#ffffff',
        fontStyle: 'italic',
        fontWeight: 'bold'
    });
    descText.x = width - descText.width - 30;
    descText.y = height - 200 - 30;
    this.group.add(descText);
    // 事件
    this.group.onChildInputUp.add(function() {
        game.state.start('chooseChapter', true, false, level);
    })
}

module.exports = levelPanel;