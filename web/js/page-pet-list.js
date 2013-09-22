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
		var ul = $(page).find('#userPetList');
		for (var i = 0; i < userPetList.length; i++) {
			var li = document.createElement('li');
			var petTypeName = determinePetTypeName(userPetList[i].pettype);
			li.innerHTML = 'Name: ' + userPetList[i].petname + '; Type: ' + petTypeName;
			$(li).data("userPetListIndex", i);
			li.onclick = function () {
				var index = $(this).data("userPetListIndex");

				var petRow = userPetList[index];

				displayLoading();

				functionToCallAfterDBCalls = function () {
					App.load('page-game');
				}

				setCallbackCheck(1);

				frankerz_callbackInterval = setInterval(waitForCallbackComplete, 100);

				var petState = new PetState(new LifeCycle(petRow.petlifecyclevalue, parseInt(petRow.petlifecycletime)), new Hunger(petRow.pethungervalue, parseInt(petRow.pethungertime)), new Entertainment(petRow.petentertainmentvalue, parseInt(petRow.petentertainmenttime)), new Energy(petRow.petenergyvalue, parseInt(petRow.petenergytime)));

				globalPet = new Pet(petRow.id, petRow.petname, petRow.pettype, petRow.petgender, mockUserSession.userId, petState, false);
			}
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