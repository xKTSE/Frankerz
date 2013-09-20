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

function Pet (petId, petName, petType, petGender, userId, petState) {

	this.petId = null;
	this.petName = null;
	this.petType = null;
	this.petGender = null;
	this.petState = null;
	this.userId = null;
	this.petConfig = null;

	this.petId = petId;
	this.petName = petName;
	this.petType = petType;
	this.petGender = petGender;
	this.petState = petState;
	this.userId = userId;

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the Pet object failed');
	}

	if (this.petId == null) {
		this.petState = new PetState();
	}

	// this.DB_save();

	this.petConfig = this.DB_getPetConfig();
}

Pet.prototype.validateArguments = function () {
	if (!(this.petId == null || (typeof this.petId == 'number' && isInt(this.petId) && this.petId >= 1))) {
		return false;
	}

	if (typeof this.petId == 'number' && isInt(this.petId) && this.petId >= 1) {
		if (!(this.petState instanceof PetState)) {
			return false;
		}
	}

	if (typeof this.petName == 'string'
		&& typeof this.petType == 'number'
		&& typeof this.petGender == 'number'
		&& typeof this.userId == 'number') {

		if (this.petType == typeEnum.TEST1 || this.petType == typeEnum.TEST2) {
			if (this.petGender == genderEnum.MALE || this.petGender == genderEnum.FEMALE) {
				if (isInt(this.userId) && this.userId >= 1) {
					return true;
				}
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
	return 0;
}

Pet.prototype.alertHunger = function () {
	return 0;
}

Pet.prototype.alertPlay = function () {
	return 0;
}

Pet.prototype.DB_save = function () {
	if (this.petId == null) {
		DB_addPet(this);
	} else {
		DB_updatePet(this);
	}
	return false;
}

Pet.prototype.DB_getPetState = function () {
	return false;
}

Pet.prototype.DB_getPetConfig = function () {
	return false;
}