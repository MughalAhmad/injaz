import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '/logo.png';
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
    },
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
      },
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
      },
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
      },
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
      },
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
  const head =[ 'id',
'stateName',
'freezone',
'partner',
'sector',
'documents',]

const ExportToPdfButton = ({ columns = head, data = stateData, fileName = 'test.pdf', logoImage = logo,  ReportName = '', startDate  , endDate, name, phone, email }) => {

  const exportPDFBtnClickHandler = () => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = logoImage; // Provide the path or URL of logo image

    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)

      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.addImage(logo, 'PNG', 15, 283, 12, 8); // Adjust the coordinates (10, 10) and size (50, 20) as needed

        doc.text('Page' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }


   const addHeaders = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)

        doc.text(`Name: ${name}`, 15, 14);
        doc.text(`Phone: ${phone}`, 15, 18);
        doc.text(`Email: ${email}`, 15, 22);
        
        doc.setFontSize(8)
        doc.text(`Start Date: ${startDate}`, 165, 14);
        doc.text(`End Date: ${endDate}`, 165, 18);
        doc.text(`Print Date: ${new Date()}`, 165, 22);


        doc.setFontSize(16)
        doc.text(`${ReportName}`, 87, 18);
        doc.setFontSize(8)
      }
    } 


     doc.text(`AHAMAD: ${name}`, 15, 14);
        doc.text(`AHAMAD: ${phone}`, 15, 18);
        doc.text(`AHAMAD: ${email}`, 15, 22);


        doc.text(`ccc: ${name}`, 15, 27);
        doc.text(`ccc: ${phone}`, 15, 18);
        doc.text(`ccc: ${email}`, 15, 22);


    const tableColumn = columns.map((col) => col.header);
    const tableRows = data.map((row) => columns.map((col) => row[col.accessorKey]));

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      margin: { top: 25 }
    }
    );
    addFooters(doc)
    addHeaders(doc)
    // Save the PDF
    doc.save(fileName);
  };
  return <button onClick={exportPDFBtnClickHandler}>
    PDF
  </button>
};

export default ExportToPdfButton;

