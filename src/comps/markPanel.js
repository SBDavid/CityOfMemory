var game = require('../game'),
    gConfig = require('../globalConfig');

function markPanel(time, step) {

    const screenW = game.width;

    this.group = new Phaser.Group(game);  


    var bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.defaultPanelBgNum);
    bg.drawRoundedRect(0,0,600,250,20);
    bg.endFill();
    this.group.add(bg);

    var timeTxt = new Phaser.Text(game,0, 0, `用时：${time} s`,{
        fontSize: '60px',
        fill: gConfig.color.defaultBgTxt
    });
    timeTxt.top = 40;
    timeTxt.left = 50;
    this.group.add(timeTxt);

    var stepTxt = new Phaser.Text(game,0, 0, `步数：${step} `,{
        fontSize: '60px',
        fill: gConfig.color.defaultBgTxt
    });
    stepTxt.top = 140;
    stepTxt.left = 50;
    this.group.add(stepTxt);
}

module.exports = markPanel;