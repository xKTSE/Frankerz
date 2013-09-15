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
	return false;
}

function LifeCycle (lifeCycleValue, lastEvolved) {
	this.lifeCycleValue = lifeCycleValue;
	this.lastEvolved = lastEvolved;	
	if (!this.validateArguments()) {	
		displayErrorPage('Validation for the arguments of the LifeCycle object failed');
	}
}

LifeCycle.prototype.validateArguments = function () {
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
	return false;
}