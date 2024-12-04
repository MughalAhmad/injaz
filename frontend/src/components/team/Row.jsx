import React, {useState} from 'react'

const Row = ({row, index, dropdownVisible, setDropdownVisible, dropdownId, setDropdownId}) => {
    


  const toggleDropdown = (index) => {
    if(index !== dropdownId){
    setDropdownVisible(false);
    setDropdownId("");
    setDropdownVisible(true);
    setDropdownId(index)
    }
    else{
        setDropdownVisible(false);
        setDropdownId(""); 
    }
  };

  const handleEdit = () => {
    alert(`Edit action for ${row.FirstName}`);
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    alert(`Delete action for ${row.FirstName}`);
    setDropdownVisible(false);
  };
  return (
    <>
               <tr
      key={row.id}
      className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10`}
    >
      <td className="px-4 py-2 font-semibold text-sm">{index + 1}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">
        {row.FirstName} {row.lastName}
      </td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.email}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.phone}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.nationality}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.id}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.password}</td>
      <td className="px-4 py-2 flex justify-center relative">
        <span
          className="h-6 w-4 rounded-full cursor-pointer hover:bg-slate-200 flex justify-center"
          onClick={()=>toggleDropdown(index)}
        >
          <img src="/svgs/three-dot.svg" className='h-4 w-auto' alt="three-dot" />
        </span>
        {dropdownVisible && dropdownId === index && (
          <div className="absolute top-10 -left-9 bg-white border shadow-md rounded-lg py-2 w-28 z-10">
            <p
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleDelete}
            >

              Delete
            </p>
          </div>
        )}
      </td>
    </tr>
    </>
  )
}

export default Row