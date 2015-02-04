// player's class
game.PlayerEntity = me.Entity.extend ({
	//constructor function 
	init: function(x, y, settings){
		//reachers the constructor function for enitity
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the player
			image: "player",
			//sets aside a width of 64 pixels for the sprite
			width: 64,
			//sets aside a height of 64 pixels for the sprite
			height: 64,
			//gives the sprite a width of 64. 
			spritewidth : "64",
			//gives the sprite a width of 64
			spriteheight: "64",
			getShape: function(){
				//returns a rectangle of what the player walks into
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		//sets movemet speed. allows player to move horizantally and vertically
		this.body.setVelocity(5, 20);
		//keeps track of which way the character is going
		this.facing = "right";
		//makesit so the player is always on the screen
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//gives player animation while standing
		this.renderable.addAnimation("idle", [78]);
		//gives player animation while walking
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//gives player animation while attacking
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		//the player's start animation
		this.renderable.setCurrentAnimation("idle");
	},


	//delata is the change in time that's happening
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//so the program knows the character is facing right
			this.facing = "right";
			//flips the animation
			this.flipX(true);
		}

		else if(me.input.isKeyPressed("left")){
			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//so the program knows the character is facing left
			this.facing = "left";
			//doesn't flip the animation
			this.flipX(false);
		}

		//if the right key isn't being pressed, the player doesn't move
		else{
			this.body.vel.x = 0;
		}
		//runs only if the up key is pressed, the player isn't already jumping or falling
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			//makes the player jump
			this.body.jumping = true;
			//sets velocity of the jump and the time
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		//runs if the attack key is pressed
		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack. goes back to idle oncethe attack is over it goes back to idle
				this.renderable.setCurrentAnimation("attack", "idle")
				//makes it so that next time the button is pressed the player starts from the first animation, not where it left off
				this.renderable.setAnimationFrame();
			}
		}

		//runs if the player is moving horizantally
		else if(this.body.vel.x !== 0){
			//runs if the player isn't already running the walk animation
			if(!this.renderable.isCurrentAnimation("walk")){
				//gives the player the walking animation
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//runs if player is standing still
		else{
			//gives the player the idle animation
			this.renderable.setCurrentAnimation("idle");
		}
		//checks to see if player is colliding with base
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//tells above code to work
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true
	},
	//function for when player collides with tower
	collideHandler: function(response){
		//runs if the player collides with the enemy base
		if (response.b.type === 'EnemyBaseEntity') {
			//represents the difference between player's y distance and enemy's y distance
			var ydif = this.pos.y - response.b.pos.y;
			//represents the difference between player's and enemy base's x distance
			var xdif = this.pos.x - response.b.pos.x;
			//runs if the player is on top of the enemy base
			if (ydif < -40 && xdif < 60 && xdif > -35) {
				//stops the player from moving down
				this.body.falling = false;
				//keeps the player from falling through the tower
				this.body.vel.y = -1;
			}
			//runs if the player's x position is 37 units away from the tower while facing right 
			else if (xdif > -36 && this.facing === "right" && xdif < 0) {
				//stops player from moving 
				this.body.vel.x = 0;
				//moves player slightly away from tower
				this.pos.x = this.pos.x -1;
			}
			//runs if the player's x position is 74 units away from the tower while facing left 
			else if (xdif < 75 && this.facing === "left" && xdif > 0) {
				//stops player from moving 
				this.body.vel.x = 0;
				//moves player slightly away from tower
				this.pos.x = this.pos.x +1;
			}
		}
	}
});



//tower class
game.PlayerBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		//reachers the constructor function for tower
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the tower
			image: "tower",
			//sets aside a width of 100 pixels for the tower
			width: 100,
			//sets aside a height of 100 pixels for the tower
			height: 100,
			//gives the tower a width of 100. 
			spritewidth : "100",
			//gives the tower a width of 100
			spriteheight: "100",
			getShape: function(){
				//returns a rectangle of what the tower walks into
				return(new me.Rect(0, 0, 100, 60)).toPolygon();
			}
		}]);
		//says that tower hasn't been destroyed
		this.broken = false;
		//gives tower a "health" of ten
		this.health = 10;
		//makes sure the tower's status is always updating, eben when it isn't on the map
		this.alwaysUpdate = true;
		//makes teh tower collidable
		this.body.onCollision = this.onCollision.bind(this);
		//checks what player is running into
		this.type = "PlayerBaseEntity";
		//adds the defualt animatin for the game
		this.renderable.addAnimation("idle", [0]);
		//adds the animation for when the tower is broken
		this.renderable.addAnimation("broken", [1]);
		//sets the desfault animation
		this.renderable.setCurrentAnimation("idle");

	},	


	update:function(delta){
		//runs if health is less than or equal to 0
		if(this.health<=0){
			//makes the tower "broken"
			this.broken = true;
			//sets animation for "broken"
			this.renderable.setCurrentAnimation("broken");
		}
		//updates tower status
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},
	//function that runs when base is touched
	onCollision: function(){

	}
});



//tower class
game.EnemyBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		//reachers the constructor function for tower
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the tower
			image: "tower",
			//sets aside a width of 100 pixels for the tower
			width: 100,
			//sets aside a height of 100 pixels for the tower
			height: 100,
			//gives the tower a width of 100. 
			spritewidth : "100",
			//gives the tower a width of 100
			spriteheight: "100",
			getShape: function(){
				//returns a rectangle of what the tower walks into
				return(new me.Rect(0, 0, 100, 60)).toPolygon();
			}
		}]);
		//says that tower hasn't been destroyed
		this.broken = false;
		//gives tower a "health" of ten
		this.health = 10;
		//makes sure the tower's status is always updating, eben when it isn't on the map
		this.alwaysUpdate = true;
		//makes teh tower collidable
		this.body.onCollision = this.onCollision.bind(this);
		//checks what player is running into
		this.type = "EnemyBaseEntity";
		//adds the defualt animatin for the game
		this.renderable.addAnimation("idle", [0]);
		//adds the animation for when the tower is broken
		this.renderable.addAnimation("broken", [1]);
		//sets the default animation
		this.renderable.setCurrentAnimation("idle");
	},	


	update:function(delta){
		//runs if health is less than or equal to 0
		if(this.health<=0){
			//makes the tower "broken"
			this.broken = true;
			//sets animation for "broken"
			this.renderable.setCurrentAnimation("broken");
		}
		//updates tower status
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},
	//function that runs when base is touched
	onCollision: function(){
		
	}
});