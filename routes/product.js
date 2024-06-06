import express from 'express';
import formidable from 'express-formidable'

import {
    create, 
    list, 
    read, 
    photo, 
    remove, 
    update, 
    filteredProducts, 
    productsCount,
    listProducts,
    productsSearch,
    relatedProducts,
    getToken,
    processPayment,
    orderStatus
} from '../controllers/product.js'; //Controllers
import { requireSingin, isAdmin } from '../middlewares/auth.js'; //Middleware

const router = express.Router();

// Routes
router.post("/product", requireSingin, isAdmin, formidable(), create);

router.get("/products", list);
router.get("/products-count", productsCount);
router.get("/products/search/:keyword", productsSearch);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);

router.delete("/product/:productId", requireSingin, isAdmin, remove);
router.put("/product/:productId", requireSingin, isAdmin,formidable() ,update);

router.get('/related-products/:productId/:categoryId', relatedProducts);

router.post('/filtered-products', filteredProducts);

router.get("/list-products/:page", listProducts);

router.get('/braintree/token', getToken);
router.post('/braintree/payment',requireSingin, processPayment)

router.put('/order-status/:orderId', requireSingin, isAdmin, orderStatus)

export default router; 