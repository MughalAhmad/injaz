import React, {useEffect,useState} from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate,Navigate, Outlet, useParams} from "react-router-dom";
import User from "/svgs/user.svg";
import ArrowDown from "/svgs/arrowDown.svg";
import { useSelector, useDispatch } from 'react-redux';
import { updateCompanyName } from '../../redux/features/companyBrandingSlice';
import Cookies from 'js-cookie';
import {sweetNotification} from "../../components/common/SweetAlert";
import TestForm from "../../PDF/TestForm";
import Dashboard from "../dashboard/Dashboard";
import Quotation from "../quotation/Quotation";
import Team from "../team/Team";
import Reference from "../reference/Reference";
import Setting from "../profile/Profile";
import TeamForm from "../../components/team/TeamForm";
import RefForm from "../../components/reference/RefForm";
import ProfileForm from "../../components/profile/ProfileForm";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'


const Layout = () => {
  if(!localStorage.getItem("companyName")){
    localStorage.setItem("companyName","Injaz");
    dispatch(updateCompanyName("Injaz"))
  }
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [location, setLocation] = useState(localStorage.getItem("menu"))
  const [location, setLocation] = useState("")
  
  const { companyName } = useSelector(state => state.brandingStore);
  const {user, isAuthenticated, userImg} = useSelector(state => state.adminStore);
  const highLight = `${companyName === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary"} font-bold text-base text-white text-center justify-center`;

  const handleCompanyMenu = (name) =>{
    localStorage.setItem("companyName",name)
    dispatch(updateCompanyName(name))
  }

  const handleMenu = (link) =>{
    // localStorage.setItem("menu",link)
    setLocation(link)
    navigate(link);
  }

  const handleLogout = () =>{
    Cookies.remove('auth-token');
    sweetNotification(false, "Logout successfully ")
    navigate("/login")
    window.location.reload();
  }

  useEffect(() => {
    if(isAuthenticated){
      setLocation(window.location.pathname)
      navigate(window.location.pathname)
    }
    else{
      navigate("/login")
    }
   
  }, [window.location.pathname, localStorage.getItem("companyName")])



  // //////////////////////////////////////////////////////

  const AUTO_LOGOUT_TIME = 5 * 60 * 1000; // 10 minutes in milliseconds
  let lastActivityTime = Date.now();
 // Function to reset the inactivity timer
 const resetTimer = () => {
  lastActivityTime = Date.now();
};
// Set up event listeners to track user activity
useEffect(() => {
  // Listen for mouse movements, clicks, or key presses to reset the inactivity timer
  const handleUserActivity = () => {
    resetTimer();
  };
  window.addEventListener('mousemove', handleUserActivity);
  window.addEventListener('click', handleUserActivity);
  window.addEventListener('keydown', handleUserActivity);
  // Check if the user has been inactive for too long
  const checkInactivity = () => {
    const currentTime = Date.now();
    if (currentTime - lastActivityTime >= AUTO_LOGOUT_TIME) {
      handleLogout(); // Log the user out if inactive for too long
    }
  };
  // Set up a periodic check for inactivity
  const inactivityCheckInterval = setInterval(checkInactivity, 1000); // Check every second
  // Clean up the event listeners and interval when the component unmounts
  return () => {
    window.removeEventListener('mousemove', handleUserActivity);
    window.removeEventListener('click', handleUserActivity);
    window.removeEventListener('keydown', handleUserActivity);
    clearInterval(inactivityCheckInterval);
  };
}, []); // Empty dependency array means this effect runs once when the component mounts


  
  return(
      <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-[28%] lg:w-[20%] xl:w-[15%] bg-white text-black flex-col overflow-auto px-7 text-textPrimary">

        <div className="mt-3 flex items-center justify-between mr-5">
        {companyName === "Conqueror" ? <img src= "/page3Logo.png" alt="logo"/> : <img src= "/Injaz/page3Logo.png" alt="logo"/> }
         <CDropdown>
                      <CDropdownToggle className="w-10 h-10 mt-2 md:mt-4 relative">
                      <img src={ArrowDown} alt="arrow-down" className="w-auto h-3.5 cursor-pointer absolute top-2.5" />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem className="cursor-pointer" onClick={()=>handleCompanyMenu('Conqueror')}>Conqueror</CDropdownItem>
                        <CDropdownItem className="cursor-pointer" onClick={()=>handleCompanyMenu('Injaz')}>Injaz</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
        </div>

        <div className="flex gap-3 items-center my-6">
          <img src={userImg} className="w-14 h-14 rounded-full" alt="user"/>
          <div className="flex flex-col">
            <span className="text-xl font-normal text-textPrimary">{ user?.firstName }</span>
            <span className="text-slate500 font-normal text-xs"><span className="bg-backgroundGreen500 min-w-2.5 min-h-2.5 rounded-full inline-block mr-0.5"></span>Online</span>
          </div>
        </div>

        <hr/>

        <nav className="flex-1  space-y-2 mt-10">
          <span className={`flex items-center gap-3 rounded-2xl cursor-pointer h-14 ${location === "/" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/')}>
           <img src={`/svgs/${location === "/" ? "dashboardWhite":"dashboardGray"}.svg`} alt="dashboard-icon" className={`${location === "/" ? "w-7 h-auto" : "w-5 h-auto"} `}/>
            <p >Dashboard</p>
          </span>

          <span className={`flex items-center gap-3  rounded-2xl cursor-pointer h-14 ${location === "/quotation" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/quotation')}>
           <img src={`/svgs/${location === "/quotation" ? "quotationWhite":"quotationGray"}.svg`} alt="dashboard-icon" className={`${location === "/quotation" ? "w-7 h-auto" : "w-5 h-auto"} `}/>
            <p>Quotations</p>
          </span>

          {/* {user?.role === "admin" &&  <span className={`flex items-center gap-3 py-2 rounded-2xl cursor-pointer h-14 ${location === "/form" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/form')}>
           <img src={`/svgs/${location === "/form" ? "quotationWhite":"formGray"}.svg`} alt="dashboard-icon" className={`${location === "/form" ? "w-7 h-auto" : "w-5 h-auto"} `}/>
            <p>Create Quotations</p>
          </span>} */}

          {user?.role === "admin" &&  <span className={`flex items-center gap-3 rounded-2xl cursor-pointer h-14 ${location === "/team" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/team')}>
           <img src={`/svgs/${location === "/team" ? "teamWhite":"teamGray"}.svg`} alt="dashboard-icon" className={`${location === "/team" ? "w-7 h-auto" : "w-5 h-auto"} `}/>
            <p>Team</p>
          </span>}

          {user?.role === "admin" &&  <span className={`flex items-center gap-3 rounded-2xl cursor-pointer h-14 ${location === "/reference" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/reference')}>
           <img src={`/svgs/${location === "/reference" ? "referenceWhite":"referenceGray"}.svg`} alt="dashboard-icon" className={`${location === "/reference" ? "w-7 h-auto" : "w-5 h-auto"} `}/>
            <p>Refrence</p>
          </span>}

          <span className={`flex items-center gap-3 rounded-2xl cursor-pointer h-14 ${location === "/profile" ? highLight : "font-normal text-sm pl-4 text-slate500" } `} onClick={()=>handleMenu('/profile')}>
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="currentColor"
>
  <circle cx="12" cy="8" r="4" />
  <ellipse cx="12" cy="18" rx="8" ry="5" />
</svg>
           {/* <img src={`/svgs/${location === "/profile" ? "profileGray":"profileGray"}.svg`} alt="dashboard-icon" className={`${location === "/profile" ? "w-7 h-auto" : "w-5 h-auto"} `}/> */}
            <p>Profile</p>
          </span>

          <span className={`flex items-center gap-3 rounded-2xl cursor-pointer h-14 font-normal text-sm pl-4 text-slate500`} onClick={()=>handleLogout()}>
           <img src={`/svgs/${companyName === "Injaz" ? "logoutBlue":"logoutRed"}.svg`} alt="dashboard-icon" className="w-5 h-auto"/>
            <p>Logout</p>
          </span>



          {/* <p onClick={()=>handleMenu('/quotation')} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/quotation" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
          Quotations
          </p> */}
          {/* {user?.role === "admin" &&  <p onClick={()=>handleMenu('/form')} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/form" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
          Create Quotations
          </p>} */}
          {/* {user?.role === "admin" &&<p onClick={()=>handleMenu('/team')} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/team" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
          Team
          </p>} */}
          {/* {user?.role === "admin" && <p onClick={()=>handleMenu('/reference')} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/reference" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
          Refrence 
          </p>} */}
          {/* <p onClick={()=>handleMenu('/profile')} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/profile" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
          Profile
          </p> */}
          {/* <p onClick={()=>handleLogout()} className={`block py-2 rounded-2xl cursor-pointer h-14 ${location === "/#" ? highLight : "font-normal text-sm pl-4 text-slate500" } `}>
            Logout
          </p> */}
        </nav>

      </div>

      {/* Mobile Sidebar (toggleable with a menu button) */}
      <div className="md:hidden bg-gray-200 text-white w-full fixed top-0 left-0 z-20">
        <div className="flex items-center justify-between p-4">

        <div className="flex items-center justify-between mr-5">
        {companyName === "Conqueror" ? <img className="w-32 h-auto" src= "/page3Logo.png" alt="logo"/> : <img className="w-32 h-auto" src= "/Injaz/page3Logo.png" alt="logo"/> }
         <CDropdown>
                      <CDropdownToggle className="w-10 h-10 mt-2 md:mt-4 relative">
                      <img src={ArrowDown} alt="arrow-down" className="w-auto h-3.5 cursor-pointer absolute top-2.5" />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem className="cursor-pointer" onClick={()=>handleCompanyMenu('Conqueror')}>Conqueror</CDropdownItem>
                        <CDropdownItem className="cursor-pointer" onClick={()=>handleCompanyMenu('Injaz')}>Injaz</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
        </div>

          <button
            className="text-black focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div id="mobile-menu" className="hidden flex-col px-4 py-2 text-black">
        <p onClick={()=>handleMenu('/')} className="block py-2 px-4 rounded hover:bg-gray-300">
            Dashboard
          </p>
          <p onClick={()=>handleMenu('/quotation')} className="block py-2 px-4 rounded hover:bg-gray-300">
          Quotations
          </p>
          {/* {user?.role === "admin" && <p onClick={()=>handleMenu('/form')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
          Create Quotations
          </p>} */}
          {user?.role === "admin" && <p onClick={()=>handleMenu('/team')} className="block py-2 px-4 rounded hover:bg-gray-300">
          Team
          </p>}
          {user?.role === "admin" &&<p onClick={()=>handleMenu('/reference')} className="block py-2 px-4 rounded hover:bg-gray-300">
          Refrence 
          </p>}
          <p onClick={()=>handleMenu('/profile')} className="block py-2 px-4 rounded hover:bg-gray-300">
          Profile
          </p>
          <p onClick={()=>handleLogout()} className="block py-2 px-4 rounded hover:bg-gray-300">
            Logout
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto" >
        <Navbar/>
          {/* {location === "/" && <Dashboard/>}
          {location === "/team" && <Team/>}
          {location === "/reference" && <Reference/>}
          {location === "/setting" && <Setting/>}
          {location === "/quotation" && <Quotation/>}
          {location === "/form" && <TestForm/>}
          {location === "/team/create" && <TeamForm/>}
          {location === `/team/${params?.tid}` && <TeamForm/>}
          {location === "/reference/create" && <RefForm/>}
          {location === `/reference/${params?.rid}` && <RefForm/>} 
          {location === `/profile` && <ProfileForm/>}  */}


        <Outlet />
      </div>
    </div>
  )

};

export default Layout;
