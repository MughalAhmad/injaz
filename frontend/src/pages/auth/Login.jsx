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

const Login = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.adminStore);


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
    console.log(formData)
    dispatch(userLogin(formData))
    .then(response => {
      if (response && !response.payload.hasError) {
        Cookies.set('auth-token', response.payload.data.token, { path: '/', expires: 1, sameSite: 'Lax' });
        dispatch(updateAuthStatus(response.payload.data.isAuthenticated));
        dispatch(updateUser(response.payload.data.user));
        dispatch(updateToken(response.payload.data.token));
        dispatch(updateAuthSliceErrorStatus(response.payload.hasError));
        navigate('/');
      } 
    })
    .catch(error => {
      console.error('Dispatch failed:', error);
    });
  }
  if(isAuthenticated) return

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
<div className="w-full px-5 md:max-w-3xl bg-white bg-opacity-80 rounded-3xl sm:px-32 pt-20 md:pt-28 pb-10 relative">
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

      <div
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
      </div>
    </div>
    <div className="flex justify-between items-center mt-4 ">
        <div className='flex justify-center gap-1.5'>
            <input type='checkbox' className='h-4 w-4 cursor-pointer border-2 border-neutral400 rounded bg-transparent checked:bg-backgroundPrimary checked:border-neutral400 focus:outline-none'/>
            <span className='font-medium text-neutral400 text-xs'>Remember Me</span>
        </div>

    <a
      href="#"
      className="text-xs font-medium text-textPrimary hover:text-textPrimaryHover"
    >
      Forgot Password
    </a>
  </div>
    <button
      type="submit"
      onClick={onSubmit}
      className="w-full bg-backgroundPrimary text-white font-semibold h-11 mt-9 text-base rounded-lg hover:bg-backgroundPrimaryHover transition"
    >
      Login
    </button>
  </form>
  <div className='absolute right-14 top-6 md:top-12' >
  <span className='font-normal text-xs mr-1 text-stone300'>Don,t have an account?</span>
  <span className='font-semibold text-xs text-textPrimary hover:text-texPrimaryHover cursor-pointer'>Signup</span>
  </div>

  <div className="flex items-center justify-center mt-7 md:mt-14">
  <hr className="w-[36%] border-neutral400" />
  <span className="text-sm font-normal mx-3 text-center -mt-1 text-neutral400">
    or continue with
  </span>
  <hr className="w-[36%] border-neutral400" />

</div>

  <div className="flex items-center justify-center mt-5 md:mt-10 space-x-5">
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
  </div>
</div>
</div>
  )
}

export default Login