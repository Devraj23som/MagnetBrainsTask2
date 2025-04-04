'use client'
import { useParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [Task, setTask] = useState([])
    const [Userdata, setUserdata] = useState("")
    const {id}=useParams();
    const [Email, setEmail] = useState("")
    console.log(Userdata)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
   
    
    const makePayment = async () => {
      
            if(Email==Userdata){
                var token =localStorage.getItem("authToken");
                const authToken = token;
                const stripe = await loadStripe("pk_test_51QVo4xKPrNKNP5sGV2wA1Zqa2rqe1PZQdkpI1M35501iMTbL4NctGA6gNVuqONuEE60yuEBtsHFpM78zndXXxxLT00DE2SIj4u")
                const body = {
                    products: Task,
                }
                const header = {
                    "Content-Type": "application/json",
                    "authorization": `${authToken}`,
                }
                const response = await fetch("http://localhost:5000/api/tasks/createCheck", {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    throw new Error("Failed to create checkout session.");
                }
                const session = await response.json();
        
                const result = stripe.redirectToCheckout({
                    sessionId: session.id
                });
        
                if (result.error) {
                    console.log(result.error);
                }
        
            }
            else{
                alert("enter vailid mail")
            }
            
        
    }
    const openModal = (taskId) => {
        setTaskToDelete(taskId);
        setIsModalOpen(true);
      };
     
      useEffect( ()=>{
        const test=localStorage.getItem("email");
        setUserdata(test)
            async function prodata() {
    
                var token =localStorage.getItem("authToken");
            try {
              const authToken = token;
              if (!authToken) {
                // Redirect to login page if authentication token is missing
                Router.push('/');
                return;
              }
              const response2 = await fetch(`http://localhost:5000/api/tasks/proddata/${id}`, {
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
              
                setTask([data2])
    
              } else {
                console.error('Failed to fetch user data');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
              
             
              prodata()
        },[Userdata])
  return (
    <div>
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
        <button onClick={()=>openModal(prod.cartProduct._id)} className='bg-blue-500 rounded-sm text-white p-2'>Pay now</button>
       </div>
               </div>
            </div>
            ))}
            {isModalOpen && (
            <div className="modal absolute rounded-lg top-5 left-1/2 bg-red-600 text-white p-5">
              <div className="modal-content">
                <p >please enter your user email id</p>
               <div className='flex justify-center'>
                <input className='emailform text-black' type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} />
                 <button className='bg-yellow-400 p-1 mx-2'onClick={makePayment} >Pay Now</button>
               <button className='bg-yellow-400 p-1' onClick={()=>setIsModalOpen(false)} >No</button></div>
              </div>
            </div>
          )}

    </div>
  )
}

export default page