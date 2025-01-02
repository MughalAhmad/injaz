import React , {useEffect, useState} from 'react'
import QuoationPaginate from '../../components/quotation/QuotationPagination';
import {useNavigate} from "react-router-dom";
import {sweetNotification} from "../../components/common/SweetAlert";
import {updateShowBackDropLoader } from "../../redux/features/adminSlice";
import { getAllPdf, updateQuotationOptions } from '../../redux/features/pdfSlice';
import { useSelector, useDispatch } from 'react-redux';



const Quotation = () => {
  const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();

  const navigate = useNavigate();
  const {user} = useSelector(state => state.adminStore);
const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
    const { companyName } = useSelector(state => state.brandingStore);

      const getAllQuotationData = () =>{
        let queryParams = `?currentPage=${currentPage}&&filter=${query}&&sortValue=${sort}&&company=${companyName}&&userId=${user?._id}&&role=${user?.role}`;
        dispatch(updateShowBackDropLoader(true));
        dispatch(getAllPdf(queryParams)).then((resp)=>{
              dispatch(updateShowBackDropLoader(false));
              if (resp && !resp.payload.hasError) {
                // sweetNotification(false, resp.payload.msg);
              }
              else{
                sweetNotification(true, resp.payload.msg);
              }
            }).catch((error) => {
              console.log(error);
              dispatch(updateShowBackDropLoader(false));
              sweetNotification(true, "Something went wrong");
          });
      }


       const handleChangeQuery = (e) =>{
           let data1 = {
                field:"currentPage",
                value:1
              }
              dispatch(updateQuotationOptions(data1))
         setCurrentPage(1);
            let data = {
             field:"query",
             value:e.target.value
           }
           dispatch(updateQuotationOptions(data))
         setQuery(e.target.value)
        }
      
        const handleSort = (e) =>{
           let data = {
                field:"sort",
                value:e.target.value
              }
              dispatch(updateQuotationOptions(data))
        setSort(e.target.value);
        }
    

    
    useEffect(() => {
      getAllQuotationData()
      }, [localStorage.getItem("companyName"), currentPage, query, sort])


  return (
      <div className='px-3 md:px-10'>
      <h1 className="text-2xl font-medium mb-4 mt-6 text-textPrimary">Quotations</h1>

      <div className='flex flex-col gap-5 xl:gap-0 xl:flex-row xl:justify-between'>
      {user?.role === "admin" && <button className='bg-backgroundGreen500 max-w-60 text-base font-medium text-white px-6 py-3 rounded-lg' onClick={() => navigate("/form")}>Add New Quotation</button>}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className="flex items-center h-14 w-full md:w-96 rounded-2xl bg-backgroundGray50">
            <img src={localStorage.getItem("companyName") === "Conqueror" ? "/svgs/searchRed.svg" : "/svgs/search.svg" } alt="Search" className="m-4" />
            <input
              type="text"
              value={query}
              onChange={(e)=>handleChangeQuery(e)}
              placeholder="Search here..."
              className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
            />
          </div>
          <select onChange={(e)=>handleSort(e)} className='w-28 h-10 md:h-14 font-normal text-sm border-2 rounded-lg pr-3 pl-1'>
            <option value=''>Select</option>
            <option value='1'>Name: A-Z</option>
            <option value='-1'>Name: Z-A</option>
          </select>
          
        </div>
      </div>




      <QuoationPaginate
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
      </div>
  )
}

export default Quotation