import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'

dotenv.config();

const app = express();

// DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB  Connected"))
    .catch((err) => console.log("DB Error => ", err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// APIs
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Node sever is running on port ${port}`);
});