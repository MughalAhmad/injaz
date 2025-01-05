import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { sendMailResponse } from "../../redux/features/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import {updateShowBackDropLoader } from "../../redux/features/adminSlice";
import {sweetNotification} from "./SweetAlert";

const MailResponse = () => {
  const [status, setStatus] = useState(false)
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {showBackDropLoader} = useSelector(state => state.adminStore)
  const queryValue = searchParams.get("token");
  const companyName = searchParams.get("comapny");
  const action = searchParams.get("action");
  const handleResponse = () => {
    dispatch(sendMailResponse(queryValue))
      .then((resp) => {
        dispatch(updateShowBackDropLoader(false));

        if (resp && !resp.payload.hasError) {
          setStatus(true);
        } else {
          sweetNotification(true, resp.payload.msg);
        }
      })
      .catch((error) => {
        dispatch(updateShowBackDropLoader(false));

        sweetNotification(true, "Something went wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    handleResponse();
  }, []);
  
  return (
<>
    {status ?
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-3/4 md:w-1/2">
        {companyName === "Injaz" ? (
          <img
            className="w-36 md:w-72 h-auto"
            src="/Injaz/page3Logo.png"
            alt="logo"
          />
        ) : (
          <img
            className="w-36 md:w-72 h-auto"
            src="/page3Logo.png"
            alt="logo"
          />
        )}
      </div>
      <div className="w-3/4 md:w-1/2 font-serif italic font-medium mt-10">
        {action === "approved" ? (
          <p className="text-xl md:text-3xl text-left">
            "Thank you for accepting! We’re thrilled to have your support and
            look forward to moving forward together. If you have any questions
            or need further assistance, feel free to reach out at any time."
          </p>
        ) : (
          <p className="text-xl md:text-3xl text-left">
            "We understand and respect your decision. Thank you for considering
            the opportunity and for your time. If circumstances change or if
            you’d like to discuss further in the future, please don’t hesitate
            to get in touch. Wishing you all the best moving forward!"
          </p>
        )}
      </div>

      <div className="w-3/4 md:w-1/2 flex flex-col items-start font-serif italic font-medium mt-24">
        <p className="text-left text-xl md:text-3xl mb-2 md:mb-4">
          Best regards,
        </p>

        {companyName === "Injaz" ? (
          <p className="text-left text-xl md:text-3xl">
            Injaz Group Fzc Sales Team
          </p>
        ) : (
          <p className="text-left text-xl md:text-3xl">
            Conqueror Aspiration L.L.C Sales Team
          </p>
        )}
      </div>
    </div>
    :
    <div className='w-screen h-screen flex justify-center items-center text-2xl text-blue-700'>Please contact the service provider.</div>}
    </>
  );

};

export default MailResponse;
