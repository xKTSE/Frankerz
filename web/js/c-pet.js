Crafty.c("Pet", {
	// private pet variable
	pet: undefined,
	_Const: {
		ENERGY_THRESHOLD: 20,
		HUNGER_THRESHOLD: 50,
		HAPPINESS_THRESHOLD: 30
	},
	_originalState: 'normal',
	init: function(){
		// Extending '2D, DOM, Image' characteristics
		this.requires('2D, DOM, Image');
	},
	setData: function(_petData) {
		// Populate component with user's pet information
		this.pet = _petData;
		this.updateState('normal');
	},
	setState: function(state) {
		this._originalState = state;
	},
	updateState: function(state) {
		// Change the currently displayed image of the pet
		this.image('../img/' + this.pet.petType + '/' + this.pet.petType + '_' + state + '.png');

		// Change image back to the original state the pet was in
		if (state !== 'asleep' && state !== this._originalState) {
			var context = this;
		
			setTimeout(function(){
				context.image('../img/' + context.pet.petType + '/' + context.pet.petType + '_' + context._originalState + '.png');
			}, 5000);
		}
	},
	onEvent: function(event) {
		console.log(event);
		switch (event) {
			case 'FEED' :
				if (!this.pet.petState.isAsleep()) {
					this.pet.eat();
					this.updateState('happy');
				}
				else {
					this.showIsAsleepToast();
				}
				break;
			case 'TALK_TO' :
				if (!this.pet.petState.isAsleep()) {
					this.pet.play();
					this.updateState('happy');
				}
				else {
					this.showIsAsleepToast();
				}
				break;
			case 'PLAY':
				if (!this.pet.petState.isAsleep()) {
					this.pet.play();
					this.updateState('happy');
				}
				else {
					this.showIsAsleepToast();
				}
				break;
			case 'SLEEP':
				this.pet.sleep();
				this.setState('asleep');
				this.updateState('asleep');
				break;
			case 'IS_HUNGRY':
				if (!this.pet.petState.isAsleep()) {
					this.setState('angry');
					this.updateState('angry');
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('IS_HUNGRY', this.x, this.y);
				}
				break;
			case 'IS_BORED':
				if (!this.pet.petState.isAsleep()) {
					this.setState('bored');
					this.updateState('bored');
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('IS_BORED', this.x, this.y);
				}
				break;
			case 'IS_TIRED':
				if (!this.pet.petState.isAsleep()) {
					this.setState('bored');
					this.updateState('bored');
					var dialog = Crafty.e('Pet-Dialog');
					dialog.show('IS_TIRED', this.x, this.y);
				}
				break;
		}
	},
	calculatePetState: function(){

		var eventQueue = [];

		var energyLevel = this.pet.calculateEnergy();
		var hungerLevel = this.pet.calculateHunger();
		var happinessLevel = this.pet.calculateHappiness();

		/*
			Queue events when the stat level is divisible by 10
			so that dialogs are not constantly appearing on stage refresh
		*/
		if ((energyLevel % 10 === 0) && (energyLevel < this._Const.ENERGY_THRESHOLD)) {
			eventQueue.push('IS_TIRED');
		}
		if ((hungerLevel % 10 === 0) && (hungerLevel < this._Const.HUNGER_THRESHOLD)) {
			eventQueue.push('IS_HUNGRY');
		}
		if ((happinessLevel % 10 === 0) && (happinessLevel < this._Const.HAPPINESS_THRESHOLD)) {
			eventQueue.push('IS_BORED');
		}

		var context = this;
		
		if (eventQueue.length > 0) {
			// Run the first event
			context.onEvent(eventQueue[0]);

			// Run the queued events
			runEvents(1, eventQueue.length);
		}

		function runEvents(eIndex, max){
			if (eIndex >= max) {
				return;
			}
			else {
				setTimeout(function(){
					context.onEvent(eventQueue[eIndex]);
					runEvents(eIndex + 1, max);
				}, 5000);
			}
		}

	},
	showIsAsleepToast: function (){
		new Toast({text: 'Shhhh... ' + this.pet.petName + ' is asleep!'});
	}
});
