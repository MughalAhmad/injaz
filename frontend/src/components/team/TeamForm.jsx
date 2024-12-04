import React from 'react'

const TeamForm = () => {
  return (
    <div className='px-3 md:px-10'>
    {/* <p className='font-semibold text-2xl text-textPrimary my-11'>Team</p> */}

    <div className='bg-white h-auto flex flex-col gap-3 mt-4 pb-5 rounded-3xl'>
    <p className='font-medium text-2xl text-textPrimary border-b-2 p-5'>Add New Team Member</p>
    {/* Name */}
    <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Name</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>First Name</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Last Name</label>
        <input placeholder="Enter last name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div> 
  
      </div>
    {/* Email */}
    <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Email</p>
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Email</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
      </div>
      {/* Phone */}
      <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Calling Number</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Mobile Number</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Phone Number</label>
        <input placeholder="Enter last name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div> 
  
      </div>
       {/* ID */}
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>ID</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>User ID</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Nationality</label>
        <input placeholder="Enter last name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div> 
  
      </div>
       {/* Address */}
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Address</p>
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Address</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
      </div>
       {/* Password */}
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-v text-textPrimary w-full lg:w-[33%]'>Password</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Password</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Confirm Password</label>
        <input placeholder="Enter last name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div> 
  
      </div>

    </div>
    </div>
  )
}

export default TeamForm