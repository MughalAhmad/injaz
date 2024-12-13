import React from 'react'
import Card from '../../components/dashboard/Card';
import Table from '../../components/dashboard/Table';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const {user} = useSelector(state => state.adminStore);

  const cardData= [
    {
      count:'30,000',
      title:'Total Quotation',
      icon:'/svgs/dashboard.svg',
      bg:'bg-blue-500'
    },
    {
      count:'1,200',
      title:'Pending Approvals',
      icon:'/svgs/dashboard.svg',
      bg:'bg-yellow-500'
      },
    {
      count:'1,000',
      title:'Approved Quotations',
      icon:'/svgs/dashboard.svg',
      bg:'bg-green-500'
    },
    {
      count:'1,000',
      title:'Rejected Quotations',
      icon:'/svgs/dashboard.svg',
      bg:'bg-rose-400'
    }
  ]

  return (
    <div className='px-3 md:px-10'>
      <div className='flex justify-between items-center'>
      <p className='font-bold text-2xl text-textPrimary py-11'>Hello {user?.firstName}!</p>
      <select className='w-32 h-10 md:h-14 font-normal text-sm border-2 rounded-lg pr-3 pl-1'>
        <option value="">Select</option>
        <option>Today</option>
        <option>Last Week</option>
        <option>Last Month</option>
      </select>
      </div>
      <div className='flex flex-col flex-wrap gap-3 items-center md:flex-row'>
      {cardData.map((item)=>(
    <Card count={item.count} title={item.title} icon={item.icon} bg={item.bg}/>
      ))}
      </div>
      <Table/>
    </div>
  )
}

export default Dashboard