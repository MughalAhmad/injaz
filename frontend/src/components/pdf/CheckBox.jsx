import React from "react";
const CheckBox = ({ data, values, handleChange, handlePackage = ()=>{} }) => {

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id} // Ensure each item has a unique key if it has an id field
          className="w-full lg:w-1/2 mb-2 flex justify-between items-center rounded-lg"
        >
            <input
            className="w-16 h-16 mr-2 md:w-5 md:h-5"
            type="checkbox"
            checked={item.status === '0' ? false : true} // Assume item has a checked property
            onChange={() => handleChange(item)} // Pass the item to handleChange
          />
          <label className="w-96 text-sm font-medium">{item.title}</label>
          {item.filed ?
          <label className="text-sm w-96 text-center md:text-left">{item.value}</label>
          :
          <div className="w-96 flex justify-center">
          <input type="number" placeholder="Enter" onChange={(e)=>handlePackage(e,item.id)} className="w-20 h-8 border rounded-lg text-center outline-none"/>
          </div>
          }
          <label className="text-sm w-96">{item.status === "0" ? "NOT INCLUDED" : "INCLUDED"}</label>
        </div>
      ))}
    </>
  );
};

export default CheckBox;
