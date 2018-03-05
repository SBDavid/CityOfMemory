var game = require('../game'),
    gConfig = require('../globalConfig');

function levelPanel(level, width, height) {
    this.group = new Phaser.Group(game);
    this.group.inputEnableChildren = true;

    let bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.defaultPanelBgNum);
    bg.drawRoundedRect(0,0,width,height, '50');
    bg.endFill();

    this.group.add(bg);

    let Level = new Phaser.Text(game, 0, 0, level+'', {
        fontSize: '80px',
        fontWeight: 'bold',
        fill: '#ffffff'
    });
    this.group.add(Level);

    // 事件
    this.group.onChildInputUp.add(function() {
        game.state.start('chooseChapter', true, false, level);
    })
}

module.exports = levelPanel;