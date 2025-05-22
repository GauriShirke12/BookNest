const express = require('express');
const router  = express.Router();



//users
//Index Route
router.get("/" ,(req, res) => {
    res.send("GET for users")
});

//Show Route
router.get("/:id" ,(req, res) => {
    res.send("show for users id")
});

//POST Route
router.post("/" ,(req, res) => {
    res.send("post for users")
});

//Delete Route
router.delete("/:id" ,(req, res) => {
    res.send("Delete for users id");
});

module.exports= router;