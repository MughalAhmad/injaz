import React, { useState, useEffect } from "react";
import Search from "/svgs/search.svg";
import French from "/svgs/french.svg";
import English from "/svgs/english.svg";
import Spanish  from "/svgs/spanish.svg";
import Checked from "/svgs/gray-check.svg";
import Notification from "/svgs/notification.svg";
import { useDispatch, useSelector } from 'react-redux';
import SearchRed from "/svgs/searchRed.svg";
import {useNavigate} from "react-router-dom";
import {sweetNotification} from "./SweetAlert";
import Cookies from 'js-cookie';
import NotifyModel from "./NotifyModel";
import {getNoficationData, getAllPdf, getDashboardData} from "../../redux/features/pdfSlice";

const Navbar = () => {
      const dispatch = useDispatch();
  
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const {user, userImg} = useSelector(state => state.adminStore);
  const { companyName } = useSelector(state => state.brandingStore);
  
      const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([])
  
  const navigate = useNavigate();

  const handleLogout = () =>{
    Cookies.remove('auth-token');
    sweetNotification(false, "Logout successfully ")
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
              const data = {
                companyName: companyName,
                userId: user?._id,
                role: user?.role,
                currentPage:1,
              }
              dispatch(getAllPdf(data))
            }

             const getAllDashboardData = () =>{
                  const data = {
                    companyName: companyName,
                    userId: user?._id,
                    role: user?.role,
                    currentPage:1,
                    sortValue:""
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
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col-reverse gap-5 md:gap-0 md:flex-row md:items-center md:justify-between mt-16 md:mt-0 sticky top-[60px] md:top-0 z-10">
      {/* Left Section: Search Bar */}
      <div className="flex items-center h-14 w-full md:w-96 rounded-2xl bg-backgroundGray50">
      <img src={localStorage.getItem("companyName") === "Conqueror" ? SearchRed : Search } alt="Search" className="m-4"/>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
        />
      </div>

      {/* Right Section: Icons and Dropdowns */}
      <div className="flex justify-end items-center space-x-6">
        {/* Language Selector Dropdown */}
        <div className="relative mr-3">
          <button
            className="flex items-center space-x-1 text-sm font-medium text-gray-700"
            onClick={() => setLanguageDropdown(!languageDropdown)}
          >
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
          </button>
          {languageDropdown && (
            <div className="absolute left-0 md:right-0 mt-2 w-64 bg-white border rounded-2xl shadow-lg z-10">
              <p className="text-base py-3.5 pl-5">Select Language </p>
              <hr/>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100">
              <img src={English} alt="English" className="w-11 h-auto" />
                English
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100">
              <img src={Spanish} alt="Spanish" className="w-11 h-auto"/>
                Spanish
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100 hover:rounded-bl-2xl hover:rounded-br-2xl">
              <img src={French} alt="French" className="w-11 h-auto"/>
                French
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button onClick={()=>setVisible(!visible)} className="relative flex justify-center items-center bg-backgroundYellow400 bg-opacity-12 w-12 h-12 rounded-lg mr-6">
         <img src={Notification} alt="Notification" className="" />
          <div className="absolute top-1 right-1 text-white w-5 h-5 bg-red-500 rounded-full flex justify-center items-center">{notifications.length}</div>
        </button>

        {/* Profile Icon with Dropdown */}
        <div className="relative md:pr-5">
          <button
            className="flex items-center space-x-2"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <img
              src={userImg}
              alt="Profile"
              className="w-16 h-16 mr-3 rounded-xl hidden md:block"
            />
            <div className="pr-5 md:pr-10 leading-5">
              <p className="text-base font-medium text-textPrimary">{user?.firstName}</p>
              <p className="text-sm font-normal text-stone300">{user?.role}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              <p className=" px-4 py-2 cursor-pointer text-sm hover:bg-gray-100" onClick={()=>navigate("/profile")}>
                Profile
              </p>
              <p className=" px-4 py-2 cursor-pointer text-sm hover:bg-gray-100"  onClick={handleLogout}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
    {visible && <NotifyModel visible={visible} setVisible={setVisible} notifications={notifications} getPdfData={getPdfData}/>}
    </>
  );
};

export default Navbar;
