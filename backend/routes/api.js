const express = require('express')
const router = express.Router();
const User = require('../models/models')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/save", async (req, res) => {
    let save = req.body.save;
    let username = req.body.username;

    console.log(username + " is Saving data");
    console.log(save);

    let update = await User.updateOne({ username: username }, { masterList: save }).exec()
    console.log(update);
    res.json(update)
})

router.get("/load", async (req, res) => {
    let username = req.body.username

    console.log("Fetching user save data");

    let saveFile = await User.findOne({ username }).exec()

    res.json(saveFile)
})

// return user 
router.post("/register", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log("Registering: " + username);

    let userExist = await User.findOne({ username: username }).exec();

    if (!userExist) {
        console.log("user doesn't exist, continuing!");
        let hash = await bcrypt.hash(password, saltRounds)
        let create = await User.create({ username: username, pw: hash })
        res.json(create);
    }
    else {
        res.json({ error: "user already exists" });
    }
    console.log(userExist);

})
router.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(username, " attempting to login!");

    let userExist = await User.findOne({ username: username }).exec();

    if (!userExist) {
        return res.json({ auth: false, error: "User doesn't exist" });

    }

    bcrypt.compare(password, userExist.pw, function (err, result) {
        if (result) {
            res.json({ auth: true })
        }
        else {
            res.json({ auth: false, error: "incorrect password" })
        }

    })

})



module.exports = router;
