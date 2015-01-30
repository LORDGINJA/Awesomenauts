game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;


		//loads level
		me.levelDirector.loadLevel("level01");
		//pulls the player entity from the pool
		var player = me.pool.pull("player", 0, 420, {});
		//adds him to the game and sets his layer-level
		me.game.world.addChild(player, 5);
		//makes the right key into a variable
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//makes the right key into a variable
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//makes an attack key
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
