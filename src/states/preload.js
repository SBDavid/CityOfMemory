var game = require('../game'),
    gConfig = require('../globalConfig');

let preload = function() {


}

preload.prototype.preload = function() {
    
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;

    // 图片资源加载
    game.load.image('quit', './asset/img/quit.png');
    game.load.image('win', './asset/img/win.png');
    game.load.image('lose', './asset/img/lose.png');

    game.load.onLoadComplete.add(function() {
        // Do Nothing
    });
}

preload.prototype.create = function() {
    var self = this;
    const screenWidth = game.width;
    const screenHeight = game.height;
    // 标题
    var name = new Phaser.Text(game,0, screenHeight*0.25, '记忆之城', {
        fontSize: '120px',
        fontWeight: 'bold',
        fill: gConfig.color.defaultTxtTxt
    });
    name.font = 'Microsoft YaHei';
    name.x = (screenWidth - name.width)/2;
    game.world.add(name);
    // author
    var author = new Phaser.Text(game,0, screenHeight*0.85, 'By David糖', {
        fontSize: '40px',
        fill: gConfig.color.defaultTxtTxt
    });
    author.font = 'Microsoft YaHei';
    author.x = (screenWidth - author.width)/2;
    game.world.add(author);
    // 开始按钮
    var startGroup = new Phaser.Group(game);
    startGroup.top = screenHeight*0.65;
    startGroup.left = (screenWidth - 400)/2;    
    startGroup.inputEnableChildren = true;
    startGroup.onChildInputUp.add(function() {
        game.state.start('choseLevel');
    })

    var start = new Phaser.Graphics(game, 0, 0);
    start.beginFill(gConfig.color.defaultTxtNum);
    start.drawRoundedRect(0,0,400,120,80);
    start.endFill();
    startGroup.add(start);

    var startText = new Phaser.Text(game,115, 10, '开始',{
        fontSize: '80px',
        fill: '#ffffff'
    });
    startGroup.add(startText);
    game.world.add(startGroup);
}

module.exports = preload;