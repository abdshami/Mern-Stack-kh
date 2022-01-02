const express = require('express');

const { userById ,read,update} = require('../controller/user')

const router = express.Router();

const { isAdmin } = require('../controller/auth');

const User = require('../modles/user')

router.get('/secret/:userId',isAdmin , (req,res)=>{
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', read)

router.put('/user/:userId',update)

router.param('userId',userById)




module.exports = router

