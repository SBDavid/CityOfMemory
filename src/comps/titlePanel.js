var game = require('../game'),
    gConfig = require('../globalConfig');

function titlePanel(title, quitTitleCb) {
    var self = this;
    
    // 屏幕宽度
    const screenW = game.width;
    // 上边距
    const paddingTop = 25;
    const paddingLeft = 50;

    this.group = new Phaser.Group(game);
    // 背景
    var bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.headerNum);
    bg.drawRect(0,0,screenW,150);
    bg.endFill();
    this.group.add(bg);

    // 返回键
    let quitBtn = new Phaser.Button(game, paddingTop, 25, 'quit', function() {
        quitTitleCb();
    });
    quitBtn.width = 100;
    quitBtn.height = 100;
    this.group.add(quitBtn); 

    // 标题
    var title = new Phaser.Text(game,150, paddingTop, title, {
        fontSize: '100px',
        fontStyle: 'italic',
        fill: gConfig.color.defaultBgTxt
    });
    this.group.add(title);
}

module.exports = titlePanel;