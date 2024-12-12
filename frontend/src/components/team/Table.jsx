import React, {useState} from 'react';
import Row from './Row';
import { useSelector } from 'react-redux';
const Table = () => {

  
  const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownId, setDropdownId] = useState("");
    const { users } = useSelector(state => state.generalStore);
    console.log("user", users)
  return (
    <div>
    
      <div className="my-8 bg-white rounded-3xl overflow-auto border border-gray-200">
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
                <Row row={row} index={index} key={index}
                dropdownVisible={dropdownVisible} setDropdownVisible={setDropdownVisible}
                dropdownId={dropdownId} setDropdownId={setDropdownId}
                />
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
