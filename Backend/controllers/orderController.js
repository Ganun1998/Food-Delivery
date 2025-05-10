import orderModel from '../models/orderModel.js';
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripeClient.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        return res.json({ success: true, session_url: session.url });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req,res) => {
  const {orderId,success} = req.body;
  try {
    if (success=="true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}


// users order for frontend 
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}


// list orders for admin
const listOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

   // api for deleting order
   const removeOrder = async (req, res) => {
    try {
        console.log(req.body);
        const orderId = req.body.orderId;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }
        const order = await orderModel.findById(orderId); 
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        await orderModel.findByIdAndDelete(orderId); 
        res.json({ success: true, message: "Order Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};
    


    export { placeOrder, verifyOrder, userOrders, listOrder, updateStatus, removeOrder };