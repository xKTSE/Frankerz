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
	petEnergyValue smallint not null,
	petLastSaved bigint not null
);

CREATE TABLE petConfigs (
	petType smallint not null,
	petTypeName varchar(255) not null,
	lifeCycleValue smallint not null,
	lifeCycleRate real not null,
	hungerRate real not null,
	entertainmentRate real not null,
	energyRate real not null
);

CREATE TABLE food (
	id serial primary key,
	petType smallint[] not null,
	foodName varchar(255) not null,
	hungerDrop smallint not null
);

CREATE TABLE activities (
	id serial primary key,
	petType smallint[] not null,
	activityName varchar(255) not null,
	entertainmentIncrease smallint not null
);