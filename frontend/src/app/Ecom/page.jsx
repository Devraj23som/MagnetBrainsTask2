"use client"
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav/Nav'
import axios from 'axios'

const page = () => {
    const [data, setdata] = useState([])
    const [toggle, settoggle] = useState(false)
    const [Userdata, setUserdata] = useState([])
    const [count, setcount] = useState(0)
    const [UserId, setUserId] = useState(null)
    const CardHandler=async (e)=>{
        // e.preventDefault();
        var token =localStorage.getItem("authToken");
        try {
            const authToken = token;
            if (!authToken) {
              // Redirect to login page if authentication token is missing
              Router.push('/');
              return;
            }
          const response = await fetch(`http://localhost:5000/api/tasks/addcart/${e}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `${authToken}`,
            },
            withCredentials: true,
          
          });
          
          if (response.ok) {
        //   Router.push("/Cart")
           console.log("done!")

           if(toggle==false){
            settoggle(true)
           }
           else{
            settoggle(false)
           }
          } else {
            
            console.error('failed');
          }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('error');
              }
          console.error('Error  in:', error);
        }
    
    
    };
    useEffect( ()=>{
        const fetchData = async () => {
            var token =localStorage.getItem("authToken");
            try {
              const authToken = token;
              if (!authToken) {
                // Redirect to login page if authentication token is missing
                Router.push('/');
                return;
              }
              const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  // withCredentials: true,
                  authorization: `${authToken}`,
                },
                withCredentials: true
      
              });
              if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUserId(data.id)
                setUserdata([...Userdata,data]);
                localStorage.setItem("email",data.email)
                var cartlen=data.carts.length;
                setcount(cartlen)

                // setTask(data.tasks)
              } else {
                console.error('Failed to fetch user data');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
      
          fetchData();
        async function prodata() {

            try {
              const response = await axios.get("http://localhost:5000/api/tasks/");
              console.log(response.data)
              setdata(response.data)
             
        
              
            } catch (error) {
              console.error('Error fetching data:', error);
             
            }
          }  
         
          prodata()
    },[toggle])
  return (
    <div className='w-lvw overflow-x-hidden h-screen'>
        <Nav cartdata={count} userID={UserId}/>
        <div className='w-full h-lvh  p-2 py-10 flex justify-center  flex-wrap  '>
            <div className='w-9/10 h-auto flex  gap-6 flex-wrap'>
            {data.map((prod,idx)=>(
            <div key={idx} className='prodCard flex  w-3/7 h-2/5 '>
               <div className='prodImage w-1/2 h-full'><img src={prod.product_photo} alt="" /></div>
               <div className='content w-1/2 flex flex-col justify-center'>
               <h1 key={idx}>{prod.product_title}</h1>
       <h2>Price :${prod.product_price}</h2>
       <h3>Rating : {prod.product_star_rating
       }</h3>
       <div>
        <button onClick={()=>CardHandler(prod._id)} className='bg-blue-500 rounded-sm text-white p-2'>Add to cart</button>
       </div>
               </div>
            </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default page