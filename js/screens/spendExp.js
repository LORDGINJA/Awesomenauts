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
				//calls super class 
				this._super(me.Renderable, 'init', [300, 540, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 46, "#DE7E18");
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "spend" and sets where writing starts
				this.font.draw(renderer.getContext(), "SPEND", this.pos.x, this.pos.y);
			},
			
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});