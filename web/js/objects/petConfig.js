function PetConfig (lifeCycleRate, hungerRate, boredomRate, energyRate) {
	
	this.lifeCycleRate = null;
	this.hungerRate = null;
	this.boredomRate = null;
	this.energyRate = null;

}

PetConfig.prototype.validateArguments = function () {
	return false;
}