var lifeCycleEnum = {
	BABY : 0,
	CHILD : 1,
	TEEN : 2,
	ADULT : 3
}

function PetState (lifeCycle, hunger, entertainment, energy) {
	this.lifeCycle = null;
	this.hunger = null;
	this.entertainment = null;
	this.energy = null;

	if (arguments.length === 0) {
		// first initialization of pet state
		var timeStamp = new Date().getTime();
		this.lifeCycle = new LifeCycle (lifeCycleEnum.BABY, timeStamp);
		this.hunger = new Hunger (50, timeStamp);
		this.entertainment = new Entertained (50, timeStamp);
		this.energy = new Energy (100, timeStamp);
	} else if (arguments.length === 4) {
		this.lifeCycle = lifeCycle;
		this.hunger = hunger;
		this.entertainment = entertainment;
		this.energy = energy;
		if (!this.validateArguments()) {
			displayErrorPage('Validation for the arguments of the Pet State object failed');
		}
	} else {
		displayErrorPage('Validation for the arguments of the Pet State object failed');
	}
}

PetState.prototype.calculateHappiness = function () {
	return 0;
}

PetState.prototype.validateArguments = function () {
	if (typeof this.lifeCycle.validateArguments != 'function' 
		|| typeof this.hunger.validateArguments != 'function' 
		|| typeof this.entertainment.validateArguments != 'function' 
		|| typeof this.energy.validateArguments != 'function') {

		return false;
	} else {
		return this.lifeCycle.validateArguments() && 
				this.hunger.validateArguments() &&
				this.entertainment.validateArguments() &&
				this.energy.validateArguments();
	}
}

function LifeCycle (lifeCycleValue, lastEvolved) {
	this.lifeCycleValue = lifeCycleValue;
	this.lastEvolved = lastEvolved;	
	if (!this.validateArguments()) {	
		displayErrorPage('Validation for the arguments of the LifeCycle object failed');
	}
}

LifeCycle.prototype.validateArguments = function () {
	if (typeof this.lifeCycleValue == 'number' && typeof this.lastEvolved == 'number') {
		if (isInt(this.lifeCycleValue) && isInt(this.lastEvolved)) {
			if (this.lifeCycleValue >= lifeCycleEnum.BABY
				&& this.lifeCycleValue <= lifeCycleEnum.ADULT
				&& this.lastEvolved >= 0) {
				return true;
			}
		}
	}

	return false;
}

function Hunger (hungerValue, lastAte) {
	this.hungerValue = hungerValue;
	this.lastAte = lastAte;	
	if (!this.validateArguments()) {	
		displayErrorPage('Validation for the arguments of the Hunger object failed');
	}
}

Hunger.prototype.validateArguments = function () {
	if (typeof this.hungerValue == 'number' && typeof this.lastAte == 'number') {
		if (isInt(this.hungerValue) && isInt(this.lastAte)) {
			if (this.hungerValue >= 0
				&& this.hungerValue <= 100
				&& this.lastAte >= 0) {
				return true;
			}
		}
	}

	return false;
}

function Entertained (entertainmentValue, lastPlayed) {
	this.entertainmentValue = entertainmentValue;
	this.lastPlayed = lastPlayed;	
	if (!this.validateArguments()) {	
		displayErrorPage('Validation for the arguments of the Entertained object failed');
	}
}

Entertained.prototype.validateArguments = function () {
	if (typeof this.entertainmentValue == 'number' && typeof this.lastPlayed == 'number') {
		if (isInt(this.entertainmentValue) && isInt(this.lastPlayed)) {
			if (this.entertainmentValue >= 0
				&& this.entertainmentValue <= 100
				&& this.lastPlayed >= 0) {
				return true;
			}
		}
	}

	return false;
}

function Energy (energyValue, lastSlept) {
	this.energyValue = energyValue;
	this.lastSlept = lastSlept;	
	if (!this.validateArguments()) {	
		displayErrorPage('Validation for the arguments of the Energy object failed');
	}
}

Energy.prototype.validateArguments = function () {
	if (typeof this.energyValue == 'number' && typeof this.lastSlept == 'number') {
		if (isInt(this.energyValue) && isInt(this.lastSlept)) {
			if (this.energyValue >= 0
				&& this.energyValue <= 100
				&& this.lastSlept >= 0) {
				return true;
			}
		}
	}

	return false;
}