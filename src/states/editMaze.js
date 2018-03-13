var game = require('../game'),
    gConfig = require('../globalConfig'),
    levelPanel = require('../comps/levelPanel');

let editMaze = function() {


}

editMaze.prototype.preload = function() {
    game.stage.backgroundColor = gConfig.color.defaultBgTxt;
}

editMaze.prototype.create = function() {

    
}

module.exports = editMaze;