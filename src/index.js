window.PIXI = null;
window.p2 = null;
window.Phaser = null;

var game = require('./game'),
    preloadState = require('./states/preload'),
    choseLevelState = require('./states/choseLevel'),
    chooseChapterState = require('./states/chooseChapter'),
    playState = require('./states/play'),
    lose = require('./states/lose')
    win = require('./states/win');

window.onload = function() {
    game.state.add('preload', preloadState);
    game.state.add('choseLevel', choseLevelState);
    game.state.add('chooseChapter', chooseChapterState);
    game.state.add('play', playState);
    game.state.add('win', win);
    game.state.add('lose', lose);

    game.state.start('preload');

    
}

