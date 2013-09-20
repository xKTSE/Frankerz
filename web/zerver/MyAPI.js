exports.login = function (username, password, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.LOGIN::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM users WHERE username = $1::varchar(255)', [username], function(err, result) {
			    //call `done()` to release the client back to the pool
		    	done();

			    if(err) {
			      console.log('EXPORTS.LOGIN::Running Query');

			      callback(false, 'Error in database');
			    } else {
				    if (result.rows.length == 0) {
				    	callback(false, 'No such username');
				    } else if (result.rows[0].password !== password) {
				    	callback(false, 'Passwords do not match');
				    	console.error(result.rows[0].password);
				    } else {
				    	callback(true);
				    }
			    }
			});
		}
	});
};

/*
	<script>
		$(function() {
			$(document.frankerz_loginForm.loginButton).click(function() {
				var username = document.frankerz_loginForm.username.value;
				var password = document.frankerz_loginForm.password.value;

				if (username) {
					MyAPI.login('kappa', 'password', function (success, errorStr) {
						if (success) {
							alert('success!');
						} else {
							alert(errorStr);
						}
					});
				} else {
					alert('Please enter your username!');
				}

				return false;
			});
		});
	</script>


	<form name="frankerz_loginForm">
		Username: <input type="text" name="username"><br>
		Password: <input type="text" name="password">
		<input type="submit" value="Submit" name="loginButton">
	</form>
*/