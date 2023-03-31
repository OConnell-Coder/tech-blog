const router = require('express').Router();
const {User} = require('../../models');


router.post("/", async(req, res)=> {
    console.log(req.body);
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
    
            res.render('home', {loggedIn: true});
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async(req, res)=> {
    // console.log(req.body);
        const loginUser = await User.findOne({where: {"username": req.body.username}});

        if(!loginUser) {
            return res.status(400).json({message: "Username or password is incorrect"});
        }

        const validPassword = loginUser.checkPassword(req.body.password);

        if(!validPassword) {
            return res.status(400).json({message: "Username or password is incorrect"});
        }

        req.session.save(() => {
            req.session.userId = loginUser.id;
            req.session.username = loginUser.username;
            req.session.loggedIn = true;
    
            res.render('home', {loggedIn: true});
        })
});


router.post("/logout", async (req, res) => {
    if(req.session.loggedIn) {
        // console.log("You are here.")
        req.session.destroy(() => {
            console.log("You are logged out.");
        });
    };
    res.render('home');
});


module.exports = router;