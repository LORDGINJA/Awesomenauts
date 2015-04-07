game.MiniMap = me.Entity.extend ({
	init: function(x, y, settings){
		this._super(me.Entity,"init", [x, y, {
			image: "minimap",
			width: 555,
			height: 105,
			spritewidth: "555",
			spriteheight: "105",
			getShape: function(){
				return (new me.Rect(0, 0, 555, 105)).toPolygon();
			}
		}]);
		this.floating = true;
	}
});