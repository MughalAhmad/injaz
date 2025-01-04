import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import Button from './Button';
const TextEditer = ({setVisible, visible, handleMail}) => {
    const [value, setValue] = useState('');

  return (
    <CModal
    alignment="center"
    visible={visible}
    onClose={() => setVisible(false)}
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Editer</CModalTitle>
    </CModalHeader>
    <CModalBody className='flex flex-col gap-4'>
       <p>If you want to add something below the default content.</p>
    <ReactQuill theme="snow" value={value} onChange={setValue} />
    {/* <div className='flex justify-between items-center'><p>hello</p>
    
    </div> */}
    </CModalBody>
    <CModalFooter>
    <Button title="Close" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => setVisible(false)} />
    <Button title="Send" size="sm" color={localStorage.getItem("companyName") === "Conqueror" ? "bg-backgroundSecondary" : "bg-backgroundPrimary" } onClick={() => handleMail(value)} />

    </CModalFooter>
  </CModal>
  )
}

export default TextEditer;