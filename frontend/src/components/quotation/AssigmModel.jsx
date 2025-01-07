import React, {useState, useEffect} from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import {getAllUsersNameAndId, assignToUser} from "../../redux/features/generalSlice";
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button';
import {sweetNotification} from "../common/SweetAlert";
import {updateShowBackDropLoader} from "../../redux/features/adminSlice";

const AssigmModel = ({setVisible, visible, userData}) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const getUserData =()=>{
        dispatch(getAllUsersNameAndId()).then((res)=>{
            setUsers(res.payload.data.users)
        })
    }
    const assginHandler = (id) =>{
        let data={
            id:id,
            userData:userData
        }
            dispatch(updateShowBackDropLoader(true));
        
        dispatch(assignToUser(data)).then(response => {
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
        setVisible(!visible);
    }

useEffect(() => {
  getUserData()
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
        {users?.map((user)=>(

    <div className='flex justify-between items-center'><p>{user.firstName}{user.lastName}</p>
        <Button title="Assign" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => assginHandler(user._id)} />

    </div>
        ))}
    </CModalBody>
    <CModalFooter>
    <Button title="Close" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => setVisible(false)} />
    </CModalFooter>
  </CModal>
  )
}

export default AssigmModel