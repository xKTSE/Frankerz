var typeArray = new Array();

var foodArray = new Array();

var activityArray = new Array();

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

function Pet (petId, petName, petType, petGender, userId, petState, petConfig) {
	
	this.petConfig = petConfig;
	this.petId = petId;
	this.petName = petName;
	this.petType = petType;
	this.petTypeName = determinePetTypeName(petType);
	this.petGender = petGender;
	this.petState = petState;
	this.userId = userId;

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the Pet object failed');
	}

	if (this.petId == null) {
		this.petState = new PetState();
	}

	// // Counters to indicate when to decrement/increment petState values
	// this.petStateCounters = {
	// 	HUNGER: 0,
	// 	HUNGER_MAX: 120, // CHANGE THIS TO A LARGER NUMBER LATER
	// 	ENERGY: 0,
	// 	ENERGY_MAX: 120,
	// 	HAPPY: 0,
	// 	HAPPY_MAX: 120
	// };
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
		&& typeof this.userId == 'number'
		&& this.petConfig instanceof PetConfig) {

		if (areArgumentsIntegers(this.petType, this.petGender, this.userId)) {
			if (this.petGender == genderEnum.MALE || this.petGender == genderEnum.FEMALE) {
				if (this.userId >= 1) {
					return true;
				}
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
	this.petState.entertainment.entertainmentValue -= this.petConfig.entertainmentRate;

	if (this.petState.entertainment.entertainmentValue < 0) {
		this.petState.entertainment.entertainmentValue = 0;
	}

	return this.petState.entertainment.entertainmentValue;
}

Pet.prototype.calculateHunger = function () {
	this.petState.hunger.hungerValue += this.petConfig.hungerRate;

	if (this.petState.hunger.hungerValue > 100) {
		this.petState.hunger.hungerValue = 100;
	}

	return this.petState.hunger.hungerValue;
}

Pet.prototype.calculateEnergy = function () {
	this.petState.energy.energyValue -= this.petConfig.energyRate;

	if (this.petState.energy.energyValue < 0) {
		this.petState.energy.energyValue = 0;
	}

	return this.petState.energy.energyValue;
}

Pet.prototype.DB_addPet = function (callback) {
	if (this.petId != null) {
		displayErrorToastNoFatal('Cannot add pet');
		return;
	} else {
		MyAPI.addPet(this, callback);
	}
}

Pet.prototype.DB_updatePet = function (callback) {
	if (this.petId == null) {
		displayErrorToastNoFatal('Cannot update pet');
		return;
	} else {
		MyAPI.updatePet(this, callback);
	}
}

Pet.prototype.DB_initFoodObjects = function () {
	DB_getFoodObjects(this.petType, function (success, errorStr, rows){
        if (success) {
        	frankerz_callbackCount++;
            console.log('success!');
        } else {
            console.log(errorStr);
        }
    });
}

Pet.prototype.DB_initActivityObjects = function () {
	DB_getActivityObjects(this.petType, function (success, errorStr, rows){
        if (success) {
        	frankerz_callbackCount++;
            console.log('success!');
        } else {
            console.log(errorStr);
        }
    });
}