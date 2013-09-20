CREATE TABLE users (
	id serial primary key,
	username varchar(255) not null,
	password varchar(255) not null
);

CREATE TABLE pets (
	id serial primary key,
	ownerId smallint not null,
	petName varchar(255) not null,
	petGender smallint not null,
	petType smallint not null,
	petLifecycleTime bigint not null,
	petLifecycleValue smallint not null,
	petHungerTime bigint not null,
	petHungerValue smallint not null,
	petEntertainmentTime bigint not null,
	petEntertainmentValue smallint not null,
	petEnergyTime bigint not null,
	petEnergyValue smallint not null
);