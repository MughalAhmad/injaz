import React from 'react'

const Card = ({title="text", count=0, icon="", bg=""}) => {
  return (
    <div className={`w-full md:w-72 h-56 rounded-3xl flex flex-col justify-between p-4 2xl:p-6 ${bg} bg-opacity-10`}>
        <div className={`w-16 h-16 flex justify-center items-center rounded-full ${bg}`}>
        <img src={icon} alt='bashdoard' />
        </div>
        <p className='font-bold text-3xl text-textPrimary'>{count}</p>
        <p className='text-textPrimary font-semibold text-lg 2xl:text-2xl'>{title}</p>
    </div>
  )
}

export default Card