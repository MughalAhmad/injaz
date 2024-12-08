import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRef, getAllRefs } from '../../redux/features/generalSlice';

const ReferenceRow = ({row, index, dropdownVisible, setDropdownVisible, dropdownId, setDropdownId}) => {
    
const navigate = useNavigate();
const dispatch = useDispatch();

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
    // alert(`Edit action for ${row.FirstName}`);
    setDropdownVisible(false);
    navigate(`/reference/${row._id}`)
    };

  const handleDelete = () => {
    // alert(`Delete action for ${row.FirstName}`);
    setDropdownVisible(false);
    dispatch(deleteRef(row._id)).then((resp)=>{
      if (resp && !resp.payload.hasError) {
        dispatch(getAllRefs())
      }
    })
  };
  return (
    <>
               <tr
      key={row.id}
      className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10`}
    >
      <td className="px-4 py-2 font-semibold text-sm">{index + 1}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.fullName}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.fbId}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.metaId}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.email}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.companyEmail}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.phone}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.company}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.refCode}</td>
      <td className="px-4 py-2 flex justify-center relative">
        <span
          className="h-6 w-4 rounded-full cursor-pointer hover:bg-slate-200 flex justify-center"
          onClick={()=>toggleDropdown(index)}
        >
          <img src="/svgs/three-dot.svg" className='h-4 w-auto' alt="three-dot" />
        </span>
        {dropdownVisible && dropdownId === index && (
          <div className={`absolute top-0 -left-16 bg-white border shadow-md rounded-lg py-2 w-28 z-10`}>
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

export default ReferenceRow