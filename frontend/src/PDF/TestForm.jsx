import React, { useState, useEffect } from 'react';
// import GeneratePDF from "./GeneratePDF";
import Input from '../components/pdf/Input';
import Title from '../components/pdf/Title';
import SimpleDropdown from '../components/pdf/simpleDropdown';
import TestDynamicList from '../components/pdf/TestDynamicList';
import Button from '../components/pdf/Button';
import PhoneNumberInput from '../components/pdf/PhoneNumberInput';
import SelectAndInput from '../components/pdf/SelectAndInput';
import { ToWords } from 'to-words';
import CountryFlags from '../components/pdf/CountryFlags';
import moment from 'moment'
import CheckBox from '../components/pdf/CheckBox';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './GeneratePDF';
import MyDocumentInjaz from './GeneratePDFCompany2';
import { useSelector, useDispatch } from 'react-redux';
import { createPdf } from '../redux/features/pdfSlice';

const TestForm = () => {
  const toWords = new ToWords();
  const dispatch = useDispatch();

let className = "mr-0";
const VisitingCard = 0.3;
const LetterHeadPad = 0.3;
const [stateArray, setStateArray] = useState([]);
const [generatePDFBtn, setGeneratePDFBtn] = useState(false)
const [btnStatus, setBtnStatus] = useState(true);
const [btnStatusText, setBtnStatusText] = useState("generating");

const { companyName } = useSelector(state => state.brandingStore);



  const [data, setData] = useState({
   selectCompany:companyName,
   image:companyName === "Injaz" ? "/Injaz/page3Logo.png" : "/page3Logo.png" ,
   color:companyName === "Injaz" ? '#222A59' : '#BA141A',

   date: "",

   reference:'',

   clientName:'',
   clientEmail:'',
   clientPhone:'',

   visitingCard:0,
   letterHeadPad:0,

   tAmount:0,
   gtAmount:0,
   discount:2500,

   stateValue:'',
   packageIncludingVisa:'',
   freeVisa:"",

   step1Remarks:'Government Fees',
   step1Timeline:'3-5 Working Days After Verification and Payment',
   step1value:'',

   step2ApprovalFee:'',
   step2value1:'',
   step2Timeline:'2-3 Working Days',
   step2EstablishmentRemark:"Government Fees Renewable every year",
   step2Remark:"Government Fees Renewable every year",
   step2EstablishmentTimeline:"2-3 working days After Payment" ,
   step3RenewableEmployment:"Government Fees Renewable every year ",
   step3StatusChange:"if you are in UAE ",
   step2Establishment:'',
   step2ImmigrationFee:'',
   step2value2a:'',


   step3ImmigrationUID:'Immigration Required UID',
   step3TimelineUID:'2-3 Working Days ',
   step3Renewable:'Government Fees Renewable every year ',
   step3Timeline:'2-3 working days After Payment ',
   step2value2:'',
   step3TimelineEmployment:'5-7 Working Days',
   step2value3:'',
   step3Medical:"",
   TimelineMedical:'1-2 working days after apply',
   step3EmiratesId:"",
   TimelineEmiratesId:'5-10 working days after apply',
   step3TimelineStatusChange:'During Application ',
   pro:2500,
   word:'',
   flag:'',
   country:'',

   pdfLenght:'',
   isEmail:""
  });

    console.log("TESSSSSSSSSSSSSSSST",data.clientPhone.split('-').pop())

  const ActivitiesHeads =['Code', 'Activity Description', 'Approval', 'Authority'];
  const ActivitiesFields ={ code: "", description: "", approval: "", authority: "" };

  const selectCompany=[
    {
      id:'1',
      log:'/conqueror.png',
      name:'Conqueror Aspiration L.L.C',
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
    {
      id:0,
      name:'Enter Reference',
    },
  ];

  const selectVisa =[
    {
      id:'0',
      name:'0',
    },
    {
      id:'1',
      name:'1',
    },
    {
      id:'2',
      name:'2',
    },
    {
      id:'3',
      name:'3',
    },
    {
      id:'4',
      name:'4',
    },
    {
      id:'5',
      name:'5',
    },
    {
      id:'6',
      name:'6',
    },
    {
      id:0,
      name:'Enter Value',
    }
  ];
    
  const stateData =[
    {
      id:'Ajman',
      name:'Ajman',
    },
    {
      id:'Ajman',
      name:'Ajman (AMC)',
    },
    {
      id:'Dubai',
      name:'Dubai (M)',
    },
    {
      id:'Dubai (IFZA)',
      name:'Dubai (IFZA)',
    },
    {
      id:'Dubai',
      name:'Dubai (DMC)',
    },
    {
      id:'Fujairah',
      name:'Fujairah',
    },
    {
      id:'RAK',
      name:'RAK',
    },
    {
      id:'Sharjah',
      name:'Sharjah',
    },
    {
      id:'Hamriya',
      name:'Hamriya',
    },
    {
      id:'Saif Zone',
      name:'Saif Zone',
    }
  ];

  const selectStep1=[
    {
      id:12790,
      name:12790
    },
    {
      id:6990,
      name:6990
    },
    {
      id:12990,
      name:12990
    },
    {
      id:0,
      name:"enter value"
    }
  ];

  const selectStep2b=[
    {
      id:2190,
      name:2190 
    },
    {
      id:650,
      name:650 
    },
    {
      id:0,
      name:"enter value"
    }
  ];

  const [checkBoxData, setCheckBoxData] = useState( [
    {
        id:'1',
        title:"Trade License 1 Year",
        value:"1" ,
        status:"0",
        filed:true,
    },
    {
      id:'2',
        title:"Establishment Card",
        value:"1" ,
        status:"0" ,
        filed:true,

    },
    {
      id:'3',
      title:"e Channel",
      value:"1" ,
      status:"0" ,
      filed:true,

  },
    {
      id:'4',
        title:"Investor Visa",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'5',
        title:"Employment Visa",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'6',
        title:"Medical Normal",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'7',
        title:"Emirates ID 2 Years",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'8',
        title:"Residence Visa Stamping",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'9',
        title:"Visa Eligibility",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'10',
        title:"Bank Account Opening",
        value:"1" ,
        status:"0" ,
        filed:true,

    },
    {
      id:'11',
        title:"Company Rubber Stamp",
        value:"1" ,
        status:"0" ,
        filed:true,

    },
    {
      id:'12',
        title:"Etisalat Land Phone",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'13',
        title:"Corporate Tax Registration (TRN)",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'14',
        title:"VAT Registration",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'15',
        title:"Visiting Card",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'16',
        title:"Letter Head Pad",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'17',
        title:"Website Design",
        value:"Domain Hosting" ,
        filed:true,
        status:"0" ,
    },
    {
      id:'18',
        title:"Physical O ice/ Business Center ejari",
        value:"" ,
        status:"0", 
        filed:true,

    },
    {
      id:'19',
        title:"Accounting and book keeping services",
        value:"12 months" ,
        status:"0" ,
        filed:true,

    },
    {
      id:'20',
        title:"Tax Return Submission",
        value:"" ,
        status:"0", 
        filed:true,

    },
    {
      id:'21',
        title:"Printed Certification of Incorporation & Share Certificates",
        value:0 ,
        status:"0", 
        filed:false,

    }, {
      id:'22',
        title:"Printed & Bound Memorandum & Articles of Association",
        value:0 ,
        status:"0", 
        filed:false,

    }
    ]);
    
  const selectVisaPartner=[
    {
      id:6390,
      name:6390 
    },
    {
      id:4390,
      name:4390 
    },
    {
  id:5850,
  name:5850,
    },
    {
      id:0,
      name:"enter value"
    }
  ]

  const selectVisaEmployment=[
    {
      id:5800,
      name:5800 
    },
    {
      id:5380,
      name:5380 
    },
    {
      id:0,
      name:"enter value"
    }
  ]

  const selectStatusChange=[
    {
      id:1650,
      name:1650 
    },
    {
      id:750,
      name:750 
    },
    {
      id:0,
      name:"enter value"
    }
  ];


  const handleFlagChange = (data) => {
    setData((prevData) => ({
      ...prevData,
      flag: data.split('-')[0],
      country: data.split('-').pop(),
    }));
  };

  const handleClientPhoneChange = ({ countryCode, phoneNumber }) => {
    setData((prevData) => ({
      ...prevData,
      clientPhone: `${countryCode}-${phoneNumber}`,
    }));
  };


  const handleStateArray = (data) => {
    setStateArray(data || []);
  };

  const CheckEmailValidation = (data) =>{

    if(data){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = emailRegex.test(data);
    if(isValid){
      // alert("Valid Email")
      setData(prevData => ({
        ...prevData,
        isEmail: true,
      }));
    }
    else{
      // alert("Invalid Email")
      setData(prevData => ({
        ...prevData,
        isEmail: false,
      }));
    }
  }
  
   }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if(e.target.name==="clientEmail"){
      CheckEmailValidation(e.target.value)
    }
  };

  const handle2500Value = (e) => {
    if(e.target.value > 2500){
      setData(prevData => ({
        ...prevData,
        discount: '0'
      }));
    }
    else{
    setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleCustomSelect = (name, value) => {
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    
  };

const saveDataIntoDB = () =>{
  dispatch(createPdf(data))
    .then(response => {
      if (response && !response.payload.hasError) {
       console.log("responseresponseresponse",response)
      } 
    })
    .catch(error => {
      console.error('Dispatch failed:', error);
    });
}
  
  const handleGeneratePDF = () => {
    setTimeout(() => {
      setGeneratePDFBtn(false)
      setBtnStatus(true)
    }, 2000);
    // GeneratePDF(data);
    saveDataIntoDB()
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

  const addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  };

  const updateTheGTValue = (totalAmount) =>{
   return   totalAmount + (checkBoxData[14].status === "1" ? data.visitingCard : 0) + (checkBoxData[15].status === "1" ? data.letterHeadPad : 0);

  }
  

  const handleAmount = () => {
    console.log("AMOUNT CALL")
    let totalAmount = [data.step1value, Number(data.step2ApprovalFee), data.step2value1, data.step2Establishment, data.step2value2a, data.step2value2, Number(data.discount)].reduce(

      (total, item) => total + Number(item), 
      0
    );
    
    let calculateGrandTotal = updateTheGTValue(totalAmount)
    const roundedNumber = parseFloat(calculateGrandTotal.toFixed(1));
    let words = toWords.convert(roundedNumber);

    setData(prevData => ({
      ...prevData,
      tAmount: totalAmount,
      gtAmount: roundedNumber,
      word:words,
      date:addDays(10)
    }));
  };

  const handleCheckboxChange = (changedItem) => {
    const updatedData = checkBoxData.map((item) =>
      item.title === changedItem.title ? { ...item, status: changedItem.status=='0' ? "1" : '0' } : item
    );
    setCheckBoxData(updatedData);
    console.log("hHELLLLLOOOOOO")
    handleAmount()
  };

  const clear=()=>{
    window.location.reload()
  }

 // Set Step 1 value based on stateValue
 useEffect(() => {
  const getStep1Value = () => {
    
    if (data.stateValue === "Dubai") return selectStep1[0].id;
    if (data.stateValue === "Sharjah") return selectStep1[1].id;

    if (data.stateValue !== "Dubai") return selectStep1[selectStep1.length-1].id;
    if (data.stateValue !== "Dubai (IFZA)") return selectStep1[selectStep1.length-1].id;
    if (data.stateValue !== "Sharjah") return selectStep1[selectStep1.length-1].id;

    return data.step1value;
  };

  setData((prevData) => ({ ...prevData, step1value: getStep1Value() }));
}, [data.stateValue]);

// Set Step 2 values based on stateValue
useEffect(() => {
  const getStep2ValueB = () => {
    if (data.stateValue === "Dubai") return selectStep2b[0].id;
    if (data.stateValue === "Sharjah") return selectStep2b[1].id;

    if (data.stateValue !== "Dubai") return selectStep2b[selectStep2b.length-1].id;
    if (data.stateValue !== "Dubai (IFZA)") return selectStep2b[selectStep2b.length-1].id;
    if (data.stateValue !== "Sharjah") return selectStep2b[selectStep2b.length-1].id;
    return data.step2Establishment;
  };

  setData((prevData) => ({
    ...prevData,
    step2Establishment: getStep2ValueB(),
  }));
}, [data.stateValue]);

// Set Step 3 values based on stateValue
useEffect(() => {
  const getStep3ValueA = () => {
    if (data.stateValue === "Dubai") return selectVisaPartner[0].id;
    if (data.stateValue === "Sharjah") return selectVisaPartner[1].id;

    
    if (data.stateValue !== "Dubai") return selectVisaPartner[selectVisaPartner.length-1].id;
    if (data.stateValue !== "Dubai (IFZA)") return selectVisaPartner[selectVisaPartner.length-1].id;
    if (data.stateValue !== "Sharjah") return selectVisaPartner[selectVisaPartner.length-1].id;
    return data.step2value2a;
  };

  const getStep3ValueB = () => {
    if (data.stateValue === "Dubai") return selectVisaEmployment[0].id;
    if (data.stateValue === "Sharjah") return selectVisaEmployment[1].id;

    if (data.stateValue !== "Dubai") return selectVisaEmployment[selectVisaEmployment.length-1].id;
    if (data.stateValue !== "Dubai (IFZA)") return selectVisaEmployment[selectVisaEmployment.length-1].id;
    if (data.stateValue !== "Sharjah") return selectVisaEmployment[selectVisaEmployment.length-1].id;
    return data.step2value2;
  };

  const getStep3ValueC = () => {
    if (data.stateValue === "Dubai") return selectStatusChange[0].id;
    if (data.stateValue === "Sharjah") return selectStatusChange[1].id;

    if (data.stateValue !== "Dubai") return selectStatusChange[selectStatusChange.length-1].id;
    if (data.stateValue !== "Dubai (IFZA)") return selectStatusChange[selectStatusChange.length-1].id;
    if (data.stateValue !== "Sharjah") return selectStatusChange[selectStatusChange.length-1].id;
    return data.step2value3;
  };

  setData((prevData) => ({
    ...prevData,
    step2value2a: getStep3ValueA(),
    step2value2: getStep3ValueB(),
    step2value3: getStep3ValueC(),
  }));
}, [data.stateValue]);

  console.log("data",data)
  // console.log("stateArray",stateArray)
  console.log("ChecckBox",checkBoxData)
// console.log(btnStatus)

  const handlePackageChange = (e,id) => {
    setCheckBoxData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, value: e.target.value } : item
      )
    );

    if(id === "15"){
      let muiltyValue = e.target.value * VisitingCard;
      setData((prevData) => ({
        ...prevData,
        visitingCard:muiltyValue,
      }));
    }

    if(id === "16"){
      let muiltyValue = e.target.value * LetterHeadPad;
      setData((prevData) => ({
        ...prevData,
        letterHeadPad:muiltyValue,
      }));
    }

// console.log("helloooooooooooooooooooooooooooooooooo")
//     checkBoxData.map((item)=>{
//       if(item.id === '15'){
//         console.log("valueeeeeeeeeeee",item.value )
//         let muiltyValue = item.value * VisitingCard;
//        setData((prevData) => ({
//       ...prevData,
//       visitingCard:muiltyValue,
//     }));
//       }
//       if(item.id === '16'){
//         let muiltyValue = item.value * LetterHeadPad;
//         console.log("valueeeeeeeeeeee",item.value )

//         setData((prevData) => ({
//           ...prevData,
//      letterHeadPad:muiltyValue,
//        }));

//       }
//     })
  };

  const handleFullPFBtn = ()=>{
    setData((prevData) => ({
      ...prevData,
      pdfLenght: "full",
    }));
    setGeneratePDFBtn(generatePDFBtn ? false: true)
  }
  const handleProfilePFBtn = ()=>{
    setData((prevData) => ({
      ...prevData,
      pdfLenght: "profile",
    }));
    setGeneratePDFBtn(generatePDFBtn ? false: true)
  }

 const handleValue = (loading,error, )=> {
    console.log(loading)
          if (error) {
            setBtnStatusText("error")
            console.error('PDF Generation Error:', error);
            return 'try Again';
          }
           else if(loading){
              setBtnStatus(true)
              setBtnStatusText("generating")
            }
            else{
              setBtnStatus(false)
              setBtnStatusText("save")
  
            }
            
           
          return btnStatus ?  'Generating PDF...': 'Save PDF' ;
         }


         const auth = () =>{
          if(data.reference && data.clientName && data.clientEmail && data.clientPhone && data.stateValue && data.freeVisa && data.step1value && data.step2ApprovalFee && data.step2value1 && data.step2Establishment && data.step2value2a && data.step2value2 && data.step2value3 && data.flag && data.country && stateArray[0]?.code && stateArray[0]?.description && stateArray[0]?.approval && stateArray[0]?.authority && data.isEmail && data.packageIncludingVisa){
            return true
          }
          else return false;
         }

  

  useEffect(() => {
    handleImageAndColor();
    handleAmount();

    // setCheckBoxData(prevData => 
    //   prevData.map(item => 
    //     item.id === '4' ? { ...item, value: data.investorVisa } : item
    //   )
    // );

    // setCheckBoxData(prevData => 
    //   prevData.map(item => 
    //     item.id === '5' ? { ...item, value: data.employmentVisa } : item
    //   )
    // );

    // setCheckBoxData(prevData => 
    //   prevData.map(item => 
    //     item.id === '15' ? { ...item, value: `${data.visitingCard} Pcs ` } : item
    //   )
    // );

    // setCheckBoxData(prevData => 
    //   prevData.map(item => 
    //     item.id === '16' ? { ...item, value: `${data.letterHeadPad} Pcs ` } : item
    //   )
    // );
    
  }, [stateArray, data.discount, data.step1value, data.step2Establishment, data.step2value1, data.step2value2, data.step2value2a, data.step2value3, data.step2ApprovalFee, data.visitingCard, data.letterHeadPad])
  

  return (
<div className='p-5 md:p-10'>

  <div className='flex flex-col items-center w-full h-auto md:m-auto'>
  {companyName === "Injaz" ? <img src="/Injaz/page3Logo.png" alt='Company Logo' className='sm:w-96' /> : <img src="/page3Logo.png" alt='Company Logo' className='sm:w-96' />}
  <p className={`text-3xl text-center md:text-main font-extrabold ml-24 ${companyName === "Injaz" ? 'text-[#222A59]' : 'text-[#BA141A]' }`}>Quotation Form</p>
  </div>


{/* client detail and data */}
  <div className='mt-10'>
    <Title title='Client Details' titleType='title' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/>

{/* client name, flag, email */}
<div className='mt-8 flex gap-5 flex-col flex-wrap md:flex-row'>
<Title title='' titleType='subtitle'/> 

    <Input label="Name" placeholder="Enter Your Name" className={className}
    value={data.clientName} name='clientName' handleChange={handleChange}
    />
    <CountryFlags onFlagChange={handleFlagChange} label="Flag"/>

    <div className='flex flex-col '>
<Input label="Email" placeholder="Enter Your Email" className={className}
    value={data.clientEmail} name='clientEmail' handleChange={handleChange}
    />
    {data.isEmail === false &&<span style={{paddingLeft:'7px', paddingTop:"5px", fontSize:'15px', color:"red"}}>Enter Valid Email*</span>}
      </div>
</div>

{/* client phone and Refrence */}
<div className='mt-8 flex gap-5 flex-col flex-wrap md:flex-row'>
<Title title='' titleType='subtitle'/> 

    <PhoneNumberInput label='Phone Number' placeholder='Enter Your Number'
    onPhoneChange={handleClientPhoneChange} 
    />
     <SelectAndInput value={data.reference} list={selectReference} name='reference' placeholder='Select' type='text' basicHandle={handleChange} handleChange={handleCustomSelect} label='Reference'/>

</div>

{/* state */}
<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='State' titleType='subtitle'/> 
<div className='flex flex-wrap gap-3 md:gap-5 '>
  <SimpleDropdown value={data.stateValue} list={stateData} name='stateValue' placeHolder='Select' onChange={handleChange} label='State'/>
  <SelectAndInput value={data.packageIncludingVisa} list={selectVisa} name='packageIncludingVisa' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='License Package Including *'/>
</div>
</div>

{/* activities */}
<div className='my-8 flex gap-6 flex-col md:flex-row flex-wrap md:gap-10'>
 <TestDynamicList heads={ActivitiesHeads} fields={ActivitiesFields} title='Activies' onhandleChange={handleStateArray}/>
</div>


{/* step: 1 */}
<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='Step 1: License' titleType='subtitle' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/> 
<div>
<div className='flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step1value} list={selectStep1} name='step1value' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Trade License Fees'/>
  <Input label="Remarks" disabled='disabled' value={data.step1Remarks} name='step1Remarks' />
  <Input label="Timeline" disabled='disabled' value={data.step1Timeline} name='step1Timeline'/>
</div>
<div className='flex flex-wrap gap-6 md:gap-5 my-8'>
<Input label="Pre Approval Fee" value={data.step2ApprovalFee} name='step2ApprovalFee' placeholder='Enter Approval Fee' type='number' handleChange={handleChange}  />
</div>
</div>
</div>

{/* step: 2 */}
<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='Step 2: Immigration' titleType='subtitle' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/> 
<div>
<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
<Input label="E Channel Card" value={data.step2value1} name='step2value1'  placeholder='Enter E Channel' type='number' handleChange={handleChange} />

  <Input label="Remarks" disabled='disabled' value={data.step2Remark} name='step2Remark'/>
  <Input label="Timeline" disabled='disabled' value="" name=''/>


</div>
<div className='mb-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2Establishment} list={selectStep2b} name='step2Establishment' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Establishment Card'/>
  <Input label="Remarks" disabled='disabled' value={data.step2EstablishmentRemark} name='step2Timeline'/>
  <Input label="Timeline" disabled='disabled' value={data.step2EstablishmentTimeline} name='step2EstablishmentTimeline'/>

</div>
</div>
</div>

{/* step: 3 */}
<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='Step  3: Entry VISA' titleType='subtitle' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/> 
<div>

<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.freeVisa} list={selectVisa} name='freeVisa' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Free Visa'/>
</div>
<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2value2a} list={selectVisaPartner} name='step2value2a' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa (Per Visa) Partner'/>
 <Input label="Remarks" disabled='disabled' value={data.step3Renewable} name='step3Renewable'/>
  <Input label="Timeline" disabled='disabled' value={data.step3Timeline} name='step3Timeline'/>
