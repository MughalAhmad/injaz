import React, {useState} from 'react';
import ReferenceRow from './ReferenceRow';
import { useSelector } from 'react-redux';
const ReferenceTable = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownId, setDropdownId] = useState("");
    const { refs } = useSelector(state => state.generalStore);
    console.log("refs", refs)
    



  return (
    <div>

      <div className="my-8 bg-white overflow-auto rounded-3xl border border-gray-200">
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
                <ReferenceRow row={row} index={index} key={index}
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

export default ReferenceTable;
