import React from 'react'

const SimpleDropdown = ({label="text", placeHolder="text", weight="bold" || 'medium', list=[], name, value, onChange}) => {
  return (
    <div className='flex flex-col'>
        <label className={`text-sm text-[#222A59] font-medium pb-3`}>{label}</label>
        <select 
        name={name}
        defaultValue={value}
        // value={value} // Use the value prop
        onChange={onChange} // Ensure onChange is passed down
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'>
          <option value="">{placeHolder}</option>
          {list.map((item, index)=>(
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </select>

    </div>
  )
}

export default SimpleDropdown