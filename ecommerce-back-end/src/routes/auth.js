const express = require('express');
const { signup,signin, signout} = require('../controller/auth');
const { userById } = require('../controller/user');

const router = express.Router();

const User = require('../modles/user')


//const {userSignupValidator} = require('../validator')





router.post('/signin', signin)


router.post("/signup", signup)


router.get("/signout", signout )





module.exports = router

