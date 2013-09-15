var lifeCycleEnum = {
	BABY : 0,
	CHILD : 1,
	TEEN : 2,
	ADULT : 3
}

function PetState (lifeCycle, hunger, entertainment, energy) {
	this.timeStamp = new Date();

	this.lifeCycle = null;
	this.hunger = null;
	this.entertainment = null;
	this.energy = null;

	if (arguments.length === 0) {
		// first initialization of pet state
		this.lifeCycle = new LifeCycle (lifeCycleEnum.BABY, this.timeStamp);
		this.hunger = new Hunger (50, this.timeStamp);
		this.entertainment = new Entertained (50, this.timeStamp);
		this.energy = new Energy (100, this.timeStamp);
	} else if (arguments.length === 4) {
		if (this.validateArguments) {
			this.lifeCycle = lifeCycle;
			this.hunger = hunger;
			this.entertainment = entertainment;
			this.energy = energy;			
		} else {
			displayErrorPage();
		}
	} else {
		displayErrorPage();
	}
}

PetState.prototype.calculateHappiness = function () {
	return 0;
}

PetState.prototype.validateArguments = function () {
	return false;
}

function LifeCycle (lifeCycleValue, lastEvolved) {
	if (this.validateArguments) {
		this.lifeCycleValue = lifeCycleValue;
		this.lastEvolved = lastEvolved;		
	} else {
		displayErrorPage();
	}
}

LifeCycle.prototype.validateArguments = function () {
	return false;
}

function Hunger (hungerValue, lastAte) {
	if (this.validateArguments) {
		this.hungerValue = hungerValue;
		this.lastAte = lastAte;
	} else {
		displayErrorPage();
	}
}

Hunger.prototype.validateArguments = function () {
	return false;
}

function Entertained (entertainmentValue, lastPlayed) {
	if (this.validateArguments) {
		this.entertainmentValue = entertainmentValue;
		this.lastPlayed = lastPlayed;
	} else {
		displayErrorPage();
	}
}

Entertained.prototype.validateArguments = function () {
	return false;
}

function Energy (energyValue, lastPlayed) {
	if (this.validateArguments) {
		this.energyValue = energyValue;
		this.lastPlayed = lastPlayed;
	} else {
		displayErrorPage();
	}
}

Energy.prototype.validateArguments = function () {
	return false;
}