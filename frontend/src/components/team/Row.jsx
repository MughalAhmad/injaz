import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers, sendEmailAndPassword } from '../../redux/features/generalSlice';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

const Row = ({row, index}) => {
    
const navigate = useNavigate();
const dispatch = useDispatch();

const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);

  const handleEdit = () => {
    navigate(`/team/${row.userId}`)
    };

  const handleDelete = () => {
    dispatch(deleteUser(row._id)).then((resp)=>{
      if (resp && !resp.payload.hasError) {
      }
    })
  };

  const handleMail = () => {
    dispatch(sendEmailAndPassword(row._id)).then((resp)=>{
      if (resp && !resp.payload.hasError) {
        dispatch(getAllUsers())
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
      <td className="px-4 py-2 font-semibold text-sm text-center">
        {row.firstName} {row.lastName}
      </td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.email}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.phone}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.nationality}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.userId}</td>
      <td className="px-4 py-2 font-semibold text-sm text-center">{row.password}</td>
      <td className="px-4 py-2 flex justify-center relative">
    
<CDropdown>
              <CDropdownToggle>
              <span
          className={`h-6 w-6 rounded-full cursor-pointer bg-opacity-25 group ${localStorage.getItem("companyName") === "Conqueror" ? "hover:bg-red-300  " : "hover:bg-blue-200" } flex justify-center items-center`}
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
                <CDropdownItem className="cursor-pointer" onClick={handleMail}> Send</CDropdownItem>

              </CDropdownMenu>
            </CDropdown>
      </td>
    </tr>
    </>
  )
}

export default Row