import React from 'react'
import { useSelector } from 'react-redux';
import DashboardTableRow from "./DashboardTableRow";
const Table = () => {
    
  const { pdfData } = useSelector(state => state.pdfStore);
 

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
            <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfData?.list?.map((row, index) => (
            <DashboardTableRow row={row} index={index} key={index}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
