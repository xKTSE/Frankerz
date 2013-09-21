App.populator('page-register', function(page){
	
	console.log('app skeleton');

	$(page).ready (function () {
		var errorDiv = document.getElementById('errorDiv');
		$('#frankerz_registerButton').click(function() {
			var username = document.frankerz_registerForm.username.value;
			var password = document.frankerz_registerForm.password.value;

			if (username) {
				displayLoading(page);
				MyAPI.register(username, password, function (success, errorStr) {
					if (success) {
						App.load('page-register-successful');
					} else {
						displayError(errorStr);
						removeLoading(page);
					}
				});
			} else {
				displayError('Please select a username!');
			}

			return false;
		});
	});
});

function displayError (error) {
	errorDiv.innerHTML = error;
} 

              // setCallbackCheck(3);

               // var pet = new Pet(null, 'john', 0, genderEnum.MALE, 1);

               // pet.DB_initFoodObjects();

               // pet.DB_initActivityObjects();

               // frankerz_callbackInterval = setInterval(waitForCallbackComplete, 1000);