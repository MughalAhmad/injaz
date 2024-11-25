import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown'; // Assuming this is your Dropdown component

const stateData=[
    {
      id:'1',
      stateName:'Sharjah',
      freezone:"Sharjah Airport International Free Zone (SAIF Zone)",
      partner:'yes',
      sector:'Trading, Manufacturing, Light Industry',
      documents:"Passport, Lease Agreement, Photos"
    },
    {
      id:"2",
      stateName:'Sharjah',
      freezone:"Hamriyah Free Zone",
      partner:'yes',
      sector:'Oil & Gas, Petrochemical, Logistics, Manufacturing',
      documents:"Passport, Lease Agreement, Photos"
    },
    {
      id:"3",
      stateName:'Sharjah',
      freezone:"Sharjah Media City (Shams)",
      partner:'yes',
      sector:'Media, Entertainment, Technology, Freelancing',
      documents:"Passport, Proof of Identity, Business Plan"
    },
    {
      id:"4",
      stateName:'Sharjah',
      freezone:"Sharjah Publishing City Free Zone (SPC Zone)",
      partner:'yes',
      sector:'Publishing, Printing, Media, Educational Content',
      documents:"Passport, Proof of Identity, Business Plan"
    },

    {
      id:"5",
      stateName:'Fujairah',
      freezone:"Fujairah Free Zone",
      partner:'yes',
      sector:'Oil & Gas, Shipping, Maritime, Trading',
      documents:"Passport, Visa Copy, Lease Agreement"
    },
    {
      id:"6",
      stateName:'Fujairah',
      freezone:"Creative City Fujairah",
      partner:'yes',
      sector:'Media, Entertainment, Advertising, Publishing',
      documents:"Passport, Proof of Address, Photos"
    },

    {
      id:"7",
      stateName:'Ajman',
      freezone:"Ajman Free Zone",
      partner:'yes',
      sector:'Textiles, E-commerce, Trading, Manufacturing',
      documents:"Passport, Rasidence Proof, Photos"
    },
    
    {
      id:"8",
      stateName:'Ras Al Khaimah',
      freezone:"RAK Free Trade Zone",
      partner:'yes',
      sector:'Manufacturing, Logistics, Consultancy',
      documents:"Passport, Proof of Identiy, NOC"
    },
    {
      id:"9",
      stateName:'Ras Al Khaimah',
      freezone:"Ras AI Khaimah Economic Zone (RAKEZ)",
      partner:'yes',
      sector:'Inustrial, Manufacturing, Trading, Consultancy, Media',
      documents:"Passport, Proof of Rasidence, Business Plan"
    },


    {
      id:"10",
      stateName:'Dubai',
      freezone:"Dubai Multi Commodities Center (DMCC)",
      partner:'yes',
      sector:'Commodities Trading, Gold & Diamond, IT, Media',
      documents:"Passport, Photos, Business Plan, Bank Ref"
    },
    {
      id:"11",
      stateName:'Dubai',
      freezone:"Dubai Silicon Oasis (DSO)",
      partner:'yes',
      sector:'Tech, IT, Software Development, Electronics',
      documents:"Passport, Proof of Rasidence, photos"
    },
    {
      id:"12",
      stateName:'Dubai',
      freezone:"Dubai Airport Freezone (DAFZA)",
      partner:'yes',
      sector:'Aviation, Logistics, E-commerce, Technology',
      documents:"Passport, Proof of Investment, NOC (if any)"
    },
    {
      id:"13",
      stateName:'Dubai',
      freezone:"Dubai Internet City (DIC)",
      partner:'yes',
      sector:'IT, E-commerce, Media, Telecom, Software',
      documents:"Passport, Proof of Address, Business Plan"
    },
    {
      id:"14",
      stateName:'Dubai',
      freezone:"Meydan Free Zone",
      partner:'yes',
      sector:'',
      documents:"Passport, Proof of Address, Business Plan"
    },
    {
      id:"15",
      stateName:'Dubai',
      freezone:"International Free Zone Authority (IFZA)",
      partner:'yes',
      sector:'',
      documents:""
    },
    {
      id:"16",
      stateName:'Dubai',
      freezone:"Dubai South Free Zone",
      partner:'yes',
      sector:'Aviation, Logistics, Real Estate, E-commerce',
      documents:"Passport, Photos, Proof of Investment"
    }

  ]

  
