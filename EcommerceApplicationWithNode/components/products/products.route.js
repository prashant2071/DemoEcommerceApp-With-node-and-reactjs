const router=require('express').Router();
const productController=require('./products.controller');
const authenticate=require('./../../Middleware/authenticate');
const authorize=require('../../Middleware/authorize')
const Uploader=require('./../../Middleware/uploader')('image')

router.route('/')
.get(authenticate, productController.findAll)
.post(authenticate,Uploader.array('image'),productController.insert)


router.route('/add_review/:productId')
.post(authenticate,productController.addReview)

router.route('/search')
.get(productController.search)
.post(productController.search)


// router.route('/add_review/:product_id')
// .get(authenticate,productController.viewById)
// .post(authenticate,productController.postReviewById)
// .put(authenticate,productController.updateReviewById)
// .delete(authenticate,productController.deleteReviewById)


router.route('/:id',)
.get(authenticate,productController.getById)
.put(authenticate,Uploader.array('image'),productController.update)
// .put(authenticate,productController.update)
.delete(authenticate,authorize,productController.remove)

module.exports=router;
