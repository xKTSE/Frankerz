App.populator('page-pet-creation', function(page){

	selectedPetType = null;

	globalPage = page;

	if (petTypeArray.length == 0 ){

		setCallbackCheck(1);

		displayLoading(page);

		initializePetTypeArray(page);

		functionToCallAfterDBCalls = displayPetType;

		frankerz_callbackInterval = setInterval(waitForCallbackComplete, 100);

	} else {
		displayPetType(page);
	}
		
	displaySignedInUser(page);

});

function displayPetType () {

	var ul = $(globalPage).find('#petList');
    
    var li = null;

    for (var i = 0; i < petTypeArray.length; i++) {
        li = document.createElement('li');
        if (i == 0) {
        	li.id = 'selectedPetType';
        	$(li).data("petType", petTypeArray[i].petType);
        }
        li.innerHTML = petTypeArray[i].petTypeName;
        li.onclick = petTypeSelect;
        ul.append(li);
    }

    selectedPetType = 0;

    createPetButton = $(globalPage).find('#create-pet');

    createPetButton
		.on('click', function() {
			var petName = document.frankerz_addPetForm.petName.value;

			var male = document.getElementById("male").checked;
			var female = document.getElementById("female").checked;
			var petGender = null;
			var petType = null;

			if (petName == '') {
				displayErrorToast('Please enter a pet name');
			} else if (!male && !female) {
				displayErrorToast('Please choose a gender');
			}

			if (male) petGender = genderEnum.MALE;
			else petGender = genderEnum.FEMALE;

			displayLoading();

			functionToCallAfterDBCalls = function () {
				removeLoading();
				printPet(pet);
			}

			frankerz_callbackInterval = setInterval(waitForCallbackComplete, 100);

			pet = new Pet(null, petName, selectedPetType, petGender, mockUserSession.userId);
		});		

	removeLoading();

}

function petTypeSelect () {
    if (this.id != 'selectedPetType') {
        var previousSelectedPetType = document.getElementById('selectedPetType');
        previousSelectedPetType.id = '';
        this.id = 'selectedPetType';

        selectedPetType = $(this).data("petType");
    }
}