//Require the ORM
var orm = require('../config/orm.js');

//Export the Model
module.exports = {
	allBurgers		: burgers,
	wholeBurgers	: wholeBurgers,
	devouredBurgers	: devouredBurgers,
	create			: create,
	singleBurger	: singleBurger,
	update			: update
};

//Get all the Burgers Return Object with Whole and Devoured Burgers
function burgers(callBack) {
	var object = {};
	wholeBurgers(function(data) {
		object.whole = data;
		devouredBurgers(function(data) {
			object.devoured = data;
			callBack(object);
		});
	});
}

//Query the Database for Whole Burgers
function wholeBurgers(callBack) {
	orm.selectBurger('burgers', 'devoured', false, function(data) {
		callBack(data);
	});
}

//Query the Database for Devoured Burgers
function devouredBurgers(callBack) {
	orm.selectBurger('burgers', 'devoured', true, function(data) {
		callBack(data);
	});
}

//Query the Database for Single Burger
function singleBurger(burgers, callBack) {
	orm.selectOne('burgers', burgers, function(data) {
		callBack(data);
	});
}

//Update a Burger
function update(burgers, callBack) {
	orm.updateOne('burgers', 'devoured', true, burgers, function() {
		callBack();
	});
}

//Create a Burger
function create(burgers, callBack) {
	orm.insertOne('burgers', 'burger_name', burgers, function(){
		callBack();
	});
}