import React from 'react'

const Card = ({title="text",name="", count=0, icon="", bg="",setCardName}) => {

  const handleCard = ()=>{
    setCardName(name)
  }

  return (
    <div className={`w-full md:w-72 h-56 rounded-3xl flex flex-col justify-between p-4 2xl:p-6 ${bg} bg-opacity-10 cursor-pointer`} onClick={()=>handleCard()}>
        <div className={`w-16 h-16 flex justify-center items-center rounded-full ${bg}`}>
        <img src={icon} alt='bashdoard' />
        </div>
        <p className='font-bold text-3xl text-textPrimary'>{count}</p>
        <p className='text-textPrimary font-semibold text-lg 2xl:text-2xl'>{title}</p>
    </div>
  )
}

export default Card