function User (username, userId) { /* userId | username */

	this.userId = userId;
	this.username = username;

	if (!this.validateArguments()) {
		displayErrorToast('Validation for the arguments of the User object failed');
	}

}

User.prototype.validateArguments = function () {
	if (typeof this.username == 'string' && typeof this.userId == 'number' && isInt(this.userId) && this.userId >= 1) {
		return true;
	}
	return false;
}