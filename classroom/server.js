const express = require('express');
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session= require("express-session");
const flash = require("connect-flash");
const passport = require("passport");


app.use(session({
    secret: "mysupersecretestring", 
    resave: false, 
    saveUninitialized: false
}));
app.use(flash());

app.set("view engine", "ejs");
 
// Use routes
app.use("/users", users);  
app.use("/posts", posts);

app.get("/test", (req, res) => {
    res.send("test successfull");
});

app.listen(3000 , () =>{
    console.log("server is listening to 3000");
});