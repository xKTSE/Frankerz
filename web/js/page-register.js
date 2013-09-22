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
				MyAPI.checkUsername(username, password, function (success, result) {
					if (success) {
						MyAPI.register(username, password, function (){
							if (success) {
								new Toast({
									text: 'Succesfully registered, please login.',
									duration: 3000
								})
								App.load('page-login');
								App.removeFromStack();
							} else {
								displayErrorToastNoFatal(result);
								removeLoading(page);
							}
						});
					} else {
						displayErrorToastNoFatal(result);
						removeLoading(page);
					}
				});
			} else {
				if (password && password.length < 8) {
					displayErrorToastNoFatal ('Password length must be at least 8 characters long');
				} else {
					displayErrorToastNoFatal('Username and password field must be filled in');
				}
			}

			return false;
		});
});