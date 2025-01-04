import React, {useState, useEffect} from 'react'
import Facebook from "/svgs/fb.svg";
import Google from "/svgs/google.svg";
import Linkedin from "/svgs/in.svg";
import Message from "/svgs/message.svg";
import Lock from "/svgs/lock.svg";
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin, updateAuthStatus, updateUser, updateToken, updateAuthSliceErrorStatus } from '../../redux/features/adminSlice';
import ReCAPTCHA from "react-google-recaptcha";
import {sweetNotification} from "../../components/common/SweetAlert";

const Login = () => {
  let env = import.meta.env.VITE_ENV;
  let siteKey;
  siteKey = import.meta.env.VITE_SITE_KEY_LOCAL;


  if(env === 'production'){
     siteKey = import.meta.env.VITE_SITE_KEY;
  }
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const [isNotRobot, setIsNotRobot] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.adminStore);

  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility
  };

  const handleRecaptcha = (value) =>{
    setIsNotRobot(!!value)
  }


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) =>{
    e.preventDefault();
    if(isNotRobot){
      localStorage.setItem("menu","/")
      dispatch(userLogin(formData))
      .then(response => {
        if (response && !response.payload.hasError) {
          Cookies.set('auth-token', response.payload.data.token, { path: '/', expires: 1, sameSite: 'Lax' });
          dispatch(updateAuthStatus(response.payload.data.isAuthenticated));
          dispatch(updateUser(response.payload.data.user));
          dispatch(updateToken(response.payload.data.token));
          dispatch(updateAuthSliceErrorStatus(response.payload.hasError));
          navigate('/');
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
    }
    else{
      sweetNotification(true, 'Recaptcha required');
    }
   
  }
  if(isAuthenticated) return

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
<div className="w-full p-5 md:px-20 md:py-16 md:max-w-3xl bg-white bg-opacity-80 rounded-3xl relative">
  <h2 className="text-2xl font-poppins font-semibold text-center mb-2.5 text-textPrimary md:text-left">
    Welcome
  </h2>
  <p className="text-base font-poppins font-normal text-center mb-5 md:mb-10 text-black md:text-left">Login to continue</p>
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
        value={formData.email}
        onChange={handleChange}
        className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
        placeholder="Enter your email"
        required
      />
      </div>
     
    </div>
    <div>
      <label
        className="block text-sm font-medium text-textPrimary mb-1"
        htmlFor="password"
      >
        Password
      </label>

      {/* <div
        className="flex gap-2 justify-center w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg"
      >
        <img src={Lock} alt='message' className='w-3.5 h-auto mt-0.5'/>
        <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
        placeholder="Enter your password"
        required
      />
      </div> */}
         <div className="flex gap-2 items-center justify-between w-full h-16 mb-4 p-2 bg-transparent border border-neutral400 rounded-lg">
              <img src={Lock} alt="lock" className="w-3.5 h-auto mt-0.5" />
              <input
                type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full bg-transparent font-medium text-xs outline-none text-neutral400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-sm text-neutral400 focus:outline-none"
              >
                {/* {showPassword ? "👁️" : "👁️‍🗨️"}  */}
                {/* Add icons or text for visibility toggle */}
                {showPassword ? (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.4 1.106-1.512 3.225-3.542 4.882C15.154 18.95 13.629 19 12 19c-1.63 0-3.155-.05-5-1.118-2.03-1.657-3.142-3.776-3.542-4.882z" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825c-1.46.733-3.041 1.175-4.875 1.175-4.477 0-8.268-2.943-9.542-7a12.094 12.094 0 014.33-6.13M8.7 8.73a4.5 4.5 0 015.6 5.6m1.517-5.22C18.32 9.98 20 11.778 21 13c-.9 1.39-2.46 3.145-4.542 4.41M3 3l18 18" />
  </svg>
)}
              </button>
            </div>
    </div>
    <div className="flex justify-between items-center mt-4 ">
        <div className='flex justify-center gap-1.5'>
            <input type='checkbox' className='h-4 w-4 cursor-pointer border-2 border-neutral400 rounded bg-transparent checked:bg-backgroundPrimary checked:border-neutral400 focus:outline-none'/>
            <span className='font-medium text-neutral400 text-xs'>Remember Me</span>
        </div>

    <p
      onClick={()=>navigate("/forgot")}
      className="text-xs font-medium text-textPrimary hover:text-textPrimaryHover cursor-pointer"
    >
      Forgot Password
    </p>
  </div>
  <div className='w-full flex justify-center items-center mt-5'>
  <ReCAPTCHA
    sitekey={siteKey}
    onChange={handleRecaptcha}
  />
  </div>
    <button
      type="submit"
      onClick={onSubmit}
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-9 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Login
    </button>
  </form>
  {/* <div className='absolute right-14 top-6 md:top-12' >
  <span className='font-normal text-xs mr-1 text-stone300'>Don,t have an account?</span>
  <span className='font-semibold text-xs text-textPrimary hover:text-texPrimaryHover cursor-pointer'>Signup</span>
  </div> */}

  {/* <div className="flex items-center justify-center mt-7 md:mt-14">
  <hr className="w-[36%] border-neutral400" />
  <span className="text-sm font-normal mx-3 text-center -mt-1 text-neutral400">
    or continue with
  </span>
  <hr className="w-[36%] border-neutral400" />

</div> */}

  {/* <div className="flex items-center justify-center mt-5 md:mt-10 space-x-5">
    <a
      href="#"
      className="bg-white w-[43px] h-[40px] flex justify-center items-center rounded-lg"
    >
     <img src={Facebook} className='w-[60%] h-auto' alt='facebook'/>
    </a>
    <a
      href="#"
      className="bg-white w-[43px] h-[40px] flex justify-center items-center rounded-lg"
    >
      <img src={Google} className='w-[60%] h-auto' alt='facebook'/>
    </a>
    <a
      href="#"
      className="bg-white w-[43px] h-[40px] flex justify-center items-center rounded-lg"
    >
     <img src={Linkedin} className='w-[60%] h-auto' alt='facebook'/>
    </a>
  </div> */}
</div>
</div>
  )
}

export default Login