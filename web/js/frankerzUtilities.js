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
			alert('success!');
        } else {
            alert(errorStr);
        }
   });
}

function DB_updatePet(pet) {
    MyAPI.updatePet(pet, function (success, errorStr, id) {
        if (success) {
            alert('success!');
        } else {
            alert(errorStr);
        }
   });	
}

function DB_deletePet(petId) {
	MyAPI.deletePet(petId, function (success, errorStr, rows) {
        if (success) {
            alert('success!');
        } else {
            alert(errorStr);
        }
   });	
}

function DB_getPetListOfUser(ownerId) {
    MyAPI.getPetListOfUser(ownerId, function (success, errorStr, rows) {
        if (success) {
        	alert(rows.length);
            alert('success!');
        } else {
            alert(errorStr);
        }
   });	
}