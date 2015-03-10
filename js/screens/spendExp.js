game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the exp-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		//for new game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class and positions it
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 46, "#DE7E18");
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Press f1-f4 to buy, f5 to skip" and sets where writing starts
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "Current EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION: " + game.data.exp1.toString(), this.pos.x, this.pos.y + 100);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "F2: INCREASE SPEED: " + game.data.exp2.toString(), this.pos.x, this.pos.y + 150);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "F3: INCREASE DAMAGE: " + game.data.exp3.toString(), this.pos.x, this.pos.y + 200);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH: " + game.data.exp4.toString(), this.pos.x, this.pos.y + 250);
			},
			
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});