var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();    

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
	this.map.removeTile(1,1, 1);
	this.carveMaze(1,1);
	this.rooms = this.game.rnd.integerInRange(10, 30);
	for(i = 0; i < this.rooms; i++){
		this.carveRoom();	
	}
  },
  
  carveMaze(x,y){
	  walk = this.game.rnd.integerInRange(1,4);
	  //go down
	  if(walk == 1 && y - 2 > 0 && this.map.getTile(x, y-2, 1) != null){
		  this.map.removeTile(x, y - 1, 1);
		  this.map.removeTile(x, y - 2, 1);
		  this.carveMaze(x, y - 2);
	  }
	  //go up
	  if(walk == 2 && y + 2 < this.map.height && this.map.getTile(x, y+2, 1) != null){
		  this.map.removeTile(x, y + 1, 1);
		  this.map.removeTile(x, y + 2, 1);
		  this.carveMaze(x, y + 2);
	  }
	  if(walk == 3 && x - 2 > 0 && this.map.getTile(x - 2,y, 1) != null){
		  this.map.removeTile(x - 1, y, 1);
		  this.map.removeTile(x - 2, y, 1);
		  this.carveMaze(x - 2, y);
	  }
	  if(walk == 4 && x + 2 < this.game.width && this.map.getTile(x + 2,y, 1) != null){
		  this.map.removeTile(x + 1, y, 1);
		  this.map.removeTile(x + 2, y, 1);
		  this.carveMaze(x + 2, y);
	  }
	  if(x - 2 > 0 && this.map.getTile(x - 2,y, 1) != null){
		  this.map.removeTile(x - 1, y, 1);
		  this.map.removeTile(x - 2, y, 1);
		  this.carveMaze(x - 2, y);
	  }
	  if(x + 2 < this.game.width && this.map.getTile(x + 2,y, 1) != null){
		  this.map.removeTile(x + 1, y, 1);
		  this.map.removeTile(x + 2, y, 1);
		  this.carveMaze(x + 2, y);
	  }
	  //if we cannot move in a random direction then go where able.
	  if(y - 2 > 0 && this.map.getTile(x, y-2, 1) != null){
		  this.map.removeTile(x, y - 1, 1);
		  this.map.removeTile(x, y - 2, 1);
		  this.carveMaze(x, y - 2);
	  }
	  //go up
	  if(y + 2 < this.map.height && this.map.getTile(x, y+2, 1) != null){
		  this.map.removeTile(x, y + 1, 1);
		  this.map.removeTile(x, y + 2, 1);
		  this.carveMaze(x, y + 2);
	  }
  },
  carveRoom(){
	roomLocationX = this.game.rnd.integerInRange(1, this.map.width-1);
	roomLocationY = this.game.rnd.integerInRange(1, this.map.height-1);
	roomWidth = this.game.rnd.integerInRange(5, 10);
	roomHeight = this.game.rnd.integerInRange(5, 10);
	var x = 0;
	var y = 0;
	while(x < roomWidth && x + roomLocationX < this.map.width -1){
		while(y < roomHeight && roomLocationY + y < this.map.height - 1){
			this.map.removeTile(roomLocationX + x, roomLocationY + y, 1);
			y++;
		}
		this.map.removeTile(roomLocationX + x, roomLocationY + y, 1);
		x++;
	}
  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement

    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y += 50;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }
  },
  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
};
