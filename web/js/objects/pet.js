var typeEnum = {
	TEST1 : 0,
	TEST2 : 1
}

var genderEnum = {
	MALE : 0,
	FEMALE : 1
}

var foodEnum = {
	TEST1 : 20,
	TEST2 : 5
}

var activityEnum = {
	TEST1 : 20,
	TEST2 : 5
}

var lifeCycleEnum = {
	BABY : 0,
	CHILD : 1,
	TEEN : 2,
	ADULT : 3
}

function Pet () { /* petName, petType, petGender | petId */

	this.petId = null;
	this.petName = null;
	this.petType = null;
	this.petGender = null;
	this.petState = null;

	if (arguments.length == 3) {
		this.petName = arguments[0];
		this.petType = arguments[1];
		this.petGender = arguments[2];

		if (!this.validateArguments()) {
			displayErrorToast('Validation for the arguments of the Pet object failed');
		}

		this.petState = new PetState();
	} else if (arguments.length == 1) {
		this.petId = arguments[0];
		this.petName = this.DB_getPetName();
		this.petType = this.DB_getPetType();
		this.petGender = this.DB_getPetGender();
		this.petState = this.DB_getPetState();
	} else {
		displayErrorToast('Wrong number of arguments for the pet object');
	}

	this.petConfig = this.DB_getPetConfig();
}

Pet.prototype.validateArguments = function () {
	if (typeof this.petName == 'string'
		&& typeof this.petType == 'number'
		&& typeof this.petGender == 'number') {

		if (this.petType == typeEnum.TEST1 || this.petType == typeEnum.TEST2) {
			if (this.petGender == genderEnum.MALE || this.petGender == genderEnum.FEMALE) {
				return true;				
			}
		}
	}
	return false;
}

Pet.prototype.sleep = function () {
	var timeStamp = new Date().getTime();

	var energy = this.petState.energy;

	var energy = new Energy (100, timeStamp);

	this.petState.energy = energy;
}

Pet.prototype.play = function (activityEnum) {
	var timeStamp = new Date().getTime();

	var entertainmentValue = this.petState.entertainment.entertainmentvalue;

	var entertainment = new Entertainment (entertainmentValue, timeStamp);

	this.petState.entertainment = entertainment;
}

Pet.prototype.eat = function (foodEnum) {
	var timeStamp = new Date().getTime();

	var hungerValue = this.petState.hunger.hungerValue;

	var hunger = new Hunger (foodEnum, timeStamp);

	this.petState.hunger = hunger;
}

Pet.prototype.calculateHappiness = function () {
	return 100;
}

Pet.prototype.calculateHunger = function () {
	return 100;
}

Pet.prototype.calculateEnergy = function () {
	return 100;
}

Pet.prototype.alertHunger = function () {
	return 0;
}

Pet.prototype.alertPlay = function () {
	
}

Pet.prototype.DB_save = function () {
	return false;
}

Pet.prototype.DB_getPetState = function () {
	return false;
}

Pet.prototype.DB_getPetConfig = function () {
	return false;
}

Pet.prototype.DB_getPetName = function () {
	return false;
}

Pet.prototype.DB_getPetType = function () {
	return false;
}

Pet.prototype.DB_getPetGender = function () {
	return false;
}