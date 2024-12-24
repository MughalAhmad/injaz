import React, { useRef, useEffect, useState  } from "react";
import ArrowLeft from "/svgs/arrow-left.svg";
import {useLocation, useNavigate} from "react-router-dom";
import { checkCode } from '../../redux/features/adminSlice';
import { useDispatch } from 'react-redux';
import {sweetNotification} from "../../components/common/SweetAlert";

const Digit6Verify = () => {
  const location = useLocation();
   const dispatch = useDispatch();
      const navigate = useNavigate();
  
  const inputRefs = useRef([]);
  const [code, setCode] = useState(""); // State to store the full 6-digit code

  useEffect(() => {
    // Auto-focus on the first input when the component loads
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Validate if all previous boxes are filled
    const canFill = inputRefs.current.slice(0, index).every((input) => input?.value);

    if (!canFill) {
      e.target.value = ""; // Clear input if validation fails
      inputRefs.current[index - 1]?.focus(); // Move focus to the first empty box
      return;
    }

    if (/^\d$/.test(value)) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus(); // Move focus to the next input
      }
       // Update the full code state
       const currentCode = inputRefs.current.map((input) => input?.value || "").join("");
       setCode(currentCode);
    } else {
      e.target.value = ""; // Clear invalid input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasteData)) {
      pasteData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char; // Fill each input with the respective digit
        }
      });
      inputRefs.current[5]?.focus(); // Move focus to the last input

      // Update the full code state
      setCode(pasteData);
    }
    e.preventDefault(); // Prevent default paste action
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   const data={
    email:location?.state?.email,
    code:code
   }
    dispatch(checkCode(data)).then(response => {
                if (response && !response.payload.hasError) {
                  navigate('/newpassword',{state:{email:location?.state?.email}});
                  sweetNotification(false, response.payload.msg);
                } 
                else{
                  sweetNotification(true, response.payload.msg);
                }
              })
              .catch(error => {
                sweetNotification(true, 'Something went wrong');
                console.error('Dispatch failed:', error);
              });
  };
  return (
<div className="flex items-center justify-center  min-h-screen px-4 py-2 bg-custom-svg bg-no-repeat bg-center bg-cover relative">
<video
    className="absolute top-0 left-0 w-full h-full object-cover"
    // autoPlay
    // loop
    // muted
    // playsInline
  >
    <source src="/video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

    <div className='w-full h-full bg-[#222A59A8] bg-opacity-66 absolute'></div>
<div className="w-full px-5 md:max-w-3xl bg-white bg-opacity-80 rounded-3xl sm:px-32 pt-6 sm:pt-12 pb-6 sm:pb-12 relative font-poppins">


<div className="flex items-center justify-between ">
  <span className='font-normal text-xs text-neutral400 flex gap-1 justify-center'>
  <img src={ArrowLeft} alt='arrow-left' className='w-1.5 h-auto'/>
    Back
    </span>
  <span className='font-normal text-xs text-neutral400 cursor-pointer'>Forgot Password?</span>
  </div>





  <h2 className="text-2xl font-poppins font-semibold text-center mt-8 md:mt-20 mb-3 text-textPrimary md:text-left">
  Check your Mail
  </h2>
  <p className="text-base font-poppins font-normal text-center mb-8 text-black md:text-left">We,ve sent a 6-digit confirmation code to <span className='text-textPrimary font-semibold'>username@gmail.com.</span> Make sure you enter correct code.</p>

   
    <div className="flex justify-center space-x-2 md:justify-start ">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className=" w-8 h-10 sm:w-12 sm:h-16 text-center text-2xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)} // Store input refs
        />
      ))}
    </div>

    <button
     onClick={handleSubmit}
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-6 sm:mt-12 md:mt-24 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Verify
    </button>


  <div className="flex items-center justify-center mt-10 sm:mt-20 md:mt-44">
  <span className='font-normal text-sm mr-1 text-stone300'>Didn’t Recieve code?</span>
  <span className='font-semibold text-sm text-textPrimary hover:text-texPrimaryHover cursor-pointer'>Resend Code</span>
  </div>


</div>
</div>
  )
}

export default Digit6Verify