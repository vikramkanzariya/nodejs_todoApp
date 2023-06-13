import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { SendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
// import { trusted } from "mongoose";


 export const login = async(req , res , next) => {
   try {
    const { email , password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Email or Password..." , 400));
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password..." , 400));

    SendCookie(user , res , `Welcome Back: ${user.name }` , 200);
   } catch (error) {
        next(error);
   }
 };


export const register = async(req , res ) => {
    try {
    const { name , email , password } = req.body;

    let user = await User.findOne({ email });

    if(!user) return next(new ErrorHandler("User Already Exists..." , 400));

    const hassedPassword = await bcrypt.hash(password , 10);

    user = await User.create({
        name ,
        email ,
        password:hassedPassword,
    });
    SendCookie(user , res , "Register SuccessFully..." , 201);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req , res) => {

    res.status(200).json({
        success:true,
        user:req.user,
    });
};


export const logout = (req , res) => {
    res
    .status(200)
    .cookie("token" , null , {
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
     })
    .json({
        success:true,
        user:req.user,
    });
 };