import React, { useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {sweetNotification} from "../common/SweetAlert";
import {updateShowBackDropLoader} from "../../redux/features/adminSlice";
import { sendPDF } from '../../redux/features/pdfSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import TextEditer from "../common/TextEditer";

const DashboardTableRow = ({ row, index, handleRowData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  
  const { user } = useSelector(state => state.adminStore);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMail = (editerText) =>{
    setVisible(!visible);
      const modifyData={
        data:row,
      checkBoxData:row.checkBoxData,
      stateArray:row.stateArray,
      editerText:editerText
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
        <td className="px-4 py-4 font-semibold text-sm">{index + 1}</td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.clientName}
        </td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.clientEmail}
        </td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.clientPhone}
        </td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.reference}
        </td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.selectCompany}
        </td>
        <td className="px-4 py-4 font-semibold text-sm text-center">
          {row.stateValue}
        </td>

        {row.pdfStatus === 'pending' && <td className="px-4 py-4 font-semibold text-sm text-center">
          <span className="bg-yellow-500 bg-opacity-10 text-yellow-500 px-2 py-1 rounded-lg">{row.pdfStatus}</span>
        </td>}

        {row.pdfStatus === 'rejected' && <td className="px-4 py-4 font-semibold text-sm text-center">
          <span className="bg-rose-400 bg-opacity-10 text-rose-400 px-2 py-1 rounded-lg">{row.pdfStatus}</span>
        </td>}

        {row.pdfStatus === 'approved' && <td className="px-4 py-4 font-semibold text-sm text-center">
          <span className="bg-green-500 bg-opacity-10 text-green-500 px-2 py-1 rounded-lg">{row.pdfStatus}</span>
        </td>}
        {user.role === 'admin' && <td className="px-4 py-4 font-semibold text-sm text-center">{row.notify}</td>}

        <td className="px-4 py-4 flex justify-center relative">
          <CDropdown>
            <CDropdownToggle className="relative">
              <span
                className={`h-6 w-6 rounded-full cursor-pointer bg-opacity-25 group absolute top-0 left-2 ${
                  localStorage.getItem("companyName") === "Conqueror"
                    ? "hover:bg-red-300  "
                    : "hover:bg-blue-200"
                } flex justify-center items-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  // src="/svgs/three-dot.svg"
                  src={
                    isHovered
                      ? localStorage.getItem("companyName") === "Injaz"
                        ? "/svgs/threeDotBlue.svg"
                        : "/svgs/threeDotRed.svg"
                      : "/svgs/three-dot.svg"
                  }
                  className="h-4 w-auto"
                  alt="three-dot"
                />
              </span>
            </CDropdownToggle>
            <CDropdownMenu className="z-50">
              <CDropdownItem className="cursor-pointer"  onClick={handleViewQuotation}> View</CDropdownItem>
              <CDropdownItem className="cursor-pointer" onClick={()=>handleRowData(row)}> Assign</CDropdownItem>
              <CDropdownItem className="cursor-pointer" onClick={()=>setVisible(!visible)}> Send</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </td>
      </tr>

      {visible && <TextEditer visible={visible} setVisible={setVisible} handleMail={handleMail}/>}

    </>
  );
};

export default DashboardTableRow;
