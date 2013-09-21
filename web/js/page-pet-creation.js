App.populator('page-pet-creation', function(page){
	
	$(page).find('#fillIn')
		.html(mockUserSession);

	$(page).find('#loggedInAs')
		.on('click', displaySignOutBox);

});