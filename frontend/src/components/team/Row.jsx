import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers, sendEmailAndPassword } from '../../redux/features/generalSlice';
import ThreeDot from '/svgs/three-dot.svg';

const Row = ({row, index, dropdownVisible, setDropdownVisible, dropdownId, setDropdownId}) => {
    
const navigate = useNavigate();
const dispatch = useDispatch();

const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);


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
    navigate(`/team/${row.userId}`)
    };

  const handleDelete = () => {
    // alert(`Delete action for ${row.FirstName}`);
    setDropdownVisible(false);
    dispatch(deleteUser(row._id)).then((resp)=>{
      if (resp && !resp.payload.hasError) {
        dispatch(getAllUsers())
      }
    })
  };

  const handleMail = () => {
    // alert(`Delete action for ${row.FirstName}`);
    setDropdownVisible(false);
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
        <span
          className={`h-6 w-6 rounded-full cursor-pointer bg-opacity-25 group ${localStorage.getItem("companyName") === "Conqueror" ? "hover:bg-red-300  " : "hover:bg-blue-200" } flex justify-center items-center`}
          onClick={()=>toggleDropdown(index)}
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
            <p
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleMail}
            >

              send
            </p>
          </div>
        )}
      </td>
    </tr>
    </>
  )
}

export default Row