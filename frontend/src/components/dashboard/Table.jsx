import React from "react";

const Table = () => {
    const data = [
        { id: 1, name: 'Christine Brooks', date:'04 Sep 2019', status: 'Approved', payment:'1000' },
        { id: 2, name: 'Rosie Pearson', date:'04 Sep 2019', status: 'Rejected', payment:'1000' },
        { id: 3, name: 'Darrell Caldwell', date:'04 Sep 2019', status: 'Pending', payment:'1000' },
        { id: 4, name: 'Gilbert Johnston', date:'04 Sep 2019', status: 'Approved', payment:'1000' },
        { id: 5, name: 'Alan Cain', date:'04 Sep 2019', status: 'Rejected', payment:'1000' },
        { id: 6, name: 'Alfred Murray', date:'04 Sep 2019', status: 'Pending', payment:'1000' },
      ];

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
  
      <div className="my-8 pt-0.5 bg-white rounded-tl-3xl rounded-tr-3xl overflow-x-hidden">
      <h1 className="text-2xl font-medium mb-4 mt-6 px-5 text-textPrimary">Recent Quotations Table</h1>
      <div className="min-w-96 md:w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-sm text-black">ID</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Customer Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Date Created</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Status</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Payments</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>

            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'} py-10 ${data.length === index ? "rounded-bl-3xl rounded-br-3xl" :""}`}
              >
                <td className="px-4 py-2 font-semibold text-sm">{row.id}</td>
                <td className="px-4 py-2 font-semibold text-sm text-center">{row.name}</td>
                <td className="px-4 py-2 font-semibold text-sm text-center">{row.date}</td>
                <td className={`px-4 py-2 font-semibold text-xs flex justify-center items-center`}><span className={`${calculateState(row.status)} bg-opacity-25 px-3 py-1 rounded-md`}>{row.status}</span></td>
                <td className="px-4 py-2 font-semibold text-sm text-center">{row.payment}</td>
                <td className="px-4 py-2 flex justify-evenly">
                    <button className="px-6 py-1 border rounded-md bg-textPrimary text-white text-xs font-semibold">View</button>
                    <button className="px-6 py-1 border rounded-md bg-textPrimary text-white text-xs font-semibold">Edit</button>
                    <button className="px-6 py-1 border rounded-md bg-textPrimary text-white text-xs font-semibold">Send</button>
                    <button className="px-6 py-1 border rounded-md bg-textPrimary text-white text-xs font-semibold">Delete</button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
