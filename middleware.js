module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be Signed In!') 
        console.log(req.originalUrl)
        return res.redirect('/login')
    }
    next();
}