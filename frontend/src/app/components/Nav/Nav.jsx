'use client'
import React, { useEffect, useState } from 'react'
import { RiHeartFill, RiShoppingCartFill } from "@remixicon/react";
import { useRouter } from 'next/navigation';
export const Nav = ({cartdata,userID}) => {
    const Router=useRouter();
    const [Userdata, setUserdata] = useState([])
    const logoutHandler=async()=>{
      console.log("hello")
      localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/';
    };
console.log(cartdata,"cart")
console.log(userID,"cart")


  
  return (
    <div className='w-full h-12 p-2 flex justify-between items-center bg-green-500'>
        <div>
            <h3 className='text-2xl'>MB Ecom</h3>
        </div>
        <div className='w-30 flex gap-10'>
          <div className="icon relative">
          <RiShoppingCartFill onClick={()=>Router.push(`/Cart`)}/>
            {cartdata>0?<div className="circle"><h2>{cartdata}</h2></div>:""}
          
          </div>
          <button onClick={logoutHandler}>LogOut</button>

        </div>
    </div>
  )
}
