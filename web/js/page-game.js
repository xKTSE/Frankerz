App.populator('page-game', function(page){
	var p = $(page);
	var canvasSection = p.find('#canvas-section');
	var actionBarItem = p.find('.actions');
	var optionButton = p.find('#options');
	var pet;
	var GAME_IN_PROFRESS = false;

	p.on('appShow', function () {
    	
    	// To remove upon getting User Pet Data implementation
    	var dummy = {
    		name: 'Dongers',
    		type: 'blob',
    		gender: 'male'
    	}


    	var CONST = {
    		FPS	: 60,
			GAME_HEIGHT : canvasSection.height(),
			GAME_WIDTH	: canvasSection.width(),
			GAME_BACKGROUND_COLOUR	: '#222'
		};

		Game = {
			start: function(){
				GAME_IN_PROFRESS = true;

				// Disable crafty.mobile so that the stage elem can have the fixed size
				Crafty.mobile = false;

				// Initialize craftyjs and set the main stage to the div #stage_elem found in the HTML
				Crafty.init(CONST.GAME_WIDTH, CONST.GAME_HEIGHT, "stage_elem");
				Crafty.background(CONST.GAME_BACKGROUND_COLOUR);

				// Draw a blob image at the center of the stage
				pet = Crafty.e("Pet")
						.attr({
							x: (CONST.GAME_WIDTH/2) - 32,
							y: (CONST.GAME_HEIGHT/2) - 32
						});
				pet.setData(new Pet(dummy.name, dummy.type, dummy.gender));
				pet.bind('EnterFrame', function(){
					pet.calculatePetState();
				});
			}
		};

		actionBarItem.on('click', function(){
			if (!GAME_IN_PROFRESS) {
				return;
			}

			if (this.id === 'feed-pet') {
				pet.onEvent('FEED');
			} else if (this.id === 'play-with-pet') {
				pet.onEvent('PLAY');
			} else if (this.id === 'talk-to-pet') {
				pet.onEvent('TALK_TO');
			}
		});

		optionButton.on('click', function(){
			if (!GAME_IN_PROFRESS) {
				return;
			}

			// TODO:
		});

		/*
		Crafty.load([ -all pet/dialog images- ], function(){
			Game.start();
		})

		*/

		Game.start();
  	});
});