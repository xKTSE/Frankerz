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
		this.entertainment = new Entertainment (50, timeStamp);
		this.energy = new Energy (100, timeStamp);
	} else if (arguments.length === 4) {
		this.lifeCycle = lifeCycle;
		this.hunger = hunger;
		this.entertainment = entertainment;
		this.energy = energy;
		if (!this.validateArguments()) {
			displayErrorToast('Validation for the arguments of the Pet State object failed');
		}
	} else {
		displayErrorToast('Validation for the arguments of the Pet State object failed');
	}
}

PetState.prototype.sleep = false;

PetState.prototype.isAsleep = function () {
	return this.sleep;
}

PetState.prototype.validateArguments = function () {
	return this.lifeCycle.validateArguments() && 
			this.hunger.validateArguments() &&
			this.entertainment.validateArguments() &&
			this.energy.validateArguments();
}

function LifeCycle (lifeCycleValue, lastEvolved) {
	this.lifeCycleValue = lifeCycleValue;
	this.lastEvolved = lastEvolved;	
	if (!this.validateArguments()) {	
		displayErrorToast('Validation for the arguments of the LifeCycle object failed');
	}
}

LifeCycle.prototype.validateArguments = function () {
	if (areArgumentsNumbers(this.lifeCycleValue, this.lastEvolved)) {
		if (areArgumentsIntegers(this.lifeCycleValue, this.lastEvolved)) {
			if (this.lifeCycleValue >= lifeCycleEnum.BABY
				&& this.lifeCycleValue <= lifeCycleEnum.ADULT) {
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
		displayErrorToast('Validation for the arguments of the Hunger object failed');
	}
}

Hunger.prototype.validateArguments = function () {
	if (areArgumentsNumbers(this.hungerValue, this.lastAte)) {
		if (areArgumentsIntegers(this.hungerValue, this.lastAte)) {
			if (this.hungerValue >= 0
				&& this.hungerValue <= 100
				&& this.lastAte >= 0) {
				return true;
			}
		}
	}

	return false;
}

function Entertainment (entertainmentValue, lastPlayed) {
	this.entertainmentValue = entertainmentValue;
	this.lastPlayed = lastPlayed;
	if (!this.validateArguments()) {	
		displayErrorToast('Validation for the arguments of the Entertainment object failed');
	}
}

Entertainment.prototype.validateArguments = function () {
	if (areArgumentsNumbers(this.entertainmentValue, this.lastPlayed)) {
		if (areArgumentsIntegers(this.entertainmentValue, this.lastPlayed)) {
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
		displayErrorToast('Validation for the arguments of the Energy object failed');
	}
}

Energy.prototype.validateArguments = function () {
	if (areArgumentsNumbers(this.energyValue, this.lastSlept)) {
		if (areArgumentsIntegers(this.energyValue, this.lastSlept)) {
			if (this.energyValue >= 0
				&& this.energyValue <= 100
				&& this.lastSlept >= 0) {
				return true;
			}
		}
	}

	return false;
}