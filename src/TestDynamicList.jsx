import React, { useState, useEffect } from 'react';
import Title from './Title';
import Button from './Button'

const TestDynamicList = ({heads=[],fields=[], title='text', onhandleChange}) => {

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
  
  const selectApproval =[
    {
        id:'Pre',
        name:'Pre'
    },
    {
        id:'Post',
        name:'Post'
    },
    {
      id:'N/A',
      name:'N/A'
  },
  ]
  // useEffect to update the parent with the new rows whenever rows state changes
  useEffect(() => {
    onhandleChange(rows);
  }, [rows]);
  

  return (
    <div className='bg-red'>
    <div className=' flex flex-col md:flex-row'>
    <Title title={title} titleType='subtitle'/> 

<div className='mb-5 mt-5 md:mt-0'>

      
      <div className="space-y-4 md:ml-5">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
          <div className='flex flex-col md:items-end gap-6 md:gap-10 md:flex-row'>
          <div  className="flex flex-wrap gap-6 md:gap-5 items-center">
            {/* Input fields for each row */}


            <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[0]}</label>
        <input placeholder={`Enter ${heads[0]}`}
        type="number"
        value={row.code}
        onChange={(e) =>
          handleInputChange(rowIndex, 'code', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>
          




    <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[1]}</label>
        <input placeholder={`Enter ${heads[1]}`}
        type="text"
        value={row.description}
        onChange={(e) =>
          handleInputChange(rowIndex, 'description', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>
           
           




    <div className={`flex flex-col`}>
        {/* <SimpleDropdown label={heads[2]} placeHolder="Select"  list={selectApproval} value={row.approval} name='approval' onChange={handleInputChange}/> */}
        <label className={`text-sm text-[#222A59] font-medium pb-3`}>{heads[2]}</label>
        <select 
        defaultValue={row.approval}
        onChange={(e) =>
          handleInputChange(rowIndex, 'approval', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'>
          <option value="">Select</option>
          {selectApproval.map((item, index)=>(
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </select>
    </div>




    <div className={`flex flex-col`}>
        <label className='text-sm text-[#222A59] font-medium mb-2'>{heads[3]}</label>
        <input placeholder={`Enter ${heads[3]}`}
        type="text"
        value={row.authority}
        onChange={(e) =>
          handleInputChange(rowIndex, 'authority', e.target.value)
        }
         className='w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3'/>

    </div>

           
           
          </div>           
           <Button title='Delete'  click={() => deleteRow(rowIndex)}  btnColor='bg-[#EF3826]' hoverBtn='hover:bg-[#d99b95]' />
           </div>
           </React.Fragment>
        ))}
      </div>
    </div>


    </div>
    {/* <div className='flex justify-start md:justify-end'><Button title='Add More' click={addRow} btnColor='bg-[#4AD991]'/></div> */}
    {rows.length < 7 &&<div className='flex flex-col md:justify-end md:flex-row'><Button title='Add More' click={addRow} btnColor='bg-[#4AD991]'/></div>}

    </div>
  )
}

export default TestDynamicList




