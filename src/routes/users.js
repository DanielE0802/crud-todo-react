const express = require('express');
const router = express.Router();

const User = require('../models/User')

// router.get('/users/signin', (req, res) => {

// })

router.post('/users/singnup', async (req, res) => {

    try {
        const { name, email, password, password_confirmation } = req.body
        const errors = []
        if (password !== password_confirmation ){
            errors.push({text: 'Password do not match'})
        }
        if (password.length < 4){
            errors.push({text: 'Password must be at least 4 characters'})
        }
        if(errors.length > 0){
            res.status(400).json({errors: errors})
        }else{
            const emailUser = User.findOne({email:email})

            if(emailUser){
                errors.push({text: "The Email is already in use"})
                res.status(400).json({errors: errors})
            }

            const newUser =await new User({name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()

            res.status(200).json("You are register")

        }


    } catch (error) {
        console.log(error);
        res.status(400).json({error: error})

    }

})

module.exports = router;