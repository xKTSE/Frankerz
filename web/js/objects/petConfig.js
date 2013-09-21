function PetConfig (lifeCycleRate, hungerRate, entertainmentRate, energyRate) {
	
	this.lifeCycleRate = lifeCycleRate; // percent stage increase per day
	this.hungerRate = hungerRate || testFallbackValues.TEST_HUNGER_RATE; // hunger points increase per minute
	this.entertainmentRate = entertainmentRate || testFallbackValues.TEST_ENTERTAINMENT_RATE; // entertainment points decrease per minute
	this.energyRate = energyRate || testFallbackValues.TEST_ENERGY_RATE; // energy points decrease per minute

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the PetConfig object failed');
	}

}

PetConfig.prototype.validateArguments = function () {
	if (areArgumentsNumbers(this.lifeCycleRate, this.hungerRate, this.entertainmentRate, this.energyRate)) {
		if (this.lifeCycleRate <= 100 && this.lifeCycleRate >= 0
			&& this.hungerRate >= 0
			&& this.entertainmentRate >= 0
			&& this.energyRate >= 0) {
			return true;
		}
	}
	return false;
}

var testFallbackValues = {
	TEST_HUNGER_RATE: 1,
	TEST_ENTERTAINMENT_RATE: 1,
	TEST_ENERGY_RATE: 1
}