import React, {useState} from 'react'
import ArrowLeft from "/svgs/arrow-left.svg";
import Message from "/svgs/message.svg";
import { useNavigate } from 'react-router-dom';
import { forgot, updateShowBackDropLoader } from '../../redux/features/adminSlice';
import { useDispatch } from 'react-redux';
import {sweetNotification} from "../../components/common/SweetAlert";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    

    const handleSubmit = (e) =>{ 
      e.preventDefault();
      const data={
        email:email
      }        
          dispatch(updateShowBackDropLoader(true));
           dispatch(forgot(data))
           .then(response => {
                dispatch(updateShowBackDropLoader(false));
            
             if (response && !response.payload.hasError) {
               navigate('/digit6',{state:{email:email}});
               sweetNotification(false, response.payload.msg);
             } 
             else{
               sweetNotification(true, response.payload.msg);
             }
           })
           .catch(error => {
            dispatch(updateShowBackDropLoader(false));
             sweetNotification(true, 'Something went wrong');
             console.error('Dispatch failed:', error);
           });
         
    }
  
  return (
<div className="flex items-center justify-center  min-h-screen px-4 py-2 bg-custom-svg bg-no-repeat bg-top bg-cover relative">
    <div className='w-full h-full bg-[#222A59A8] bg-opacity-66 absolute'></div>
<div className="w-full px-5 md:max-w-3xl bg-[#ffffff] bg-opacity-70 rounded-3xl sm:px-32 pt-6 sm:pt-12 pb-6 sm:pb-12 relative font-poppins">


<div className="flex items-center justify-between ">
  <span className='font-normal text-xs text-neutral400 flex gap-1 justify-center cursor-pointer' onClick={()=>navigate("/login")} >
  <img src={ArrowLeft} alt='arrow-left' className='w-1.5 h-auto'/>
    Back
    </span>
  <span className='font-normal text-xs text-neutral400'>Forgot Password?</span>
  </div>





  <h2 className="text-2xl font-poppins font-semibold text-center mt-10 md:mt-20 mb-3 text-textPrimary md:text-left">
  Forgot Password
  </h2>
  <p className="text-base font-poppins font-normal text-center mb-3 sm:mb-8 text-black md:text-left">Enter the email of your account and we will send the email to reset your password.</p>
  <form className="">
    <div>
      <label
        className="block text-sm font-medium text-textPrimary mb-1"
        htmlFor="email"
      >
        Email
      </label>
      <div
        className="flex gap-2 justify-center w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg"
      >
        <img src={Message} alt='message' className='w-3.5 h-auto mt-0.5'/>
        <input
        type="email"
        id="email"
        name="email"
        className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
        placeholder="Enter your email"
        required
        onChange={(e)=>setEmail(e.target.value)}
      />
      </div>
     
    </div>
    <button
    onClick={handleSubmit}
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-3 sm:mt-12 md:mt-18 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Continue
    </button>
  </form>


</div>
</div>
  )
}

export default ForgotPassword