import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://wandut1998:445566@cluster0.xzzs3.mongodb.net/FoodDelivery', {
            connectTimeoutMS: 30000, 
            socketTimeoutMS: 30000,   
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1); 
    }
};