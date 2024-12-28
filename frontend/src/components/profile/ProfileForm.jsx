import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import PhoneInput from "../common/PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/generalSlice";
import {
  updateUserImg,
  updateShowBackDropLoader,
} from "../../redux/features/adminSlice";
import { sweetNotification } from "../common/SweetAlert";

const ProfileForm = () => {
  const [useData, setUseData] = useState([]);
  const { user, userImg } = useSelector((state) => state.adminStore);

  const dispatch = useDispatch();
  const getUserData = () => {
    dispatch(updateShowBackDropLoader(true));
    dispatch(getUser(user?.userId)).then((resp) => {
      dispatch(updateShowBackDropLoader(false));
        if (resp && !resp.payload.hasError) {
          sweetNotification(false, resp.payload.msg);
          setUseData(resp.payload.data.user);
        } else {
          sweetNotification(true, resp.payload.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateShowBackDropLoader(false));
        sweetNotification(true, "Something went wrong");
      });
  };

  // const handleChangeImg = (e) =>{
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setImg(event.target.result); // Set the base64 image data
  //       };
  //       reader.readAsDataURL(file);
  //     }
  // }
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        localStorage.setItem("profileImage", base64); // Save to localStorage
        dispatch(updateUserImg(base64));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="px-3 md:px-5 xl:px-10 mb-10">
      <p className="font-semibold text-2xl text-textPrimary my-11">Profile</p>

      <div className="bg-white h-auto flex flex-col lg:flex-row  mt-4 pb-5 rounded-3xl py-10">
        <div className="w-full lg:w-[25%] flex justify-center  relative pl-3">
          <div className="border-2 w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full">
            <img
              src={userImg}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <input
            type="file"
            className="w-60 h-60 absolute rounded-full opacity-0"
            onChange={(e) => handleChangeImg(e)}
          />
        </div>
        <div className="w-full lg:w-[75%]">
          {/* Name */}
          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='hidden font-semibold text-xl text-textPrimary w-[30%] lg:block xl:w-[33%]'>Name</p> */}
            <div className={`flex flex-col w-full lg:w-[50%] md:mr-5 xl:mr-10`}>
              <Input
                type="text"
                disabled={true}
                title="First Name"
                size="lg"
                value={useData?.firstName}
              />
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
              <Input
                type="text"
                title="Last Name"
                size="lg"
                disabled={true}
                value={useData?.lastName}
              />
            </div>
          </div>
          {/* Email */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Email</p> */}
            <div className={`flex flex-col w-full lg:w-[48%]`}>
              <Input
                type="email"
                title="Email"
                disabled={true}
                size="lg"
                value={useData?.email}
              />
            </div>
          </div>
          {/* Phone */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]'>Calling Number</p> */}
            <div className={`flex flex-col w-full lg:w-[50%] md:mr-5 xl:mr-10`}>
              <Input
                type="number"
                title="Phone Number"
                disabled={true}
                size="lg"
                value={useData?.phone}
              />
              {/* <PhoneInput
        type="number"
        title='Phone Number'
        disabled={true}
        size="lg"
        value={useData?.phone}
       /> */}
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
              <Input
                type="number"
                title="Mobile Number"
                disabled={true}
                size="lg"
                value={useData?.mobile}
              />
              {/* <PhoneInput
        type="number"
        title='Mobile Number'
        disabled={true}
        size="lg"
        value={useData?.mobile}
       /> */}
            </div>
          </div>
          {/* ID */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]'>ID</p> */}
            <div className={`flex flex-col w-full lg:w-[50%] md:mr-5 xl:mr-10`}>
              <Input
                type="text"
                title="User ID"
                disabled={true}
                size="lg"
                value={useData?.userId}
              />
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
              <Input
                type="text"
                title="Nationality"
                disabled={true}
                size="lg"
                value={useData?.nationality}
              />
            </div>
          </div>
          {/* Address */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Address</p> */}
            <div className={`flex flex-col w-full lg:w-[48%] md:mr-5 xl:mr-10`}>
              <Input
                type="text"
                title="Address"
                disabled={true}
                size="lg"
                value={useData?.address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
