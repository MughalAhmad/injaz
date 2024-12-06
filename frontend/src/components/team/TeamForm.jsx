import React from 'react'
import Input from '../common/Input'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { createNewUser } from '../../redux/features/adminSlice';

const teamCreateSchema = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    email: Yup.string().email().required("Enter Valid Email"),
    phone: Yup.number().required("Phone Number Required"),
    mobile: Yup.number().required("Mobile Number Required"),
    address: Yup.string().required("Address Required"),
    userId: Yup.string().required("Last Name Required"),
    nationality: Yup.string().required("Nationality Required"),
    password: Yup.string().min(6).max(25).required("Password Required"),
    confirmPassword: Yup.string()
        .required("Confirm Password Required")
        .oneOf([Yup.ref('password'), null], "Passwords must match"),
});



const TeamForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, submitForm } =
        useFormik({
            initialValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                userType: "",
                paymentDate: "",
            },
            validationSchema: teamCreateSchema,
            enableReinitialize: true,
            onSubmit: async (values) => {

                const body = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    userType: values.userType,
                    paymentDate: values.paymentDate,
                }

                // dispatch(updateShowBackDropLoader(true));
                // dispatch(createNewUser(body))
                //     .then(resp => {
                //         dispatch(updateShowBackDropLoader(false));
                //         if (resp && !resp.payload.hasError) {
                //             sweetToast(false, resp.payload.msg);
                //             navigate('/admin/users');
                //         } else {
                //             sweetNotification(true, resp.payload.msg);
                //         }
                //     })
                //     .catch(error => {
                //         console.log(error);
                //         dispatch(updateShowBackDropLoader(false));
                //         sweetNotification(true, 'Something went wrong');
                //     })
            },
        });
  return (
    <div className='px-3 md:px-10'>
    {/* <p className='font-semibold text-2xl text-textPrimary my-11'>Team</p> */}

    <div className='bg-white h-auto flex flex-col gap-3 mt-4 pb-5 rounded-3xl'>
    <p className='font-medium text-2xl text-textPrimary border-b-2 p-5'>Add New Team Member</p>
    {/* Name */}
    <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Name</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
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
    <div className={`flex flex-col w-full lg:w-[33%]`}>
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
    <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Email</p>
    <div className={`flex flex-col w-full lg:w-[33%]`}>
    <Input
                            type="email"
                            title='Email'
                            name="email"
                            placeholder="Enter Email"
                            size="lg"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.email, touched.email]}
                        />
    </div>  
      </div>
      {/* Phone */}
      <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Calling Number</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Mobile Number</label>
        <input placeholder="Enter first name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <label className='text-xl text-textPrimary font-medium mb-2'>Phone Number</label>
        <input placeholder="Enter last name"
        value=""
        autoComplete='off'
        name=""
        type='text' className='w-full h-16 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div> 
  
      </div>
       {/* ID */}
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>ID</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
    <Input
                            type="text"
                            title='User ID'
                            name="userId"
                            placeholder="Enter User ID"
                            size="lg"
                            value={values.userId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.userId, touched.userId]}
                        />
    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
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
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-full lg:w-[33%]'>Address</p>
    <div className={`flex flex-col w-full lg:w-[33%]`}>
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
       {/* Password */}
       <div className='flex flex-col lg:flex-row px-3 md:px-10'>
    <p className='font-semibold text-v text-textPrimary w-full lg:w-[33%]'>Password</p>
    <div className={`flex flex-col w-full lg:w-[33%] lg:mr-10`}>
    <Input
                            type="text"
                            title='Password'
                            name="password"
                            placeholder="Enter Password"
                            size="lg"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.password, touched.password]}
                        />
    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
        <Input
                            type="text"
                            title='Confirm Password'
                            name="confirmPassword"
                            placeholder="Enter Confirm Password"
                            size="lg"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.confirmPassword, touched.confirmPassword]}
                        />
    </div> 
  
      </div>

    </div>
    </div>
  )
}

export default TeamForm