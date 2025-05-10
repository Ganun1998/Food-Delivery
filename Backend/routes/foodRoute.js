import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: "File upload failed", error: err.message });
        }
        next(); // Proceed to addFood if no error
    });
}, addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;