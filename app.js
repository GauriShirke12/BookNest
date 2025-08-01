const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const { title } = require('process');
const methodOverride= require("method-override");
const { redirect, cookie } = require('express/lib/response.js');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js"); 

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/TestDB";

main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Failed to connect to DB", err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate); 
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
    res.send("hey, i am root");
});

const sessionOption = {
    secret : "mysupersecretecode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7* 24 * 60 * 60 * 1000,     
        maxAge : 7* 24 * 60 * 60 * 1000,  
        httpOnly : true,
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {  
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async (req, res) => {

//         let fakeUser = new User({
//             email: "student@gmail.com",
//             username: "gauri",
//         });
//         let registeredUser = await User.register(fakeUser, "hello");
//         res.send(registeredUser);
    
// });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);



app.get("/testListing", async (req, res) => {
    const sampleListing = new Listing({
        title: "my new villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successfully testing");
});


  
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log('server is listening to port 8080');
});
