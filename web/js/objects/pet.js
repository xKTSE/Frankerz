var typeEnum = {
	TEST1 : 0,
	TEST2 : 1
}

var genderEnum = {
	MALE : 0,
	FEMALE : 1
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

	this.petConfig = new PetConfig();

	// Counters to indicate when to decrement/increment petState values
	this.petStateCounters = {
		HUNGER: 0,
		HUNGER_MAX: 10, // CHANGE THIS TO A LARGER NUMBER LATER
		ENERGY: 0,
		ENERGY_MAX: 10,
		HAPPY: 0,
		HAPPY_MAX: 10
	};
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
	this.petState.sleep = true;
	var timeStamp = new Date().getTime();

	var context = this;
	setTimeout(function(){
		// Reset energy level to 100 everytime pet falls asleep
		var newEnergyObject = new Energy (100, timeStamp);
		context.petState.energy = newEnergyObject;
		context.petState.sleep = false;

		// Pet will wake up after 1min 30s
	}, 90*1000);
}

Pet.prototype.play = function (activity) {
	var timeStamp = new Date().getTime();

	// Each time the pet plays an activity, its current entertainmentValue should increase by the activity's entertainmentValue
	var newEntertainedValue = this.petState.entertainment.entertainmentValue + activity.entertainmentValue;

	if (newEntertainedValue > 100) {
		newEntertainedValue = 100;
	}
	
	var newEntertainmentObject = new Entertainment (newEntertainedValue, timeStamp); 
	
	this.petState.entertainment = newEntertainmentObject;


	// Each time the pet plays, its energy level should decrease by a value
	this.petState.energy.energyValue -= activity.energyValue;
}

Pet.prototype.eat = function (food) {
	var timeStamp = new Date().getTime();

	// Each time the pet is feed, its hunger level should decrease
	var newHungerValue = this.petState.hunger.hungerValue - food.nutritionValue;

	if (newHungerValue < 0) {
		newHungerValue = 0;
	}

	var newHungerObject = new Hunger(newHungerValue, timeStamp);

	this.petState.hunger = newHungerObject;
}

Pet.prototype.calculateHappiness = function () {
	this.petStateCounters.HAPPY++;

	/*	The state counter should increase until a threshold.
		Upon reaching the threshold, the state value should decr/incr accordingly
		The counter should then reset
	*/
	if (this.petStateCounters.HAPPY >= this.petStateCounters.HAPPY_MAX) {
		this.petState.entertainment.entertainmentValue -= this.petConfig.entertainmentRate;

		if (this.petState.entertainment.entertainmentValue < 0) {
			this.petState.entertainment.entertainmentValue = 0;
		}


		this.petStateCounters.HAPPY = 0;
	}

	return this.petState.entertainment.entertainmentValue;
}

Pet.prototype.calculateHunger = function () {
	
	this.petStateCounters.HUNGER++;

	if (this.petStateCounters.HUNGER >= this.petStateCounters.HUNGER_MAX) {
		this.petState.hunger.hungerValue += this.petConfig.hungerRate;

		if (this.petState.hunger.hungerValue > 100) {
			this.petState.hunger.hungerValue = 100;
		}

		this.petStateCounters.HUNGER = 0;
	}

	return this.petState.hunger.hungerValue;
}

Pet.prototype.calculateEnergy = function () {

	this.petStateCounters.ENERGY ++;

	if (this.petStateCounters.ENERGY >= this.petStateCounters.ENERGY_MAX) {
		this.petState.energy.energyValue -= this.petConfig.energyRate;

		if (this.petState.energy.energyValue < 0) {
			this.petState.energy.energyValue = 0;
		}

		this.petStateCounters.ENERGY = 0;
	}

	return this.petState.energy.energyValue;
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