import React from 'react'

const Card = ({title="text", count="0", icon="", bg=""}) => {
  return (
    <div className={`w-full md:w-[346px] h-72 rounded-3xl flex flex-col justify-between p-6 ${bg} bg-opacity-10`}>
        <div className={`w-20 h-20 flex justify-center items-center rounded-full ${bg}`}>
        <img src={icon} alt='bashdoard' />
        </div>
        <p className='font-bold text-5xl text-textPrimary'>{count}</p>
        <p className='text-textPrimary font-semibold text-2xl'>{title}</p>
    </div>
  )
}

export default Card