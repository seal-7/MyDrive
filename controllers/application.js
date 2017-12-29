module.exports.dashboard = function (req,res) {
    console.log(req.user);
    res.render('dashboard',{user:JSON.parse(req.user.userDetails)});
}

module.exports.index= function (req,res) {
    res.render('index');
}

module.exports.error= function (req,res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

module.exports.profile = function (req,res,next) {
    res.render('profile',{user:JSON.parse(req.user.userDetails)});
}
