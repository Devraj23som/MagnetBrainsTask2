"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  var Router= useRouter();
  setTimeout(()=>Router.push("/Ecom"),5000)
  return (
    <div><h2 className='text-red-400 text-2xl'> payment Cancle</h2></div>
  )
}

export default page