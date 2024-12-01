import React, { useState, useEffect } from "react";
import countryCodes from '../../json/CountryCode.json';

const PhoneNumberInput = ({ label = "text", placeholder="text", className, onPhoneChange }) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Call the onPhoneChange function whenever countryCode or phoneNumber changes
  useEffect(() => {
    if (onPhoneChange) {
      onPhoneChange({ countryCode, phoneNumber });
    }
  }, [countryCode, phoneNumber]);

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-[#222A59] font-medium mb-2">{label}</label>

      <div className="max-w-64 flex items-center rounded-lg border border-[#D0D5DD] outline-none pl-2 bg-white">
      <span className="bg-transparent">
      {`${countryCode.split('-')[0]} ${countryCode.split('-')[1] ? countryCode.split('-')[1] : 'AF'}`} 
      </span>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-5 h-5 pl-2 outline-none text-base"
        >
          {/* {countryCodes.map(({ iso, code }) => (
            <option key={iso} value={code}>
              {iso} {code}
            </option>
          ))} */}
           {countryCodes.map(({ iso, code, country }) => (
            <option key={iso} value={`${iso}-${code}`}>
              
              {country}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={placeholder}
          className="w-36 h-11 rounded-tr-lg rounded-br-lg outline-none text-base px-2"
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
