import express from "express";

// import upload from "../middleware/upload";
// import data from "../data.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Stripe from "stripe";
import { authGuard } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import Order from "../models/order.js";
const router = express.Router();

const stripe=new Stripe("sk_test_51QVo4xKPrNKNP5sGowE4fnE3KamoKz35EvU14l5mjc6kJATVD8veIQBoOkrNbzaEnxJR56NTLesfMOMy4pVDBVGM00ULaMQDeb")

router.get("/",async function(req,res){
const data=await Product.find();
res.json(data)
})
router.post("/cartdata",authGuard,async function(req,res){
  const user = await User.findById(req.user);
  const data=await Cart.find({userid:user._id}).populate("cartProduct");
  res.status(200).json(data)
  }) 
router.post("/proddata/:id",authGuard,async function(req,res){
  const user = await User.findById(req.user);
  const data=await Cart.findOne({userid:user._id,cartProduct:req.params.id}).populate("cartProduct");
  res.status(200).json(data)
  }) 
router.post("/addcart/:id",authGuard,async function(req,res){
  try {
    const user = await User.findById(req.user);
    var productFinder=await Cart.findOne({cartProduct:req.params.id,userid:user._id});
    if(productFinder){
      var changer=await Cart.findOneAndUpdate({_id:productFinder._id,},{quantity:productFinder.quantity +1})
      
    }
    else{
     
      var productAdd=await Cart.create({
        cartProduct:req.params.id,
        userid:user._id
      })
      console.log(productAdd)
     
      user.carts.push(productAdd._id);
      await user.save();
    }
  } catch (error) {
    console.log(error)
  }
    
  
  
  res.status(200).json(productAdd)
  
  })
  router.post("/createCheck",authGuard,async(req,res)=>{
    const users=await User.findById(req.user)
    const {products} = req.body;
    console.log(products ,"chal rha")
    console.log(users)
  
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.cartProduct.product_title,
                images:[product.cartProduct.product_photo]
            },
            unit_amount:parseInt(product.cartProduct.product_price) *100,
         
        },
        quantity:product.quantity
       
      }));
    
  // order.save();
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    });
    Order.create({
      purchasedItem:products[0].cartProduct.product_title,
        paymentStatus:"card",
        customerEmail:users.email,
        quantity:products[0].cartProduct.quantity,
        transectionID:session.id
    })
  console.log(session)
    res.json({id:session.id})
  
  })



export default router;
