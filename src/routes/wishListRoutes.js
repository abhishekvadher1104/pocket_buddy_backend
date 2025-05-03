const route = require('express').Router();
const wishListController = require('../controller/wishListController');

route.post('/addtowishlist/:userId/:offerId',wishListController.addToWishList)
route.delete('/removefromwishlist/:userId/:offerId',wishListController.removeFromWishlist)
route.get('/getwishlist/:userId',wishListController.getWishList)
route.get('/check/:userId/:offerId',wishListController.checkWishlistStatus)

module.exports = route;