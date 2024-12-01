import React, { useState, useEffect } from 'react';
import Input from './Input';
import Title from './Title';
import Button from './Button'
const DynamicList = ({heads=[],fields=[], title='text', onhandleChange, handleAmount}) => {

   const [rows, setRows] = useState([fields]);

  // Function to handle input change
  const handleInputChange = (rowIndex, field, value) => {
    const updatedRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    onhandleChange(updatedRows);
  };

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { ...fields }]);
  };

  const handlData =()=>{
    console.log(rows);
    onhandleChange(rows);
  }

  // Function to delete a specific row
  const deleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  // useEffect to update the parent with the new rows whenever rows state changes
  useEffect(() => {
    onhandleChange(rows);
  }, [rows, onhandleChange]);
  

  return (
    <>
    <div className=' flex flex-col md:flex-row'>
    <Title title={title} titleType='subtitle'/> 

<div className='mb-5 mt-5 md:mt-0'>

      
      <div className="space-y-4 md:ml-5">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
          <div className='flex flex-col md:items-end gap-6 md:gap-10 md:flex-row'>
          <div  className="flex flex-wrap gap-6 md:gap-10 items-center">
            {/* Input fields for each row */}


            <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[0]}</label>
        <input placeholder={`Enter ${heads[0]}`}
        type="text"
        value={row.description}
        onChange={(e) =>
          handleInputChange(rowIndex, 'description', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>
          




    <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[1]}</label>
        <input placeholder={`Enter ${heads[1]}`}
        type="text"
        value={row.price}
        onChange={(e) =>
          handleInputChange(rowIndex, 'price', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>
           
           




    <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[2]}</label>
        <input placeholder={`Enter ${heads[2]}`}
        type="text"
        value={row.remarks}
        onChange={(e) =>
          handleInputChange(rowIndex, 'remarks', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>




    <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[3]}</label>
        <input placeholder={`Enter ${heads[3]}`}
        type="text"
        value={row.timeline}
        onChange={(e) =>
          handleInputChange(rowIndex, 'timeline', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>

           
           
          </div>           
           <Button title='Delete'  click={() => deleteRow(rowIndex)}  btnColor='bg-[#EF3826]' hoverBtn='hover:bg-[#d99b95]' />
           </div>
           <hr/>
           </React.Fragment>
        ))}
      </div>
    </div>










    </div>
    <div className='flex justify-end'><Button title='Add More' click={addRow} btnColor='bg-[#4AD991]'/></div>
    </>
  )
}

export default DynamicList




