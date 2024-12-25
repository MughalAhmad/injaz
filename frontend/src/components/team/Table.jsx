import React, {useState} from 'react';
import Row from './Row';
import { useSelector } from 'react-redux';
const Table = () => {
    const { users } = useSelector(state => state.generalStore);
  return (
      <div className="w-full ">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-sm text-black">Sr</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Full Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Email Address</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Calling Number</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Nationality</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">ID</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Password</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((row, index) => (
                <Row row={row} index={index} key={index}/>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default Table;
