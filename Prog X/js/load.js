var loadState = {

    preload: function () {
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
    
        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        //wall sprites will be replaced by tilemap
        //game.load.image('wallV', 'assets/wallVertical.png');
        //game.load.image('wallH', 'assets/wallHorizontal.png');
        // Load the tileset information
        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.image('jumpButton', 'assets/jarrow.png');
        game.load.image('rightButton', 'assets/rarrow.png');
        game.load.image('leftButton', 'assets/larrow.png');

        
        game.load.image('background', 'assets/background.png'); 
        game.load.image('pixel', 'assets/pixel.png');
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);

        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        
        // Load the music in 2 different formats in the load.js file
        game.load.audio('music', ['assets/flight.ogg', 'assets/flight.mp3']);

        
        
    },

    create: function() { 
        game.state.start('menu');
    }
};