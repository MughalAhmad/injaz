import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.min.css'
import AssigmModel from './AssigmModel';
import QuotationTableRow from './QuotationTableRow';


const Table = () => {

    const { pdfData } = useSelector(state => state.pdfStore);
    const { user } = useSelector(state => state.adminStore);
    const [visible, setVisible] = useState(false)
    const [row, setRow] = useState({})

    

    
    

    const handleRowData = (row) =>{
      setRow(row)
      setVisible(!visible)
    }

  return (
      <div className="w-full">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-sm text-black">ID</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Customer Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Email</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Phone</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Reference</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Company</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">State</th>
              {user.role === 'admin' && <th className="px-4 py-2 font-bold text-sm text-black text-center">Assign</th>}
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdfData?.list?.map((row, index) => (
              <QuotationTableRow row={row} index={index} key={index} handleRowData={handleRowData}/>
              // <tr
              //   key={row.id}
              //   className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10`}
              // >
              //   <td className="px-4 py-2 font-semibold text-sm">{index+1}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientName}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientEmail}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientPhone}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.reference}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.selectCompany}</td>
              //   <td className="px-4 py-2 font-semibold text-sm text-center">{row.stateValue}</td>
              //  {user.role === 'admin' && <td className="px-4 py-2 font-semibold text-sm text-center">{row.notify}</td>}
              //   <td className="px-4 py-2 flex justify-evenly">
              //        {user?.role === "admin" && <button className={` px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`} onClick={() => handleRowData(row)}>assign</button>}
              //        <button className={` px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Status</button>
              //       <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Send</button>
              //   </td>
              // </tr>
            ))}
          </tbody>
        </table>

  
{visible && <AssigmModel visible={visible} setVisible={setVisible} userData={row}/>}



      </div>
    
  );
};

export default Table;
