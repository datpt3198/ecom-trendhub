import { comeparePass, hashPass } from '../helpers/auth.js';
import User from '../models/user.js';
import Order from '../models/order.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
   try {
    console.log(req.body);
    const { name, email, password } = req.body;

// Validation
    if (!name.trim()) {
        return res.json({error: "Name is required"});
    }
    if (!email) {
        return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
        return res.json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ error: "Email is taken" });
    }

    const hashedPass = await hashPass(password);

    const user = await new User({ 
        name,
        email, 
        password: hashedPass,
    }).save();

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address
        },
        token,
    });

   } catch (err) {
    console.log(err);
   }
};

export const secret = async (req,res) => {
    res.json({ currentUser: req.user })
}

export const login = async (req, res) => {
    try {
     const { email, password} = req.body;
    
     if (!email) {
         return res.json({error: "Email is taken"})
     }
     if (!password || password.length < 6) {
         return res.json({error: "Password must be at least 6 characters long"})
     }
 
     const user = await User.findOne({ email });
     if (!user) {
         return res.json({error: "User not found!"})
     }
 
     const match = await comeparePass(password, user.password);
     if (!match) {
        return res.json({
            error: 'Wrong password!'
        })
     }
 
     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
 
     res.json({
         user: {
             name: user.name,
             email: user.email,
             role: user.role,
             address: user.address
         },
         token,
     });
 
    } catch (err) {
     console.log(err);
    }
 };

 export const updateProfile = async (req, res) => {
    try {
        const {name, password, address} = req.body;
        const user = await User.findById(req.user._id);

        if (password && password.length < 6) {
            return res.json({
                error: 'Password is required and should be min 6 characters long'
            });
        }

        const hashedPass = password ? await hashPass(password) : undefined;

        const updated = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPass || user.password,
            address: address || user.address
        },
        { new: true }
    );

    updated.password = undefined;
    res.json(updated)
    } catch (err) {
        console.log(err)
    }
 };

 export const getOrders = async (req, res) => {
    try {
        const orders = await Order
            .find({buyer: req.user._id})
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders)
    } catch (err) {
        console.log(err)
    }
 };

 export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("products", "-photo").populate("buyer", "name");
        res.json(orders)
    } catch (err) {
        console.log(err)
    }
 }