var game = require('../game'),
    gConfig = require('../globalConfig');

function btnPanel(title, width, cb) {
    this.group = new Phaser.Group(game);  
    this.group.inputEnableChildren = true;
    this.group.onChildInputUp.add(function() {
        cb();
    })

    var reStart = new Phaser.Graphics(game, 0, 0);
    reStart.beginFill(gConfig.color.defaultTxtNum);
    reStart.drawRoundedRect(0,0,width,120,80);
    reStart.endFill();
    this.group.add(reStart);

    var startText = new Phaser.Text(game,115, 10, title,{
        fontSize: '80px',
        fill: '#ffffff'
    });
    startText.left = (this.group.width - startText.width) / 2;
    this.group.add(startText);
}

module.exports = btnPanel;