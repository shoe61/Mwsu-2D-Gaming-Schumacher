var mainState = {

    preload: function() {
        window.count=0; // Declaring a Variable Counter
        game.load.image('player', 'assets/hill3.png'); //hillary clinton
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/seal.png');
        game.load.image('enemy', 'assets/bernie.png'); //bernie sanders, arch nemesis of hillary
    },

    create: function() { 
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 380;

        this.createWorld();

        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin); 
        this.coin.anchor.setTo(0.5, 0.5);

        this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
        this.score = 0;
        
        this.deathLabel = game.add.text(325, 300, 'political deaths: 0', { font: '18px Arial', fill: '#ffffff' } );
        this.death = 0;
        
        this.timer = game.add.text(355, 30, 'time left: 120', { font: '18px Arial', fill: '#ffffff' } );
        this.time = 120;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        game.time.events.loop(2200, this.addEnemy, this);
        
        game.time.events.loop(1000, this.countdown, this); //runs the countdown at once per second-shoe
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.loseVote, null, this);

        this.movePlayer(); 

        if (!this.player.inWorld) {
            this.updatePlayerPosition();
        }
    },

    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
        }
        else {
            this.player.body.velocity.x = 0;
        }

        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
        }      
    },

    takeCoin: function(player, coin) {
        this.score += 5;
        this.scoreLabel.text = 'score: ' + this.score;

        this.updateCoinPosition();
    },
    
    loseVote: function(player, enemy){
       
        count += 1;
        if ((count%4)==1) // making use the global counter as the deaths function is called four times for one collision
		{
		this.death += 1;
        this.deathLabel.text = 'political deaths:' + this.death;
		}
     },
    
  
    //countdown frequency regulated by loop at line 43-shoe
    countdown: function(){
        this.time -=1;
        
        if(this.time <= 0){
            game.state.start('main'); //if time expires, start new game-shoe
        }
        
        this.timer.text = 'time left:' + this.time;
    },
    
    
    updateCoinPosition: function() {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, 
            {x: 60, y: 140}, {x: 440, y: 140}, 
            {x: 130, y: 300}, {x: 370, y: 300} 
        ];

        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x == this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }

        var newPosition = game.rnd.pick(coinPosition);
        this.coin.reset(newPosition.x, newPosition.y);
    },
    
    
    updatePlayerPosition: function() {
        var playerPosition = [
            {x: 125, y: 50}, {x: 220, y: 55}, {x: 305, y: 45},
            {x: 440, y: 40}, {x: 50, y: 40}, {x: 435, y: 70}, 
            {x: 100, y: 150}, {x: 250, y:10}, {x: 215, y: 270}
        ];

        for (var i = 0; i < playerPosition.length; i++) {
            if (playerPosition[i].x == this.coin.x) {
                playerPosition.splice(i, 1);
            }
        }

        var newSpot = game.rnd.pick(playerPosition);
        this.player.reset(newSpot.x, newSpot.y);
    },

    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();

        if (!enemy) {
            return;
        }

        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.width/2, 0);
        enemy.body.gravity.y = 380;
        enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },

    createWorld: function() {
        this.walls = game.add.group();
        this.walls.enableBody = true;

        game.add.sprite(0, 0, 'wallV', 0, this.walls); 
        game.add.sprite(480, 0, 'wallV', 0, this.walls); 
        game.add.sprite(0, 0, 'wallH', 0, this.walls); 
        game.add.sprite(300, 0, 'wallH', 0, this.walls);
        game.add.sprite(0, 320, 'wallH', 0, this.walls); 
        game.add.sprite(300, 320, 'wallH', 0, this.walls); 
        game.add.sprite(-100, 160, 'wallH', 0, this.walls); 
        game.add.sprite(400, 160, 'wallH', 0, this.walls); 
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);

        this.walls.setAll('body.immovable', true);
    },

    /*playerDie: function() {
        game.state.start('main');
    },*/
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');
