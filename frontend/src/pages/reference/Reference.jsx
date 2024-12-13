import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllRefs } from '../../redux/features/generalSlice';
import ReferencePaginate from '../../components/reference/ReferencePagination';


const Refrence = () => {
  const [currentPage, setCurrentPage] = useState(1)


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");


  const getAllRefsList = () =>{
    let queryParams = `?currentPage=${currentPage}&&filter=${query}&&sortValue=${sort}`;
    dispatch(getAllRefs({queryParams}));
  }

  const handleNavigation = (link) =>{
    // localStorage.setItem("menu",link)
    navigate(link)
  }

  const handleChangeQuery = (e) =>{
   setCurrentPage(1);
   setQuery(e.target.value)
  }

  const handleSort = (e) =>{
  setSort(e.target.value);
  }


  useEffect(() => {
    getAllRefsList()
  }, [currentPage, query, sort])
  return (
    <div className='px-3 md:px-10'>
      <p className='font-semibold text-2xl text-textPrimary my-11'>Reference</p>
      <div className='flex flex-col gap-5 xl:gap-0 xl:flex-row xl:justify-between'>
        <button className='bg-backgroundGreen500 max-w-60 text-base font-medium text-white px-6 py-3 rounded-lg' onClick={() => handleNavigation("/reference/create")}>Add New Reference</button>
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
      <ReferencePaginate
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  )
}

export default Refrence