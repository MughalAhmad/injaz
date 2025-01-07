import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import PhoneInput from "../common/PhoneInput";
import Button from "../common/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getUser,
  updateUser,
} from "../../redux/features/generalSlice";
import { sweetNotification } from "../common/SweetAlert";
import { updateShowBackDropLoader } from "../../redux/features/adminSlice";

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
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const TeamForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let formState = "new";
  const [useData, setUseData] = useState([]);
  if (params?.tid) {
    formState = "update";
  }

  const { values, errors, touched, handleBlur, handleChange, submitForm } =
    useFormik({
      initialValues: {
        firstName: useData?.firstName || "",
        lastName: useData?.lastName || "",
        email: useData?.email || "",
        phone: useData?.phone || "",
        phoneCode: useData?.phoneCode || "",
        mobile: useData?.mobile || "",
        mobileCode: useData?.mobileCode || "",
        address: useData?.address || "",
        userId: useData?.userId || "",
        nationality: useData?.nationality || "",
        password: useData?.password || "",
        confirmPassword: useData?.password || "",
      },
      validationSchema: teamCreateSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        const trimmedValues = Object.fromEntries(
          Object.entries(values).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
          ])
        );

        const body = {
          firstName: trimmedValues.firstName,
          lastName: trimmedValues.lastName,
          email: trimmedValues.email,
          password: trimmedValues.password,
          confirmPassword: trimmedValues.confirmPassword,
          phone: trimmedValues.phone,
          phoneCode: trimmedValues.phoneCode,
          mobile: trimmedValues.mobile,
          mobileCode: trimmedValues.mobileCode,
          address: trimmedValues.address,
          userId: trimmedValues.userId,
          nationality: trimmedValues.nationality,
        };
        if (formState === "update") {
          body._id = useData._id;
        }
        dispatch(updateShowBackDropLoader(true));

        dispatch(formState === "update" ? updateUser(body) : createUser(body))
          .then((resp) => {
            dispatch(updateShowBackDropLoader(false));

            if (resp && !resp.payload.hasError) {
              sweetNotification(false, resp.payload.msg);
              navigate("/team");
            } else {
              sweetNotification(true, resp.payload.msg);
            }
          })
          .catch((error) => {
            dispatch(updateShowBackDropLoader(false));
            sweetNotification(true, "Something went wrong");
            console.log(error);
          });
      },
    });

  const getUserData = () => {
    dispatch(getUser(params?.tid))
      .then((resp) => {
        if (resp && !resp.payload.hasError) {
          setUseData(resp.payload.data.user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (formState === "update") {
      getUserData();
    }
  }, []);

  console.log("values", values);

  return (
    <div className="px-3 md:px-5 xl:px-10 mb-10">
      <p className="font-semibold text-2xl text-textPrimary my-11">Team</p>

      <div className="bg-white h-auto flex flex-col gap-3 mt-4 pb-5 rounded-3xl">
        <p className="font-medium text-2xl text-textPrimary border-b-2 py-5 pl-4">
          Add New Team Member
        </p>
        {/* Name */}
        <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
          <p className="hidden font-semibold text-xl text-textPrimary w-[30%] lg:block xl:w-[33%]">
            Name
          </p>
          <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
            <Input
              type="text"
              title="First Name"
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
              title="Last Name"
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
          <p className="font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]">
            Email
          </p>
          <div className={`flex flex-col w-full lg:w-[33%]`}>
            <Input
              type="email"
              title="Email"
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

        <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
          <p className="font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]">
            Calling Number
          </p>
          <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
            <PhoneInput
              type="number"
              title="Phone Number"
              name="phone"
              placeholder="Enter Phone Number"
              size="lg"
              codeName="phoneCode"
              codeValue={values.phoneCode}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              feedback={[errors.phone, touched.phone]}
            />
          </div>
          <div className={`flex flex-col w-full lg:w-[33%]`}>
            <PhoneInput
              type="number"
              title="Mobile Number"
              name="mobile"
              placeholder="Enter Mobile Number"
              size="lg"
              codeName="mobileCode"
              codeValue={values.mobileCode}
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              feedback={[errors.mobile, touched.mobile]}
            />
          </div>
        </div>
        {/* ID */}

        <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
          <p className="font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]">
            ID
          </p>
          <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
            <Input
              type="text"
              title="User ID"
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
              title="Nationality"
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
          <p className="font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[32.5%]">
            Address
          </p>
          <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
            <Input
              type="text"
              title="Address"
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

        <div className="flex flex-col lg:flex-row px-3 md:px-5 xl:px-10">
          <p className="font-semibold text-xl text-textPrimary w-[30%] hidden lg:block xl:w-[33%]">
            Password
          </p>
          <div className={`flex flex-col w-full lg:w-[33%] md:mr-5 xl:mr-10`}>
            <Input
              type="text"
              title="Password"
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
              title="Confirm Password"
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
        <div className="flex justify-end mt-4 mr-3 md:mr-5 xl:mr-10">
          <Button
            title="Save"
            size="sm"
            color={
              localStorage.getItem("companyName") === "Conqueror"
                ? "bg-backgroundSecondary"
                : "bg-backgroundPrimary"
            }
            onClick={() => submitForm()}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamForm;
