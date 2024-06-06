import express from 'express';
import {create, list, read, remove, update, productsByCategory, photo} from '../controllers/category.js'; //Controllers
import { requireSingin, isAdmin } from '../middlewares/auth.js'; //Middleware
import formidable from "express-formidable";

const router = express.Router();

// Routes
router.get("/categories", list);

router.post("/category", requireSingin, isAdmin, formidable(), create);
router.put("/category/:categoryId", requireSingin, isAdmin, update);
router.delete("/category/:categoryId", requireSingin, isAdmin, remove);
router.get("/category/photo/:categoryId", photo);

router.get("/category/:slug", read);

router.get('/products-by-category/:slug', productsByCategory)
        
export default router;