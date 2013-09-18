function displayErrorToast (msg) {
	var options = {text:msg};

	var toast = new Toast(options);
}

function isInt(n) {
   return n % 1 === 0;
}

function areArgumentsNumbers () {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] != 'number') return false;
	}
	return true;
}

function areArgumentsIntegers() {
	for (var i = 0; i < arguments.length; i++) {
		if (!isInt(arguments[i])) return false;
	}
	return true;
}