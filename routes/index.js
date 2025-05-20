const express = require("express");
const router = express.Router();
const cars = require("../data/cars");

router.get("/", (req, res) => {
    res.render("index", { title: "Home", cars });
});

module.exports = router; 