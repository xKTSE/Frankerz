exports.login = function (username, password, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	console.log('test');

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.LOGIN::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM users WHERE username = $1::varchar(255)', [username], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			      console.error('EXPORTS.LOGIN::Running Query', err);

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
					MyAPI.login(username, password, function (success, errorStr) {
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

exports.getPetListOfUser = function (ownerId, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.GETPETLISTOFUSER::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM pets WHERE ownerid = $1', [ownerId], function(err, result) {

				done();

				if (err) {

					console.error('EXPORTS.GETPETLISTOFUSER::Running Query', err);

					callback(false, 'Error in database');

				} else {

					callback(true, 'Successfully retrieved all pets belonging to user', result.rows);

				}

			});
		}
	});
}

exports.addPet = function (pet, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	var petState = pet.petState;

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.ADDPET::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('INSERT INTO pets (petname, petgender, pettype, petlifecycletime, petlifecyclevalue, pethungertime, pethungervalue, petentertainmenttime, petentertainmentvalue, petenergytime, petenergyvalue, ownerid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id', 
				[pet.petName, pet.petType, pet.petGender, petState.lifeCycle.lastEvolved, petState.lifeCycle.lifeCycleValue, petState.hunger.lastAte, petState.hunger.hungerValue, petState.entertainment.lastPlayed, petState.entertainment.entertainmentValue, petState.energy.lastSlept, petState.energy.energyValue, pet.userId], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.ADDPET::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully added pet to database', result.rows[0].id);
			    }
			});
		}
	});
}

exports.updatePet = function (pet, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	var petState = pet.petState;

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.UPDATEPET::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('UPDATE pets SET (petname, petgender, pettype, petlifecycletime, petlifecyclevalue, pethungertime, pethungervalue, petentertainmenttime, petentertainmentvalue, petenergytime, petenergyvalue, ownerid) = ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) WHERE id = $1', 
				[pet.petId, pet.petName, pet.petType, pet.petGender, petState.lifeCycle.lastEvolved, petState.lifeCycle.lifeCycleValue, petState.hunger.lastAte, petState.hunger.hungerValue, petState.entertainment.lastPlayed, petState.entertainment.entertainmentValue, petState.energy.lastSlept, petState.energy.energyValue, pet.userId], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.UPDATEPET::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully updated pet in database')
			    }
			});
		}
	});	
}

exports.deletePet = function (petId, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.DELETEPET::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('DELETE FROM pets WHERE id = $1', [petId], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.DELETEPET::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully deleted pet from database')
			    }
			});
		}
	});	
}

exports.getPetTypes = function (callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.GETPETTYPES::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM petConfigs', function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.GETPETTYPES::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully retrieved all pet types', result.rows)
			    }
			});
		}
	});		
}

exports.getPetConfig = function (petType, lifeCycleValue, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.GETPETCONFIG::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM petConfigs WHERE petType = $1 AND lifeCycleValue = $2', [petType, lifeCycleValue], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.GETPETCONFIG::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully retrieved all pet types', result.rows)
			    }
			});
		}
	});	
}

exports.getFoodObjects = function (petType, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.GETFOODOJBECTS::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM food WHERE $1 = ANY(pettype)', [petType], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.GETFOODOJBECTS::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully retrieved all pet types', result.rows)
			    }
			});
		}
	});	
}

exports.getActivityObjects = function (petType, callback) {
	var pg = require('pg');

	var connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.GETACTIVITYOBJECTS::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM activities WHERE $1 = ANY(pettype)', [petType], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.GETACTIVITYOBJECTS::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, 'Successfully retrieved all pet types', result.rows)
			    }
			});
		}
	});	
}