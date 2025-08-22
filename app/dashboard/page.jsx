'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter();

    const handleLogout = () => {
        router.replace("/login");
    }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-10'>
      <h1 className="text-white">Welcome!</h1>
      <h2 className='text-white'>You have logged in successfully</h2>
      <button
          type="button"
          onClick={handleLogout}
          className="font-md py-2 px-2 rounded transition bg-[#92FC5D] text-white hover:bg-[#62BA1B] hover:shadow-[0px_8px_30px_0px_#3F8E0080] cursor-pointer mt-2"
        >
          Logout
        </button>
    </div>
  )
}

export default page
