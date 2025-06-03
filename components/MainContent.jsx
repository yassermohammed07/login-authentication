import { assets } from "@/assets/assets"
import React from 'react'
import Image from 'next/image'

const MainContent = () => {
  return (
     <div className='flex bg-black'>  
        <div className="w-full h-full ml-[180px]">
        <div className="text-white text-center flex flex-col justify-center pt-[201px] xl:text-left h-full cotainer mx-auto">
        <h1 className="font-raleway font-extrabold text-[44px] mb-[24px]">Your Name Here</h1>
        <p className="font-mono font-thin text-[#9C9C9C] text-[14px] leading-relaxed tracking-wide">Intro text: Lorem ipsum dolor sit amet, consectetur<br/>adipiscing elit, sed do eiusmod tempor incididunt ut <br/> labore et dolore magna aliqua. </p> 
        <div className="w-[307.89px] h-[63px] flex justify-center rounded-[4px] border-shadow-lg bg-[#62BA1B] shadow-[0px_8px_30px_0px_#3F8E0080] text-white font-bold mt-[30px]">
        <button href="#top" className="font-mono font-bold text-base text-[16px] flex items-center ">Let’s get started {'  >'} </button>
       </div>
       <div className="absolute bottom-0">
        <p className="font-mono text-[14px] font-thin tracking-widest">Worked with</p>
        <div className="hidden md:flex lg:gap-8 py-4 mb-[30px] ">
          <div className="w-[160px] h-[60px] rounded-[4px] border border-thin items-center flex justify-center" style={{ borderColor: "#1B1B1B" }}>
            <Image src={assets.clickup_icon}  alt="Clickup icon" className="w-auto" />
          </div>
          <div className="w-[160px] h-[60px] rounded-[4px] border border-thin items-center flex justify-center" style={{ borderColor: "#1B1B1B" }}>
            <Image src={assets.dropbox_icon}  alt="dropbox icon" className="w-auto"/>
          </div>
          <div className="w-[160px] h-[60px] rounded-[4px] border border-thin items-center flex justify-center" style={{ borderColor: "#1B1B1B" }}>
            <Image src={assets.paycheck_icon} alt="Paycheck icon" className="w-auoto"/>
          </div>
        <div className="w-[160px] h-[60px] rounded-[4px] border border-thin items-center flex justify-center" style={{ borderColor: "#1B1B1B" }}>
            <Image src={assets.elastic_icon} alt="Elastic icon" className="w-auto"/>
          </div>
          <div className="w-[160px] h-[60px] rounded-[4px] border border-thin items-center flex justify-center" style={{ borderColor: "#1B1B1B" }}>
            <Image src={assets.stripe_icon} alt="Stripe icon" className="w-auto"/>
          </div>
        </div>
        </div> 
        </div>
      </div>  
      <div className="flex justify-center container pt-[150px]">
       <Image src = { assets.profile_picture } alt="Profile picture" className="rounded-full mr-[150px]"></Image>
      </div>
      </div>  
  )
}

export default MainContent