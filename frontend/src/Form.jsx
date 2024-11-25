import React, { useState, useEffect } from 'react';
import GeneratePDF from "./GeneratePDF";
import Input from './Input';
import Title from './Title';
import SimpleDropdown from './simpleDropdown';
import DynamicList from './DynamicList';
import Button from './Button';
import DateDropDown from './DateDropDown';
import PhoneNumberInput from './PhoneNumberInput';
import DynamicDropdowns from "./DynamicDropdowns";
import ExportToPdfButton from './PDF';
import MyDocument from './MyDoc';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Form = () => {

let className = "mr-5";

const [step1, setStep1] = useState([]);
const [step2, setStep2] = useState([]);
const [step3, setStep3] = useState([]);
  const [data, setData] = useState({
   selectCompany:'',
   image:'',
   color:'',

   date: "",
   month: "",
   year: '',

   userFirstName:'',
   userLastName:'',
   userEmail:'',
   userPhone:'',
   userWhatsapp:'',
   position:'',
   reference:'',

   clientFirstName:'',
   clientLastName:'',
   clientEmail:'',
   clientPhone:'',

   states:'',
   freezone:'',
   partner:'',
   sectors:'',
   documents:'',

   tAmount:0,
   gtAmount:0,
   discount:0,
   inWords:''



  });

    // Sample data for tables
    const Data = [
      [
        { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },

      ],
      [
        { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },

      ],
      [
        { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
        { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },

      ]
    ];

  const LicenseHeads =['Description', 'Conqueror Price', 'Remarks', 'Timeline'];
  const LicenseFields ={ description: "", price: "", remarks: "", timeline: "" };
  const ImmigrationHeads =['Activity', 'Conqueror Price', 'Remarks', 'Timeline'];
  const ImmigrationFields ={ activity: "", price: "", remarks: "", timeline: "" };
  const VisaHeads =['Activity', 'Conqueror Price', 'Remarks', 'Timeline'];
  const VisaFields ={ activity: "", price: "", remarks: "", timeline: "" };
  // Select Company  
  const selectCompany=[
    {
      id:'0',
      log:'',
      name:'',
      color:'#000000'
    },
    {
      id:'1',
      log:'/conqueror.png',
      name:'conqueror',
      color:'#BA141A'
    },
     {
      id:'2',
      log:'/injaz.png',
      name:'Injaz Group',
      color:'#222A59'
    }
  ];

  const selectReference =[
    {
      id:'Facebook',
      name:'Facebook',
    },
    {
      id:'Instagram',
      name:'Instagram',
    },
    {
      id:'Whatsapp',
      name:'Whatsapp',
    },
    {
      id:'Sehrish Tahira',
      name:'Sehrish Tahira',
    },
    {
      id:'Hania Asif',
      name:'Hania Asif',
    },
    {
      id:'Haseeb Malik',
      name:'Haseeb Malik',
    },
    {
      id:'Adiba Jabbar',
      name:'Adiba Jabbar',
    },
    {
      id:'Mariyam',
      name:'Mariyam',
    },
    {
      id:'Mujahid Noman',
      name:'Mujahid Noman',
    },
    {
      id:'Zahid Sultan',
      name:'Zahid Sultan',
    },
    {
      id:'Abdullah Zubair',
      name:'Abdullah Zubair',
    },
  ];

  // Handle changes from DateDropDown component
  const handleDateChange = ({ day, month, year }) => {
    setData((prevData) => ({
      ...prevData,
      date: day,
      month: month,
      year: year,
    }));
  };

   // Handle phone number and country code change   
   const handleUserPhoneChange = ({ countryCode, phoneNumber }) => {
    setData((prevData) => ({
      ...prevData,
      userPhone: `${countryCode}-${phoneNumber}`,
      // userPhone: `${countryCode}-${phoneNumber}`,
    }));
  };

  const handleUserWhatsappChange = ({ countryCode, phoneNumber }) => {
    setData((prevData) => ({
      ...prevData,
      userWhatsapp: `${countryCode}-${phoneNumber}`,
    }));
  };


  const handleClientPhoneChange = ({ countryCode, phoneNumber }) => {
    setData((prevData) => ({
      ...prevData,
      clientPhone: `${countryCode}-${phoneNumber}`,
      // userPhone: `${countryCode}-${phoneNumber}`,

    }));
  };

  const handleStep1 = (data) => {
    setStep1(data || []);
    // console.log(step1)

  };

  const handleStep2 = (data) => {
    setStep2(data || []);
  };
  const handleStep3 = (data) => {
    setStep3(data || []);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  const handleGeneratePDF = () => {
    // Trigger the GeneratePDF functionality only on button click
    GeneratePDF(data);
  };
  
  const handleImageAndColor = () => {
    const selectedCompany = selectCompany.find(item => item.id === data.selectCompany);
    if (selectedCompany) {
      setData(prevData => ({
        ...prevData,
        image: selectedCompany.log,
        color: selectedCompany.color
      }));
    }
  };
  

  const handleAmount = () => {
    // Calculate total amount from step1, step2, and step3
    const totalAmount = [...step1, ...step2, ...step3].reduce(
      (total, item) => total + Number(item.price), 
      0
    );
  
    let calculateDiscount = totalAmount - data.discount

    // Update tAmount in a single setData call
    setData(prevData => ({
      ...prevData,
      tAmount: totalAmount,
      gtAmount: calculateDiscount,
    }));
  };

  const hanldStatesData = (states, freezone, partner, sectors, documents) =>{
   // Update tAmount in a single setData call
   setData(prevData => ({
    ...prevData,
    states:states,
   freezone:freezone,
   partner:partner,
   sectors:sectors,
   documents:documents,
  }));
  }

  const clear=()=>{
    window.location.reload()
  }

  console.log(data)

  useEffect(() => {
    handleImageAndColor();
    handleAmount();
  }, [data.selectCompany, step1, step2, step3, data.discount])
  

  return (
<div className='p-5 md:p-10'>

<div className='min-h-52'>
  <div className='flex flex-col items-center w-96 h-auto m-auto'>
  {data.image ? (
          <img src={data.image} alt='Company Logo' className='' />
        ) : (
          <p className='text-3xl font-bold'>SELECT YOUR COMPANY</p>
        )}
  <p className={`text-main font-extrabold `} style={{ color: data.color }}>Qoutation Form</p>
  </div>

  </div>

  <div className='flex flex-col gap-5 mt-5 md:flex-row md:justify-between'>
<SimpleDropdown label="Select Company" placeHolder="Select"  weight="bold" list={selectCompany} value={data.selectCompany} name='selectCompany' onChange={handleChange}
/>
<DateDropDown label='Business Start Date' onDateChange={handleDateChange} />
  </div>


  <div className='mt-10'>
    <Title title='User Details' titleType='title' style={{ color: data.color }}/>
<div className='mt-8 flex gap-5 flex-col md:flex-row'>
{/* <Title title='Name' titleType='subtitle'/>  */}
    <Input label="Name" placeHolder="Enter Your Name" className={className} 
    value={data.userFirstName} name='userFirstName' handleChange={handleChange}/>
    {/* <Input label="Last Name" placeHolder="Enter Your Last Name"
    value={data.userLastName} name='userLastName' handleChange={handleChange}
    /> */}
</div>


<div className='mt-8 flex gap-5 flex-col md:flex-row'>
{/* <Title title='Contact Info' titleType='subtitle'/>  */}
<div>
    <Input label="Email" placeHolder="Enter Your Email"
    value={data.userEmail} name='userEmail' handleChange={handleChange}
    />
    <div className='mt-5 flex gap-5 flex-col md:flex-row'>
    <PhoneNumberInput label='Phone Number' placeholder='+971 4 557 9421' className={className}
   onPhoneChange={handleUserPhoneChange} 
    />
    {/* <PhoneNumberInput label='Whatsapp Number (Optional)' placeholder='+971 4 557 9421'
    onPhoneChange={handleUserWhatsappChange} 
    /> */}

    </div>
    </div>
</div>


{/* <div className='mt-8 flex gap-5 flex-col md:flex-row'>
<Title title='Position' titleType='subtitle'/> 
    <Input label="Position" placeHolder="Enter Your Position"
    value={data.position} name='position' handleChange={handleChange}
    />
</div> */}


{/* <div className='mt-8 flex gap-5 flex-col md:flex-row'>
<Title title='Reference' titleType='subtitle'/> 
<SimpleDropdown label="Reference" placeHolder="Select"  weight="bold" list={selectReference} value={data.selectCompany} name='reference' onChange={handleChange}/>

    <Input label="Reference" placeHolder="Enter Your Reference"
    value={data.reference} name='reference' handleChange={handleChange}
    />
</div> */}

  </div>



  <div className='mt-10'>
    <Title title='Client Details' titleType='title' style={{ color: data.color }}/>
<div className='mt-8 flex gap-5 flex-col md:flex-row'>
{/* <Title title='Name' titleType='subtitle'/>  */}
    <Input label="Name" placeHolder="Enter Your Name" className={className}
    value={data.clientFirstName} name='clientFirstName' handleChange={handleChange}
    />
    {/* <Input label="Last Name" placeHolder="Enter Your Last Name"
    value={data.clientLastName} name='clientLastName' handleChange={handleChange}
    /> */}
</div>


<div className='mt-8 flex gap-5 flex-col md:flex-row'>
{/* <Title title='Contact Info' titleType='subtitle'/>  */}
    <Input label="Email" placeHolder="Enter Your Email" className={className}
    value={data.clientEmail} name='clientEmail' handleChange={handleChange}
    />
    <PhoneNumberInput label='Phone Number' placeholder='+971 4 557 9421'
    onPhoneChange={handleClientPhoneChange} 
    />

<SimpleDropdown label="Reference" placeHolder="Select" list={selectReference} value={data.selectCompany} name='reference' onChange={handleChange}/>
  
</div>


<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='State' titleType='subtitle'/> 
<div className='flex flex-wrap gap-6 md:gap-10'>
  <DynamicDropdowns hanldStatesData={hanldStatesData} style={data.color} />
</div>
</div>


<DynamicList heads={LicenseHeads} fields={LicenseFields} title='Step 1: License' handleAmount={handleAmount} onhandleChange={handleStep1}/>
<DynamicList heads={ImmigrationHeads} fields={ImmigrationFields} title='Step 2: Immigration' onhandleChange={handleStep2}/>
<DynamicList heads={VisaHeads} fields={VisaFields} title='Step 3: Entry Visa' onhandleChange={handleStep3}/>


<div className='flex gap-5 flex-col md:flex-row'>
<Title title='Total (Step 1, 2, 3)' titleType='subtitle'/> 
    <Input label="Total Amount" value={data.tAmount} />
</div>


<div className='mt-8 flex gap-5 flex-col md:flex-row'>
<Title title='Discount' titleType='subtitle'/> 
    <Input label="Discount"
    value={data.discount} name='discount' handleChange={handleChange}
    />
</div>


<div className='mt-8 flex gap-5 flex-col md:flex-row'>
<Title title='Grand Total' titleType='subtitle'/> 
    <Input label="Grand Total Amount" className={className} value={data.gtAmount}/>
    <Input label="In Words"/>
</div>
  </div>

  <div className='flex justify-end gap-5 mt-5'>
    <button
        className='w-24 h-11 bg-[#4AD991] text-white rounded-lg flex justify-center items-center text-sm cursor-pointer hover:bg-[#99eec3]'
        onClick={handleGeneratePDF}
      >
        {/* Render GeneratePDF on click */}
        <GeneratePDF
          clientName="aa"
          clientPhone="aa"
          userName="aa"
          userPhone="aa"
          userEmail="aa"
          userWeb="aa"
        />
       </button>
    <Button title='Clear' click={clear} btnColor='bg-[#EF3826]' hoverBtn='hover:bg-[#d99b95]' />
    <Button title='Share PDF' btnColor='bg-[#EDAB00]' hoverBtn='hover:bg-[#e1ce9d]'/>
    <ExportToPdfButton/>
    <div>
    <h1>Generate PDF</h1>
    <PDFDownloadLink document={<MyDocument data={Data} />} fileName="my_document.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  </div>    </div>

</div>

  );
};

export default Form;
