import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import { updateNotification} from "../../redux/features/pdfSlice";
import { useDispatch } from 'react-redux';
import Button from './Button';

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

    <div className='flex justify-between items-center'><p>{notify.clientName}</p>
    <Button title="Assign" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() =>handleAccept(notify._id)} />

    </div>
        ))}
    </CModalBody>
    <CModalFooter>
    <Button title="Close" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => setVisible(false)} />
    </CModalFooter>
  </CModal>
  )
}

export default NotifyModel