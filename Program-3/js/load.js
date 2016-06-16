var loadState = {

    preload: function () {
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
    
        //load spritesheet vice 1D sprite
        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        //game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('background', 'assets/background.png'); 
        
        // Sound when the player jumps
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        // Sound when the player takes a coin
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        // Sound when the player dies
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        // Load the music in 2 different formats in the load.js file
        game.load.audio('music', ['assets/flight.ogg', 'assets/flight.mp3']);
        
        //pixel (explosion)
        game.load.image('pixel', 'assets/pixel.png');
        
        //mute button
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        
        
    },

    create: function() { 
        game.state.start('menu');
    }
};