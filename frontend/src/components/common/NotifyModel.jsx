import React, {useState, useEffect} from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import {getAllPdf} from "../../redux/features/pdfSlice";
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
const AssigmModel = ({setVisible, visible, userData}) => {
    const dispatch = useDispatch();
    const [pdfs, setPdfs] = useState([])
    const {user} = useSelector(state => state.adminStore);
    const { companyName } = useSelector(state => state.brandingStore);

    const getPdfData =()=>{
        const data = {
                companyName: companyName,
                userId: user?._id,
                role: user?.role,
                currentPage:1
              }
              dispatch(getAllPdf(data)).then((res)=>{
                setPdfs(res.payload.data.pdfs);
              })
    }

    console.log('test',pdfs)
    

useEffect(() => {
  getPdfData()
}, [visible])

  return (
    <CModal
    alignment="center"
    visible={visible}
    onClose={() => setVisible(false)}
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Users List</CModalTitle>
    </CModalHeader>
    <CModalBody className='flex flex-col gap-4'>
        hello
        {/* {users?.map((user)=>(

    <div className='flex justify-between items-center'><p>{user.firstName}{user.lastName}</p><button onClick={()=>assginHandler(user._id)}>Assign</button></div>
        ))} */}
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={() => setVisible(false)}>
        Close
      </CButton>
    </CModalFooter>
  </CModal>
  )
}

export default AssigmModel