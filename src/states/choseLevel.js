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

    var title = game.add.text(paddingTop, paddingLeft, '选择难度', {
        fontSize: '80px',
        fontWeight: 'bold',
        fill: gConfig.color.defaultTxtTxt
    });

    const panelWidth = screenW - 2*paddingLeft;
    const panelPaddingTop = 50;
    // 增加level5
    var level5 = new levelPanel(5, panelWidth, 300).group;
    level5.top = title.y + title.height + panelPaddingTop;
    level5.left = paddingLeft;
    game.add.world.add(level5);

    // 增加level7
    var level7 = new levelPanel(7, panelWidth, 300).group;
    level7.top = level5.y + level5.height + panelPaddingTop;
    level7.left = paddingLeft;
    game.add.world.add(level7);

    // 增加level9
    var level9 = new levelPanel(9, panelWidth, 300).group;
    level9.top = level7.y + level7.height + panelPaddingTop;
    level9.left = paddingLeft;
    game.add.world.add(level9);
}

module.exports = choseLevel;