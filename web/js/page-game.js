App.populator('page-game', function(page){
	var p = $(page);
	var canvasSection = p.find('#canvas-section');
	var actionBarItem = p.find('.actions');
	var optionButton = p.find('#options');


	p.on('appShow', function () {
    	
    	var CONST = {
			GAME_HEIGHT : canvasSection.height(),
			GAME_WIDTH	: canvasSection.width(),
			GAME_BACKGROUND_COLOUR	: '#222'
		};

		Game = {
			start: function(){
				// Disable crafty.mobile so that the stage elem can have the fixed size
				Crafty.mobile = false;

				// Initialize craftyjs and set the main stage to the div #stage_elem found in the HTML
				Crafty.init(CONST.GAME_WIDTH, CONST.GAME_HEIGHT, "stage_elem");
				Crafty.background(CONST.GAME_BACKGROUND_COLOUR);

				// Draw a blob image at the center of the stage
				Crafty.e("2D, DOM, Image")
					.image("../img/blob/blob_normal.png")
					.attr({
						x: (CONST.GAME_WIDTH/2) - 32,
						y: (CONST.GAME_HEIGHT/2) - 32
					});
			}
		};

		Game.start();

  	});
});