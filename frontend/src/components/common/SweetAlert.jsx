import React from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const sweetNotification = (hasError = false, message = 'No Message', time = 2000) => {
    if(typeof hasError !== 'boolean'){
      hasError = false;
    }
    if(typeof message !== 'string'){
      message = 'Something went Wrong';
    }
    if(typeof time !== 'boolean'){
      time = 2000;
    }
  
    MySwal.fire({
        position: "center",
        icon: hasError ? 'error' : 'success',
        title: message,
        showConfirmButton: false,
        timer: time
      });
    }

