const express = require('express');

const router = express.Router();

const { isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');

const {create,categoryById ,read,update, remove ,list} = require('../controller/category');
const Category = require('../modles/Category');
const { route } = require('./product');


router.get('/category/:categoryId',read)
router.post("/category/create/:userId", isAdmin, create)
router.put("/category/:categoryId/:userId", isAdmin, update)
router.delete("/category/:categoryId/:userId", isAdmin, remove)
router.get("/categories", list)


//router.post("/signup", signup)


//router.get("/signout", signout )



router.param('userId',userById)
router.param('categoryId',categoryById)



module.exports = router

