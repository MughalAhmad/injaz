import React, {useState} from 'react'
import ArrowLeft from "/svgs/arrow-left.svg";
import Lock from "/svgs/lock.svg";
import CheckedTick from "/svgs/checked-Tick.svg";
import UncheckedTick from "/svgs/unchecked-Tick.svg";
import { newPassword, updateShowBackDropLoader } from '../../redux/features/adminSlice';
import { useDispatch } from 'react-redux';
import {sweetNotification} from "../../components/common/SweetAlert";
import {useLocation, useNavigate} from "react-router-dom";

const NewPassword = () => {
   const location = useLocation();
     const dispatch = useDispatch();
        const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

    const validateList = ["Password must be between 8 to 32 character.", "Must contain a uppercase character.", "Must contain a number.", "Must contain one special character."]

     const handleSubmit = (e) => {
        e.preventDefault();
        console.log(location?.state?.email)
       const data={
        email:location?.state?.email,
        password:password
       }
       
       dispatch(updateShowBackDropLoader(true));
       if(password === conformPassword){
        dispatch(newPassword(data)).then(response => {
              dispatch(updateShowBackDropLoader(false));
          
          if (response && !response.payload.hasError) {
            navigate('/sucessfulpassword');
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
        else{
              dispatch(updateShowBackDropLoader(false));
          
          sweetNotification(true, 'Both Password must same');

        }
      };


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
<div className="w-full px-5 md:max-w-3xl bg-white bg-opacity-80 rounded-3xl sm:px-32 pt-6 sm:pt-12 pb-6 sm:pb-12 relative font-poppins">


<div className="flex items-center justify-between ">
  <span className='font-normal text-xs text-neutral400 flex gap-1 justify-center cursor-pointer' onClick={()=>navigate("/forgot")}>
  <img src={ArrowLeft} alt='arrow-left' className='w-1.5 h-auto'/>
    Back
    </span>
  <span className='font-normal text-xs text-neutral400 '>Forgot Password?</span>
  </div>





  <h2 className="text-2xl font-poppins font-semibold text-center mt-10 md:mt-16 mb-3 text-textPrimary md:text-left">
  Create New Password
  </h2>
  <p className="text-base font-poppins font-normal text-center mb-8 text-black md:text-left">Enter the new password for your account.</p>
  <form className="">
    <div>
      <label
        className="block text-sm font-medium text-textPrimary mb-1"
        htmlFor="email"
      >
        New Password
      </label>
      <div
        className="flex gap-2 justify-center w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg"
      >
        <img src={Lock} alt='lock' className='w-3.5 h-auto mt-0.5'/>
        <input
        type="password"
        id="password"
        name="password"
        className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
        placeholder="Enter new password"
        required
        onChange={(e)=>setPassword(e.target.value)}
      />
      </div>
     
    </div>
    <div>
      <label
        className="block text-sm font-medium text-textPrimary mb-1"
        htmlFor="email"
      >
        Again Password
      </label>
      <div
        className="flex gap-2 justify-center w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg"
      >
        <img src={Lock} alt='lock' className='w-3.5 h-auto mt-0.5'/>
        <input
        type="password"
        id="password"
        name="password"
        className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
        placeholder="Enter again password"
        required
        onChange={(e)=>setConformPassword(e.target.value)}
      />
      </div>
     
    </div>

    {validateList.map((item)=>(
    <p className='flex text-xs font-medium gap-2 mb-2 text-neutral400'><img src={UncheckedTick} alt="tick" className='w-3 h-auto' />{item}</p>
  ))}

    <button
        onClick={handleSubmit}
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-6 sm:mt-12 md:mt-24 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Continue
    </button>
  </form>


</div>
</div>
  )
}

export default NewPassword