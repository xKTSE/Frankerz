Crafty.c("Pet", {
	// private pet variable
	_pet: undefined,

	init: function(){
		// Extending '2D, DOM, Image' characteristics
		this.requires('2D, DOM, Image');
	},
	setData: function(_petData) {
		// Populate component with user's pet information
		this.pet = _petData;
		this.updateState('normal');
	},
	updateState: function(state) {
		// Change the currently displayed image of the pet
		this.image('../img/' + this.pet.petType + '/' + this.pet.petType + '_' + state + '.png');


		if (state !== 'asleep') {
			var context = this;
		
			setTimeout(function(){
				context.image('../img/' + context.pet.petType + '/' + context.pet.petType + '_normal.png');
			}, 5000);
		}
	},
	onEvent: function(event) {
		switch (event) {
			case 'FEED' :
				if (!this.pet.petState.isAsleep()) {
					this.pet.eat();
					this.updateState('happy');
				}
				break;
			case 'TALK_TO' :
				if (!this.pet.petState.isAsleep()) {
					this.pet.play();
					this.updateState('happy');
				}
				break;
			case 'PLAY':
				if (!this.pet.petState.isAsleep()) {
					this.pet.play();
					this.updateState('happy');
				}
				break;
			case 'SLEEP':
				this.pet.sleep();
				this.updateState('asleep');
				break;
			case 'IS_HUNGRY':
				if (!this.pet.petState.isAsleep()) {
					this.updateState('angry');
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('hungry', this.x, this.y);
				}
				break;
			case 'IS_BORED':
				if (!this.pet.petState.isAsleep()) {
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('bored', this.x, this.y);
				}
				break;
			case 'IS_TIRED':
				if (!this.pet.petState.isAsleep()) {
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('tired', this.x, this.y);
				}
				break;
		}
	},
	calculatePetState: function(){
		// TODO: this.pet.calculateEverything;

		// for each event occuring : call this.onEvent(event)

		// note: must create a queue of petStates
	}
});