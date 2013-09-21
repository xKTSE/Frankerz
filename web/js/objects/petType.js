function PetType (petType, petTypeName) {
	this.petType = petType;
	this.petTypeName = petTypeName;

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the PetType object failed');
	}

}

PetType.prototype.validateArguments = function () {
	if (typeof this.petTypeName == 'string' && typeof this.petType == 'number' && isInt(this.petType) && this.petType >= 0) {
		return true;
	}
	return false;
}