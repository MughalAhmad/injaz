import React, {useState, useEffect} from 'react'
import Message from "/svgs/message.svg";
import Lock from "/svgs/lock.svg";
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin, updateAuthStatus, updateUser, updateToken, updateAuthSliceErrorStatus } from '../../redux/features/adminSlice';
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
        sweetNotification(true, 'Please enter the conditions first');
        console.error('Dispatch failed:', error);
      });
    }
    else{
      sweetNotification(true, 'Recaptcha required');
    }
   
  }
  if(isAuthenticated) return

  return (
<div className="flex items-center justify-center  min-h-screen px-4 py-2 bg-custom-svg bg-no-repeat bg-top bg-cover relative">
    <div className='w-full h-full bg-[#222A59A8] bg-opacity-66 absolute'></div>
<div className="w-full p-5 md:px-20 md:py-16 md:max-w-3xl bg-[#ffffff] bg-opacity-70 rounded-3xl relative">
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

                {showPassword ? (
<FontAwesomeIcon icon={faEye} />
) : (
  <FontAwesomeIcon icon={faEyeSlash} />
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
</div>
</div>
  )
}

export default Login