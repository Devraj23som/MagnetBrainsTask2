import mongoose, { Schema, model } from "mongoose";
// import * as bcrypt from "bcryptjs"
import pkg from "bcrypt";
const { compare, hash } = pkg;
// import { compare ,hash } from "bcrypt";
import jwt from "jsonwebtoken";
// import { compare } from "bcryptjs";

const CartSchema = new Schema(
  {
    quantity:{
        type:Number,
        default:1
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    cartProduct: {
        type:mongoose.Schema.Types.ObjectId,
    ref:'Product'}
    
    },
  
);



const Cart = model("Cart", CartSchema);
export default Cart;