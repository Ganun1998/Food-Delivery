import foodModel from "../models/foodModel.js";
import fs from "fs";

// Create food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        const foodItem = await food.save();
        res.json({
            success: true,
            message: "Food item added successfully"
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to add food item"
        });
    }

}

// all food list
const listFood = async (req,res) => {
 try{
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
 }catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
 }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.body.id);
        
        if (!foodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Only try to delete the image if it exists
        if (foodItem.image) {
            const imagePath = `uploads/${foodItem.image}`;
            
            // Check if file exists before trying to delete
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log(`Image file not found at path: ${imagePath}`);
            }
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}



export {addFood,listFood,removeFood};