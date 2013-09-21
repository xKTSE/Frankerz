Crafty.c("Pet-Dialog", {
	init: function(){
		// Extending '2D, DOM, Image' characteristics
		this.requires('2D, DOM, Image');
	},
	show: function(event, petX, petY) {

		this.image('../img/dialog/dialog_box_' + event + '.png');
		this.attr({
			x: petX + (petX/2.3),
			y: petY - (petY/1.6)
		})

		var context = this;
		
		setTimeout(function(){
			context.destroy();
		}, 5000);
	}
});