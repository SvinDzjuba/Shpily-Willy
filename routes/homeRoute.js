module.exports = (app, URheader, LGheader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');

    // Get all users
    var usersList = [];
    users().then(data => {
        for (let i = 0; i < data.length; i++) {
            usersList.push(data[i]);
        }
    })

    router.get('/', function(req, res) {
        var header = '';
        let cookie = req.session;
        if(cookie.userId != undefined) { header = LGheader } 
        else { header = URheader }

        res.render('home', {
            header: header,
            users: usersList
        });
    });

    app.use('/', router);
}