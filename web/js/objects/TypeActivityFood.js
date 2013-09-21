function Type (petType, petTypeName) {
	this.petType = petType;
	this.petTypeName = petTypeName;

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the Pet State object failed');
	}
}

Type.prototype.validateArguments = function () {
	if (typeof this.petType == 'number' && isInt(this.petType) && typeof this.petTypeName == 'string') {
		return true;
	}
	return false;
}

function Activity (activityName, this.entertainmentIncrease) {
	this.activityName = activityName;
	this.entertainmentIncrease = entertainmentIncrease;
}

Activity.prototype.validateArguments = function () {
	if (typeof this.entertainmentIncrease == 'number' && isInt(this.entertainmentIncrease) && typeof this.activityName == 'string') {
		return true;
	}
	return false;
}

function Food (foodName, hungerDrop) {
	this.foodName = foodName;
	this.hungerDrop = hungerDrop;
}

Food.prototype.validateArguments = function () {
	if (typeof this.hungerDrop == 'number' && isInt(this.hungerDrop) && typeof this.foodName == 'string') {
		return true;
	}
	return false;
}