import React, {useState} from 'react';
import Row from './Row';
import { useNavigate } from 'react-router-dom';
const Table = () => {
  const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownId, setDropdownId] = useState("");

    const list=[
        {
            firstName:'abc',
            lastName:'xyz',
            email:'abc@gmail.com',
            phone:'03114608083',
            nationality:'USA',
            id:'12345',
            password:'abc123'
        },
        {
            firstName:'abc',
            lastName:'xyz',
            email:'abc@gmail.com',
            phone:'03114608083',
            nationality:'USA',
            id:'12345',
            password:'abc123'
        },
        {
            firstName:'abc',
            lastName:'xyz',
            email:'abc@gmail.com',
            phone:'03114608083',
            nationality:'USA',
            id:'12345',
            password:'abc123'
        },
        {
            firstName:'abc',
            lastName:'xyz',
            email:'abc@gmail.com',
            phone:'03114608083',
            nationality:'USA',
            id:'12345',
            password:'abc123'
        },
        {
            firstName:'abc',
            lastName:'xyz',
            email:'abc@gmail.com',
            phone:'03114608083',
            nationality:'USA',
            id:'12345',
            password:'abc123'
        },
    ];

  return (
    <div>
        <div className='flex justify-between'>
        <button className='bg-backgroundGreen500 text-base font-medium text-white px-6 py-3 rounded-lg' onClick={() => navigate("/team/create")}>Add New Member</button>
<div className='flex gap-6'>
<div className="flex items-center h-14 w-96 rounded-2xl bg-backgroundGray50">
      <img src="/svgs/search.svg" alt="Search" className="m-4"/>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
        />
      </div>
      <select className='w-24 h-14 font-normal text-sm border-2 rounded-lg pr-3 pl-1'>
        <option value=''>Select</option>
        <option>A-Z</option>
        <option>Z-A</option>
      </select>
</div>
        </div>
      <div className="my-8 bg-white overflow-x-hidden rounded-bl-3xl rounded-br-3xl">
      <div className="min-w-96 md:w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-sm text-black">Sr</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Full Name</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Email</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Phone</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Nationality</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">ID</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Password</th>
              <th className="px-4 py-2 font-bold text-sm text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((row, index) => (
                <Row row={row} index={index}
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
