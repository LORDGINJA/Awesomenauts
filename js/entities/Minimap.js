//minimap hack
game.MiniMap = me.Entity.extend ({
	init: function(x, y, settings){
		this._super(me.Entity,"init", [x, y, {
			//gets minimap picture
			image: "minimap",
			//sets width
			width: 555,
			//sets heigth
			height: 105,
			//sets width
			spritewidth: "555",
			//sets height
			spriteheight: "105",
			//creates shape of minimap
			getShape: function(){
				return (new me.Rect(0, 0, 555, 105)).toPolygon();
			}
		}]);
		//keeps minimap on screen
		this.floating = true;
	}
});