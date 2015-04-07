//creating the player's dot on the minimap
game.MiniPlayerLocation = me.Entity.extend ({
	init: function(x, y, settings){
		this.settings = settings;
		//sets the radius of the player's dot
		this.r = 5;
		//sets the diameter plus 4
		this.diameter = (this.r + 2) * 2;
		//keeps track of where dot goes
		this.anchorPoint = new me.Vector2d(0, 0);
		//sets location
		this.loc = x, y;
		this.settings.width = this.diameter; 
		this.settings.height = this.diameter; 
		this.settings.spritewidth = this.diameter; 
		this.settings.spriteheight = this.diameter;
		//tells minimap to stay on screen
		this.floating = true;
		//builds a canvas 
		this.image = me.video.createCanvas(this.settings.width, this.settings.height);
		//makes context to draw on
		var ctx = me.video.renderer.getContext2d(this.image);
		//sets color and opacity of dot
		ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
		//sets color of line around dot
		ctx.strokeStyle = "blue";
		//sets width of line
		ctx.lineWidth = 2;
		//builds dot
		ctx.arc(this.r + 2, this.r + 2, this.r, 0, Math.PI * 2);
		//fills dot
		ctx.fill();
		//outlines dot
		ctx.stroke();
		var my = this;
		this._super(me.Entity, "init", [x, y, {
			width:14,
			height: 14,
			spritewidth: 14,
			spriteheight: 14,
			getShape: function(){
				return (new me.Rect(0, 0, 14, 14)).toPolygon();
			}
		}]);
		
	},

	draw: function(renderer){
		this._super(me.Entity, "draw", [renderer]);
		//makes dot stay on screen
		this.floating = true;
		//draws dot
		renderer.drawImage(
			this.image,
			0, 0, this.width, this.height,
			this.pos.x, this.pos.y, this.width, this.height
		);
	},

	update: function(){
		//updates position of dot
		this.pos.x = (10 + (game.data.player.pos.x * 0.062));
		this.pos.y = (10 + (game.data.player.pos.y * 0.06));
		return true;
	}

});