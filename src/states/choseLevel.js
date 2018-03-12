var game = require('../game'),
    gConfig = require('../globalConfig'),
    levelPanel = require('../comps/levelPanel');

let choseLevel = function() {


}

choseLevel.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

choseLevel.prototype.create = function() {

    // 屏幕宽度
    const screenW = game.width;
    // 上边距
    const paddingTop = 100;
    const paddingLeft = 100;

    var titleGroup = new Phaser.Group(game);
    game.add.world.add(titleGroup);
    var bg = new Phaser.Graphics(game, 0, 0);
    bg.beginFill(gConfig.color.headerNum);
    bg.drawRect(0,0,screenW,120);
    bg.endFill();
    titleGroup.add(bg);

    var title = new Phaser.Text(game,25, 15, '难度', {
        fontSize: '80px',
        fill: gConfig.color.defaultBgTxt
    });
    titleGroup.add(title);

    const panelWidth = screenW - 2*paddingLeft;
    const panelPaddingTop = 50;
    // 增加level5
    var level5 = new levelPanel('新手入门', 5, panelWidth, 300).group;
    level5.top = titleGroup.y + titleGroup.height + panelPaddingTop;
    level5.left = paddingLeft;
    game.add.world.add(level5);

    // 增加level7
    var level7 = new levelPanel('键入佳境', 7, panelWidth, 300).group;
    level7.top = level5.y + level5.height + panelPaddingTop;
    level7.left = paddingLeft;
    game.add.world.add(level7);

    // 增加level9
    var level9 = new levelPanel('登峰造极', 9, panelWidth, 300).group;
    level9.top = level7.y + level7.height + panelPaddingTop;
    level9.left = paddingLeft;
    game.add.world.add(level9);
}

module.exports = choseLevel;