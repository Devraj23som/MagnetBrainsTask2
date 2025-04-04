import { Schema, model } from "mongoose";
// import * as bcrypt from "bcryptjs"
import pkg from "bcrypt";
const { compare, hash } = pkg;
// import { compare ,hash } from "bcrypt";
import jwt from "jsonwebtoken";
// import { compare } from "bcryptjs";

const ProductSchema = new Schema(
  {
    product_title: {
        type:String,
    },
        product_price:{
        type:String,
    } ,
        product_original_price: {
        type:String,
    },
        currency: {
        type:String,
    },
        product_star_rating:{
        type:String,
    },
        product_num_ratings: {
            type:String,
        },
        product_url:{
        type:String,
    } ,
        product_photo: {
        type:String,
    },
  }
);



const Product = model("Product", ProductSchema);
export default Product;