</div>
<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2value2} list={selectVisaEmployment} name='step2value2' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa (Per Visa) Employment'/>
  <Input label="Remarks" disabled='disabled' value={data.step3RenewableEmployment} name='step3RenewableEmployment'/>
  <Input label="Timeline" disabled='disabled' value={data.step3TimelineEmployment} name='step3TimelineEmployment'/>
</div>
<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2value3} list={selectStatusChange} name='step2value3' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa Status Change'/>
 <Input label="Remarks" disabled='disabled' value={data.step3StatusChange} name='step3StatusChange'/>
  <Input label="Timeline" disabled='disabled' value={data.step3TimelineStatusChange} name='step3TimelineStatusChange'/>
</div>

<div className='mb-8 flex flex-wrap gap-6 md:gap-5'>
<Input label="Pro Fees"
    type='number'
    placeholder='Enter PRO Fees'
    value={data.discount} name='discount' handleChange={handle2500Value}
    />
</div>


<div className='mb-8 flex flex-wrap gap-6 md:gap-5'>
<Input label="Total (Step 1, 2, 3)" value={data.tAmount} />
</div>


<div className='mb-8 flex flex-wrap gap-6 md:gap-5'>
<Input label="Grand Total Amount" className={className} value={data.gtAmount}/>
    <Input label="Date" type='date' className={className} name='date' value={moment(data.date).format("YYYY-MM-DD")} handleChange={handleChange}/>

    <div className={`flex flex-col mt-5`}>
    <label className='text-sm text-[#222A59] font-medium mb-2'>In Words</label>
    <label className='underline'>{data.word}</label>
    </div>
