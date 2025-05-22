
const express = require('express');
const router  = express.Router();


router.get("/" ,(req, res) => {
    res.send("GET for posts")
});

//Show Route
router.get("/:id" ,(req, res) => {
    res.send("show for posts id")
});

//POST Route
router.post("/" ,(req, res) => {
    res.send("post for posts")
});

//Delete Route
router.delete("/:id" ,(req, res) => {
    res.send("Delete for posts id");
});

module.exports= router;