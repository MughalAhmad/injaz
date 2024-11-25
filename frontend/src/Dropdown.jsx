import React from 'react'
const Dropdown = ({ label, placeHolder, weight="bold" || 'medium', options, onChange, value, disabled }) => (
<div className='flex flex-col'>
<label className={`text-sm text-[#222A59] font-medium pb-3`}>{label}</label>

    <select
    name={name}
      value={value}
      className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeHolder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown

//////////////////////////////////////////////

// import React, { useState, useEffect, useRef } from 'react';

// const CustomDropdown = ({ label, options, onChange, value, hoverColor, disabled }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(value || '');
//   const dropdownRef = useRef(null);

//   const handleOptionClick = (optionValue) => {
//     setSelectedOption(optionValue);
//     setIsOpen(false);
//     onChange(optionValue);
//   };

//   function truncateString(str, maxLength) {
//     if (str.length > maxLength) {
//       return str.slice(0, maxLength) + '...'; // Append "..." if truncated
//     }
//     return str; // Return original string if not truncated
//   }

//   // Handle clicks outside of the dropdown to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
    
//     // Cleanup the event listener when the component unmounts
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   return (
//     <div ref={dropdownRef} className="relative w-64">
//       <label className="text-sm text-[#222A59] font-medium pb-3">{label}</label>

//       <div
//         className="w-full h-11 border border-[#D0D5DD] rounded-lg px-3 flex items-center justify-between cursor-pointer"
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className=" text-black">{ truncateString(selectedOption, 20) || 'Select an option'}</span>
//         {/* Arrow icon */}
//         <svg
//   className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 24 24"
//   stroke="currentColor"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth={1} // Adjust thickness as needed
//     d="M6 9l6 6 6-6" // Adjusted for a true V shape
//   />
// </svg>
//       </div>

//       {isOpen && (
//         <div className="absolute mt-2 w-full bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-10">
//           {options.map((option, index) => (
//             <div
//               key={index}
//               className={`px-3 py-2 cursor-pointer transition-colors duration-200`} // Ensure transition is smooth
//               onClick={() => handleOptionClick(option.value)}
//               style={{
//                 backgroundColor: selectedOption === option.value ? '#e1eef2' : 'transparent',
//                 color: selectedOption === option.value ? 'black' : 'black', // Set text color
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = hoverColor;
//                 e.currentTarget.style.color = 'white'; // Keep text color black on hover
//                 e.currentTarget.style.borderRadius = '8px'; // Keep text color black on hover

//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = selectedOption === option.value ? '#e1eef2' : 'transparent';
//                 e.currentTarget.style.color = 'black'; // Reset text color
//               }}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;



