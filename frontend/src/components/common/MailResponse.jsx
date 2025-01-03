import React from 'react'
import { useSearchParams } from 'react-router-dom';
import {sendMailResponse} from "../../redux/features/mailSlice";
import { useDispatch } from 'react-redux';
const MailResponse = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('token');
  dispatch(sendMailResponse(queryValue))
  return (
    <div className='w-screen h-screen flex justify-center items-center text-2xl text-blue-700'>working on Mailling</div>
  )
}

export default MailResponse
