import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPdf } from '../../redux/features/pdfSlice';

const Table = () => {

    const dispatch = useDispatch();
    const { list } = useSelector(state => state.pdfStore);
    const { companyName } = useSelector(state => state.brandingStore);
    const { user } = useSelector(state => state.adminStore);

    const getAllPdfList = () =>{
      const data = {
        companyName: companyName,
        userId: user?._id,
        role: user?.role
      }
      dispatch(getAllPdf(data))
    }
  
    useEffect(() => {
      getAllPdfList()
    }, [localStorage.getItem("companyName")])

  return (
    <div>
      <div className="my-8 bg-white overflow-x-hidden rounded-3xl border border-gray-200">
      <div className="w-full overflow-x-auto">
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
            {list?.map((row, index) => (
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
                    <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Edit</button>
                    <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Send</button>
                    <button className={`px-6 py-1 border rounded-md ${localStorage.getItem("companyName") === "Injaz" ? "bg-textPrimary" : "bg-backgroundSecondary" } text-white text-xs font-semibold`}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5 px-5">
        <p className="text-textPrimary font-normal text-sm">
      Showing 1 to 10 of 100 entries
        </p>
      </div>
     </div>
     </div>
  );
};

export default Table;
