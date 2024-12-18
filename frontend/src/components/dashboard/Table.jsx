import React from 'react'
import { useSelector } from 'react-redux';
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
            <tr
              key={row.id}
              className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10`}
            >
              <td className="px-4 py-2 font-semibold text-sm">{index+1}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientName}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientEmail}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.clientPhone}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.reference}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.selectCompany}</td>
              <td className="px-4 py-2 font-semibold text-sm text-center">{row.stateValue}</td>
              <td className="px-4 py-2 flex justify-evenly">
                  <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>View</button>
                  {/* <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Edit</button> */}
                  <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Send</button>
                  {/* <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