const DynamicDropdowns = ({hanldStatesData, style}) => {
    const [selectedState, setSelectedState] = useState('');
    const [selectedFreezone, setSelectedFreezone] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedDocuments, setSelectedDocuments] = useState('');

    // console.log(selectedState, selectedFreezone, selectedPartner, selectedSector, selectedDocuments )
  
    // Extract unique state names
    const uniqueStates = [...new Set(stateData.map((item) => item.stateName))].map((state) => ({ label: state, value: state }));
  
    // Filter the freezones based on the selected state
    const filteredFreezones = stateData
      .filter((item) => item.stateName === selectedState)
      .map((item) => ({ label: item.freezone, value: item.freezone }));
  
    // Filter the partners based on the selected freezone
    const filteredPartner = stateData
      .filter((item) => item.freezone === selectedFreezone)
      .map((item) => ({ label: item.partner, value: item.partner }));
  
    // Filter the sectors based on the selected freezone
    const filteredSectors = stateData
      .filter((item) => item.freezone === selectedFreezone)
      .map((item) => ({ label: item.sector, value: item.sector }));
  
    // Filter the documents based on the selected freezone
    const filteredDocuments = stateData
      .filter((item) => item.freezone === selectedFreezone)
      .map((item) => ({ label: item.documents, value: item.documents }));

      useEffect(() => {
        hanldStatesData(selectedState, selectedFreezone, selectedPartner, selectedSector, selectedDocuments)
      }, [selectedState, selectedFreezone, selectedPartner, selectedSector, selectedDocuments])
      
  
    return (
      <div className="flex flex-wrap gap-6 md:gap-10">
        {/* State Dropdown */}
        <Dropdown
        hoverColor={style}
          label="States"
          placeHolder="Select State"
          options={uniqueStates} // Use unique state options
          onChange={(value) => {
            setSelectedState(value);
            setSelectedFreezone(''); // Reset other dropdowns when state changes
            setSelectedPartner('');
            setSelectedSector('');
            setSelectedDocuments('');
          }}
          value={selectedState}
        />
  
        {/* Freezone Dropdown */}
        <Dropdown
          label="Freezone"
          hoverColor={style}
          placeHolder="Select Freezone"
          options={filteredFreezones} 
          onChange={(value) => {
            setSelectedFreezone(value);
            setSelectedPartner('');
            setSelectedSector('');
            setSelectedDocuments('');
          }}
          value={selectedFreezone}
          disabled={!selectedState} 
        />
  
        {/* Authorized Channel Partner Dropdown */}
        <Dropdown
          label="Authorized Channel Partner"
          hoverColor={style}
          placeHolder="Select Partner"
          options={filteredPartner} 
          onChange={(value) => setSelectedPartner(value)}
          value={selectedPartner}
          disabled={!selectedFreezone} 
        />
  
        {/* Key Sectors Dropdown */}
        <Dropdown
          label="Key Sectors"
          hoverColor={style}
          placeHolder="Select Sectors"
          options={filteredSectors} 
          onChange={(value) => setSelectedSector(value)}
          value={selectedSector}
          disabled={!selectedFreezone} 
        />
  
        {/* Documents Required Dropdown */}
        <Dropdown
          label="Documents Required"
          placeHolder="Select Documents"
          hoverColor={style}
          options={filteredDocuments} 
          onChange={(value) => setSelectedDocuments(value)}
          value={selectedDocuments}
          disabled={!selectedFreezone} 
        />
      </div>
    );
  };
  
  export default DynamicDropdowns;