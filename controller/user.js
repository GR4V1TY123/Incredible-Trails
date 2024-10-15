const User = require('../models/user')

module.exports.loginForm = async(req,res)=>{
    res.render("login")
}

module.exports.login = async(req,res)=>{
    const {username} = req.body;
    req.flash('success', `Welcome back ${username}`)
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl)
}

module.exports.registerForm = async(req,res)=>{
    res.render("register")
}

module.exports.register = async(req,res)=>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username})
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err){
                return next(err);
            }
            req.flash('success', `Welcome to Incredible Trails, ${username}`)
            res.redirect('/')
        })
        
    } 
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
}