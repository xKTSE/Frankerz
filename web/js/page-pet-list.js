App.populator('page-pet-list', function(page){

	var userPetList = null;

	displayLoading(page);

    MyAPI.getPetListOfUser(mockUserSession.userId, function (success, result) {
        if (success) {
        	userPetList = result;
        	frankerz_callbackCount++;
        } else {
        	displayErrorToast(result);
        }
    });	

	if (petTypeArray.length == 0 ){

		setCallbackCheck(2);

		initializePetTypeArray(page);

	} else {

		setCallbackCheck(1);

	}


	functionToCallAfterDBCalls = function () {
		var ul = $(page).find('#userPetsList');
		for (var i = 0; i < userPetList.length; i++) {
			var li = document.createElement('li');
			var petTypeName = determinePetTypeName(userPetList[i].pettype);
			li.innerHTML = 'Name: ' + userPetList[i].petname + '; Type: ' + petTypeName;
			ul.append(li);
		}
		removeLoading(page);
	}

	frankerz_callbackInterval = setInterval(waitForCallbackComplete, 100);

	displaySignedInUser(page);

	$(page).find('#createNewPet')
		.on('click', function() {
			App.load('page-pet-creation');
		});

});