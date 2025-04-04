"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
const page = () => {
  var Router= useRouter();
    setTimeout(()=>Router.push("/Ecom"),5000)
  return (
    <div>payment Sucess
        <h2 className='text-2xl text-green-500'>Thank you </h2>
    </div>
  )
}

export default page