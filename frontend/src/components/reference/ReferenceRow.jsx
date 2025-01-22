import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { deleteRef, getAllRefs } from '../../redux/features/generalSlice';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import {updateShowBackDropLoader } from "../../redux/features/adminSlice";
import {sweetNotification} from "../common/SweetAlert";

const ReferenceRow = ({row, index}) => {
    
const navigate = useNavigate();
const dispatch = useDispatch();
const { refsOptions } = useSelector(state => state.generalStore);

const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);


  const handleEdit = () => {
    navigate(`/reference/${row._id}`)
    };

  const handleDelete = () => {
    dispatch(updateShowBackDropLoader(true));
    dispatch(deleteRef(row._id)).then((resp)=>{
       dispatch(updateShowBackDropLoader(false));
      if (resp && !resp.payload.hasError) {
        sweetNotification(false, resp.payload.msg);
        
      let queryParams = `?currentPage=${refsOptions.currentPage}&&filter=${refsOptions.query}&&sortValue=${refsOptions.sort}`;
       dispatch(getAllRefs({queryParams}));
      }
      else{
       sweetNotification(true, resp.payload.msg);
         }
    }).catch(error => {
     dispatch(updateShowBackDropLoader(false));
     sweetNotification(true, 'Something went wrong');
     })
  };
  return (
    <>
               <tr
      key={row.id}
      className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10`}
    >
      <td className="px-4 py-4 font-semibold text-sm">{index + 1}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.fullName}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.email}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.companyEmail}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.mobile}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.fbId}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.metaId}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.refCode}</td>
      <td className="px-4 py-4 font-semibold text-sm text-center">{row.company}</td>
      <td className="px-4 py-4 flex justify-center relative">
    
        <CDropdown>
              <CDropdownToggle className='relative'>
              <span
          className={`h-6 w-6 rounded-full cursor-pointer bg-opacity-25 group absolute top-0 left-2 ${localStorage.getItem("companyName") === "Conqueror" ? "hover:bg-red-300  " : "hover:bg-blue-200" } flex justify-center items-center`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img 
          // src="/svgs/three-dot.svg" 
          src={isHovered
            ? (localStorage.getItem("companyName") === "Injaz" 
                ? "/svgs/threeDotBlue.svg" 
                : "/svgs/threeDotRed.svg")
            : "/svgs/three-dot.svg"}
          className='h-4 w-auto' alt="three-dot" />
        </span>
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem className="cursor-pointer" onClick={handleEdit}> Edit</CDropdownItem>
                <CDropdownItem className="cursor-pointer" onClick={handleDelete}> Delete</CDropdownItem>

              </CDropdownMenu>
            </CDropdown>
      </td>
    </tr>
    </>
  )
}

export default ReferenceRow