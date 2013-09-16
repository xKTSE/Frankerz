function PetConfig (lifeCycleRate, hungerRate, entertainmentRate, energyRate) {
	
	this.lifeCycleRate = lifeCycleRate; // percent stage increase per day
	this.hungerRate = hungerRate; // hunger points increase per minute
	this.entertainmentRate = entertainmentRate; // entertainment points decrease per minute
	this.energyRate = energyRate; // energy points decrease per minute

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