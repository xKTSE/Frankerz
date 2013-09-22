var frankerz_connectionString = process.env.DATABASE_URL || 'pg://postgres:root@localhost:5432/frankerz';

exports.checkUsername = function (username, password, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.CHECKUSERNAME::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM users WHERE username = $1::varchar(255)', [username], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			      console.error('EXPORTS.CHECKUSERNAME::Running Query', err);

			      callback(false, 'Error in database');
			    } else {
				    if (result.rows.length > 0) {
				    	callback(false, 'Username has been taken');
				    } else {
				    	callback(true);
				    }
			    }
			});
		}
	});	
}

exports.register = function (username, password, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.REGISTER::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
					console.error('EXPORTS.REGISTER::Running Query', err);

					callback(false, 'Error in database');
			    } else {
				    callback(true);
			    }
			});
		}
	});	
}

exports.login = function (username, password, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

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
				    	callback(true, result.rows[0].id);
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

	pg.connect(frankerz_connectionString, function(err, client, done) {

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

					callback(true, result.rows);

				}

			});
		}
	});
}

exports.addPet = function (pet, callback) {
	var pg = require('pg');

	var petState = pet.petState;

	var lastSaved = new Date().getTime();

	pg.connect(frankerz_connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.ADDPET::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('INSERT INTO pets (petname, petgender, pettype, petlifecycletime, petlifecyclevalue, pethungertime, pethungervalue, petentertainmenttime, petentertainmentvalue, petenergytime, petenergyvalue, ownerid, petlastsaved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id', 
				[pet.petName, pet.petGender, pet.petType, petState.lifeCycle.lastEvolved, petState.lifeCycle.lifeCycleValue, petState.hunger.lastAte, petState.hunger.hungerValue, petState.entertainment.lastPlayed, petState.entertainment.entertainmentValue, petState.energy.lastSlept, petState.energy.energyValue, pet.userId, lastSaved], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.ADDPET::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, result.rows[0].id);
			    }
			});
		}
	});
}

exports.checkPetName = function (petName, ownerId, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.CHECKPETNAME::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('SELECT * FROM pets WHERE petname = $1 AND ownerid = $2', [petName, ownerId], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.CHECKPETNAME::Running Query', err);
			      	callback(false, 'Error in database');
			    } else {
			    	if (result.rows.length == 0) {
			    		callback(true);
			    	} else {
			    		callback(false, 'Pet name for user already exists!');
			    	}
			    }
			});
		}
	});	
}

exports.updatePet = function (pet, callback) {
	var pg = require('pg');

	var petState = pet.petState;

	var lastSaved = new Date().getTime();

	pg.connect(frankerz_connectionString, function(err, client, done) {

		if (err) {
			console.error('EXPORTS.UPDATEPET::Connecting to the database', err);

			callback(false, 'Error in database');
		} else {
			client.query('UPDATE pets SET (petname, petgender, pettype, petlifecycletime, petlifecyclevalue, pethungertime, pethungervalue, petentertainmenttime, petentertainmentvalue, petenergytime, petenergyvalue, ownerid, petlastsaved) = ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) WHERE id = $1', 
				[pet.petId, pet.petName, pet.petGender, pet.petType, petState.lifeCycle.lastEvolved, petState.lifeCycle.lifeCycleValue, petState.hunger.lastAte, petState.hunger.hungerValue, petState.entertainment.lastPlayed, petState.entertainment.entertainmentValue, petState.energy.lastSlept, petState.energy.energyValue, pet.userId, lastSaved], function(err, result) {
			    //call 'done()' to release the client back to the pool
		    	done();

			    if(err) {
			    	console.error('EXPORTS.UPDATEPET::Running Query', err);

			      	callback(false, 'Error in database');
			    } else {
			    	callback(true, lastSaved)
			    }
			});
		}
	});	
}

exports.deletePet = function (petId, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

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

	pg.connect(frankerz_connectionString, function(err, client, done) {

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
			    	callback(true, result.rows)
			    }
			});
		}
	});		
}

exports.getPetConfig = function (petType, lifeCycleValue, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

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
			    	callback(true, result.rows[0])
			    }
			});
		}
	});	
}

exports.getFoodObjects = function (petType, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

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
			    	callback(true, result.rows)
			    }
			});
		}
	});	
}

exports.getActivityObjects = function (petType, callback) {
	var pg = require('pg');

	pg.connect(frankerz_connectionString, function(err, client, done) {

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
			    	callback(true, result.rows)
			    }
			});
		}
	});	
}