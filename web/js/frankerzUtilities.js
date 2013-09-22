function displayLoading (page) {
    var blocker = document.createElement('div');
    var spinner = document.createElement('img');

    blocker.id = 'blocker';

    spinner.src = 'images/ajax-loader.gif';
    spinner.id = 'spinner';

    blocker.appendChild(spinner);

    if (arguments.length == 0 ) $('.app-page').find('.app-content').append(blocker);
    else $(page).find('.app-content').append(blocker);
}

function removeLoading (page) {
    if (arguments.length == 0) $('.app-page').find('#blocker').remove();
    else $(page).find('#blocker').remove();
}

function displayNotificationToast (msg) {
    var options = {text:msg};

    var toast = new Toast(options);
}

function displayErrorToast (msg) {
	var options = {text:msg};

	var toast = new Toast(options);

	throw new Error('Stop execution');
}

function displayErrorToastNoFatal (msg) {
    var options = {text:msg};

    var toast = new Toast(options);   
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
		'entertainment value: ' + pet.petState.entertainment.entertainmentValue  + '\n' + '\n' +
        'lifeCycle rate: ' + pet.petConfig.lifeCycleRate + '\n' + '\n' +
        'hunger rate: ' + pet.petConfig.hungerRate + '\n' + '\n' +
        'entertainment rate: ' + pet.petConfig.entertainmentRate + '\n' + '\n' +
        'energy rate: ' + pet.petConfig.energyRate);
}

function DB_addPet(pet) {
    MyAPI.addPet(pet, function (success, result) {
        if (success) {
            frankerz_callbackCount++;
			pet.petId = result;
        } else {
            displayErrorToast(result);
        }
   });
}

function DB_updatePet(pet) {
    MyAPI.updatePet(pet, function (success, result) {
        if (success) {
            frankerz_callbackCount++;
            console.log('success!');
        } else {
            displayErrorToast(result);
        }
   });	
}

function DB_deletePet(petId) {
	MyAPI.deletePet(petId, function (success, result) {
        if (success) {
            console.log('success!');
        } else {
            console.log(errorStr);
        }
   });	
}

function DB_getPetListOfUser(ownerId) {
    MyAPI.getPetListOfUser(ownerId, function (success, result) {
        if (success) {
        	console.log(rows.length);
            console.log('success!');
        } else {
            console.log(errorStr);
        }
   });	
}

function DB_getPetTypes() {
    MyAPI.getPetTypes(function (success, result){
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
var mockUserSession = null;
var petTypeArray = new Array();
var functionToCallAfterDBCalls = function () {return false;};
var globalPage = null;
var globalPet = null;

function setCallbackCheck(callbackCheck) {
    frankerz_callbackCheck = callbackCheck;
}

function waitForCallbackComplete() {
    if (frankerz_callbackCheck == 0) {
        clearInterval(frankerz_callbackInterval);
        displayErrorToast ('Callback check is 0');
    } else {
        if (frankerz_callbackCount == frankerz_callbackCheck) {
            clearInterval(frankerz_callbackInterval);
            // reset
            frankerz_callbackCount = 0;
            frankerz_callbackCheck = 0;

            functionToCallAfterDBCalls();
            functionToCallAfterDBCalls = function () {};
        }
    }
}

function setMockUserSession (user) {
    mockUserSession = user;
}

function signOut () {
    mockUserSession = null;
}

function displaySignOutBox () {
   App.dialog({
        title   : 'Logout?',
        successButton   : 'Yes' ,
        cancelButton    : 'No' ,
        }, function (choice) {
        if (choice === 'success') {
            signOut();
            App.load('page-login');
            App.removeFromStack();
        }
        else {
            return;
        }
    });
}

function displaySignedInUser (page) {
    $(page).find('#fillIn')
        .html(mockUserSession.username);

    $(page).find('#loggedInAs')
        .on('click', displaySignOutBox);
}

function initializePetTypeArray (page) {
    MyAPI.getPetTypes( function(success, result) {
        if (success && result.length > 0) {
            var types = new Array();
            for (var i = 0; i < result.length; i++) {
                if (types.indexOf(result[i].pettype) == -1) {
                    petTypeArray.push(new PetType(result[i].pettype, result[i].pettypename));
                    types.push(result[i].pettype);
                }
            }
            frankerz_callbackCount++;
            console.log('pet type array initialized from database');
        } else {
            displayErrorToast('Loading application data failed');
        }
    });
}

function determinePetTypeName(pettype) {
    for (var i = 0; i < petTypeArray.length; i++) {
        if (pettype == petTypeArray[i].petType) return petTypeArray[i].petTypeName;
    }

    displayErrorToast('Unknown pet type: ' + pettype );
}