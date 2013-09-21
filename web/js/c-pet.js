Crafty.c("Pet", {
	// private pet variable
	pet: undefined,
	_Const: {
		ENERGY_THRESHOLD: 20,
		HUNGER_THRESHOLD: 70,
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
					this.pet.eat({
						type: 'apple',
						nutritionValue: 1
					});
					this.updateState('happy');
					new Toast({text: 'yummy'});
				}
				else {
					this.showIsAsleepToast();
				}
				break;
			case 'TALK_TO' :
				if (!this.pet.petState.isAsleep()) {
					this.pet.play({
						activityName: 'talk_to_the_pet',
						entertainmentValue: 1,
						energyValue: 0
					});
					this.updateState('happy');
					new Toast({text: 'Hi!'});
				}
				else {
					this.showIsAsleepToast();
				}
				break;
			case 'PLAY':
				if (!this.pet.petState.isAsleep()) {
					this.pet.play({
						activityName: 'baseball',
						entertainmentValue: 2,
						energyValue: 2
					});
					this.updateState('happy');
					new Toast({text: 'that was fun!'});
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
	_eventOccurence: {
		IS_TIRED : false,
		IS_HUNGRY : false,
		IS_BORED : false
	},
	calculatePetState: function(){
		if (this.pet.petState.isAsleep()) {
			return;
		}

		var eventQueue = [];

		var energyLevel = this.pet.calculateEnergy();
		var hungerLevel = this.pet.calculateHunger();
		var happinessLevel = this.pet.calculateHappiness();

		/*
			Queue events when the stat level is divisible by 10
			so that dialogs are not constantly appearing (and overlapping each other) on stage refresh

			Also, to avoid the fact that the state level may stay at a multiple of n
			for a long time, there is a check to see if the event already occured
			within the last 5 seconds
				
		*/
		if ((energyLevel % 10 === 0) && (energyLevel <= this._Const.ENERGY_THRESHOLD) && !this._eventOccurence.IS_TIRED) {
			eventQueue.push('IS_TIRED');
			this._eventOccurence.IS_TIRED = true;

			var context = this;
			setTimeout(function(){
				context._eventOccurence.IS_TIRED = false;
			}, 5000);
		}
		if (energyLevel === 0) {
			// TODO: Fix the fact that the pet can sleep while a dialog is showing
			eventQueue.push('SLEEP');
		}
		if ((hungerLevel % 10 === 0) && (hungerLevel >= this._Const.HUNGER_THRESHOLD) && !this._eventOccurence.IS_HUNGRY) {
			eventQueue.push('IS_HUNGRY');
			this._eventOccurence.IS_HUNGRY = true;

			var context = this;
			setTimeout(function(){
				context._eventOccurence.IS_HUNGRY = false;
			}, 5000);
		}
		if ((happinessLevel % 10 === 0) && (happinessLevel <= this._Const.HAPPINESS_THRESHOLD) && !this._eventOccurence.IS_BORED) {
			eventQueue.push('IS_BORED');
			this._eventOccurence.IS_BORED = true;

			var context = this;
			setTimeout(function(){
				context._eventOccurence.IS_BORED = false;
			}, 5000);
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
	},
});
