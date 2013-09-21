App.populator('page-login', function(page){
	
	console.log('app skeleton');
	
	$(page).find('#frankerz_loginButton')
		.on('click', function() {
			var errorDiv = document.getElementById('errorDiv');
			var username = document.frankerz_loginForm.username.value;
			username = username.trim();
			var password = document.frankerz_loginForm.password.value;

			if (username) {
				displayLoading(page);
				MyAPI.login(username, password, function (success, result) {
					if (success) {
						var user = new User (username, result);
						setMockUserSession(user);
						MyAPI.getPetListOfUser(result, function (success, result){
							if (success) {
								if (result.length > 0) App.load('page-pet-list');
								else App.load('page-pet-creation');
							} else {
								displayError(result);
								removeLoading(page);
							}
						});
					} else {
						displayError(result);
						removeLoading(page);
					}
				});
			} else {
				displayError('Please enter your username!');
			}

			return false;
		});
});

function displayError (error) {
	errorDiv.innerHTML = error;
} 