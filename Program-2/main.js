var mainState = {

    preload: function() {
		window.count=0; // Declaring a Variable Counter
        game.load.image('player', 'assets/Mario.gif'); // Change the player icon to Mario. 
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/mushroom.jpg'); // Change the coin icon to Mushroom.
        game.load.image('enemy', 'assets/Duck.png');    // Change the enemy icon to Duck.
		
    },

    create: function() { 
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;

        this.createWorld();

        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin); 
        this.coin.anchor.setTo(0.5, 0.5);

        this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
        this.score = 0;
		
		// Placing the Timer label on the top right hand of the world and setting it to 120 seconds.
		this.TimerLabel = game.add.text(355, 30, 'Time Left: 120', { font: '18px Arial', fill: '#ffffff' });
        this.Time = 120;
		
		// Placing the Death label on the bottom right hand of the world and setting it to 0 seconds.
		this.DeathLabel = game.add.text(375, 290, 'Deaths:0', { font: '18px Arial', fill: '#ffffff' });
        this.Death = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        game.time.events.loop(2200, this.addEnemy, this);
		game.time.events.loop(1000, this.CountDown, this); // calling countDown method 
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.Deaths, null, this); // calling Deaths method if collision occurs. 

        this.movePlayer(); 

        if (!this.player.inWorld) {
            this.playerDie();
        }
    },

    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
			this.player.body.rotation ="left";
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

    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();

        if (!enemy) {
            return;
        }

        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.width/2, 0);
        enemy.body.gravity.y = 500;
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

    playerDie: function() {
		
		// Respawing the player once he leaves out of the world.
          var playerPosition = [
            {x: 125, y: 50}, {x: 220, y: 55}, {x: 305, y: 45},
            {x: 440, y: 40}, {x: 50, y: 40}, {x: 435, y: 70}, 
            {x: 100, y: 150}, {x: 250, y:10}, {x: 215, y: 270} 
        ];

        for (var i = 0; i < playerPosition.length; i++) {
            if (playerPosition[i].x == this.player.x) {
                playerPosition.splice(i, 1);
            }
        }

        var newPosition = game.rnd.pick(playerPosition);
        this.player.reset(newPosition.x, newPosition.y);
    },
	
	CountDown: function()
	{
		// Reducing the timer goes by 1.
		this.Time -=1;
		if(this.Time <= 0)
		{
			// if the Timer goes to zero the game is restarted.
			
			game.state.start('main');
			
		}
		
		this.TimerLabel.text='Time left:' + this.Time;
	},
	
	// Function to display death Score of the player on the screen
	Deaths: function(player, enemy)
	{
			
		count++;		
		if ((count%4)==1) // making use the global counter as the deaths function is called four times for one collision
		{
		this.Death += 1;
        this.DeathLabel.text = 'Deaths:' + this.Death;
		}
		
	},
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');
