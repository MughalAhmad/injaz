const pdfModel = require("../models/pdfModel");
const refModel = require("../models/referenceModel");
const {sendMail} = require("../integrations/sendMail");
// const { all } = require("../routes/pdfRoute");
const puppeteer = require('puppeteer');
const path = require("node:path");
const { PDFDocument } = require('pdf-lib');
const moment = require("moment");
const jwt = require("jsonwebtoken");

const Fs = require('fs');
const Util = require('util');
const ReadFile = Util.promisify(Fs.readFile);

// Generate PDF

const injazHtml = async (data, checkBox, state) =>{
  // let url = process.env.NODE_ENV === "production" ? "https://portal.injazgroup.co.uk/injaz/" : "http://localhost:5000/injaz/" ;
  // let mainUrl = process.env.NODE_ENV === "production" ? "https://portal.injazgroup.co.uk/conqueror" : "http://localhost:5000/conqueror/" ;
  let url = "http://localhost:5000/injaz/" ;
  let mainUrl = "http://localhost:5000/conqueror/" ;

  const setImg = (name)=>{
    if (name === 'Ajman') {
      return url+'pngA.png';
    } else if (name === 'Sharjah') {
      return url+'pngS.png';
    } else if (name === 'Dubai') {
      return url+'pngD.png';
    }else if (name === 'Fujairah') {
      return url+'pngF.png';
    }else if (name === 'RAK') {
      return url+'pngR.png';
    }else if (name === 'Hamriya') {
      return url+'pngH.png';
    }else if (name === 'Saif Zone') {
      return url+'pngSZ.png';
    }else{
      return url+'pngJ.png';
    }
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dateParts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
  
    const formattedDate = `${dateParts.find(p => p.type === 'weekday').value}, ` +
                          `${dateParts.find(p => p.type === 'day').value} ` +
                          `${dateParts.find(p => p.type === 'month').value} ` +
                          `${dateParts.find(p => p.type === 'year').value}`;
  
    return formattedDate;
  };

  const currentYear = new Date().getFullYear();

  const getLastDigits = (number) =>{
    return (number % 1000000).toString().padStart(6, '0');
  }

  const activityBox = state.map((item)=>`<div
  style="display:flex; flex-direction:row; width:100%; align-items: center; margin-top:5px;">
  <img style="height:25px; margin-top:-1px; margin-right:10px" src=${url+"check.png"} />
  <span style="width:15%; font-size: 16px; font-weight: 600;">${item.code}</span>
  <span style="width:55%; font-size: 16px; font-weight: 600; color:#208edb;">${item.description}</span>
  <span style="width:15%; font-size: 16px; font-weight: 600; color:#C40014;">${item.approval}</span>
  <span style="width:12%; font-size: 16px; font-weight: 600; color:#ed9b1b;">${item.authority}</span>
</div>`).join('');

  const checkBoxHTML = checkBox
    .map(
      (item, index) => `
       <div style="display:flex; flex-direction:row; width:100%; align-items: center; margin-top:5px; padding-left:10px; color:${item.status==='1' ? 'red' : 'black'}">
                <img style="height:25px; margin-top:-1px; margin-right:10px" src=${url+'check.png'} />
                <span style="width:58%; font-size: 20px;">${checkBox[index]?.title}</span>
                <span style=" width:20%;font-size: 20px;">${ checkBox[index]?.value }</span>
                <span style=" font-size: 20px; ">${checkBox[index]?.status === "0" ? 'NOT INCLUDED' : 'INCLUDED'}</span>
            </div>
      `
    )
    .join(''); // Combine the array of strings into a single HTML string

  const html =`
  <!DOCTYPE html>
<html>
<head>
    <style>
        @page { margin: 0;}
        body { margin: 0; font-family: Arial, sans-serif;}
        .first-page { height: 99.9vh;}
        .logo {width: '25px'; height: '20px'; margin-top: 20px;}
        .img {width: 100%; height: 100%;}
        .footer {display: flex; flex-direction: row; justify-content: space-between; padding-left: 20px; padding-right: 20px; position: absolute; bottom: 0; left: 0; right: 0; background-color: #1E2957; color: white; padding-top: 15px; padding-bottom: 15px}
    </style>
</head>
<body>
    <!-- First Page -->
    <div class="first-page">
        <img src=${setImg(data?.stateValue.split(" ")[0] || url+"pngJ.png")} alt="Image Injaz" />
    </div>

    <div class="first-page" style="position: relative;">
        <div>
            <img src=${url+"header.png"} />
        </div>

        <div style="margin-left: 50px; margin-right: 50px;">
            <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center">
                <img class="logo" src=${url+"page3Logo.png"} />
                <span style="font-size:20px; font-weight: bold; color:#1e3b4f; margin-top:20px">${formatDate(new Date(data.quotationDate))}</span>
            </div>

            <div style="display:flex; flex-direction:row; justify-content:left; align-items:center; margin-top:25px;">
                <span style="font-size:20px; font-weight: bold; color:black">${`Proposal:    IGF/${currentYear}/${getLastDigits(data.clientPhone.split('-')[1])}`}</span>

                <div style="display:flex; flex-direction:row; position:absolute; justify-content:center; width:88vw">
                    <span style="font-size:20px; font-weight: bold; text-align:center; padding-top:2px">${data?.country || "empty"}</span>
                    <img style="width:50px; height:30px; margin-left:10px" src=${mainUrl+`/flags/${data?.flag.toLowerCase()}.png`} alt"flag"/>
                </div>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center; margin-top:25px;">

                <div style="width:10%; height:100%">
                    <p style="font-size:25px; height:50%; width:100%">Name:</p>
                    <p style="font-size:25px; height:50%; width:100%">Ref:</p>
                </div>

                <div style="width:40%; height:100%">
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#4c733a">${data?.clientName || "empty"}</p>
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#733463">${data?.reference || "empty"}</p>
                </div>

                <div style="width:10%; height:100%;">
                    <p style="font-size:25px; height:50%; width:100%">Email:</p>
                    <p style="font-size:25px; height:50%; width:100%">Contact:</p>
                </div>

                <div style="width:40%; height:100%">
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#296d98">${data.clientEmail || "empty"}</p>
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#4c733a">${`${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</p>
                </div>
            </div>


            <div
                style="display:flex; flex-direction:row; align-items:center; justify-content:center; margin-bottom: 25px; margin-top: 25px;">
                <span style="padding-left:5px;  font-size:35px; font-weight: bold; color:#C40014">(${data?.stateValue.split(" ")[0] || 'empty'})</span>
                <span style="padding-left:5px; font-size:35px; font-weight: bold;">License Package including ${data?.packageIncludingVisa || 0} Visa</span>
            </div>

            <div
                style="margin-top:5px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; display:flex; flex-direction:row;">
                <span style="font-size: 15px; font-weight: 600; width:15%;">
                    Activity Code
                </span>
                <span style="font-size: 15px; font-weight: 600; width:55%; padding-left:35px">
                    Description
                </span>
                <span style="font-size: 15px; font-weight: 600; width:15%">
                    Approval
                </span>
                <span style="font-size: 15px; font-weight: 600; width:12%">
                    Authority
                </span>

            </div>

           <div style="display:flex; flex-direction:row; gap:35px; justify-content: center;">
                <div style="width:100%">
                ${activityBox}
                </div>
            </div>

            <!-- {/* step No 1 */} -->

            <div style="padding-top: 5px; border-top:5px solid black">
                <p style="font-size: 20px; font-weight: bold;  color: #4c733a;">Step
                    1: License</p>
            </div>
           <div
                style=" margin-top: 2px; background-color: #89d976; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:#296d98;">Injaz Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">License Fee</span>
                <span style="font-size: 16px; width: 25%; color:#C40014; background-color:#f8c6ab; font-weight:500;">AED ${data?.step1value.toLocaleString() || "0.00"}</span>
                <span style="font-size: 16px; width: 25%; padding-right:3px; color:#C40014; font-weight:500;">${data?.step1Remarks}</span>
                <span style="font-size: 16px; width: 25%">${data?.step1Timeline}</span>
            </div>


            <!-- {/* step No 2 */} -->
          <div style="margin-top: 40px">
                <p style="font-size: 20px; font-weight: bold;  color: #733463;">Step
                    2: Immigration Card</p>
            </div>



             <div
                style=" margin-top: 2px; background-color: #36801c; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:white;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:white;">Injaz Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:white;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:white;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Pre-Approval Fee</span>
                <span style="font-size: 16px; width: 25%; color:#337cd6;">AED ${Number(data?.step2ApprovalFee).toLocaleString() || "0.00"}</span>
                <span style="font-size: 16px; width: 25%; ">One-Time</span>
                <span style="font-size: 16px; width: 25%">5-10 days</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Establishment Card</span>
                 <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style"color:#337cd6;">
                        AED ${data?.step2Establishment?.toLocaleString() || "0.00"}
                    </span >
                    <span style=" margin-right:15px; color:#c40014;  font-weight: bold;">
                        AED ${data?.step2EstablishmentIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%; color:#c40014; font-weight:500;">${data?.step2EstablishmentRemark}</span>
                <span style="font-size: 16px; width: 25%">${data?.step2EstablishmentTimeline}</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">E-Channel Card</span>
                 <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6">
                        AED ${data?.step2value1?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#c40014;  font-weight: bold;">
                        AED ${data?.step2value1IN?.toLocaleString() || "0.00"}
                    </span>

                </div>

                <span style="font-size: 16px; width: 25%; padding-right:3px"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <!-- {/* step No 3 */} -->
<div style=" margin-top: 40px">
                <p style="font-size: 20px; font-weight: bold;  color: #337cd6;">Step
                    3: Entry VISA</p>
            </div>


              <div
                style=" margin-top: 2px; background-color: #cfe8ff; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:#c40014; ">Injaz Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16; width: 25%">Visa (Per Visa) Investor</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span>
                        AED ${data?.step2value2a?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#296d98; font-weight: bold;">
                        AED ${data?.step2value2aIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;">${data?.step3Renewable}</span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Visa (Per Visa) Employment</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span>
                    AED ${data?.step2value2?.toLocaleString() || "0.00"}

                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                    AED ${data?.step2value2IN?.toLocaleString() || "0.00"}

                    </span>

                </div>
                <span style="font-size: 16px; width: 25%; padding-right:3px"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; background-color:#f8c6ab;">Status Change</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between; background-color:#f8c6ab;">
                    <span style="color:#337cd6;">
                      Conditional

                    </span>
                    <span style=" margin-right:15px; color:#c40014; font-weight: bold;">
                      AED ${data?.step2value3IN?.toLocaleString() || "0.00"}

                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;">${data?.step3StatusChange}</span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>


             <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Medical Test (Per visa)</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6;">
                         AED ${data?.medical?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                        AED ${data?.medicalIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%">${data?.medicalTimeline}</span>
            </div>


            <!-- {/* //////////////// */} -->

           <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Emirates ID (Per Visa)</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6;">
                     AED ${data?.emiratesId?.toLocaleString() || "0.00"}

                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                        AED ${data?.emiratesIdIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%">${data?.emiratesIdTimeline}</span>
            </div>


            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">PRO Fees</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span>

                    </span>
                    <span style=" margin-right:15px; color:#2b472b; font-weight: bold;">
                        AED 2500
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row;">
                <span style=" font-size: 18px; font-weight: bold; width:25%">Total Step (1, 2, 3):</span>

                <span
                    style="color:#337cd6; font-size: 16px; font-weight: bold; width: 25%; text-align:right; padding-right:15px"><span style="background-color:#cfe8ff">AED ${(Number(data?.step1value) + Number(data?.step2EstablishmentIN) + Number(data?.step2value1IN) + Number(data?.step2value2aIN) + Number(data?.step2value2IN) + 2500 + Number(data?.medicalIN) + Number(data?.emiratesIdIN) ).toLocaleString() } </span> </span>
                <span style="font-size: 16px; width: 25%"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <!-- {/* Total  */} -->

           <div
                style="margin-top:1px; background-color: #0b4b6a; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 18px; font-weight:500; color:white;">PRO Fees ${((2500 - Number(data?.discount)) / 2500) * 100}% AED ${2500 - Number(data?.discount)}.00 will be discounted if you are Proceed within ${formatDate(new Date(data?.date))}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: 400;"><span style="background-color:#f8c6ab">Discount</span></span>
                <span style="font-size: 16px; width: 75%; font-weight: bold;">AED ${2500 - Number(data?.discount)}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: bold;"><span style="background-color:#cfe8ff">Grand Total</span></span>
                <span style="font-size: 16px; width: 75%; font-weight: bold; color:#337cd6; font-weight: bold;">AED ${data?.gtAmount.toLocaleString() || "0.00"}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: 400;">In Word:</span>
                <span style="font-size: 16px; width: 75%; font-weight: 400;"> ${data?.word || "empty"} Dirham</span>
            </div>

        </div>

        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${mainUrl+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>


    <!-- page 3 -->
    <div class="first-page" style="position: relative;">
        <img src=${url+"header.png"} alt="Header" />

        <div style="margin-left: 50px; margin-right: 50px;">
            <img class="logo" src=${url+"page3Logo.png"} alt="Logo" />
            <div
                style="margin-top:25px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; padding-left:18px; padding-right:18px; margin-top: 15px;">
                <span style="font-size: 25px; font-weight: 600;">
                    Full Package Inclusive
                </span>
            </div>


            <!-- Checkboxes -->
             ${checkBoxHTML}
        
            <!-- Images -->
            <div style="display: flex; flex-direction: column; justify-content: center; margin-top: 30px;">

                <img src=${url+"pngLs1.png"} alt="Image 1" />

                <img src=${url+"pngLs2.png"} alt="Image 2" style="margin-top: 30px;" />

                <img src=${url+"pngLs4.png"} alt="Image 4"
                    style="margin-top: 30px; margin-bottom: 20px;" />

            </div>
        </div>
        <!-- Footer -->
        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${mainUrl+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                     <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>


    <!-- page 4 -->
    <div class="first-page" style="position: relative;">

        <!-- Header -->
        <img src=${url+"header.png"} alt="Header" />

        <div style="margin-left: 50px; margin-right: 50px;">

            <!-- Logo -->
            <img class="logo" src=${url+"page3Logo.png"} alt="Logo" />

            <!-- Images -->
            <div style="display: flex; flex-direction: column; justify-content: center; margin-top: 20px;">

                <img src=${url+"pngLs3.png"} alt="Image 3" />

            </div>

            <!-- Full Package Inclusive -->
            <div
                style="margin-top:20px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; padding-left:18px; padding-right:18px;">
                <span style="font-size: 25px; font-weight: 600;">
                    *If the Security / Pre-Approval is rejected from immigration, only the pre-approval fee will be
                    deducted & the balance amount will be refunded.
                </span>
            </div>

            <div
                style="width: 90vw ; display:flex; flex-direction:row; position:absolute; bottom: 120px; justify-content: space-between; align-items: center;">
                <span style="font-size:27px;">CLIENT: _________________________</span>
                <span style="font-size:27px"> SIGNATURE: _________________________</span>

            </div>

        </div>
        <!-- Footer -->
        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${mainUrl+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>
    </body>
    </html>
  `
  return html;
}

const conquerorHtml = async (data, checkBox, state) =>{

  // let url = process.env.NODE_ENV === "production" ? "https://portal.injazgroup.co.uk/conqueror" : "http://localhost:5000/conqueror/" ;
  let url = "http://localhost:5000/conqueror/" ;

  const setImg = (name)=>{
    if (name === 'Ajman') {
      return url+'pngA.png';
    } else if (name === 'Sharjah') {
      return url+'pngS.png';
    } else if (name === 'Dubai') {
      return url+'pngD.png';
    }else if (name === 'Fujairah') {
      return url+'pngF.png';
    }else if (name === 'RAK') {
      return url+'pngR.png';
    }else if (name === 'Hamriya') {
      return url+'pngH.png';
    }else if (name === 'Saif Zone') {
      return url+'pngSZ.png';
    }else{
      return url+'pngJ.png';
    }
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dateParts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
  
    const formattedDate = `${dateParts.find(p => p.type === 'weekday').value}, ` +
                          `${dateParts.find(p => p.type === 'day').value} ` +
                          `${dateParts.find(p => p.type === 'month').value} ` +
                          `${dateParts.find(p => p.type === 'year').value}`;
  
    return formattedDate;
  };

  const currentYear = new Date().getFullYear();

  const getLastDigits = (number) =>{
    return (number % 1000000).toString().padStart(6, '0');
  }

  const activityBox = state.map((item)=>`<div
    style="display:flex; flex-direction:row; width:100%; align-items: center; margin-top:5px;">
    <img style="height:25px; margin-top:-1px; margin-right:10px" src=${url+"check.png"} />
    <span style="width:15%; font-size: 16px; font-weight: 600;">${item.code}</span>
    <span style="width:55%; font-size: 16px; font-weight: 600; color:#208edb;">${item.description}</span>
    <span style="width:15%; font-size: 16px; font-weight: 600; color:#C40014;">${item.approval}</span>
    <span style="width:12%; font-size: 16px; font-weight: 600; color:#ed9b1b">${item.authority}</span>
</div>`).join('');

const checkBoxHTML = checkBox
.map(
  (item, index) => `
   <div style="display:flex; flex-direction:row; width:100%; align-items: center; margin-top:5px; padding-left:10px; color:${item.status==='1' ? 'red' : 'black'}">
            <img style="height:25px; margin-top:-1px; margin-right:10px" src=${url+'check.png'} />
            <span style="width:58%; font-size: 20px;">${checkBox[index]?.title}</span>
            <span style=" width:20%;font-size: 20px;">${ checkBox[index]?.value }</span>
            <span style=" font-size: 20px; ">${checkBox[index]?.status === "0" ? 'NOT INCLUDED' : 'INCLUDED'}</span>
        </div>
  `
)
.join(''); // Combine the array of strings into a single HTML string

  const html =`
  <!DOCTYPE html>
<html>
<head>
    <style>
        @page { margin: 0;}
        body { margin: 0; font-family: Arial, sans-serif;}
        .first-page { height: 99.9vh;}
        .logo {width: 200px; height: 70px; margin-top: 20px;}
        .img {width: 100%; height: 100%;}
        .footer {display: flex; flex-direction: row; justify-content: space-between; padding-left: 20px; padding-right: 20px; position: absolute; bottom: 0; left: 0; right: 0; background-color: #C40014; color: white; padding-top: 15px; padding-bottom: 15px}
    </style>
</head>
<body>
    <!-- First Page -->
    <div class="first-page">
        <img src=${setImg(data?.stateValue.split(" ")[0] || url+"pngJ.png")} alt="Image Injaz" />
    </div>

    <div class="first-page" style="position: relative;">
        <div>
            <img src=${url+"header.png"} />
        </div>

        <div style="margin-left: 50px; margin-right: 50px;">
            <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center">
                <img class="logo" src=${url+"page3Logo.png"} />
                <span style="font-size:20px; font-weight: bold; color:#1e3b4f; margin-top:20px">${formatDate(new Date(data.quotationDate))}</span>
            </div>

            <div style="display:flex; flex-direction:row; justify-content:left; align-items:center; margin-top:25px;">
                <span style="font-size:20px; font-weight: bold; color:black">${`Proposal:    IGF/${currentYear}/${getLastDigits(data.clientPhone.split('-')[1])}`}</span>

                <div style="display:flex; flex-direction:row; position:absolute; justify-content:center; width:88vw">
                    <span style="font-size:20px; font-weight: bold; text-align:center; padding-top:2px">${data?.country || "empty"}</span>
                    <img style="width:50px; height:30px; margin-left:10px" src=${url+`/flags/${data?.flag.toLowerCase()}.png`} alt"flag"/>
                </div>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center; margin-top:25px;">

                <div style="width:10%; height:100%">
                    <p style="font-size:25px; height:50%; width:100%">Name:</p>
                    <p style="font-size:25px; height:50%; width:100%">Ref:</p>
                </div>

                <div style="width:40%; height:100%">
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#4c733a">${data?.clientName || "empty"}</p>
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#733463">${data?.reference || "empty"}</p>
                </div>

                <div style="width:10%; height:100%;">
                    <p style="font-size:25px; height:50%; width:100%">Email:</p>
                    <p style="font-size:25px; height:50%; width:100%">Contact:</p>
                </div>

                <div style="width:40%; height:100%">
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#296d98">${data.clientEmail || "empty"}</p>
                    <p style="font-size:25px; font-weight: bold; height:50%; width:100%; color:#4c733a">${`${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</p>
                </div>
            </div>


            <div
                style="display:flex; flex-direction:row; align-items:center; justify-content:center; margin-bottom: 25px; margin-top: 25px;">
                <span style="padding-left:5px;  font-size:35px; font-weight: bold; color:#C40014">(${data?.stateValue.split(" ")[0] || 'empty'})</span>
                <span style="padding-left:5px; font-size:35px; font-weight: bold;">License Package including ${data?.packageIncludingVisa || 0} Visa</span>
            </div>

           <div
                style="margin-top:5px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; display:flex; flex-direction:row;">
                <span style="font-size: 15px; font-weight: 600; width:15%;">
                    Activity Code
                </span>
                <span style="font-size: 15px; font-weight: 600; width:55%; padding-left:35px">
                    Description
                </span>
                <span style="font-size: 15px; font-weight: 600; width:15%">
                    Approval
                </span>
                <span style="font-size: 15px; font-weight: 600; width:12%">
                    Authority
                </span>

            </div>

            <div style="display:flex; flex-direction:row; gap:35px; justify-content: center;">
                <div style="width:100%">
                ${activityBox}
                </div>
            </div>

            <!-- {/* step No 1 */} -->

            <div style="padding-top: 5px; border-top:5px solid black">
                <p style="font-size: 20px; font-weight: bold;  color: #4c733a;">Step
                    1: License</p>
            </div>
            <div
                style=" margin-top: 2px; background-color: #f5f5f5; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:#296d98;">Conqueror Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">License Fee</span>
                <span style="font-size: 16px; width: 25%; color:#C40014; background-color:#f8c6ab; font-weight:500;">AED ${data?.step1value.toLocaleString() || "0.00"}</span>
                <span style="font-size: 16px; width: 25%; padding-right:3px color:#C40014; font-weight:500;">${data?.step1Remarks}</span>
                <span style="font-size: 16px; width: 25%">${data?.step1Timeline}</span>
            </div>
            <!-- {/* step No 2 */} -->
            <div style="margin-top: 40px">
                <p style="font-size: 20px; font-weight: bold;  color: #733463;">Step
                    2: Immigration Card</p>
            </div>
            <div
                style=" margin-top: 2px; background-color: #f5f5f5; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:#296d98;">Conqueror Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Pre-Approval Fee</span>
                <span style="font-size: 16px; width: 25%; color:#337cd6;">AED ${Number(data?.step2ApprovalFee).toLocaleString() || "0.00"}</span>
                <span style="font-size: 16px; width: 25%;">One-Time</span>
                <span style="font-size: 16px; width: 25%">5-10 days</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Establishment Card</span>
                 <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6">
                        AED ${data?.step2Establishment?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#c40014; font-weight: bold;">
                        AED ${data?.step2EstablishmentIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%; color:#c40014; font-weight:500;">${data?.step2EstablishmentRemark}</span>
                <span style="font-size: 16px; width: 25%">${data?.step2EstablishmentTimeline}</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">E-Channel Card</span>
                 <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6">
                        AED ${data?.step2value1?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#c40014; font-weight: bold;">
                        AED ${data?.step2value1IN?.toLocaleString() || "0.00"}
                    </span>

                </div>

                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <!-- {/* step No 3 */} -->
            <div style=" margin-top: 40px">
                <p style="font-size: 20px; font-weight: bold;  color: #337cd6;">Step
                    3: Entry VISA</p>
            </div>

            <div
                style=" margin-top: 2px; background-color: #f5f5f5; padding-top: 6px; padding-bottom: 6px; display:flex; flex-direction:row">
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Description</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500; color:#c40014; ">Conqueror Price</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Remarks</span>
                <span style="font-size: 18px; width: 25%; font-weight: 500;">Timeline</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Visa (Per Visa) Investor</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span>
                        AED ${data?.step2value2a?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#296d98; font-weight: bold;">
                        AED ${data?.step2value2aIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;">${data?.step3Renewable}</span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Visa (Per Visa) Employment</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span>
                    AED ${data?.step2value2?.toLocaleString() || "0.00"}

                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                    AED ${data?.step2value2IN?.toLocaleString() || "0.00"}

                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; background-color:#f8c6ab;">Status Change</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between; background-color:#f8c6ab;">
                    <span style="color:#337cd6;">
                     Conditional

                    </span>
                    <span style=" margin-right:15px; color:#c40014; font-weight: bold;">
                      AED ${data?.step2value3IN?.toLocaleString() || "0.00"}

                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;">${data?.step3StatusChange}</span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Medical Test (Per visa)</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6;">
                         AED ${data?.medical?.toLocaleString() || "0.00"}
                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                        AED ${data?.medicalIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%">${data?.medicalTimeline}</span>
            </div>

            <!-- {/* //////////////// */} -->

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">Emirates ID (Per Visa)</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#337cd6;">
                     AED ${data?.emiratesId?.toLocaleString() || "0.00"}

                    </span>
                    <span style=" margin-right:15px; color:#337cd6; font-weight: bold;">
                        AED ${data?.emiratesIdIN?.toLocaleString() || "0.00"}
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%">${data?.emiratesIdTimeline}</span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%">PRO Fees</span>
                <div
                    style="font-size: 16px; width: 25% ; display:flex; flex-direction:row; justify-content: space-between">
                    <span style="color:#4c733a;">
                        
                    </span>
                    <span style=" margin-right:15px; color:#2b472b;">
                        AED 2500
                    </span>

                </div>
                <span style="font-size: 16px; width: 25%;"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <div style="margin-top: 2px; display:flex; flex-direction:row;">
                <span style="font-size: 18px; font-weight: bold; width:25%">Total Step (1, 2, 3):</span>

                <span
                    style="color:#337cd6; font-size: 16px; font-weight: bold; width: 25%; text-align:right; padding-right:15px"><span style="background-color:#cfe8ff">AED ${(Number(data?.step1value) + Number(data?.step2EstablishmentIN) + Number(data?.step2value1IN) + Number(data?.step2value2aIN) + Number(data?.step2value2IN) + 2500 + Number(data?.medicalIN) + Number(data?.emiratesIdIN) ).toLocaleString() } </span> </span>
                <span style="font-size: 16px; width: 25%"></span>
                <span style="font-size: 16px; width: 25%"></span>
            </div>

            <!-- {/* Total  */} -->

            <div
                style="margin-top:1px; background-color: #D9D9D9AB; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 18px; font-weight:500; color: #C40014;">PRO Fees ${((2500 - Number(data?.discount)) / 2500) * 100}% AED ${2500 - Number(data?.discount)}.00 will be discounted if you Proceed within ${formatDate(new Date(data?.date))}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: 400;"><span style="background-color:#f8c6ab">Discount</span></span>
                <span style="font-size: 16px; width: 75%; font-weight: bold;">AED ${2500 - Number(data?.discount)}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: bold;"><span style="background-color:#cfe8ff">Grand Total</span></span>
                <span style="font-size: 16px; width: 75%; font-weight: bold; color:#337cd6;">AED ${data?.gtAmount.toLocaleString() || "0.00"}</span>
            </div>

            <div style="margin-top:1px; padding-top:5px; padding-bottom:5px; display:flex; flex-direction:row">
                <span style="font-size: 16px; width: 25%; font-weight: 400;">In Word:</span>
                <span style="font-size: 16px; width: 75%; font-weight: 400;"> ${data?.word || "empty"} Dirham</span>
            </div>

        </div>

        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>


    <!-- page 3 -->
        <div class="first-page" style="position: relative;">

        <img src=${url+"header.png"} alt="Header" />

        <div style="margin-left: 50px; margin-right: 50px;">
            <img class="logo" src=${url+"page3Logo.png"} alt="Logo" />
           <div
                style="margin-top:25px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; padding-left:18px; padding-right:18px; margin-top: 15px;">
                <span style="font-size: 25px; font-weight: 600;">
                    Full Package Inclusive
                </span>
            </div>


            <!-- Checkboxes -->
             ${checkBoxHTML}
        
            <!-- Images -->
            <div style="display: flex; flex-direction: column; justify-content: center; margin-top: 30px;">

                <img src=${url+"pngLs1.png"} alt="Image 1" />

                <img src=${url+"pngLs2.png"} alt="Image 2" style="margin-top:30px" />

            </div>
        </div>
        <!-- Footer -->
        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                     <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>


    <!-- page 4 -->
    <div class="first-page" style="position: relative;">

        <!-- Header -->
        <img src=${url+"header.png"} alt="Header" />

        <div style="margin-left: 50px; margin-right: 50px;">

            <!-- Logo -->
            <img class="logo" src=${url+"page3Logo.png"} alt="Logo" />

            <!-- Images -->
            <div style="display: flex; flex-direction: column; justify-content: center; margin-top: 20px;">

                <img src=${url+"pngLs3.png"} alt="Image 3" />

            </div>

            <!-- Full Package Inclusive -->
            <div
                style="margin-top:20px; background-color: #D9D9D9AB; padding-top:15px; padding-bottom: 15px; padding-left:18px; padding-right:18px;">
                <span style="font-size: 25px; font-weight: 600;">
                    *If the Security / Pre-Approval is rejected from immigration, only the pre-approval fee will be
                    deducted & the balance amount will be refunded.
                </span>
            </div>

            <div
                style="width: 90vw ; display:flex; flex-direction:row; position:absolute; bottom: 120px; justify-content: space-between; align-items: center;">
                <span style="font-size:27px;">CLIENT: _________________________</span>
                <span style="font-size:27px"> SIGNATURE: _________________________</span>

            </div>

        </div>
        <!-- Footer -->
        <div class="footer">

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"mail.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">info@conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:20px" src=${url+"web.png"} />
                </div>
                <span
                    style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">www.conqueror.ae</span>
            </div>

            <div style="display:flex; flex-direction:row; align-items:center">
                <div
                    style="width:35px; height:35px; background-color:white; border-radius:100px; display:flex; justify-content:center; align-items:center">
                    <img style="width:20px; height:30px" src=${url+"location.png"} />
                </div>
                <span style="padding-left:5px; padding-top:10px; padding-bottom:10px; font-size:22px">City Pharmacy
                    Building, M02, Port Saeed, Dubai</span>
            </div>
        </div>
    </div>
    </body>
    </html>
  `
  return html;
}

const generatePDF = async (data, checkBoxData, stateArray) => {


 const pdfData = await (data?.selectCompany === "Injaz" ? injazHtml :  conquerorHtml)(data, checkBoxData, stateArray).then(async(data)=>{
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        dumpio: true
     });

  //    {
  //     headless: true,
  //     executablePath: '/usr/bin/chromium-browser',
  //     args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  //     env: { DISPLAY: null }, // Suppress GUI-related logs
  //     dumpio: true
  //  }
    const page = await browser.newPage();

    await page.setContent(data, { waitUntil: 'networkidle0' });

     const testPDF = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 0.8,
    });


    console.log('PDF generated successfully: multi-page-report.pdf');
    await browser.close();
    return testPDF;
  });
   return pdfData;      

};

const compressPDF = async (pdfBuffer) => {
  // Load the Puppeteer-generated PDF
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  // Save the compressed PDF
  const compressedPdfBuffer = await pdfDoc.save({
    useObjectStreams: true, // Optimize PDF structure
    compress: true,
  });

  console.log('PDF compressed successfully');
  return compressedPdfBuffer;
};

  module.exports = {
    createPdf: async (req, res, next) => {
      try {
        const modifyBody = {
          ...req.body.data,
          checkBoxData:req.body.checkBoxData,
          stateArray:req.body.stateArray
        }

        // console.log(modifyBody)
         const pdf = await pdfModel.create(modifyBody);
        if (!pdf) throw new Error("Error in Creating pdf");
  
        return res.status(200).json({
          hasError: false,
          msg: "Pdf Created!",
          data: { pdf: pdf},
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { pdf: null },
        });
      }
    },
    getAllPdf: async (req, res, next) => {
      try {
        const {currentPage, company,role, userId, filter, sortValue} = req.query;
        const searchQuery = filter; 
        const sortOrder = Number(sortValue) ;
        const page = currentPage || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
  
        const options = [
          { $skip: skip }, // Pagination skip
          { $limit: limit },
        ];

        if(sortOrder){
          options.unshift({ $sort: { _id: sortOrder } })
        }
       
        
        // Build search filter only if `searchQuery` is provided
    const searchFilter = searchQuery
    ? {
        $or: [
          { clientName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `status`
          { clientEmail: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `category`
          { pdfStatus: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `title`
          { reference: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `title`
        ],
      }
    : null;
        

        let matchOptions ='';

if(role === "admin"){
  matchOptions = {selectCompany:company}
}else{
  matchOptions = {selectCompany:company, userId:userId, notify:'false'}

}

 // Combine `matchOptions` and `searchFilter`
 const matchStage = {
  ...matchOptions,
  ...(searchFilter && searchFilter), // Only include searchFilter if it's not null
};

const pdfs = await pdfModel.aggregate([
  {
    $match: matchStage,
  },
  {
    $facet: {
      quotations:options,
      totalCount: [
        { $count: "count" }, // Count the total number of documents matching the filter
      ],
    },
  },
]);


const pdfList = pdfs[0]?.quotations || [];
const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
const pdfCount = Math.ceil(totalDocuments / limit);

if (!pdfs) throw new Error("Pdfs not found");

return res.status(200).json({
  hasError: false,
  msg: "All Pdfs Successfully Finded",
  data: { pdfs: pdfList, pages :pdfCount, total:totalDocuments },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { pdf: null },
        });
      }
    },
    getQuotation: async (req, res, next) => {
      try {
        const {id} = req.query; 
       
        const quotation = await pdfModel.findOne({_id:id});
        if (!quotation) throw new Error("Quotation not found");

return res.status(200).json({
  hasError: false,
  msg: "Quotation Successfully Finded",
  data: { quotation: quotation }
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { quotation: null },
        });
      }
    },
//     dashboardData: async (req, res, next) => {
//       try {
//             const {currentPage, sortValue, company,role, userId} = req.query; 
//             const page = currentPage || 1;
//             const limit = 10;
//             const skip = (page - 1) * limit;

      
//             const options = [
//               { $skip: skip }, // Pagination skip
//               { $limit: limit },
//             ];
      

// let matchOptions ='';

// if(role === "admin"){
//   matchOptions = {selectCompany:company}
// }else{
//   matchOptions = {selectCompany:company, userId:userId, notify:'false'}
// }

      
//             const pdfs = await pdfModel.aggregate([
//               {
//                 $match: {
//                   ...matchOptions,
//                 },
//               },
//               {
//                 $facet: {
//                   pdfs: [],
//                   limitedPdfs:options,
//                   totalCount: [
//                     { $count: "count" }, // Count the total number of documents matching the filter
//                   ],
//                 },
//               },
//             ]);

//             let statusCount={
//               pending:0,
//               approved:0,
//               rejected:0, 
//             }

//             pdfs[0]?.pdfs.map((pdf)=>{
//               if(pdf.pdfStatus === "pending"){
//                 statusCount.pending = statusCount.pending + 1
//               }
//               else if(pdf.pdfStatus === "approved"){
//                 statusCount.approved = statusCount.approved + 1
//               }
//              else {
//               statusCount.rejected = statusCount.rejected + 1

//               }

//             })
            
//             const pdfList = pdfs[0]?.limitedPdfs || [];
//             const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
//             const pdfCount = Math.ceil(totalDocuments / limit);
      
//             if (!pdfs) throw new Error("Pdfs not found");
      
//             return res.status(200).json({
//               hasError: false,
//               msg: "All Pdfs Successfully Finded",
//               data: { pdfs: pdfList, pages :pdfCount, cardData:statusCount, total:totalDocuments },
//             });
//           } catch (error) {
//             return res.status(200).json({
//               hasError: true,
//               msg: error.message,
//               data: { pdfs: null },
//             });
//           }
//     },
// /////////////////////////////////////////

// dashboardData: async (req, res, next) => {
//   try {
//     const { currentPage, sortValue, company, role, userId } = req.query;
//     const page = currentPage || 1;
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     const options = [
//       { $skip: skip }, // Pagination skip
//       { $limit: limit },
//     ];

//     let matchOptions = '';

//     if (role === "admin") {
//       matchOptions = { selectCompany: company };
//     } else {
//       matchOptions = { selectCompany: company, userId: userId, notify: 'false' };
//     }

//     // Date filtering logic based on sortValue
//     let dateFilter = {};
//     const today = new Date();
    
//     if (sortValue === 'today') {
//       const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
//       dateFilter.createdAt = { $gte: startOfDay };
//     } else if (sortValue === 'week') {
//       const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of current week (Sunday)
//       dateFilter.createdAt = { $gte: startOfWeek };
//     } else if (sortValue === 'month') {
//       const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
//       dateFilter.createdAt = { $gte: startOfMonth };
//     }

//     // Apply the date filter if sortValue is provided
//     if (Object.keys(dateFilter).length > 0) {
//       matchOptions = { ...matchOptions, ...dateFilter };
//     }

//     const pdfs = await pdfModel.aggregate([
//       {
//         $match: {
//           ...matchOptions,
//         },
//       },
//       {
//         $facet: {
//           pdfs: [],
//           limitedPdfs: options,
//           totalCount: [
//             { $count: "count" }, // Count the total number of documents matching the filter
//           ],
//         },
//       },
//     ]);

//     let statusCount = {
//       pending: 0,
//       approved: 0,
//       rejected: 0,
//     };

//     pdfs[0]?.pdfs.map((pdf) => {
//       if (pdf.pdfStatus === "pending") {
//         statusCount.pending = statusCount.pending + 1;
//       } else if (pdf.pdfStatus === "approved") {
//         statusCount.approved = statusCount.approved + 1;
//       } else {
//         statusCount.rejected = statusCount.rejected + 1;
//       }
//     });

//     const pdfList = pdfs[0]?.limitedPdfs || [];
//     const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
//     const pdfCount = Math.ceil(totalDocuments / limit);

//     if (!pdfs) throw new Error("Pdfs not found");

//     return res.status(200).json({
//       hasError: false,
//       msg: "All Pdfs Successfully Found",
//       data: { pdfs: pdfList, pages: pdfCount, cardData: statusCount, total: totalDocuments },
//     });
//   } catch (error) {
//     return res.status(200).json({
//       hasError: true,
//       msg: error.message,
//       data: { pdfs: null },
//     });
//   }
// },
// ////////////////////////////////////////////
dashboardData: async (req, res, next) => {
  try {
    const { currentPage, sortValue, company, role, userId ,name} = req.query;
    const page = currentPage || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const options = [
      { $skip: skip }, // Pagination skip
      { $limit: limit },
    ];

    let matchOptions = '';

    if (role === "admin") {
      matchOptions = { selectCompany: company };
    } else {
      matchOptions = { selectCompany: company, userId: userId, notify: 'false' };
    }

    // Date filtering logic based on sortValue for createdAt
    let dateFilter = {};
    const today = new Date();

    if (sortValue === 'today') {
      // Filter for the current day's data
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today
      dateFilter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    } else if (sortValue === 'week') {
      // Filter for the current week's data (from Sunday to today)
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of current week (Sunday)
      dateFilter.createdAt = { $gte: startOfWeek };
    } else if (sortValue === 'month') {
      // Filter for the current month's data (from the 1st of the month to today)
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
      dateFilter.createdAt = { $gte: startOfMonth };
    }
   
    let testDATA 
     if(name){
      testDATA = {pdfStatus:name}
     }


    // Apply the date filter if sortValue is provided
    if (Object.keys(dateFilter).length > 0) {
      matchOptions = { ...matchOptions, ...dateFilter };
    }

    const pdfs = await pdfModel.aggregate([
      {
        $match: {
    ...testDATA, 
          
          ...matchOptions,
        },
      },
      {
        $facet: {
          pdfs: [],
          limitedPdfs: options,
          totalCount: [
            { $count: "count" }, // Count the total number of documents matching the filter
          ],
        },
      },
    ]);

    let statusCount = {
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    pdfs[0]?.pdfs.map((pdf) => {
      if (pdf.pdfStatus === "pending") {
        statusCount.pending = statusCount.pending + 1;
      } else if (pdf.pdfStatus === "approved") {
        statusCount.approved = statusCount.approved + 1;
      } else {
        statusCount.rejected = statusCount.rejected + 1;
      }
    });

    const pdfList = pdfs[0]?.limitedPdfs || [];
    const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
    const pdfCount = Math.ceil(totalDocuments / limit);

    if (!pdfs) throw new Error("Pdfs not found");

    return res.status(200).json({
      hasError: false,
      msg: "All Pdfs Successfully Found",
      data: { pdfs: pdfList, pages: pdfCount, cardData: statusCount, total: totalDocuments },
    });
  } catch (error) {
    return res.status(200).json({
      hasError: true,
      msg: error.message,
      data: { pdfs: null },
    });
  }
},

   
    getNoficationData: async (req, res, next) => {
      try {
        const {company, userId} = req.query; 
    

const pdfs = await pdfModel.aggregate([
  {
    $match: {
      selectCompany:company, 
      userId:userId, 
      notify:'true'
         },
  },
]);

if (!pdfs) throw new Error("Notification not found");




return res.status(200).json({
  hasError: false,
  msg: "All Notification Successfully Finded",
  data: { notificationData: pdfs, },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { notificationData: null },
        });
      }
    },
    updateNotification: async (req, res, next) => {
      try {
        const {pdfId} = req.query; 
        const findPdf = await pdfModel.findOne({_id:pdfId});
        if (!findPdf) throw new Error("Notification not found");
        findPdf.notify = 'false';
        const notifys = await pdfModel.findByIdAndUpdate({_id:pdfId}, findPdf, {new:true} );
        if (!notifys) throw new Error("Notification not update");


return res.status(200).json({
  hasError: false,
  msg: "Notification Successfully Updated",
  data: { notification: notifys, },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { notificationData: null },
        });
      }
    },
    allRefs: async (req, res, next) => {
      try {
       
        const allRefs = await refModel.aggregate([
          {$project:{
                _id:1,
                fullName:1,
                refCode:1
          }}
        ]);
        if (!allRefs) throw new Error("References not found");

        let modifyRefs = [];

        allRefs.map((item)=>{
          modifyRefs.push({
            id:item.fullName,
            name:item.fullName,
          })
        })

return res.status(200).json({
  hasError: false,
  msg: "Reference successfully find",
  data: { refs: modifyRefs, },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { refs: null },
        });
      }
    },
    sendPDF : async (req, res, next) => {
      try {
         const {data, checkBoxData, stateArray, editerText} = req.body;
      const pdfBuffer = await generatePDF(data, checkBoxData, stateArray);

// Compress the PDF
const compressedPdfBuffer = await compressPDF(pdfBuffer);

     let acceptDataSet={
      id:data?._id,
      action:'approved'
     }

     let rejectDataSet={
      id:data?._id,
      action:'rejected'
     }

const acceptToken = jwt.sign({ acceptDataSet }, process.env.JWT_SECRET_KEY);
const rejectToken = jwt.sign({ rejectDataSet }, process.env.JWT_SECRET_KEY);

let hostName = process.env.NODE_ENV === 'development' ? 'localhost:4173' : 'quotation.injazgroup.co.uk';
let baseUrl = `${req.protocol}://${hostName}`;


const acceptLink = `${baseUrl}/sendMailResponse?token=${acceptToken}`;
const rejectLink = `${baseUrl}/sendMailResponse?token=${rejectToken}`;



// let url = process.env.NODE_ENV === "production" ? "https://portal.injazgroup.co.uk/injaz/" : "http://localhost:5000/injaz/" ;
// let Curl = process.env.NODE_ENV === "production" ? "https://portal.injazgroup.co.uk/conqueror/" : "http://localhost:5000/conqueror/" ;

let url = "http://localhost:5000/injaz/" ;
let Curl ="http://localhost:5000/conqueror/" ;


        let message = {
          from: data.selectCompany === "Conqueror" ? process.env.MAIL_EMAIL_CONQUEROR : process.env.MAIL_EMAIL_INJAZ,
          to: data.clientEmail,
          cc: data.selectCompany === "Conqueror" ? process.env.MAIL_CONQUEROR_CC : process.env.MAIL_INJAZ_CC,
          subject: `Business Setup in ${data.stateValue}, Including ${data.packageIncludingVisa} Visa`,
          attachments: [
            {
              filename: `Offer-${data.packageIncludingVisa} Visa.pdf`,
              content: compressedPdfBuffer,
            },
            data.selectCompany === "Injaz" ?
            {
              filename: 'page3Logo.png',
              path: url+'page3Logo.png',
              cid: 'I_page3Logo' // same CID as referenced in the email
          }:
          {
            filename: 'page3Logo.png',
            path: Curl+'page3Logo.png',
            cid: 'C_page3Logo' // same CID as referenced in the email
        },
          ], 
          html:  
          data.selectCompany === "Conqueror" ?
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:C_page3Logo" alt="Conqueror Logo" style="max-width: 150px;">
              </div>
          
              <!-- Title -->
            <h3 style="font-size: 20px; color: #C40014; margin-bottom: 10px;">Business Setup in ${data.stateValue}, Including ${data.packageIncludingVisa} Visa</h3>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${data.clientName},</p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                We trust you’re doing well.
              </p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
              </p>
          
              <!-- Attachment
              <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
                <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
                <div>
                  <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                  <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
                </div>
                <a href="#" style="margin-left: auto; background: #B11116; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
              </div> -->
          
              <!-- Call to Action -->
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
                <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                  If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
                </p>
                <div>
                  <a href="${acceptLink}" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                  <a href="${rejectLink}" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
                </div>
              </div>
          
              <!-- Footer -->
              <p style="font-size: 14px; color: #555; margin: 20px 0;">
                If you have any questions or need further clarification, please don’t hesitate to reach out.
              </p>
              <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>

              ${editerText ? editerText : ''}

              <p style="font-size: 14px; color: #333;">Best regards,<br>Conqueror Aspiration L.L.C Sales Team</p>
          
              <div style="text-align: center; margin: 5px 0;">
                <p style="font-size: 14px; color: #C40014; font-weight: 600;">CONNECT WITH</p>
                <div>
                 <a href="https://www.facebook.com/conquerorllc?mibextid=LQQJ4d&mibextid=LQQJ4d" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                <a href="https://www.instagram.com/uaeconqueror?igsh=a2xpMnZnOGRpcWw=" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                <a href="https://api.whatsapp.com/send/?phone=%2B97142837636&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
                </div>
              </div>
          
              <p style="font-size: 12px; color: #999; text-align: center;">
                Conqueror Aspiration L.L.C<br>
                City Pharmacy Bid, Port Saeed, Dubai
              </p>

              <p style="font-size: 12px; color: #999; text-align: center;">
                Conqueror Sales Department<br>
                sales@conqueror.ae<br>
                Conqueror Support Team<br>
                support@conqueror.ae<br>
                Conqueror Aspiration<br>
                contact@conqueror.ae
              </p>

            </div>
          </div>
          `
          :
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="cid:I_page3Logo" alt="Injaz Group Logo" style="max-width: 150px;">

            </div>
        
            <!-- Title -->
            <h3 style="font-size: 20px; color: #1E2957; margin-bottom: 10px;">Business Setup in ${data.stateValue}, Including ${data.packageIncludingVisa} Visa</h3>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${data.clientName},</p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              We trust you’re doing well.
            </p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
            </p>
        
            <!-- Attachment 
            <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
              <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
              <div>
                <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
              </div>
              <a href="#" style="margin-left: auto; background: #0A144E; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
            </div>-->
        
            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
              <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
              </p>
               <div>
                  <a href="${acceptLink}" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                  <a href="${rejectLink}" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
                </div>
            </div>
        
            <!-- Footer -->
            <p style="font-size: 14px; color: #555; margin: 20px 0;">
              If you have any questions or need further clarification, please don’t hesitate to reach out.
            </p>
            <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>

            ${editerText}

            <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Fzc Sales Team</p>
        
            <div style="text-align: center; margin: 5px 0;">
              <p style="font-size: 14px; color: #1E2957; font-weight: 600;">CONNECT WITH</p>
              <div>
                 <a href="https://www.facebook.com/iinjazgroup" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                <a href="https://www.instagram.com/iinjazgroup/" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                <a href="https://api.whatsapp.com/send/?phone=%2B97165334085&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
              </div>
            </div>
        
            <p style="font-size: 12px; color: #999; text-align: center;">
              Injaz Group Fzc<br>
              City Pharmacy Bid, Port Saeed, Dubai
            </p>
          </div>
        </div>`
        
        
        };
  
        const { error } =  await sendMail(message, data.selectCompany);
  
        if (error) throw new Error('User Email Send Process Failed!');
  
         return res.status(200).json({
          hasError: false,
          msg: "Email Successfully send",
          data: null,
        });

      } catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { refs: null },
        });
      }
    },
    changePdfStatus: async (req, res, next) => {
      try {
        const {token} = req.query; 
        // Verify the token
        const check = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!check) throw new Error("Token not found");
        let id;
        let action;
        if(check.acceptDataSet){
            id=check.acceptDataSet.id;
            action=check.acceptDataSet.action;
        }
        else{
            id=check.rejectDataSet.id;
            action=check.rejectDataSet.action
        }

        console.log("check_id", id);
          console.log("check_action", action);
      
      
          const quotation = await pdfModel.findOne({ _id:id });
          if (!quotation) throw new Error("Quotation not found");

          quotation.pdfStatus=action;
      
          const updateQuotation = await pdfModel.findByIdAndUpdate( { _id:id  },
              quotation,
              { new: true });
              if (!updateQuotation) throw new Error("Quotation not update");

return res.status(200).json({
  hasError: false,
  msg: "",
  data: null
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error,
          data: { quotation: null },
        });
      }
    },

  //   resetPassword: async (req, res, next) => {
  //     try {
  //         const { email } = req.body;

  //         const user = await userModel.findOne({ email: email });
  //         if (!user) throw new Error("User not found!");

  //         const resetToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
  //         let hostName = process.env.NODE_ENV === 'development' ? 'localhost:5001' : req.get('host');
  //         let baseUrl = `${req.protocol}://${hostName}`;
  //         const resetLink = `${baseUrl}/changePassword/${resetToken}`;

  //         const mailOptions = {
  //             from: process.env.SMTP_USER,
  //             to: email,
  //             subject: 'Password Reset',
  //             text: `Click the following button to reset your password: ${resetLink}`,
  //             html: `
  //             <div style="text-align: center">
  //             <div style="background-color: #151718; width:98vw; height:100px; display: flex; justify-content: center;align-items: center;">
  //             <img src="${baseUrl}/logoWithName.svg" alt="Force Edge"/>
  //             </div>
                
  //               <p>Click the following link to reset your password:</p>
  //               <a href="${resetLink}" style="
  //                 display: inline-block;
  //                 padding: 10px 20px;
  //                 font-size: 16px;
  //                 color: silver;
  //                 background-color: #151718;
  //                 text-decoration: none;
  //                 border-radius: 25px;
  //               ">Reset Password</a>
  //             </div>
  //           `,
  //         };

  //         const { error } = await sendEmail(mailOptions);
  //         if (error) throw new Error('Reset Password Email Send Process Failed!');

  //         return res.status(200).json({
  //             hasError: false,
  //             msg: 'Reset Email Sent',
  //             data: null
  //         });
  //     } catch (error) {
  //         next(error);
  //     }
  // }

  // ///////////////////////////////////////////////
//   dashboardData: async (req, res, next) => {
//     try {
//           const {currentPage, sortValue, company,role, userId} = req.query; 
//           const searchQuery = '';
//           const page = currentPage || 1;
//           const limit = 10;
//           const skip = (page - 1) * limit;

//           const filterBy = sortValue;
    
//           const options = [
//             { $skip: skip }, // Pagination skip
//             { $limit: limit },
//           ];

//         // Get the current date
// const currentDate = new Date();
// const currentYear = currentDate.getFullYear();
// const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
// const currentDay = currentDate.getDate();
// const currentWeek = Math.ceil((currentDay + (new Date(currentYear, currentMonth - 1, 1).getDay())) / 7); // Calculate ISO week

// let dateFilter = {};

// // Assuming you are comparing the "quotationDate" field in the format "YYYY-MM-DD"
// const quotationDate = "2024-12-18"; // Example date

// // Filter by Day (e.g., "2024-12-18")
// if (filterBy === "day") {
// const [year, month, day] = quotationDate.split("-").map(Number);

// dateFilter = {
//   $expr: {
//     $and: [
//       { $eq: [{ $year: "$quotationDate" }, currentYear] },
//       { $eq: [{ $month: "$quotationDate" }, currentMonth] },
//       { $eq: [{ $dayOfMonth: "$quotationDate" }, currentDay] },
//     ],
//   },
// };
// }

// // Filter by Week (ISO Week)
// else if (filterBy === "week") {
// const [year, month, day] = quotationDate.split("-").map(Number);
// const date = new Date(currentYear, currentMonth - 1, currentDay);
// const weekOfYear = Math.ceil((date.getDate() + (new Date(currentYear, currentMonth - 1, 1).getDay())) / 7);

// dateFilter = {
//   $expr: {
//     $and: [
//       { $eq: [{ $year: "$quotationDate" }, currentYear] },
//       { $eq: [{ $isoWeek: "$quotationDate" }, weekOfYear] }, // Use $isoWeek for ISO week calculation
//     ],
//   },
// };
// }

// // Filter by Month (e.g., December 2024)
// else if (filterBy === "month") {
// const [year, month] = quotationDate.split("-").map(Number);

// dateFilter = {
//   $expr: {
//     $and: [
//       { $eq: [{ $year: "$quotationDate" }, currentYear] },
//       { $eq: [{ $month: "$quotationDate" }, currentMonth] },
//     ],
//   },
// };
// }

         
          

// let matchOptions ='';

// if(role === "admin"){
// matchOptions = {selectCompany:company}
// }else{
// matchOptions = {selectCompany:company, userId:userId, notify:'false'}
// }

    
//           const pdfs = await pdfModel.aggregate([
//             {
//               $match: {
//                 ...matchOptions,
//                 ...dateFilter,
//               },
//             },
//             {
//               $facet: {
//                 pdfs: [],
//                 limitedPdfs:options,
//                 totalCount: [
//                   { $count: "count" }, // Count the total number of documents matching the filter
//                 ],
//               },
//             },
//           ]);

//           let statusCount={
//             pending:0,
//             approved:0,
//             rejected:0, 
//           }

//           pdfs[0]?.pdfs.map((pdf)=>{
//             if(pdf.pdfStatus === "pending"){
//               statusCount.pending = statusCount.pending + 1
//             }
//             else if(pdf.pdfStatus === "approved"){
//               statusCount.approved = statusCount.approved + 1
//             }
//            else {
//             statusCount.rejected = statusCount.rejected + 1

//             }

//           })
          
//           const pdfList = pdfs[0]?.limitedPdfs || [];
//           const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
//           const pdfCount = Math.ceil(totalDocuments / limit);
    
//           if (!pdfs) throw new Error("Pdfs not found");
    
//           return res.status(200).json({
//             hasError: false,
//             msg: "All Pdfs Successfully Finded",
//             data: { pdfs: pdfList, pages :pdfCount, cardData:statusCount, total:totalDocuments },
//           });
//         } catch (error) {
//           return res.status(200).json({
//             hasError: true,
//             msg: error.message,
//             data: { pdfs: null },
//           });
//         }
//   },
    
  };
  