import React, { useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {updateShowBackDropLoader} from "../../redux/features/adminSlice";
import { sendPDF } from '../../redux/features/pdfSlice';
import {sweetNotification} from "../common/SweetAlert";
const QuotationTableRow = ({ row, index, handleRowData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const { user } = useSelector(state => state.adminStore);

  const handleMail = () =>{
    const modifyData={
      data:row,
    checkBoxData:row.checkBoxData,
    stateArray:row.stateArray
    }
    dispatch(updateShowBackDropLoader(true));
        dispatch(sendPDF(modifyData))
          .then(response => {
            dispatch(updateShowBackDropLoader(false));
            if (response && !response.payload.hasError) {
             sweetNotification(false, response.payload.msg)
            }
            else{
              sweetNotification(true, response.payload.msg)
            }
          })
          .catch(error => {
            dispatch(updateShowBackDropLoader(false));
            sweetNotification(true, 'Something went wrong');
            console.error('Dispatch failed:', error);
          });
  }

  const handleViewQuotation = () =>{
    navigate(`/view/${row._id}`)
  }

  return (
    <>
      <tr
        key={row.id}
        className={`${index % 2 !== 0 ? "bg-gray-100" : "bg-white"} py-10`}
      >
        <td className="px-4 py-2 font-semibold text-sm">{index + 1}</td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.clientName}
        </td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.clientEmail}
        </td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.clientPhone}
        </td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.reference}
        </td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.selectCompany}
        </td>
        <td className="px-4 py-2 font-semibold text-sm text-center">
          {row.stateValue}
        </td>
        {user.role === 'admin' && <td className="px-4 py-2 font-semibold text-sm text-center">{row.notify}</td>}
        <td className="px-4 py-2 flex justify-center relative">
          <CDropdown>
            <CDropdownToggle>
              <span
                className={`h-6 w-6 rounded-full cursor-pointer bg-opacity-25 group ${
                  localStorage.getItem("companyName") === "Conqueror"
                    ? "hover:bg-red-300  "
                    : "hover:bg-blue-200"
                } flex justify-center items-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={
                    !isHovered ? "/svgs/three-dot.svg" : localStorage.getItem("companyName") === "Injaz" ? "/svgs/threeDotBlue.svg" : "/svgs/threeDotRed.svg"
                    // isHovered
                    //   ? localStorage.getItem("companyName") === "Injaz"
                    //     ? "/svgs/threeDotBlue.svg"
                    //     : "/svgs/threeDotRed.svg"
                    //   : "/svgs/three-dot.svg"
                  }
                  className="h-4 w-auto"
                  alt="three-dot"
                />
              </span>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem className="cursor-pointer" onClick={handleViewQuotation}> View</CDropdownItem>
              {user?.role === "admin" && <CDropdownItem className="cursor-pointer" onClick={() => handleRowData(row)}> Assign</CDropdownItem>}
              <CDropdownItem className="cursor-pointer" onClick={handleMail}> Send</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </td>
      </tr>
    </>
  );
};

export default QuotationTableRow;
