import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 160
        },
        slug: {
            type: String,
            lowercase: true
        },
        long_desc: {
            type: String,
            required: true,
        },
        short_desc: [
            {type: String}
        ],
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo : {
            data: Buffer,
            contentType: String,
        },
        photo2 : {
            data: Buffer,
            contentType: String,
        },
        photo3 : {
            data: Buffer,
            contentType: String,
        },
        photo4 : {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            required: false,
            type: Boolean
        }
    },
    {timestamps: true}
);

export default mongoose.model('Product', productSchema);