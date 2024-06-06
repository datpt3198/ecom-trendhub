import express from 'express';
import {
    register, 
    login, 
    secret, 
    updateProfile, 
    getOrders,
    allOrders
} from '../controllers/auth.js'; //Controllers
import { requireSingin, isAdmin } from '../middlewares/auth.js'; //Middleware

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/auth-check', requireSingin, (req,res) => {
    res.json({ok: true})
});

router.get('/admin-check', requireSingin, isAdmin, (req,res) => {
    res.json({ok: true})
});

router.put('/profile', requireSingin, updateProfile)

router.get('/secret', requireSingin, isAdmin, secret)

router.get("/orders", requireSingin, getOrders)
router.get("/all-orders", requireSingin, isAdmin, allOrders)

export default router;