import React, {useState} from 'react'
import ArrowLeft from "/svgs/arrow-left.svg";
import Lock from "/svgs/lock.svg";
import CheckedTick from "/svgs/checked-Tick.svg";
import UncheckedTick from "/svgs/unchecked-Tick.svg";
import { newPassword, updateShowBackDropLoader } from '../../redux/features/adminSlice';
import { useDispatch } from 'react-redux';
import {sweetNotification} from "../../components/common/SweetAlert";
import {useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const NewPassword = () => {
   const location = useLocation();
     const dispatch = useDispatch();
        const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

 const [showPassword1, setShowPassword1] = useState(false); // New state for toggling password visibility
 const [showPassword2, setShowPassword2] = useState(false); // New state for toggling password visibility

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1); // Toggle the visibility
  };

    const togglePasswordVisibility2 = () => {
      setShowPassword2(!showPassword2); // Toggle the visibility
    };




    const validateList = ["Password must be between 8 to 32 character.", "Must contain a uppercase character.", "Must contain a number.", "Must contain one special character."]

     const handleSubmit = (e) => {
        e.preventDefault();
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
      {/* <div
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
      </div> */}

        <div className="flex gap-2 items-center justify-between w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg">
                    <img src={Lock} alt="lock" className="w-3.5 h-auto mt-0.5" />
                    <input
                      type={showPassword1 ? "text" : "password"} // Toggle between "text" and "password"
                      id="password"
                      name="password"
                      onChange={(e)=>setPassword(e.target.value)}
                      className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility1}
                      className="text-sm text-neutral400 focus:outline-none"
                    >
                      {/* {showPassword ? "👁️" : "👁️‍🗨️"}  */}
                      {/* Add icons or text for visibility toggle */}
                      {showPassword1 ? (
                        <FontAwesomeIcon icon={faEye} />
                        
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.4 1.106-1.512 3.225-3.542 4.882C15.154 18.95 13.629 19 12 19c-1.63 0-3.155-.05-5-1.118-2.03-1.657-3.142-3.776-3.542-4.882z" />
        // </svg>
      ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825c-1.46.733-3.041 1.175-4.875 1.175-4.477 0-8.268-2.943-9.542-7a12.094 12.094 0 014.33-6.13M8.7 8.73a4.5 4.5 0 015.6 5.6m1.517-5.22C18.32 9.98 20 11.778 21 13c-.9 1.39-2.46 3.145-4.542 4.41M3 3l18 18" />
        // </svg>
      )}
                    </button>
                  </div>
     
    </div>
    <div>
      <label
        className="block text-sm font-medium text-textPrimary mb-1"
        htmlFor="email"
      >
        Again Password
      </label>
      {/* <div
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
      </div> */}

        <div className="flex gap-2 items-center justify-between w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg">
                    <img src={Lock} alt="lock" className="w-3.5 h-auto mt-0.5" />
                    <input
                      type={showPassword2 ? "text" : "password"} // Toggle between "text" and "password"
                      id="password"
                      name="password"
                      onChange={(e)=>setConformPassword(e.target.value)}
                      className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility2}
                      className="text-sm text-neutral400 focus:outline-none"
                    >
                      {/* {showPassword ? "👁️" : "👁️‍🗨️"}  */}
                      {/* Add icons or text for visibility toggle */}
                      {showPassword2 ? (
                        <FontAwesomeIcon icon={faEye} />
                        
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.4 1.106-1.512 3.225-3.542 4.882C15.154 18.95 13.629 19 12 19c-1.63 0-3.155-.05-5-1.118-2.03-1.657-3.142-3.776-3.542-4.882z" />
        // </svg>
      ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825c-1.46.733-3.041 1.175-4.875 1.175-4.477 0-8.268-2.943-9.542-7a12.094 12.094 0 014.33-6.13M8.7 8.73a4.5 4.5 0 015.6 5.6m1.517-5.22C18.32 9.98 20 11.778 21 13c-.9 1.39-2.46 3.145-4.542 4.41M3 3l18 18" />
        // </svg>
      )}
                    </button>
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