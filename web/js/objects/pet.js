var typeEnum = {
	TEST : 0,
	TEST2 : 1
}

var genderEnum = {
	MALE : 0,
	FEMALE : 1
}

function Pet (petName, petType, petGender, petId) {

	this.petId = null;
	this.petName = null;
	this.petType = null;
	this.petGender = null;
	this.petState = null;

	this.petName = petName;
	this.petType = petType;
	this.petGender = petGender;		

	if (!this.validateArguments()) {
		displayErrorPage('Validation for the arguments of the Pet object failed');
	}

	if (typeof petId == 'undefined') petState = new PetState();
	else petState = this.getPetStateFromDatabase();
}

Pet.prototype.saveToDatabase = function () {
	return false;
}

Pet.prototype.getPetStateFromDatabase = function () {
	return false;
}

Pet.prototype.validateArguments = function () {
	if (typeof this.petName == 'string'
		&& typeof this.petType == 'number'
		&& typeof this.petGender == 'number') {

		if (this.petType == typeEnum.TEST || this.petType == typeEnum.TEST2) {
			if (this.petGender == genderEnum.MALE || this.petGender == genderEnum.FEMALE) {
				return true;				
			}
		}
	}
	return false;
}