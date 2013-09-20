function User () { /* userId | userName */

	this.userId = null;
	this.userName = null;
	this.petArray = null;

	if (arguments.length == 1) {
		if (typeof arguments[0] == 'string') {
			this.userName = userName;
		} else if (typeof arguments[0] == 'number' && arguments[0] >= 1) {
			this.userId = userId;
		} else {
			displayErrorToast('Argument for the user object is of the wrong type');
		}
	} else {
		displayErrorToast('Wrong number of arguments for the user object');
	}

	this.petArray = this.DB_getPets();

}

User.prototype.DB_getPets = function () {
	return false;
}