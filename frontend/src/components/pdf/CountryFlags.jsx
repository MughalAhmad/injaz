import React, { useState, useEffect } from "react";
import countryCodes from '../../json/CountryCode.json';

const CountryFlags = ({ label = "text", placeholder="text", className, onFlagChange }) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].iso);
  const [flag, setFlag] = useState(countryCodes[0].iso);
  console.log('countryCode',countryCode)

  // Call the onPhoneChange function whenever countryCode or phoneNumber changes
  useEffect(() => {
    if (onFlagChange) {
        setFlag(countryCode);
      onFlagChange(countryCode);
    }
  }, [countryCode, flag]);

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-[#222A59] font-medium mb-2">{label}</label>

      <div className="max-w-64 flex items-center rounded-lg border border-[#D0D5DD] outline-none pl-2">
        <span className="w-36">
      {`${flag.split('-')[0]} ${flag.split('-')[1] ? flag.split('-')[1] : '+93'}`} 
      </span>
        <select
          // value={countryCode}
          defaultValue=''
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-5 h-5 pl-2 text-base outline-none bg-transparent"
        >
          {countryCodes.map(({ iso, code, country }) => (
            <option key={iso} value={`${iso}-${code}-${country}`}>
              {country}
            </option>
          ))}
        </select>
        <img
        className="w-20 h-11 outline-none text-base px-4"
  alt="United States"
  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag.split('-')[0]}.svg`}/>
      </div>
    </div>
  );
};

export default CountryFlags;

