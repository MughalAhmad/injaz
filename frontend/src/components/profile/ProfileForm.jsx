import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import PhoneInput from "../common/PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/features/generalSlice";
import Button from '../common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  updateUserImg,
  updateShowBackDropLoader,
} from "../../redux/features/adminSlice";
import { sweetNotification } from "../common/SweetAlert";


const profileSchema = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    phone: Yup.number().required("Phone Number Required"),
    mobile: Yup.number().required("Mobile Number Required"),
    nationality: Yup.string().required("Nationality Required"),
    address: Yup.string().required("Address Required"),
});   

const ProfileForm = () => {
  const [useData, setUseData] = useState([]);
  const { user, userImg } = useSelector((state) => state.adminStore);
  const [toggle, setToggle] = useState(false)
 

  const dispatch = useDispatch();
  const getUserData = () => {
    dispatch(updateShowBackDropLoader(true));
    dispatch(getUser(user?.userId)).then((resp) => {
      dispatch(updateShowBackDropLoader(false));
        if (resp && !resp.payload.hasError) {
          // sweetNotification(false, resp.payload.msg);
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

   const { values, errors, touched, handleBlur, handleChange, submitForm , resetForm} =
          useFormik({
              initialValues: {
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                phone:user.phone,
                mobile:user.mobile,
                userId:user.userId,
                nationality:user.nationality,
                address:user.address
  
              },
              validationSchema: profileSchema,
              enableReinitialize: true,
              onSubmit: async (values) => {

                         // Trim values
        const trimmedValues = Object.fromEntries(
          Object.entries(values).map(([key, value]) => [
              key,
              typeof value === "string" ? value.trim() : value,
          ])
      );
  
                  const body = {
                    _id:user._id,
                    firstName:trimmedValues.firstName,
                    lastName:trimmedValues.lastName,
                    email:trimmedValues.email,
                    phone:trimmedValues.phone,
                    mobile:trimmedValues.mobile,
                    userId:trimmedValues.userId,
                    nationality:trimmedValues.nationality,
                    address:trimmedValues.address
                  };
                 
                  dispatch(updateShowBackDropLoader(true));
  
                  dispatch(updateUser(body))
                      .then(resp => {
                            dispatch(updateShowBackDropLoader(false));
                        
                          if (resp && !resp.payload.hasError) {
                              sweetNotification(false, resp.payload.msg);
                              getUserData();
                              setToggle(!toggle);

                          }else{
                            sweetNotification(true, resp.payload.msg);
                          }
                      })
                      .catch(error => {
                            dispatch(updateShowBackDropLoader(false));
                        sweetNotification(true, 'Something went wrong');
                          console.log(error);
                      })
              },
          });

const handleCanncel = () =>{
  resetForm();
  setToggle(!toggle);
}


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="px-3 md:px-5 xl:px-10 mb-10">
      <p className="font-semibold text-2xl text-textPrimary my-11">Profile</p>

     { !toggle && <div className="bg-white h-auto flex flex-col lg:flex-row  mt-4 pb-5 rounded-3xl py-10">
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
          {user?.role === "admin" && <div className='flex justify-end mt-4 mr-3 md:mr-5 xl:mr-10'>
      <Button title="Edit" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => setToggle(!toggle)}/>
      </div>}
        </div>
      </div>}

      { toggle &&<div className="bg-white h-auto flex flex-col lg:flex-row  mt-4 pb-5 rounded-3xl py-10">
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
                            title='First Name'
                            name="firstName"
                            placeholder="First Name"
                            size="lg"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.firstName, touched.firstName]}
                        />
             
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
            <Input
                            type="text"
                            title='Last Name'
                            name="lastName"
                            placeholder="Last Name"
                            size="lg"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.lastName, touched.lastName]}
                        />
            </div>
          </div>
          {/* Email */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Email</p> */}
            <div className={`flex flex-col w-full lg:w-[48%]`}>
            <Input
                            type="email"
                            title='Email'
                            // name="email"
                            // placeholder="Enter Email"
                            size="lg"
                            disabled={true}
                            value={values.email}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // feedback={[errors.email, touched.email]}
                        />
            </div>
          </div>
          {/* Phone */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]'>Calling Number</p> */}
            <div className={`flex flex-col w-full lg:w-[50%] md:mr-5 xl:mr-10`}>
            <Input
                              type="number"
                              title='Phone Number'
                              name="phone"
                              placeholder="Enter Phone Number"
                              size="lg"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              feedback={[errors.phone, touched.phone]}
                        />
            
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
            <Input
                              type="number"
                              title='Mobile Number'
                              name="mobile"
                              placeholder="Enter Mobile Number"
                              size="lg"
                              value={values.mobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              feedback={[errors.mobile, touched.mobile]}
                        />
             
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
                value={values.userId}
              />
            </div>
            <div className={`flex flex-col w-full lg:w-[50%]`}>
            <Input
                              type="text"
                              title='Nationality'
                              name="nationality"
                              placeholder="Enter Nationality"
                              size="lg"
                              value={values.nationality}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              feedback={[errors.nationality, touched.nationality]}
             />
            </div>
          </div>
          {/* Address */}

          <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
            {/* <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Address</p> */}
            <div className={`flex flex-col w-full lg:w-[48%] md:mr-5 xl:mr-10`}>
            <Input
                              type="text"
                              title='Address'
                              name="address"
                              placeholder="Enter Address"
                              size="lg"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              feedback={[errors.address, touched.address]}
             />
            </div>
          </div>
          <div className='flex justify-end mt-4 mr-3 md:mr-5 xl:mr-10 gap-2'>
          <Button title="Canncel" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={handleCanncel}/>

      <Button title="Save" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => submitForm()}/>
      </div>
        </div>
      </div>}



    </div>
  );
};

export default ProfileForm;
