import React, { useState, useEffect } from "react";
import Search from "/svgs/search.svg";
import Notification from "/svgs/notification.svg";
import { useDispatch, useSelector } from 'react-redux';
import SearchRed from "/svgs/searchRed.svg";
import {useNavigate} from "react-router-dom";
import {sweetNotification} from "./SweetAlert";
import Cookies from 'js-cookie';
import NotifyModel from "./NotifyModel";
import {getNoficationData, getAllPdf, getDashboardData} from "../../redux/features/pdfSlice";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

const Navbar = () => {
      const dispatch = useDispatch();
    const {user, userImg} = useSelector(state => state.adminStore);
  const { companyName } = useSelector(state => state.brandingStore);
  
      const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([])
  
  const navigate = useNavigate();

  const handleLogout = () =>{
    Cookies.remove('auth-token');
    sweetNotification(false, "Logout successfully ");
    navigate("/login");
    window.location.reload();
  }
  
  const getPdfData =()=>{
        if(user?.role === 'user'){
          const data = {
            companyName: companyName,
            userId: user?._id,
          }
          dispatch(getNoficationData(data)).then((res)=>{
            setNotifications(res.payload.data.notificationData);
          })
        }
         
      }
        const getAllQuotationData = () =>{
          let queryParams = `?currentPage=${1}&&filter=${''}&&sortValue=${''}&&company=${companyName}&&userId=${user?._id}&&role=${user?.role}`;
              dispatch(getAllPdf(queryParams))
            }

             const getAllDashboardData = () =>{
                  const data = {
                    companyName: companyName,
                    userId: user?._id,
                    role: user?.role,
                    currentPage:1,
                    sortValue:"",
                    cardName:''
                  }
                  dispatch(getDashboardData(data))
                }
              

  useEffect(() => {
    getPdfData()
    if(window.location.pathname === "/quotation"){
      getAllQuotationData()
    }
    if(window.location.pathname === "/"){
    getAllDashboardData()
    }
  }, [visible,localStorage.getItem("companyName")])


  return (
    <>
    <nav className="bg-white shadow-md py-3 flex flex-col-reverse gap-4 sm:gap-1 lg:flex-row lg:items-center lg:justify-between mt-16 md:mt-0 sticky top-[90px] md:top-0 z-10">
      {/* Left Section: Search Bar */}
      <div className="flex items-center h-14 w-full lg:ml-4 lg:w-96 rounded-2xl bg-backgroundGray50">
      <img src={localStorage.getItem("companyName") === "Conqueror" ? SearchRed : Search } alt="Search" className="m-4"/>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
        />
      </div>

      {/* Right Section: Icons and Dropdowns */}
      <div className="flex justify-end items-center">
        {/* Language Selector Dropdown */}
      
          {/* <CDropdown>
              <CDropdownToggle >
              <span>Language</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
              </CDropdownToggle>
              <CDropdownMenu className="w-52 ">
                <CDropdownItem className="cursor-pointer flex items-center gap-2 mb-2"> <img src={English} alt="English" className="w-11 h-auto" />English< img src={Checked} alt="Checked" className=""/></CDropdownItem>
                <CDropdownItem className="cursor-pointer flex items-center gap-2 mb-2"><img src={Spanish} alt="Spanish" className="w-11 h-auto"/>Spanish< img src={Checked} alt="Checked" className="ml-10"/></CDropdownItem>
                <CDropdownItem className="cursor-pointer flex items-center gap-2"><img src={French} alt="French" className="w-11 h-auto"/>French< img src={Checked} alt="Checked" className="ml-12"/></CDropdownItem>
              </CDropdownMenu>
            </CDropdown> */}


        {/* Notification Icon */}
        <button onClick={()=>setVisible(!visible)} className="relative flex justify-center items-center bg-backgroundYellow400 bg-opacity-12 w-12 h-12 rounded-lg mx-8">
         <img src={Notification} alt="Notification" className="w-5 h-auto" />
          <div className="absolute top-1 right-1 text-white w-5 h-5 bg-red-500 rounded-full flex justify-center items-center">{notifications.length}</div>
        </button>

        {/* Profile Icon with Dropdown */}
          <div className="flex items-center md:pr-5">
            <img
              src={userImg}
              alt="Profile"
              className="w-16 h-16 mr-3 rounded-xl hidden md:block"
            />
            <div className="pr-2 leading-5 flex flex-col">
              <span className="text-base font-medium text-textPrimary">{user?.firstName}</span>
              <span className="text-sm font-normal text-stone300">{user?.role}</span>
            </div>
            <CDropdown>
              <CDropdownToggle>
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem className="cursor-pointer" onClick={() => navigate("/profile")}>Profile</CDropdownItem>
                <CDropdownItem className="cursor-pointer" onClick={handleLogout}>Logout</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
      </div>


    </nav>
    {visible && <NotifyModel visible={visible} setVisible={setVisible} notifications={notifications} getPdfData={getPdfData}/>}
    </>
  );
};

export default Navbar;
