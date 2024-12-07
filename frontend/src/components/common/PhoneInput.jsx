import React, { useState, useEffect } from "react";
import countryCodes from '../../json/CountryCode.json';

const PhoneInput = ({feedback, title = "text", placeholder="text", onPhoneChange, px = "px-3",
    py = "py-4", ...props }) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Call the onPhoneChange function whenever countryCode or phoneNumber changes
  useEffect(() => {
    if (onPhoneChange) {
      onPhoneChange({ countryCode, phoneNumber });
    }
  }, [countryCode, phoneNumber]);

  return (
    <>
      <label className="text-xl text-textPrimary font-medium mb-2">{title}</label>

      <div className={`w-full flex rounded-lg border border-[#D0D5DD] ${px} ${py} outline-none text-base placeholder-[#D0D5DD] text-black`}>
      <div className="min-w-24">
      <span className="bg-transparent">
      {`${countryCode.split('-')[0]} ${countryCode.split('-')[1] ? countryCode.split('-')[1] : "AF"}`} 
      </span>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-5 h-5 pl-2 outline-none text-base"
        >
        
           {countryCodes.map(({ iso, code, country }) => (
            <option key={iso} value={`${iso}-${code}`}>
              
              {country}
            </option>
          ))}
        </select>
        </div>
        <input
        {...props}
        //   onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={placeholder}
          className=" w-[70%] rounded-tr-lg rounded-br-lg outline-none text-base px-2"
        />
      </div>
      {feedback && feedback[0] && feedback[1] && (
        <span className="text-red-500">{feedback[0]}</span>
      )}
    </>
  );
};

export default PhoneInput;
