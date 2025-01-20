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
import { createPdf, allRefs, sendPDF } from '../redux/features/pdfSlice';
import {sweetNotification} from "../components/common/SweetAlert"
import {useNavigate} from "react-router-dom"
import DateDropDown from '../components/pdf/DateDropDown';
import {updateShowBackDropLoader } from "../redux/features/adminSlice";
import { asyncThunkCreator } from '@reduxjs/toolkit';
import axios from 'axios';
const TestForm = () => {
  const toWords = new ToWords();
  const dispatch = useDispatch();
  const navigate = useNavigate();
let className = "mr-0";
const VisitingCard = 0.3;
const LetterHeadPad = 0.3;
const [stateArray, setStateArray] = useState([]);
const [generatePDFBtn, setGeneratePDFBtn] = useState(false)
const [btnStatus, setBtnStatus] = useState(true);
const [btnStatusText, setBtnStatusText] = useState("generating");

const { companyName } = useSelector(state => state.brandingStore);
const { user } = useSelector(state => state.adminStore);



  const [data, setData] = useState({
  userId: user?._id,
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
   step1Timeline:'3-5 Working Days',
   step1value:'',


   preRemarks:'One-time',
   preTimeline:"5-10 Days",


   step2ApprovalFee:'',
   step2value1:'',
   step2value1IN:'',
   step2Timeline:'2-3 Working Days',
   step2EstablishmentRemark:"Federel Immigration Fees Renewable every two year",
   step2Remark:"Government Fees Renewable every year",
   step2EstablishmentTimeline:"2-3 Working Days After License" ,
   step3RenewableEmployment:"Government Fees Renewable every year ",
   step3StatusChange:"If You Are In UAE",
   step2Establishment:'',
   step2EstablishmentIN:'',
   step2ImmigrationFee:'',
   step2value2a:'',
   step2value2aIN:"",


   step3Renewable:'Renewable Every 2 Years',
   step3Timeline:'4-7 Working Days',
   step2value2:'',
   step2value2IN:'',
   step3TimelineEmployment:'5-7 Working Days',
   step2value3:'',
   step2value3IN:'',
   step3Medical:"",
   TimelineMedical:'1-2 working days after apply',
   step3EmiratesId:"",
   TimelineEmiratesId:'5-10 working days after apply',
   step3TimelineStatusChange:'During Application',
   pro:2500,
   word:'',
   flag:'',
   country:'Afghanistan',

   medical:"",
   medicalIN:"",
   medicalTimeline:"1-2 Working Days After Apply",

   emiratesId:'',
   emiratesIdIN:"",
   emiratesIdTimeline:"3-5 Working Days After Apply",

   quotationDate:moment(new Date()).format("YYYY-MM-DD"),

   pdfLenght:'',
   isEmail:""
  });

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
        title:"Corporate Tax Registration (TRN)",
        value:0 ,
        status:"0" ,
        filed:false,

    },
    {
      id:'13',
        title:"Health Insurances",
        value:0 ,
        status:"0", 
        filed:true,

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

    },
    {
      id:'23',
        title:"Etisalat Land Phone",
        value:0 ,
        status:"0" ,
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
    },
    {
      id:'Conditional',
      name:"Conditional"
    }
  ];


  const handleFlagChange = (data) => {
    let countryName = data.split('-').pop();
    if(data.split('-').pop() === "AF"){
      countryName='Afghanistan';
    }
    setData((prevData) => ({
      ...prevData,
      flag: data.split('-')[0],
      country: countryName,
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

   const handleQuotationDate = (date)=>{
    setData(prevData => ({
      ...prevData,
      quotationDate:date
    }));
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
  const fullData = {
    data:data,
    checkBoxData:checkBoxData,
    stateArray:stateArray
  }
  dispatch(updateShowBackDropLoader(true));
  dispatch(createPdf(fullData))
    .then(async(response) => {
      dispatch(updateShowBackDropLoader(false));
      if (response && !response.payload.hasError) {

       navigate("/quotation")
       sweetNotification(false, response.payload.msg)
      }
      else{
        sweetNotification(true, response.payload.msg)
      }
    })
    .catch(error => {
      dispatch(updateShowBackDropLoader(false));
      sweetNotification(true, 'Something went wrong');
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

  const addDaysToDate = (date, days) => {
    const result = new Date(date); // Create a new date based on the input
    result.setDate(result.getDate() + days); // Add the specified number of days
    return result;
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
    let totalAmount = [data.step1value,   Number(data.step2EstablishmentIN), data.step2value1IN,  data.step2value2aIN, data.step2value2IN, 2500 , Number(data.medicalIN) , Number(data.emiratesIdIN)].reduce(

      (total, item) => total + Number(item), 
      0
    );
    
    let calculateGrandTotal = updateTheGTValue(totalAmount);

    calculateGrandTotal = calculateGrandTotal - 2500;


    calculateGrandTotal = calculateGrandTotal + Number(data.discount)

    const roundedNumber = parseFloat(calculateGrandTotal.toFixed(1));
    let words = toWords.convert(roundedNumber);

    setData(prevData => ({
      ...prevData,
      tAmount: totalAmount,
      gtAmount: roundedNumber,
      word:words,
      date:addDaysToDate(new Date(data.quotationDate),7)
    }));
  };

  const handleCheckboxChange = (changedItem) => {
    const updatedData = checkBoxData.map((item) =>
      item.title === changedItem.title ? { ...item, status: changedItem.status === "1" ? "0" : "1" } : item
    );
    setCheckBoxData(updatedData);
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
    step2EstablishmentIN: getStep2ValueB(),

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

  const getStatusChange = () => {
    if (data.stateValue === "Dubai") return `AED 1650 - If You Are In UAE `;
    if (data.stateValue === "Dubai (IFZA)") return `AED 1650 - If You Are In UAE `;
    if (data.stateValue === "Sharjah") return `AED 750 - If You Are In UAE `;

    if (data.stateValue !== "Dubai") return `If You Are In UAE `;
    if (data.stateValue !== "Dubai (IFZA)") return `If You Are In UAE `;
    if (data.stateValue !== "Sharjah") return `If You Are In UAE `;
    return data.step3StatusChange;
  };

  const getEstablishment = () => {
    if (data.stateValue === "Dubai") return `Federel Immigration Fees Renewable every year`;
    if (data.stateValue === "Dubai (IFZA)") return `Federel Immigration Fees Renewable every year`;


    if (data.stateValue !== "Dubai") return `Federel Immigration Fees Renewable every two year`;
    if (data.stateValue !== "Dubai (IFZA)") return `Federel Immigration Fees Renewable every two year`;

    return data.step2EstablishmentRemark;
  };

  setData((prevData) => ({
    ...prevData,
    step2value2a: getStep3ValueA(),
    step2value2aIN: getStep3ValueA(),

    step2value2: getStep3ValueB(),
    step2value2IN: getStep3ValueB(),

    step2value3: getStep3ValueC(),
    step2value3IN: getStep3ValueC(),

    step3StatusChange:getStatusChange(),

    step2EstablishmentRemark:getEstablishment(),

  }));
}, [data.stateValue]);


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
          if(data.reference && data.clientName && data.clientEmail && data.clientPhone && data.stateValue && data.freeVisa && data.step1value && data.step2ApprovalFee && data.step2value1 && data.step2Establishment && data.step2value2a && data.step2value2 && data.step2value3 && data.flag && data.country && stateArray[0]?.code && stateArray[0]?.description && stateArray[0]?.approval && data.isEmail && data.packageIncludingVisa && data.medical && data.emiratesId){
            return true
          }
          else return false;
         }



        //  let selectReferenceFH =[
        //   {
        //     id:'Facebook',
        //     name:'Facebook',
        //   },
        //   {
        //     id:'Instagram',
        //     name:'Instagram',
        //   },
        //   {
        //     id:'Whatsapp',
        //     name:'Whatsapp',
        //   }
        // ];


        // let selectReference; 

        //  const getAllRefs = () =>{
        //   dispatch(allRefs()).then((resp)=>{
        //     if(resp && !resp.payload.hasError){
        //       console.log("check refs",resp.payload.data.refs )

        //       selectReference =[...selectReferenceFH , ...resp.payload.data.refs ]
        //       //  selectReference.concat(resp.payload.data.refs);
        //     }
        //   })
        //  }


 // Initialize state for dropdown options
  const [selectReference, setSelectReference] = useState([
    { id: 'Facebook', name: 'Facebook' },
    { id: 'Instagram', name: 'Instagram' },
    { id: 'Whatsapp', name: 'Whatsapp' },
  ]);

  // const getAllRefs = async () => {
  //   try {
  //     const response = await dispatch(allRefs());
  //     if (response && !response.payload.hasError) {
  //       console.log("check refs", response.payload.data.refs);
  //       setSelectReference((prev) => [
  //         ...prev,
  //         ...response.payload.data.refs,
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch references:", error);
  //   }
  // };
  let isRefsFetched = false;

  const getAllRefs = async () => {
    if (isRefsFetched) return;
    isRefsFetched = true;
  
    try {
      const response = await dispatch(allRefs());
      if (response && !response.payload.hasError) {  
        setSelectReference((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newRefs = response.payload.data.refs.filter(
            (ref) => !existingIds.has(ref.id)
          );
          return [...prev, ...newRefs];
        });
      }
    } catch (error) {
      console.error("Failed to fetch references:", error);
    }
  };

  // const hanldeSave =()=>{
  //   const fullData={
  //     data:data,
  //     checkBoxData:checkBoxData,
  //     stateArray:stateArray
  //   }
  //   dispatch(updateShowBackDropLoader(true));
  //   dispatch(sendPDF(fullData))
  //     .then(response => {
  //       dispatch(updateShowBackDropLoader(false));
  //       if (response && !response.payload.hasError) {
  //        sweetNotification(false, response.payload.msg)
  //       }
  //       else{
  //         sweetNotification(true, response.payload.msg)
  //       }
  //     })
  //     .catch(error => {
  //       dispatch(updateShowBackDropLoader(false));
  //       sweetNotification(true, 'Something went wrong');
  //       console.error('Dispatch failed:', error);
  //     });
  // }
  

  const updateCompanyName = () => {
      setData(prevData => ({
        ...prevData,
        selectCompany: localStorage.getItem("companyName")
      }));
  };

  useEffect(() => {
    handleImageAndColor();
    handleAmount();
    getAllRefs();
    updateCompanyName();

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
    
  }, [localStorage.getItem("companyName"), checkBoxData, stateArray, data.discount, data.step1value, data.step2EstablishmentIN, data.step2value1IN, data.step2value2IN, data.step2value2aIN, data.step2value3IN, data.visitingCard, data.letterHeadPad, data.medicalIN, data.emiratesIdIN, data.quotationDate])
  

  return (
<div className='p-5 md:p-10'>

  <div className='flex justify-center w-full h-auto md:m-auto'>
  {companyName === "Injaz" ? <img src="/Injaz/page3Logo.png" alt='Company Logo' className='w-72' /> : <img src="/page3Logo.png" alt='Company Logo' className='w-72' />}
  {/* <p className={`text-3xl text-center md:text-main font-extrabold ml-24 ${companyName === "Injaz" ? 'text-[#222A59]' : 'text-[#BA141A]' }`}>Quotation Form</p> */}
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
      <Input label="Date" value={moment(data.quotationDate).format("YYYY-MM-DD")} name='quotationDate' type='date' handleChange={handleChange}  />

      {/* <DateDropDown label="Date" onDateChange={handleQuotationDate}/> */}
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
<Title title='State' titleType='subtitle' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/> 
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

</div>
</div>

{/* step: 2 */}
<div className='my-8 flex gap-5 flex-col md:flex-row'>
<Title title='Step 2: Immigration' titleType='subtitle' style={{ color: companyName === "Conqueror" ? '#BA141A' : "#222A59" }}/> 
<div>
<div className='flex flex-wrap gap-6 md:gap-5 my-8'>
<Input label="Pre Approval Fee" value={data.step2ApprovalFee} name='step2ApprovalFee' placeholder='Enter Approval Fee' type='number' handleChange={handleChange}  />


<Input label="Remarks" disabled='disabled' value={data.preRemarks} name='preRemarks'/>
<Input label="Timeline" disabled='disabled' value={data.preTimeline} name='preTimeline'/>
</div>

<div className='mb-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2Establishment} list={selectStep2b} name='step2Establishment' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Establishment Card'/>
 
 <SelectAndInput value={data.step2EstablishmentIN} list={selectStep2b} name='step2EstablishmentIN' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Establishment Card (include)'/>

  <Input label="Remarks" disabled='disabled' value={data.step2EstablishmentRemark} name='step2Timeline'/>
  <Input label="Timeline" disabled='disabled' value={data.step2EstablishmentTimeline} name='step2EstablishmentTimeline'/>

</div>

<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
<Input label="E Channel Card" value={data.step2value1} name='step2value1'  placeholder='Enter E Channel' type='number' handleChange={handleChange} />
<Input label="E Channel Card (include)" value={data.step2value1IN} name='step2value1IN'  placeholder='Enter E Channel' type='number' handleChange={handleChange} />

  {/* <Input label="Remarks" disabled='disabled' value={data.step2Remark} name='step2Remark'/>
  <Input label="Timeline" disabled='disabled' value="" name=''/> */}


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
 <SelectAndInput value={data.step2value2aIN} list={selectVisaPartner} name='step2value2aIN' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa (Per Visa) Partner (include)'/>

 <Input label="Remarks" disabled='disabled' value={data.step3Renewable} name='step3Renewable'/>
  <Input label="Timeline" disabled='disabled' value={data.step3Timeline} name='step3Timeline'/>
</div>


<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2value2} list={selectVisaEmployment} name='step2value2' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa (Per Visa) Employment'/>
 <SelectAndInput value={data.step2value2IN} list={selectVisaEmployment} name='step2value2IN' placeholder='Select' type='number' basicHandle={handleChange} handleChange={handleCustomSelect} label='Visa (Per Visa) Employment (include)'/>

  {/* <Input label="Remarks" disabled='disabled' value={data.step3RenewableEmployment} name='step3RenewableEmployment'/>
  <Input label="Timeline" disabled='disabled' value={data.step3TimelineEmployment} name='step3TimelineEmployment'/> */}
</div>


<div className='my-8 flex flex-wrap gap-6 md:gap-5'>
 <SelectAndInput value={data.step2value3} list={selectStatusChange} name='step2value3' placeholder='Select' type='text' basicHandle={handleChange} handleChange={handleCustomSelect} label='Status Change'/>
 <SelectAndInput value={data.step2value3IN} list={selectStatusChange} name='step2value3IN' placeholder='Select' type='text' basicHandle={handleChange} handleChange={handleCustomSelect} label='Status Change (include)'/>

 <Input label="Remarks" disabled='disabled' value={data.step3StatusChange} name='step3StatusChange'/>
  <Input label="Timeline" disabled='disabled' value={data.step3TimelineStatusChange} name='step3TimelineStatusChange'/>
</div>


<div className='my-8 flex flex-wrap gap-6 md:gap-5 justify-between'>
  <div className='flex gap-6 flex-wrap '>
<Input label="Medical Test (Per visa)" value={data.medical} name='medical'  placeholder='Enter Medical Test' type='number' handleChange={handleChange} />
<Input label="Medical Test (Per visa) (include)" value={data.medicalIN} name='medicalIN'  placeholder='Enter Medical Test' type='number' handleChange={handleChange} />
  </div>
  {/* <Input label="Remarks" disabled='disabled' value={data.step2Remark} name='step2Remark'/> */}
  <Input label="Timeline" disabled='disabled' value={data.medicalTimeline} name='medicalTimeline'/>
</div>

<div className='my-8 flex flex-wrap gap-6 md:gap-5 justify-between'>
  <div className='flex gap-6 flex-wrap '>
<Input label="Emirates ID (Per Visa)" value={data.emiratesId} name='emiratesId'  placeholder='Enter Emirates ID' type='number' handleChange={handleChange} />
<Input label="Emirates ID (Per Visa) (include)" value={data.emiratesIdIN} name='emiratesIdIN'  placeholder='Enter Emirates ID' type='number' handleChange={handleChange} />
  </div>
  {/* <Input label="Remarks" disabled='disabled' value={data.step2Remark} name='step2Remark'/> */}
  <Input label="Timeline" disabled='disabled' value={data.emiratesIdTimeline} name='emiratesIdTimeline'/>
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
 <div className='mt-8 flex flex-wrap'>
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
<PDFDownloadLink 
        document={<MyDocument
            data={data}
            checkBox={checkBoxData}
            state={stateArray}
            />} 
        fileName={`${data.clientName}-Quotation-Conqueror-PDF`}>
  
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
    {/* <Button title='Share PDF' click={hanldeSave} btnColor='bg-[#EDAB00]' hoverBtn='hover:bg-[#e1ce9d]'/> */}
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
    {/* <Button title='Share PDF' click={hanldeSave} btnColor='bg-[#EDAB00]' hoverBtn='hover:bg-[#e1ce9d]'/> */}
   </div>
}

</div>

  );
};

export default TestForm;
