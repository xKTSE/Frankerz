var typeEnum = {
	TEST : 0,
	TEST2 : 1
}

var genderEnum = {
	MALE : 0,
	FEMALE : 1
}

function Pet (petId, petName, petType, petGender) {

	this.petId = null;
	this.petName = null;
	this.petType = null;
	this.petGender = null;
	this.petState = null;

	if (this.validateArguments) {
		this.petName = petName;
		this.petType = petType;
		this.petGender = petGender;		
	} else {
		displayErrorPage();
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
	return false;
}