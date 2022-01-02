const express = require('express');

const router = express.Router();

const { isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');

const {create, productById , read ,remove,update,list , listRelated,listCategories,listBySearch} = require('../controller/product');




router.get('/product/:productId',read)
router.post("/product/create/:userId",isAdmin, create)
router.delete('/product/:productId/:userId',isAdmin,remove)
router.put('/product/:productId/:userId',isAdmin,update)

router.get("/products",list)
router.get("/products/related/:productId", listRelated)

router.get('/products/categories', listCategories)

router.post('/products/by/search', listBySearch)


router.param('userId',userById)

router.param('productId',productById)

module.exports = router

