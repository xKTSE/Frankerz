App.populator('page-login', function(page){
	
	console.log('app skeleton');

	$(page).ready (function () {
		var errorDiv = document.getElementById('errorDiv');
		$('#frankerz_loginButton').click(function() {
			var username = document.frankerz_loginForm.username.value;
			var password = document.frankerz_loginForm.password.value;

			if (username) {
				displayLoading(page);
				MyAPI.login(username, password, function (success, errorStr) {
					if (success) {
						App.load('page-pet-creation');
					} else {
						displayError(errorStr);
						removeLoading(page);
					}
				});
			} else {
				displayError('Please enter your username!');
			}

			return false;
		});
	});
});

function displayError (error) {
	errorDiv.innerHTML = error;
} 