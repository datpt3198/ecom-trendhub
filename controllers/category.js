import Category from '../models/category.js';
import Product from '../models/product.js';
import slugify from 'slugify';
import fs from "fs";

export const create = async (req, res, next) => {
    try {
        console.log(req.fields)
        console.log(req.files)
        const { name } = req.fields;
        const {photo} = req.files;

        if (!name.trim()) {
            return res.json({ error: "Name is require!" });
        }
        // const existingCategory = await Category.findOne({ name });
        // if (existingCategory) {
        //     return res.json({error: "Already exists"});
        // }

        const category = new Category({ ...req.fields, slug: slugify(name) });

        if (photo) {
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
        }

        await category.save();
        res.json(category);

    } catch (err) {
        next();
        return res.status(400).json(err);
    }
};

export const list = async (req,res) => {
    try {
        const all = await Category.find();
        console.log("categories =>", all)
        res.json(all);
    } catch (err) {
        return  res.status(400).json(err.message);
    }
};

export const photo = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId).select("photo");
        if(category.photo.data) {
            res.set("Content-Type", category.photo.contentType);
            return res.send(category.photo.data);
        }
    } catch (err) {
        console.log(err)
    }
};

export const update = async (req,res) => {
    try {
        const {name} = req.body
        const {categoryId} = req.params
        const category = await Category.findByIdAndUpdate(
            categoryId, 
            {
                name,
                slug: slugify(name),
            },
            { new: true}
            );
        res.json(category);
    } catch (err) {
        return  res.status(400).json(err.message);
    }
};

export const remove = async (req,res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch (err) {
        return  res.status(400).json(err.message);
    }
};

export const read = async (req,res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug});
        res.json(category)
    } catch (err) {
        return  res.status(400).json(err.message);
    }
};

export const productsByCategory = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug});
        const products = await Product.find({ category }).populate('category');

        res.json({
            category,
            products
        })
    } catch (err) {
        console.log(err)
    }
}
