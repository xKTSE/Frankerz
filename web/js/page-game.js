App.populator('page-game', function(page){
	var p = $(page);
	var canvasSection = p.find('#canvas-section');
	var actionBarItem = p.find('.actions');
	var optionButton = p.find('#options');
	var pet;
	var GAME_IN_PROFRESS = false;
	var saveInterval = null;
	var SAVE_INTERVAL_TIME = 20000;
	var petStateCalculateInterval = null;
	var STATE_CALCULATE_INTERVAL = 3000;

	p.on('appShow', function () {
    	
    	console.log(canvasSection.height());


    	var CONST = {
    		FPS	: 60,
			GAME_HEIGHT : canvasSection.height(),
			GAME_WIDTH	: canvasSection.width(),
			GAME_BACKGROUND_COLOUR	: '#222'
		};

		console.log(CONST.GAME_WIDTH);
		console.log(CONST.GAME_HEIGHT);

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
				pet.setData(globalPet);

				console.log(pet);
				// pet.bind('EnterFrame', function(){
				// 	pet.calculatePetState();
				// });

				saveInterval = setInterval(function() {globalPet.DB_updatePet(function(success, result) {
			        if (success) {
						console.log(result);
			        } else {
			            displayErrorToast(result);
			        }
				})}, SAVE_INTERVAL_TIME);

				petStateCalculateInterval = setInterval(function() {pet.calculatePetState()}, STATE_CALCULATE_INTERVAL);

				pet.onMouseDown = function(e) {
					var context = this;
					// TODO: Optimize this
					
					// Move to right
					context.x += 3;

					context.timeout(function(){
						// After 100ms, move to the left
						context.x -= 6;

						context.timeout(function(){

							// After 100ms, move back to inital X pos
							context.x += 3;
						}, 100);

					}, 100);
				}

				Crafty.addEvent(pet, Crafty.stage.elem, "mousedown", pet.onMouseDown);
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
			} else {
				clearInterval(saveInterval);
				clearInterval(petStateCalculateInterval);
				App.dialog({
					title   : 'Options',
					saveButton   : 'Save' ,
					backButton    : 'Back to Pet List' ,
					signOutButton : 'Sign Out' ,
					cancelButton : 'Cancel'
					}, function (choice) {
						if (choice === 'save') {
							displayLoading(page);
							globalPet.DB_updatePet(function(success, result) {
						        if (success) {
									console.log(result);
									removeLoading();
						        } else {
						            displayErrorToast(result);
						        }
							});	
						}
						else if (choice === 'back'){
							displayLoading();
							globalPet.DB_updatePet(function(success, result) {
						        if (success) {
									console.log(result);
									globalPet = null;
									App.load('page-pet-list');
									App.removeFromStack();
						        } else {
						            displayErrorToast(result);
						        }
							});
						} else if (choice === 'signOut'){
							displayLoading();
							globalPet.DB_updatePet(function(success, result) {
						        if (success) {
									console.log(result);
									globalPet = null;
									signOut();
						        } else {
						            displayErrorToast(result);
						        }
							});
						} else {
							saveInterval = setInterval(globalPet.DB_updatePet(function(success, result) {
						        if (success) {
									console.log(result);
						        } else {
						            displayErrorToast(result);
						        }
							}), SAVE_INTERVAL_TIME);
							petStateCalculateInterval = setInterval(function() {pet.calculatePetState()}, STATE_CALCULATE_INTERVAL);
							return;
						}
					});
			}
		});

		/*
		Crafty.load([ -all pet/dialog images- ], function(){
			Game.start();
		})

		*/

		Game.start();
  	});
});