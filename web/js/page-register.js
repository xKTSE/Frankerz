App.populator('page-register', function(page){
	
	console.log('app skeleton');

	$(page).find('#frankerz_registerButton')
		.on('click', function() {
			var errorDiv = document.getElementById('errorDiv');
			var username = document.frankerz_registerForm.username.value;
			username = username.trim();
			var password = document.frankerz_registerForm.password.value;

			if (username && password && password.length >= 8) {
				displayLoading(page);
				MyAPI.checkUsername(username, password, function (success, errorStr) {
					if (success) {
						MyAPI.register(username, password, function (){
							if (success) {
								App.load('page-register-successful');
							} else {
								displayError(errorStr);
								removeLoading(page);
							}
						});
					} else {
						displayError(errorStr);
						removeLoading(page);
					}
				});
			} else {
				if (password && password.length < 8) {
					displayError ('Password length must be at least 8 characters long');
				} else {
					displayError('Username and password field must be filled in');
				}
			}

			return false;
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