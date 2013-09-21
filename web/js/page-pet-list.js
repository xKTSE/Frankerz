App.populator('page-pet-list', function(page){

	if (petTypeArray.length == 0 ){

		setCallbackCheck(1);

		displayLoading(page);

		initializePetTypeArray(page);

		functionToCallAfterDBCalls = function () {
			removeLoading(page);
		}

		frankerz_callbackInterval = setInterval(waitForCallbackComplete, 100);

	}

	displaySignedInUser(page);

	$(page).find('#createNewPet')
		.on('click', function() {
			App.load('page-pet-creation');
		});

});