"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
const page = () => {
  const Router=useRouter();
    const [Task, setTask] = useState([])
    const CheckoutHandler=(e)=>{
// console.log(e)

Router.push(`/Checkout/${e}`)
    }

    useEffect( ()=>{
      
        async function prodata() {

            var token =localStorage.getItem("authToken");
        try {
          const authToken = token;
          if (!authToken) {
            // Redirect to login page if authentication token is missing
            Router.push('/');
            return;
          }
          const response2 = await fetch("http://localhost:5000/api/tasks/cartdata", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // withCredentials: true,
              authorization: `${authToken}`,
            },
            withCredentials: true
  
          });
          if (response2.ok) {
            const data2 = await response2.json();
            console.log(data2)
          
            setTask(data2)

          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
          
         
          prodata()
    },[])
  return (
    <div className='w-lvw overflow-x-hidden h-screen'>
   {Task.map((prod,idx)=>(
            <div key={idx} className='prodCard m-2 flex  w-3/7 h-2/5 '>
               <div className='prodImage w-1/2 h-full'><img src={prod.cartProduct.product_photo} alt="" /></div>
               <div className='content w-1/2 flex flex-col justify-center'>
               <h1 key={idx}>{prod.cartProduct.product_title}</h1>
       <h2>Price :${prod.cartProduct.product_price}</h2>
       <h3>Rating : {prod.cartProduct.product_star_rating
       }</h3>
       <h3>Quantity :{prod.quantity}</h3>
       <div>
        <button onClick={()=>CheckoutHandler(prod.cartProduct._id)} className='bg-blue-500 rounded-sm text-white p-2'>Go to Checkout</button>
       </div>
               </div>
            </div>
            ))}

    </div>
  )
}

export default page