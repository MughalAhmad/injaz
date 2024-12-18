import React, {useState, useEffect} from 'react'
import Table from '../../components/quotation/Table';
import QuoationPaginate from '../../components/quotation/QuotationPagination';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPdf} from "../../redux/features/pdfSlice";

const Quotation = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.adminStore);
    const { companyName } = useSelector(state => state.brandingStore);

  const [currentPage, setCurrentPage] = useState(1)


  const getAllQuotationData = () =>{
    const data = {
      companyName: companyName,
      userId: user?._id,
      role: user?.role,
      currentPage:currentPage,
    }
    dispatch(getAllPdf(data))
  }


 useEffect(() => {
  getAllQuotationData()
  }, [localStorage.getItem("companyName"), currentPage])

  return (
      <div className='px-3 md:px-10'>
      <h1 className="text-2xl font-medium mb-4 mt-6 text-textPrimary">Quotations</h1>
      <QuoationPaginate
       setCurrentPage={setCurrentPage}
       currentPage={currentPage}/>
      </div>
  )
}

export default Quotation