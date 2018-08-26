//Require Express
var express = require("express");
var router = express.Router();

//Import Burger.JS file Model to Use its Database Functions.
var burger = require("../models/burger.js");

//Create All Routes and Set Up Logic Within Those Routes Where Required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
        burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
  });
  
router.post("/api/burger", function(req, res) {
    burger.create([
      "burger"
    ],[
        req.body.name,
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
  });

  router.put("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    cat.update({
      sleepy: req.body.sleepy
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    cat.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;