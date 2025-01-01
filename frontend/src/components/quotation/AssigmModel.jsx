import React, {useState, useEffect} from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import {getAllUsersNameAndId, assignToUser} from "../../redux/features/generalSlice";
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button';

const AssigmModel = ({setVisible, visible, userData}) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const {user} = useSelector(state => state.adminStore);
    const { companyName } = useSelector(state => state.brandingStore);

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
        dispatch(assignToUser(data));
        setVisible(!visible);
        window.location.reload();
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
    
    {/* <button onClick={()=>assginHandler(user._id)}>Assign</button> */}
    <Button title="Assign" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => assginHandler(user._id)} />

    </div>
        ))}
    </CModalBody>
    <CModalFooter>
    <Button title="Close" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => setVisible(false)} />

      {/* <CButton color="secondary" onClick={() => setVisible(false)}>
        Close
      </CButton> */}
    </CModalFooter>
  </CModal>
  )
}

export default AssigmModel