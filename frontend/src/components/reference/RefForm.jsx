import React, {useState, useEffect} from 'react'
import Input from '../common/Input';
import PhoneInput from '../common/PhoneInput';
import Button from '../common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createRef, getRef, updateRef } from '../../redux/features/generalSlice';
import {sweetNotification} from "../common/SweetAlert";
import {updateShowBackDropLoader } from "../../redux/features/adminSlice";

const refCreateSchema = Yup.object({
    fullName: Yup.string().required("Full Name Required"),
    fbId: Yup.string().required("FB ID Required"),
    metaId: Yup.string().required("Meta ID Required"),
    email: Yup.string().email().required("Enter Valid Email"),
    companyEmail: Yup.string().email().required("Enter Valid Company Email"),
    phone: Yup.number().required("Phone Number Required"),
    mobile: Yup.number().required("Mobile Number Required"),
    company: Yup.string().required("Company Required"),
    refCode: Yup.string().required("Ref Code Required"),
});   



const RefForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let formState = 'new';
  const [refData, setRefData] = useState([])
  if(params?.rid){
    formState = 'update'
  }

  const { values, errors, touched, handleBlur, handleChange, submitForm } =
        useFormik({
            initialValues: {

            fullName: refData?.fullName ||"",
            fbId: refData?.fbId ||"",
            metaId: refData?.metaId ||"",
            email:  refData?.email ||"",
            companyEmail: refData?.companyEmail ||"",
            phone: refData?.phone ||"",
            mobile: refData?.mobile ||"",
            company: refData?.company ||"",
            refCode: refData?.refCode || "",

            },
            validationSchema: refCreateSchema,
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

                    fullName: trimmedValues.fullName,
                    fbId: trimmedValues.fbId,
                    metaId: trimmedValues.metaId,
                    email: trimmedValues.email,
                    companyEmail: trimmedValues.companyEmail,
                    phone: trimmedValues.phone,
                    mobile: trimmedValues.mobile,
                    company: trimmedValues.company,
                    refCode: trimmedValues.refCode

                };
                if(formState === 'update'){
                  body._id=refData._id
                }
                console.log(formState)
                console.log(body)
                dispatch(updateShowBackDropLoader(true));

                dispatch( formState === 'update' ? updateRef(body) : createRef(body) )
                    .then(resp => {
                          dispatch(updateShowBackDropLoader(false));
                      
                        if (resp && !resp.payload.hasError) {
                            sweetNotification(false, resp.payload.msg);
                            navigate('/reference');
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

        const getRefData = () =>{
              dispatch(updateShowBackDropLoader(true));
          
          dispatch(getRef(params?.rid)) // Now this refers to the Redux action
          .then((resp) => {
                dispatch(updateShowBackDropLoader(false));
            
            if (resp && !resp.payload.hasError) {
                setRefData(resp.payload.data.ref);
            }
          })
          .catch((error) => {
            dispatch(updateShowBackDropLoader(false));

            console.error(error);
          });
        };
        console.log(formState)
          
        useEffect(() => {
          if(formState === 'update'){
            getRefData()
          }
        }, [])

  return (
    <div className='px-3 md:px-5 xl:px-10 mb-10'>
    <p className='font-semibold text-2xl text-textPrimary my-11'>Reference</p>

    <div className='bg-white h-auto flex flex-col gap-3 mt-4 pb-5 rounded-3xl'>
    <p className='font-medium text-2xl text-textPrimary border-b-2 py-5 pl-4'>Add New Reference</p>
    {/* Name */}
    <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='hidden font-semibold text-xl text-textPrimary w-[30%] lg:block xl:w-[33%]'>Name</p>
    <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
    <Input
                            type="text"
                            title='Full Name'
                            name="fullName"
                            placeholder="Full Name"
                            size="lg"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.fullName, touched.fullName]}
                        />
    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
    <Input
                            type="text"
                            title='FB ID Name'
                            name="fbId"
                            placeholder="FB ID Name"
                            size="lg"
                            value={values.fbId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.fbId, touched.fbId]}
                        />
    </div> 
  
      </div>

      {/* mete Id */}
    <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='hidden font-semibold text-xl text-textPrimary w-[30%] lg:block xl:w-[32.5%]'></p>
    <div className={`flex flex-col w-full lg:w-[33%]`}>
    <Input
                            type="text"
                            title='Meta ID Name'
                            name="metaId"
                            placeholder="Meta ID Name"
                            size="lg"
                            value={values.metaId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.metaId, touched.metaId]}
                        />
    </div> 
  
      </div>
    {/* Email */}


    <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]'>Email</p>
    <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>

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
    <div className={`flex flex-col w-full lg:w-[33%]`}>

<Input
                        type="email"
                        title='Company Email'
                        name="companyEmail"
                        placeholder="Enter Company Email"
                        size="lg"
                        value={values.companyEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        feedback={[errors.companyEmail, touched.companyEmail]}
                    />
</div>  
      </div>
      {/* Phone */}

      <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]'>Calling Number</p>
    <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
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
       {/* <PhoneInput
        type="number"
        title='Phone Number'
        name="phone"
        placeholder="Enter Phone Number"
        size="lg"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        feedback={[errors.phone, touched.phone]}
       /> */}
      
    </div>  
    <div className={`flex flex-col w-full lg:w-[33%]`}>
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
           {/* <PhoneInput
        type="number"
        title='Mobile Number'
        name="mobile"
        placeholder="Enter Mobile Number"
        size="lg"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        feedback={[errors.mobile, touched.mobile]}
       /> */}
    </div> 
  
      </div>
       {/* Group Name */}

       <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Group Name</p>
    <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
    <Input
                            type="text"
                            title='Comapny'
                            name="company"
                            placeholder="Enter Company"
                            size="lg"
                            value={values.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.company, touched.company]}
                        />
    </div>  
      </div>
       {/* Code */}

       <div className='flex flex-col lg:flex-row px-3 md:px-5 xl:px-10'>
    <p className='font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]'>Code</p>
    <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
    <Input
                            type="text"
                            title='Ref Code'
                            name="refCode"
                            placeholder="Enter Ref Code"
                            size="lg"
                            value={values.refCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={[errors.refCode, touched.refCode]}
                        />
    </div>  
      </div>
    
 <div className='flex justify-end mt-4 mr-3 md:mr-5 xl:mr-10'>
      <Button title="Save" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => submitForm()} />
      </div>
    </div>
    </div>
  )
}

export default RefForm