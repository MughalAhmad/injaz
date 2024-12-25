import React, {useState} from 'react';
import ReferenceRow from './ReferenceRow';
import { useSelector } from 'react-redux';
const ReferenceTable = () => {
    const { refs } = useSelector(state => state.generalStore);
    
  return (




      <div className="w-full">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-sm text-black">Sr</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Full Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Email Address</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Company Email Address</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Calling Number</th>

              <th className="px-4 py-2 font-bold text-sm text-black text-center">Fb ID Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Meta ID Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Ref Code</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Group Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refs?.refs?.map((row, index) => (
                <ReferenceRow row={row} index={index} key={index}/>
            ))}
          </tbody>
        </table>
      </div>





  );
};

export default ReferenceTable;
