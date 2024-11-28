import React from 'react'
import ArrowLeft from "/svgs/arrow-left.svg";
import BigTick from "/svgs/big-tick.svg";
const SucessfulPassword = () => {
  return (
<div className="flex items-center justify-center  min-h-screen px-4 py-2 bg-custom-svg bg-no-repeat bg-center bg-cover relative">
<video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

    <div className='w-full h-full bg-[#222A59A8] bg-opacity-66 absolute'></div>
<div className="w-full px-5 md:max-w-3xl bg-white bg-opacity-80 rounded-3xl sm:px-32 pt-6 sm:pt-12 pb-6 sm:pb-12 relative font-poppins flex flex-col justify-center items-center">




<div className='w-28 h-28 md:w-36 md:h-36 rounded-full flex justify-center items-center bg-backgroundGreen500'>
    <img src={BigTick} className='w-16 md:w-20 h-auto' alt='big-tick'/>
</div>


  <h2 className="text-2xl font-poppins font-semibold text-center mt-5 md:mt-10 mb-1 text-textPrimary">
  Password rest sucessful
  </h2>
  <p className="text-base font-poppins font-normal text-center text-textPrimary">Your Password has been reset successfully!</p>
  <p className="text-base font-poppins font-normal text-center text-textPrimary">Click below to login instantly</p>
    
    <button
      type="submit"
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-6 sm:mt-12 md:mt-24 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Continue
    </button>


  <span className='font-normal text-sm text-stone300 mt-5 sm:mt-24 md:mt-48'>Back to <span className='font-semibold text-textPrimary hover:text-texPrimaryHover cursor-pointer'>Login</span> </span>


</div>
</div>
  )
}

export default SucessfulPassword