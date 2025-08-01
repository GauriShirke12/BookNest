
const User = require("../models/user.js");

module.exports.renderSingupForm = (req, res) =>{
    res.render("users/signup.ejs");
    };


module.exports.signup =async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            const redirectUrl = req.session.redirectUrl || "/listings";
            delete req.session.redirectUrl; 
            return res.redirect(redirectUrl); 
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
    };

    module.exports.login = async(req, res) =>{
        req.flash("success" , "Welcome Back to WanderLust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
        };


        module.exports.logout = (req, res, next) => {
            req.logout(function(err) {
            if (err) {
            return next(err);
            }
            req.flash("success", "You are logged out!");
            res.redirect("/listings");
            });
            };