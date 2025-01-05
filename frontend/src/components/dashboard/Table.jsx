import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import DashboardTableRow from "./DashboardTableRow";
import '@coreui/coreui/dist/css/coreui.min.css'
import AssigmModel from '../quotation/AssigmModel';

const Table = () => {
    
  const { pdfData } = useSelector(state => state.pdfStore);
     const { user } = useSelector(state => state.adminStore);
 const [visible, setVisible] = useState(false)
     const [row, setRow] = useState({})

      const calculateState = (value) =>{
        if(value === "Approved"){
            return "bg-green-500 text-green-500"
        }
        else if(value === "Rejected"){
           return "bg-rose-500 text-rose-500"
        }
        else{
             return "bg-yellow-500 text-yellow-500"
        }
      }
      const handleRowData = (row) =>{
        setRow(row)
      setVisible(!visible)
      }
  return (
    <div className="w-full">
    <table className="min-w-full">
      <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-4 text-left font-bold text-sm text-black">ID</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Customer Name</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Email</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Phone</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Reference</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Company</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">State</th>
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Status</th>
            {user.role === 'admin' && <th className="px-4 py-4 font-bold text-sm text-black text-center">Assign</th>}
            <th className="px-4 py-4 font-bold text-sm text-black text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfData?.list?.map((row, index) => (
            <DashboardTableRow row={row} index={index} key={index} handleRowData={handleRowData}/>
          ))}
        </tbody>
      </table>
      {visible && <AssigmModel visible={visible} setVisible={setVisible} userData={row}/>}

    </div>
  );
};

export default Table;
