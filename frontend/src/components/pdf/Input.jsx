import React from 'react'

const Input = ({label="text", placeholder="text", className='', type, value="",  name,  handleChange = () => {}}) => {
  return (
    <div className={`flex flex-col ${className}`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{label}</label>
        <input placeholder={placeholder}
        value={value}
        autoComplete='off'
        name={name}
        onChange={handleChange}
        type={type} className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>
  )
}

export default Input