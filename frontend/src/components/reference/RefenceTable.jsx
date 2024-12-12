import React, {useState, useEffect} from 'react';
import ReferenceRow from './ReferenceRow';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRefs } from '../../redux/features/generalSlice';
const ReferenceTable = () => {
  const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownId, setDropdownId] = useState("");
    const dispatch = useDispatch();
    const { refs } = useSelector(state => state.generalStore);

    const getAllRefsList = () =>{
      dispatch(getAllRefs());
    }

    console.log("refs", refs)
  
    useEffect(() => {
      getAllRefsList()
    }, [])

  return (
    <div>
      <div className='flex flex-col gap-5 xl:gap-0 xl:flex-row xl:justify-between'>
        <button className='bg-backgroundGreen500 max-w-60 text-base font-medium text-white px-6 py-3 rounded-lg' onClick={() => navigate("/reference/create")}>Add New Reference</button>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className="flex items-center h-14 w-full md:w-96 rounded-2xl bg-backgroundGray50">
          <img src={localStorage.getItem("companyName") === "Conqueror" ? "/svgs/searchRed.svg" : "/svgs/search.svg" } alt="Search" className="m-4" />
          <input
              type="text"
              placeholder="Search here..."
              className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
            />
          </div>
          <select className='w-28 h-10 md:h-14 font-normal text-sm border-2 rounded-lg pr-3 pl-1'>
            <option value=''>Select</option>
            <option>Name: A-Z</option>
            <option>Name: Z-A</option>
          </select>
        </div>
      </div>
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
