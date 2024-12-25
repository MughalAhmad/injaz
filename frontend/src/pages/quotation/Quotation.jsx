import React from 'react'
import QuoationPaginate from '../../components/quotation/QuotationPagination';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

const Quotation = () => {

  const navigate = useNavigate();
  const {user} = useSelector(state => state.adminStore);

  return (
      <div className='px-3 md:px-10'>
      <h1 className="text-2xl font-medium mb-4 mt-6 text-textPrimary">Quotations</h1>
      {user?.role === "admin" && <button className='bg-backgroundGreen500 max-w-60 text-base font-medium text-white px-6 py-3 rounded-lg' onClick={() => navigate("/form")}>Add New Quotation</button>}
      <QuoationPaginate/>
      </div>
  )
}

export default Quotation