</div>


</div>
</div>
 </div>

 {/* CheckBox firlds */}
 <div className='mt-10'>
 <Title title='Full Package Inclusive:' titleType='title' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/>
 <div className='mt-8'>
<CheckBox data={checkBoxData} handleChange={handleCheckboxChange} handlePackage={handlePackageChange}/>
</div>
 </div>

{/* buttons */}


  {companyName === "Conqueror" && auth()  &&<div className='flex flex-col md:flex-row md:justify-end gap-5 mt-5'>
  {!generatePDFBtn && <Button title='Generate Company Profile' click={handleFullPFBtn} btnColor='bg-[#3354e8]' hoverBtn='hover:bg-[#8c9de9]' />}
  {!generatePDFBtn && <Button title='Generate Invoice' click={handleProfilePFBtn} btnColor='bg-[#3354e8]' hoverBtn='hover:bg-[#8c9de9]' />}


    {generatePDFBtn &&
 <button
        className={`w-24 h-11 ${btnStatusText === 'error' ? `bg-[#df3c3c]` : btnStatusText === 'save' ? 'bg-[#4AD991]' : 'bg-[#8f9693]' }  text-white rounded-lg flex justify-center items-center text-sm cursor-pointer ${btnStatusText === 'error' ? `hover:bg-[#eb9797]` : btnStatusText === 'save' ? 'hover:bg-[#99eec3]' : 'hover:cursor-wait' }`}
      >
<PDFDownloadLink document={<MyDocument
        data={data}
        checkBox={checkBoxData}
        state={stateArray}
         />} fileName={`${data.clientName}-Quotation-Conqueror-PDF`}>
  
       {({ loading, error }) => (
    <button
    onClick={handleGeneratePDF}
      disabled={btnStatus}
    >
{
   handleValue(loading, error )
      
       }
          </button>
  )}
       
</PDFDownloadLink>
</button>
   
       }
    <Button title='Clear' click={clear} btnColor='bg-[#EF3826]' hoverBtn='hover:bg-[#d99b95]' />
    <Button title='Share PDF' btnColor='bg-[#EDAB00]' hoverBtn='hover:bg-[#e1ce9d]'/>
   </div>
}

{companyName === "Injaz" && auth()  &&<div className='flex flex-col md:flex-row md:justify-end gap-5 mt-5'>
  {!generatePDFBtn && <Button title='Generate Company Profile' click={handleFullPFBtn} btnColor='bg-[#3354e8]' hoverBtn='hover:bg-[#8c9de9]' />}
  {!generatePDFBtn && <Button title='Generate Invoice' click={handleProfilePFBtn} btnColor='bg-[#3354e8]' hoverBtn='hover:bg-[#8c9de9]' />}


    {generatePDFBtn &&
 <button
        className={`w-24 h-11 ${btnStatusText === 'error' ? `bg-[#df3c3c]` : btnStatusText === 'save' ? 'bg-[#4AD991]' : 'bg-[#8f9693]' }  text-white rounded-lg flex justify-center items-center text-sm cursor-pointer ${btnStatusText === 'error' ? `hover:bg-[#eb9797]` : btnStatusText === 'save' ? 'hover:bg-[#99eec3]' : 'hover:cursor-wait' }`}
      >
<PDFDownloadLink document={<MyDocumentInjaz
        data={data}
        checkBox={checkBoxData}
        state={stateArray}
         />} fileName={`${data.clientName}-Quotation-Injaz-PDF`}>
  
       {({ loading, error }) => (
    <button
    onClick={handleGeneratePDF}
      disabled={btnStatus}
    >

{
   handleValue(loading, error )
      
       }
          </button>
  )}
       
</PDFDownloadLink>
</button>
   
       }
    <Button title='Clear' click={clear} btnColor='bg-[#EF3826]' hoverBtn='hover:bg-[#d99b95]' />
    <Button title='Share PDF' btnColor='bg-[#EDAB00]' hoverBtn='hover:bg-[#e1ce9d]'/>
   </div>
}

</div>

  );
};

export default TestForm;