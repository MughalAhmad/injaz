import React from 'react'

const Button = ({title="text", click, btnColor='bg-[#4AD991]', hoverBtn='hover:bg-[#99eec3]' , className=''}) => {
  return (
    <div className={`w-auto h-11 px-5 text-center ${className} ${btnColor} text-white rounded-lg flex justify-center items-center text-sm cursor-pointer ${hoverBtn}`}
    onClick={click}
    >{title}</div>
  )
}

export default Button