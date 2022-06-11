const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')

// router.get('/users/signin', (req, res) => {

// })

// router.post('/login', passport.authenticate("local"))

router.post('/register', async (req, res) => {

    try {
        console.log(req.body)
        const { name, email, password, password_confirmation } = req.body
        
        const errors = []
        if (password !== password_confirmation) {
            errors.push({ text: 'Password do not match' })
        }
        if (password.length < 4) {
            errors.push({ text: 'Password must be at least 4 characters' })
        }
        if (errors.length > 0) {
            res.json({ errors: errors })
        } else {
            const emailUser = User.findOne({ email: email }, async function (err, result) {
                if (result !== null) {
                    errors.push({ text: "The Email is already in use" })
                    res.json({ error: errors })
                } else {
                    console.log(errors.length)
                    const newUser = await new User({ name, email, password })
                    newUser.password = await newUser.encryptPassword(password)
                    await newUser.save()
                    console.log(newUser)
                    res.status(200).json("ok")
                }
            })
        }
    } catch (error) {
        console.log("error", error)
    }
})
 
router.get('/user', async (req, res) => {
    res.send(req.user);
})


router.post("/login", (req, res, next) => {

    console.log(req.body)

    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.json("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).json("Successfully Authenticated");
        });
      }
    })(req, res, next);
  });


module.exports = router;