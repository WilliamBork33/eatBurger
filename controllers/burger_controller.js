//Require Express and Burgers Model
var express = require('express');
var burgers = require('../models/burger.js');

//Export Routes
module.exports = function(app) {

    //GET Root Route
    app.get('/', function(request, response) {
        burgers.allBurgers(function(data) {
            response.render('index', {
                uneatenBurgers: data.uneaten,
                eatenBurgers: data.eaten
            });
        });
    });

    //Define GET Api/Burgers Route - for all burger data
    app.get('/api/burgers', function(request, response) {
        burgers.allBurgers(function(data) {
            response.json(data);
        });
    });

    //Define Post for Creating a Burger
    app.post('/', function(request, response) {
        var newBurger = request.body.burger;
        //If No Burger is Defined Just Return
        if (newBurger === '') {
            response.redirect('/');
            return;
        }
        //Create That Burger
        burgers.create(newBurger, function() {
            response.redirect('/');
        });
    });

    // define the get api/burgers/:id route - for single burger data
    app.get('/api/burgers/:id', function(request, response) {
        burgers.singleBurger(request.params.id, function(data) {
            response.json(data);
        });
    });

    //Define PUT for Updating a Burger
    app.put('/:id', function(request, response) {
        burgers.update(request.params.id, function() {
            response.redirect('/');
        });
    });

    //Define PUT for Ordering a Burger
    app.put('/order/:id', function(request, response) {
        burgers.reOrder(request.params.id, function() {
            response.redirect('/');
        });
    });
};
