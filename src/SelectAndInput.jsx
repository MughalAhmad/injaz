// import React from 'react'

// const SelectAndInput = ({label="text", list=[], placeholder="text", className='', type, value,  name,  handleChange = () => {}, disabled=false}) => {
//   return (
//     <div className={`flex flex-col ${className}`}>
//         <label className='text-sm text-[#222A59] font-medium mb-2'>{label}</label>

//         <div className='w-64 h-11 flex rounded-lg border border-[#D0D5DD] text-base placeholder-[#D0D5DD] text-black'>
//     <input value={value} name={name} placeholder={placeholder} type={type} disabled={disabled} onChange={handleChange} className={`w-[92%] px-3 outline-none rounded-lg ${disabled ? 'bg-transparent':''} `} />
//     <select name={name} onChange={handleChange}
//     //  className='w-4  outline-none rounded-lg bg-transparent bg-red-400'
//       className='w-8 appearance-none outline-none text-center px-2 bg-red-400'
//      >
//         <option value="">Select</option>
//         {list.map((item)=>(
//         <option key={item.id}value={item.id}>{item.name}</option>
//         ))}

//     </select>
// </div>
//     </div>
//   )
// }

// export default SelectAndInput
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const SelectAndInput = ({
//   label = "text",
//   list = [],
//   placeholder = "text",
//   className = '',
//   type,
//   value,
//   name,
//   handleChange = () => {},
//   disabled = false
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
  
//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle option selection
//   const handleOptionChange = (name,value) => {
//     handleChange(name,value);
//     setIsOpen(false); // Close dropdown after selection
//   };

//   return (
//     <div className={`flex flex-col ${className}`}>
//       <label className='text-sm text-[#222A59] font-medium mb-2'>{label}</label>
      
//       <div className='w-64 h-11 flex rounded-lg border border-[#D0D5DD] text-base text-black'>
//         <input
//           value={value}
//           name={name}
//           placeholder={placeholder}
//           type={type}
//           disabled={disabled}
//           onChange={handleChange}
//           className={`flex-grow px-3 outline-none rounded-l-lg ${disabled ? 'bg-transparent' : ''}`}
//         />

//         {/* Custom Dropdown Button */}
//         <div 
//           className={`flex justify-between items-center cursor-pointer rounded-lg px-2 bg-white relative`}
//           onClick={toggleDropdown}
//         >
//           <span className="text-center">▲</span>
//           {isOpen && (
//             <div 
//               className={`absolute top-full left-0 right-0 mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-32' : 'w-0'} z-30`}
//               style={{ maxHeight: isOpen ? '500px' : '0', overflowY: 'auto' }}
//             >
//               {list.map((item) => (
//                 <div
//                   key={item.id}
//                   className="px-3 py-2 cursor-pointer hover:bg-gray-200"
//                   onClick={()=>handleOptionChange(name, item.name)}
//                 >
//                   {item.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectAndInput;

import React, { useState, useRef, useEffect } from 'react';

const SelectAndInput = ({
  label = "text",
  list = [],
  placeholder = "text",
  className = '',
  type,
  value,
  name,
  basicHandle = () => {},
  handleChange = () => {},
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);  // Reference for the dropdown container

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionChange = (name, value) => {
    handleChange(name, value);
    setIsOpen(false); // Close dropdown after selection
  };

  // Close the dropdown when clicking outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);  // Close dropdown if click is outside
      }
    };

    // Attach event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-col ${className}`} ref={dropdownRef}>
      <label className='text-sm text-[#222A59] font-medium mb-2'>{label}</label>

      <div className='w-64 h-11 flex rounded-lg border border-[#D0D5DD] text-base text-black'>
        <input
          value={value}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          onChange={basicHandle}
          className={`w-[90%] px-3 outline-none rounded-l-lg ${disabled ? 'bg-transparent' : ''}`}
        />

        {/* Custom Dropdown Button */}
        <div 
          className={`w-[10%] flex justify-between items-center cursor-pointer rounded-lg px-2 relative`}
          onClick={toggleDropdown}
        >
          {/* <span className="text-center">v</span> */}
          <i className="fa bg-transparent">&#xf107;</i>
          {isOpen && (
            <div 
              className={`absolute top-full left-0 right-0 mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-32' : 'w-0'} z-30`}
              style={{ maxHeight: isOpen ? 'auto' : '0', overflowY: 'auto' }}
            >
              {list.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOptionChange(name, item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectAndInput;
