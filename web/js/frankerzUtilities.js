function displayErrorToast (msg) {
	var options = {text:msg};

	var toast = new Toast(options);

	throw new Error('Stop execution');
}

function isInt(n) {
   return n % 1 === 0;
}

function areArgumentsNumbers () {
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] != 'number') return false;
	}
	return true;
}

function areArgumentsIntegers() {
	for (var i = 0; i < arguments.length; i++) {
		if (!isInt(arguments[i])) return false;
	}
	return true;
}

function printPet(pet) {
	alert('pet name: ' + pet.petName + '\n' + '\n' +
		'pet type: ' + pet.petType + '\n' + '\n' +
		'pet gender: ' + pet.petGender + '\n' + '\n' +
		'user id: ' + pet.userId + '\n' + '\n' +
		'pet id: ' + pet.petId + '\n' + '\n' +
		'life cycle last slept: ' + pet.petState.lifeCycle.lastEvolved + '\n' + '\n' +
		'life cycle value: ' + pet.petState.lifeCycle.lifeCycleValue + '\n' + '\n' +
		'energy last slept: ' + pet.petState.energy.lastSlept + '\n' + '\n' +
		'energy value: ' + pet.petState.energy.energyValue + '\n' + '\n' +
		'hunger last slept: ' + pet.petState.hunger.lastAte + '\n' + '\n' +
		'hunger value: ' + pet.petState.hunger.hungerValue + '\n' + '\n' +
		'entertainment last slept: ' + pet.petState.entertainment.lastPlayed + '\n' + '\n' +
		'entertainment value: ' + pet.petState.entertainment.entertainmentValue);
}

function DB_addPet(pet) {
    MyAPI.addPet(pet, function (success, errorStr, id) {
        if (success) {
			pet.petId = id;
			console.log('success!');
        } else {
            console.log(errorStr);
        }
   });
}

function DB_updatePet(pet) {
    MyAPI.updatePet(pet, function (success, errorStr, id) {
        if (success) {
            console.log('success!');
        } else {
            console.log(errorStr);
        }
   });	
}

function DB_deletePet(petId) {
	MyAPI.deletePet(petId, function (success, errorStr, rows) {
        if (success) {
            console.log('success!');
        } else {
            console.log(errorStr);
        }
   });	
}

function DB_getPetListOfUser(ownerId) {
    MyAPI.getPetListOfUser(ownerId, function (success, errorStr, rows) {
        if (success) {
        	console.log(rows.length);
            console.log('success!');
        } else {
            console.log(errorStr);
        }
   });	
}

function DB_getPetTypes() {
    MyAPI.getPetTypes(function (success, errorStr, rows){
        if (success) {
            var types = new Array();
            for (var i = 0; i < rows.length; i++) {
                if (types.indexOf(rows[i].pettype) == -1) types.push(rows[i].pettype);
            }
            console.log(types[0]);
            console.log('success!');
        } else {
            console.log(errorStr);
        }
    });
}

function DB_getPetConfig(petType, lifeCycleValue, callback) {
    MyAPI.getPetConfig(petType, lifeCycleValue, callback);
}

function DB_getFoodObjects(petType, callback) {
    MyAPI.getFoodObjects(petType, callback);
}

function DB_getActivityObjects(petType, callback) {
    MyAPI.getActivityObjects(petType, callback);
}

var frankerz_callbackCount = 0;
var frankerz_callbackCheck = null;
var frankerz_callbackInterval = null;

function setCallbackCheck(callbackCheck) {
    frankerz_callbackCheck = callbackCheck;
}

function waitForCallbackComplete() {
    if (frankerz_callbackCount == frankerz_callbackCheck) {
        alert('callbacks completed!');
        clearInterval(frankerz_callbackInterval);
    }
}