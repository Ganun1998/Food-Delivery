import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    // Fetch user data
    let userData = await userModel.findOne({ _id: req.body.userId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure cartData is an object
    let cartData = userData.cartData || {};

    // Ensure itemId is provided
    if (!req.body.itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    // Update cartData
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1; // Add new item with count 1
    } else {
      cartData[req.body.itemId] += 1; // Increment existing item count
    }

    // Save updated cartData back to the user
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Error adding item to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {

    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
  
    if (!cartData[req.body.itemId]>0) {
      cartData[req.body.userId] -=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData});
    return res.json({ success: true, message: "Item removed from cart" });

  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
      const userData = await userModel.findById(req.body.userId);
      
      // Check if userData is null
      if (!userData) {
          return res.json({ success: false, message: "User not found" });
      }

      const cartData = userData.cartData || {}; // Ensure cartData is an object
      return res.json({ success: true, cartData });

  } catch (error) {
      console.error(error);
      return res.json({ success: false, message: "Error", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };