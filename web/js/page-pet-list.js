App.populator('page-pet-list', function(page){

	initializePetTypeArray(page);

	displaySignedInUser(page);

	$(page).find('#createNewPet')
		.on('click', function() {
			App.load('page-pet-creation');
		});

});