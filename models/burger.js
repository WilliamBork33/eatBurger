//Require the ORM
var orm = require('../config/orm.js');

//Export the model
module.exports = {
    allBurgers   : burgers,
    create       : create,
    singleBurger : singleBurger,
    update       : update,
    reOrder      : reOrder
};

//Get All the Burgers - An Object is Returned with Uneaten and Eaten Burgers
function burgers(callBack) {
    var object = {};
    uneatenBurgers(function(data) {
        object.uneaten = data;
        eatenBurgers(function(data) {
            object.eaten = data;
            callBack(object);
        });
    });
}

//Query the Database for Uneaten Burgers
function uneatenBurgers(callBack) {
    orm.selectScoped('burgers', 'devoured', 'false', function(data) {
        callBack(data);
    });
}

//Query the Database for Eaten Burgers
function eatenBurgers(callBack) {
    orm.selectScoped('burgers', 'devoured', 'true', function(data) {
        callBack(data);
    });
}

//Query the Database for Single Burger
function singleBurger(burger, callBack) {
    orm.selectOne('burgers', burger, function(data) {
        callBack(data);
    });
}

// Query the Database to Create a Burger
function create(burger, callBack) {
    orm.insertOne('burgers', 'burger_name', burger, function() {
        callBack();
    });
}

//Query the Database to Update a Burger
function update(burger, callBack) {
    orm.updateOne('burgers', 'devoured', true, burger, function() {
        callBack();
    });
}

//Query the Database to Update a Burger
function reOrder(burger, callBack) {
    orm.updateOne('burgers', 'devoured', false, burger, function() {
        callBack();
    });
}
