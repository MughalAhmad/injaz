import React, {useState, useEffect} from 'react'
import Card from '../../components/dashboard/Card';
import DashboardPaginate from '../../components/dashboard/dashboardPagination';
import { useDispatch, useSelector } from 'react-redux';
import {getDashboardData} from "../../redux/features/pdfSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState("");
  
  const {user} = useSelector(state => state.adminStore);
  const { pdfData } = useSelector(state => state.pdfStore);
  const { companyName } = useSelector(state => state.brandingStore);

  const cardData= [
    {
      count:pdfData?.cardData?.pending + pdfData?.cardData?.approved + pdfData?.cardData?.rejected,
      title:'Total Quotation',
      icon:'/svgs/dashboard.svg',
      bg:'bg-blue-500'
    },
    {
      count:pdfData?.cardData?.pending,
      title:'Pending Approvals',
      icon:'/svgs/dashboardPendding.svg',
      bg:'bg-yellow-500'
      },
    {
      count:pdfData?.cardData?.approved,
      title:'Approved Quotations',
      icon:'/svgs/dashboardApproved.svg',
      bg:'bg-green-500'
    },
    {
      count:pdfData?.cardData?.rejected,
      title:'Rejected Quotations',
      icon:'/svgs/dashboardReject.svg',
      bg:'bg-rose-400'
    }
  ]

    const getAllDashboardData = () =>{
      const data = {
        companyName: companyName,
        userId: user?._id,
        role: user?.role,
        currentPage:currentPage,
        sortValue:sort
      }
      dispatch(getDashboardData(data))
    }

    const handleSort = (e) =>{
      setSort(e.target.value);
      }

   useEffect(() => {
    getAllDashboardData()
    }, [localStorage.getItem("companyName"), currentPage, sort])

  return (
    <div className='px-3 md:px-10'>
      <div className='flex justify-between items-center'>
      <p className='font-bold text-2xl text-textPrimary py-11'>Hello {user?.firstName}!</p>
      <select  onChange={(e)=>handleSort(e)} className='w-32 h-10 md:h-14 font-normal text-sm border-2 rounded-lg pr-3 pl-1'>
        <option value="">Select</option>
        <option value='today' >Today</option>
        <option value='week'>Last Week</option>
        <option value='month'>Last Month</option>
      </select>
      </div>
      <div className='flex flex-col flex-wrap gap-3 items-center md:flex-row'>
      {cardData.map((item)=>(
    <Card count={item.count} title={item.title} icon={item.icon} bg={item.bg}/>
      ))}
      </div>
      <DashboardPaginate
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  )
}

export default Dashboard