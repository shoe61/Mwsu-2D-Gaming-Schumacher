
//this is replaced
//var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// By this
//var game = new Phaser.Game(500, 340, Phaser.AUTO, '');
//which can be replaced by:
//The last 2 parmeters are optionals, and their default value is Phaser.AUTO and ''. 
//So we can actually initialize Phaser like this:
var game = new Phaser.Game(500, 340);


game.global = {
    score: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');