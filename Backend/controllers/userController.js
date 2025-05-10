import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists) {
           return res.json({success:true, message: "user already exists"})
        }

        // validation
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "please enter valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"please enter strong password"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel ({
            name:name,
            email:email,
            password:hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
}



// login user
const loginUser = async (req,res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
           return res.json({success:false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
       console.log(error)
       res.json({success:false,message:"Error"})
    }

}


// list all users
const listUser = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching users" });
    }
  };
  
  // Remove user
  const removeUser = async (req, res) => {
    try {
      const userItem = await userModel.findById(req.body.id);
      if (!userItem) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // If you have any specific cleanup before deleting the user, do it here
      await userModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "User removed successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Internal server error" });
    }
  };

export {registerUser,loginUser,listUser,removeUser}