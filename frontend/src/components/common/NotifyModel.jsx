import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import { updateNotification} from "../../redux/features/pdfSlice";
import { useDispatch } from 'react-redux';
const NotifyModel = ({setVisible, visible, notifications, getPdfData}) => {
    const dispatch = useDispatch();
   


     const handleAccept = (id) =>{
            dispatch(updateNotification(id)).then((res)=>{
              if(res && !res.payload.hasError){
                getPdfData();
              }
            })
        }
  

  return (
    <CModal
    alignment="center"
    visible={visible}
    onClose={() => setVisible(false)}
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Notifications</CModalTitle>
    </CModalHeader>
    <CModalBody className='flex flex-col gap-4'>
        {notifications?.map((notify)=>(

    <div className='flex justify-between items-center'><p>{notify.clientName}</p><button onClick={()=>handleAccept(notify._id)}>Accept</button></div>
        ))}
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={() => setVisible(false)}>
        Close
      </CButton>
    </CModalFooter>
  </CModal>
  )
}

export default NotifyModel