import React, {useState, useEffect} from 'react'
import Card from '../../components/dashboard/Card';
import DashboardPaginate from '../../components/dashboard/dashboardPagination';
import { useDispatch, useSelector } from 'react-redux';
import {getDashboardData} from "../../redux/features/pdfSlice";
import {sweetNotification} from "../../components/common/SweetAlert";
import {updateShowBackDropLoader } from "../../redux/features/adminSlice";

const Dashboard = () => {


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState("");
    const [cardName, setCardName] = useState("");
  
  const {user} = useSelector(state => state.adminStore);
  const { pdfData } = useSelector(state => state.pdfStore);
  const { companyName } = useSelector(state => state.brandingStore);

  const cardData= [
    {
      count:pdfData?.cardData?.pending + pdfData?.cardData?.approved + pdfData?.cardData?.rejected || 0,
      title:'Total Quotation',
      icon:'/svgs/dashboard.svg',
      bg:'bg-blue-500',
      name:''
    },
    {
      count:pdfData?.cardData?.pending,
      title:'Pending Approvals',
      icon:'/svgs/dashboardPendding.svg',
      bg:'bg-yellow-500',
      name:'pending'
      },
    {
      count:pdfData?.cardData?.approved,
      title:'Approved Quotations',
      icon:'/svgs/dashboardApproved.svg',
      bg:'bg-green-500',
      name:'approved'
    },
    {
      count:pdfData?.cardData?.rejected,
      title:'Rejected Quotations',
      icon:'/svgs/dashboardReject.svg',
      bg:'bg-rose-400',
      name:'rejected'
    }
  ]

    const getAllDashboardData = () =>{
      const data = {
        companyName: companyName,
        userId: user?._id,
        role: user?.role,
        currentPage:currentPage,
        sortValue:sort,
        cardName:cardName
      }
      dispatch(updateShowBackDropLoader(true));
      
      dispatch(getDashboardData(data)).then((resp)=>{
            dispatch(updateShowBackDropLoader(false));
            if (resp && !resp.payload.hasError) {
            }
            else{
              sweetNotification(true, resp.payload.msg);
            }
          }).catch((error) => {
            dispatch(updateShowBackDropLoader(false));
            sweetNotification(true, "Something went wrong");
        });
    }

    const handleSort = (e) =>{
      setSort(e.target.value);
      }

   useEffect(() => {
    getAllDashboardData()
    }, [localStorage.getItem("companyName"), currentPage, sort, cardName])

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
    <Card count={item.count} key={item.bg} title={item.title} name={item.name} icon={item.icon} bg={item.bg}  setCardName={setCardName}/>
      ))}
      </div>
      <DashboardPaginate
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  )
}

export default Dashboard