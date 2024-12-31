import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink, PDFViewer, Font } from '@react-pdf/renderer';
import moment from 'moment'

Font.register({
  family: 'CustomFont',
  src: '/font/Poppins/Poppins-Bold.ttf',
  fontWeight: '600'
});

Font.register({
  family: 'CustomFont500',
  src: '/font/Poppins/Poppins-Medium.ttf',
  fontWeight: '500'
});

Font.register({
  family: 'CustomFont400',
  src: '/font/Poppins/Poppins-Regular.ttf',
  fontWeight: '400'
});
Font.register({
  family: 'CustomFont600',
  src: '/font/Poppins/Poppins-SemiBold.ttf',
  fontWeight: '600'
});

// Create styles
const styles = StyleSheet.create({
  // global
  logo:{
    width:'92.91px',
    height:'30.93',
    marginTop:20,
    marginLeft:40
  },
  header: {
    width:'100vw',
    position: 'absolute',
    top:0,
    left: 0,
    right: 0,
  },
  footer: {
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#373333',
    color:'white',
    paddingVertical:5
  },
  // image: {
  //   width: '100%',
    
  //   height: 'auto',
  // },
  fullPageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const imageSources = [
  '/png1.png',
  '/png.png',
  '/png2.png',
  '/png3.png',
  '/png4.png',
  '/png5.png',
  '/png6.png',
  '/png7.png',
  '/png8.png',
  '/png9.png',
  '/png10.png',
  '/png11.png',
  '/png12.png',
];

const setImg = (name)=>{
  if (name === 'Ajman') {
    return '/pngA.png';
  } else if (name === 'Sharjah') {
    return '/pngS.png';
  } else if (name === 'Dubai') {
    return '/pngD.png';
  }else if (name === 'Fujairah') {
    return '/pngF.png';
  }else if (name === 'RAK') {
    return '/pngR.png';
  }else if (name === 'Hamriya') {
    return '/pngH.png';
  }else if (name === 'Saif Zone') {
    return '/pngSZ.png';
  }else{
    return '/pngJ.png';
  }
}
// const formatDate = (date) => {
//   return new Intl.DateTimeFormat('en-GB', {
//     weekday: 'long', // Full day name (e.g., Friday)
//     day: '2-digit',  // Day with leading zero
//     month: 'long',   // Full month name (e.g., October)
//     year: 'numeric', // Full year
//   }).format(date);
// };

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
// Create Document Component
const MyDocument = ({
  data,checkBox
  ,state
}) => (
  <Document>
   

 {/* 2 Page test */}
    <Page size="A4" >
    <Image style={{width:"100%",height:'100%'}} src={setImg(data?.stateValue.split(" ")[0] || "/pngJ.png")} />
    </Page>

     {/* 3 Page test */}
     <Page size="A4" style={styles.page} >
      <View style={styles.header}>
      <Image src="/header.png" />
      </View>
      <View style={{display:'flex', flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
        <Image style={styles.logo} src="/page3Logo.png" />
        <Text style={{fontSize:'8px' ,fontFamily: 'CustomFont', color:'black',marginRight:"40px", marginTop:"20px"}}>{formatDate(new Date(data.quotationDate))}</Text>
      </View>

        <View style={{display:'flex', flexDirection:'row', justifyContent:"left", alignItems:'center', marginTop:"10px", marginHorizontal: 35,}}>
        <Text style={{fontSize:'8px' ,fontFamily: 'CustomFont', color:'black'}}>{`Proposal:    CAL/${currentYear}/${getLastDigits(data.clientPhone.split('-').pop())}`}</Text>

        <View style={{  display:"flex", flexDirection:"row", position:'absolute', justifyContent:"center", width:'88vw'}}>
        <Text style={{fontSize:"8px", textAlign:'center', fontFamily: 'CustomFont', paddingTop:'2px'}}>{data?.country || "empty"}</Text>
        <Image style={{width:23, height:16, marginRight:5, marginLeft:'7px' }} src={`/flags/${data?.flag.toLowerCase()}.png`} />
        </View>
        </View>


      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal: 35, marginTop:'15px',height:"50px"}}>
        <View style={{width:"10%", height:'100%'}}>
        <Text style={{fontSize:"11px", height:'50%', width:"100%" }}>Name:</Text>
        <Text style={{fontSize:"11px", height:'50%', width:"100%"}}>Ref:</Text>
        </View>

        <View style={{width:"40%", height:'100%'}}>
        <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"10px",marginTop:'2px', fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data?.clientName || "empty"}</Text>
        </View>
        <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"10px",marginTop:'2px', fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data.reference || "empty"}</Text>
        </View>
        </View>

        <View style={{ width:"10%", height:'100%'}}>
        <Text style={{fontSize:"11px", height:'50%', width:"100%" }}>Email:</Text>
        <Text style={{fontSize:"11px", height:'50%', width:"100%"}}>Contact:</Text>
        </View>

        <View style={{ width:"40%", height:'100%'}}>
          <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"10px", marginTop:'2px', fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data.clientEmail || "empty"}</Text>
        </View>
        <Text style={{fontSize:"10px", marginTop:'2px', height:'50%', width:"100%", fontFamily: 'CustomFont', color:'#C40014'}}>{`${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</Text>
        </View>
</View>

      <View style={{display:'flex', flexDirection:'row', marginTop:'5px', alignItems:'center', justifyContent:'center', marginHorizontal: 35}}>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"16px", fontFamily: 'CustomFont', color:'#C40014'}}>({data?.stateValue.split(" ")[0] || 'empty'})</Text>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"16px", fontFamily: 'CustomFont'}}>License Package including {data?.packageIncludingVisa || 0} Visa</Text>
      </View>

      <View style={{ marginTop: 5, marginHorizontal: 35, backgroundColor: '#D9D9D9AB', paddingVertical:'5px', paddingHorizontal:'10px' }}>
      <Text style={{ fontSize: "12px",fontFamily: 'CustomFont500' }}>
      Activity Code
      </Text>
      </View>
       
       <View style={{width:"100vw", minHeight:'100px', marginHorizontal: 35, display:'flex', flexDirection:"row", gap:5,}}>  
       <View style={{width:'43.6%', maxHeight:'100px'}}>

       {state.length >= 1 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[0]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[0]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%', color:'#C40014' }}>{state[0]?.approval}</Text>
        </View>)}

        {state.length >= 2 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
          <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
          <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[1]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[1]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%', color:'#C40014' }}>{state[1]?.approval}</Text>
        </View>)}

        {state.length >= 3 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
          <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
          <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[2]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[2]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%', color:'#C40014' }}>{state[2]?.approval}</Text>
        </View>)}

        {state.length >= 4 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
          <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
          <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[3]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[3]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%', color:'#C40014' }}>{state[3]?.approval}</Text>
        </View>)}
    
      </View>

      <View style={{width:'43.6%', maxHeight:'100px'}}>

       {state.length >= 5 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[4]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[4]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%',  color:'#C40014' }}>{state[4]?.approval}</Text>
        </View>)}

        {state.length >= 6 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
          <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
          <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[5]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[5]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%',  color:'#C40014' }}>{state[5]?.approval}</Text>
        </View>)}

        {state.length >= 7 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
          <Image style={{ width:'15px', height:'15px',marginTop:'-1px'}} src="/check.png" />
          <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', paddingLeft:5, width:'25%' }}>{state[6]?.code}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'65%' }}>{state[6]?.description}</Text>
        <Text style={{ fontSize: "8px", fontFamily:'CustomFont600', width:'15%',  color:'#C40014' }}>{state[6]?.approval}</Text>
        </View>)}
    
      </View>

      </View>

{/* step No 1 */}
      
      <View style={{ marginTop: 4,marginHorizontal: 35, paddingTop: 2, borderTop:"5px solid black"}}>
      <Text style={{ fontSize: "12px", fontFamily: 'CustomFont',  color: '#c40014', marginLeft: 15, marginTop: 10, }}>Step 1: License</Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal:6, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Description</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Conqueror Price</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Remarks</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>License Fee</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step1value.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}>{data?.step1Remarks}</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.step1Timeline}</Text>
      </View>


{/* step No 2 */}

<Text style={{ color: '#c40014', marginLeft: 50, marginTop: 3, fontSize: "12px", fontFamily: 'CustomFont',}}>Step 2: Immigration Card</Text>
      
      <View style={{ marginTop: 4, marginHorizontal: 35, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal:6, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Description</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Conqueror Price</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Remarks</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Pre-Approval Fee</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {Number(data?.step2ApprovalFee).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>One-Time</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>5-10 days</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Establishment Card</Text>
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.step2Establishment?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.step2EstablishmentIN?.toLocaleString() || "0.00"}
      </Text>
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}>{data?.step2EstablishmentRemark}</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.step2EstablishmentTimeline}</Text>
      </View>
      
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>E-Channel Card</Text>
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
        {/* AED {Number(data?.step2value1).toLocaleString() || "0.00"}  */}
      <Text style={{ fontSize: 8 }}>
        AED {data?.step2value1?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.step2value1IN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>


{/* step No 3 */}

<Text style={{ color: '#c40014', marginLeft: 50, marginTop:2, fontSize: "12px", fontFamily: 'CustomFont',}}>Step 3: Entry VISA</Text>
      
      <View style={{ marginTop: 4, marginHorizontal: 35, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal:6, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Description</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Conqueror Price</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Remarks</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Visa (Per Visa) Investor</Text>
      {/* <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step2value2a.toLocaleString() || "0.00"}</Text> */}
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.step2value2a?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.step2value2aIN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}>{data?.step3Renewable}</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.step3Timeline}</Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Visa (Per Visa) Employment</Text>
      {/* <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step2value2.toLocaleString() || "0.00"}</Text> */}
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.step2value2?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.step2value2IN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Status Change</Text>
      {/* <Text style={{ fontSize: "8px", width: '25%' }}>{`AED ${data?.step2value3.toLocaleString()}` || "Conditional"}</Text> */}
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.step2value3?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.step2value3IN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}>{data?.step3StatusChange}</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.step3TimelineStatusChange}</Text>
      </View>
      
       <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Medical Test (Per visa)</Text>
      {/* <Text style={{ fontSize: "8px", width: '25%' }}>{`AED ${data?.step2value3.toLocaleString()}` || "Conditional"}</Text> */}
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.medical?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.medicalIN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.medicalTimeline}</Text>
      </View>

      {/* //////////////// */}

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Emirates ID (Per Visa)</Text>
      {/* <Text style={{ fontSize: "8px", width: '25%' }}>{`AED ${data?.step2value3.toLocaleString()}` || "Conditional"}</Text> */}
      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED {data?.emiratesId?.toLocaleString() || "0.00"}
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.emiratesIdIN?.toLocaleString() || "0.00"}
      </Text>
      
      </View>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px'}}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>{data?.emiratesIdTimeline}</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>PRO Fees</Text>



      <View style={{ fontSize: "8px", width: '25%', display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 8 }}>
        AED 2500
      </Text>
      <Text style={{ fontSize: 8, marginRight:4}}>
        AED {data?.discount.toLocaleString() || "0.00"}
      </Text>
      </View>


      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ color: '#c40014', fontSize: "8px", fontFamily: 'CustomFont', width:'25%'}}>Total Step (1, 2, 3):</Text>

      <Text style={{ color:"#c40014" , fontSize: "8px", fontFamily: 'CustomFont', width: '25%', textAlign:"right", marginRight:5 }}>AED {(Number(data?.step1value) + Number(data?.step2EstablishmentIN) + Number(data?.step2value1IN) + Number(data?.step2value2aIN) + Number(data?.step2value2IN) + 2500 + Number(data?.medicalIN) + Number(data?.emiratesIdIN) ).toLocaleString() }</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>

      {/* Total  */}

      
      <View style={{ marginTop:"1px", marginHorizontal: 35, backgroundColor: '#D9D9D9AB', paddingVertical:'5px', paddingHorizontal:'10px', display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", fontWeight: 'CustomFont500', color: '#c40014', }}> PRO Fees {((2500 - Number(data?.discount)) / 2500) * 100}% AED {2500 - Number(data?.discount)}.00 will be discounted if you are Proceed within {moment(data?.date).format("YYYY-MM-DD") || "YYYY-MM-DD"}</Text>
      </View>


      <View style={{ marginTop: "1px", marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' , fontFamily:'CustomFont400' }}>Discount</Text>
      <Text style={{ fontSize: "8px", width: '75%', fontFamily:'CustomFont400' }}>AED {2500 - Number(data?.discount)}</Text>
      </View>
      <View style={{ marginTop: "5px", marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%', fontFamily:'CustomFont' }}>Grand Total</Text>
      <Text style={{ fontSize: "8px", width: '75%', fontFamily:'CustomFont' }}>AED {data?.gtAmount.toLocaleString() || "0.00"}</Text>
      </View>
      <View style={{ marginTop: '5px', marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%', fontFamily:'CustomFont400' }}>In Word:</Text>
      <Text style={{ fontSize: "8px", width: '75%', fontFamily:'CustomFont400' }}>{data?.word || "empty"}</Text>
      </View>



    
      <View style={styles.footer}>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:7 }} src="/mail.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>info@conqueror.ae</Text>
</View>


<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:9 }} src="/web.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>www.conqueror.ae</Text>
</View>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:7, height:10 }} src="/location.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>City Pharmacy Building, M02, Port Saeed, Dubai</Text>
</View>

</View>
    </Page>

    {/* 4 Page test */}
    <Page size="A4" >
    <View style={styles.header}>
      <Image src="/header.png" />
      </View>


      {/* <View> */}
        <Image style={styles.logo} src="/page3Logo.png" />
      {/* </View> */}


      <View style={{marginTop: 10, marginHorizontal: 35, backgroundColor: '#D9D9D9AB', paddingVertical:'5px', paddingHorizontal:'10px'}}>
      <Text style={{ fontSize:'12px', fontFamily: 'CustomFont500' }}>
      Full Package Inclusive
      </Text>
      </View>
       
       <View style={{width:"100vw", marginHorizontal: 35}}>


       {checkBox.map((item, index)=>(
          <View key={index} style={{display:'flex', flexDirection:'row', alignItems:'center' , marginTop: index === 0 ? '1px' : '5px', paddingLeft:10}}>
            <View style={{marginRight:7}}>
          <Image style={{ width:'7px', height:'7px'}} src="/check.png" />
          </View>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400', width:'54%'  }}>{checkBox[index]?.title}</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400', width:'18%' }}>{checkBox[index]?.value}</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400' }}>{checkBox[index]?.status === "0" ? 'NOT INCLUDED' : 'INCLUDED'}</Text>
            </View>
        ))}
      </View>

      {/* <View > */}
        <Image style={{ marginHorizontal: 35, marginTop:"13px"}} src="/pngLs1.png" />
      {/* </View> */}

      {/* <View> */}
        <Image style={{marginHorizontal: 35}} src="/pngLs2.png" />
      {/* </View> */}


    <View style={styles.footer}>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:7 }} src="/mail.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>info@conqueror.ae</Text>
</View>


<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:9 }} src="/web.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>www.conqueror.ae</Text>
</View>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:7, height:10 }} src="/location.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>City Pharmacy Building, M02, Port Saeed, Dubai</Text>
</View>

</View>

   


    </Page>


{/* 5 Page test */}
      <Page size="A4" style={styles.page}>
      <View style={styles.header}>
      <Image src="/header.png" />

      </View>

      <View>
        <Image style={styles.logo} src="/page3Logo.png" />
      </View>


      <View>
        <Image style={{marginHorizontal: 35, marginTop: 15,}} src="/pngLs3.png" />
      </View>




<Text style={{ color: '#c40014', marginLeft: 50, marginTop: 15, fontSize: '12px', fontFamily: 'CustomFont600',}}>NOTES</Text>
<View style={{ marginTop:"1px", marginHorizontal: 35, backgroundColor: '#D9D9D9AB', paddingVertical:'5px', paddingHorizontal:'10px' }}>
   <Text style={{ fontSize: "12px", fontFamily:'CustomFont400' }}>
      *If the Security / Pre-Approval is rejected from immigration, only the pre-approval fee will be deducted & the balance amount will be refunded.
   </Text>
</View>

     

<View style={{display:"flex", flexDirection:'row', marginHorizontal:30, gap:35, position: 'absolute',
    bottom: 60,
    }}>
<Text style={{fontSize:12}}>CLIENT: _________________________</Text>
<Text style={{fontSize:12}}> SIGNATURE: _________________________</Text>

</View>



      <View style={styles.footer}>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:7 }} src="/mail.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>info@conqueror.ae</Text>
</View>


<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:9, height:9 }} src="/web.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>www.conqueror.ae</Text>
</View>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:7, height:10 }} src="/location.png" />
</View>
<Text style={{ paddingLeft:5, paddingVertical:5, fontSize:12}}>City Pharmacy Building, M02, Port Saeed, Dubai</Text>
</View>


</View>
    </Page>
    
    {data.pdfLenght === 'full' && ( <><Page size="A4" >
    <Image src="/png1.png" />
    </Page>
    <Page size="A4" >
    <Image src="/png.png" />
    </Page>
     <Page size="A4">
    <Image src="/png2.png" />
    </Page>
     <Page size="A4">
    <Image src="/png3.png" />
    </Page>
     <Page size="A4">
    <Image src="/png4.png" />
    </Page>
     <Page size="A4">
    <Image src="/png5.png" />
    </Page>
     <Page size="A4">
    <Image src="/png6.png" />
    </Page>
     <Page size="A4">
    <Image src="/png7.png" />
    </Page>
     <Page size="A4">
    <Image src="/png8.png" />
    </Page>
     <Page size="A4">
    <Image src="/png9.png" />
    </Page>
     <Page size="A4">
    <Image src="/png10.png" />
    </Page> 
     <Page size="A4">
    <Image src="/png11.png" />
    </Page>
    </>)}
    <Page size="A4">
    <Image style={{width:"100%",height:'100%'}} src="/png12.png" />
    </Page>

    {/* {imageSources.map((src, index) => (
      <Page size="A4" key={index}>
        <Image style={styles.fullPageImage} src={src} />
      </Page>
    ))} */}
  </Document>
);
export default MyDocument;
// Component to trigger PDF download
// const GeneratePDF = ({
//   clientName,
//   clientPhone,
//   userName,
//   userPhone,
//   userEmail,
//   userWeb,
//   data,
//   checkBox,
//   state
// }) => (
//   <div>
//     <PDFDownloadLink document={<MyDocument 
//   clientName={clientName}
//   clientPhone={clientPhone}
//   userName={userName}
//   userPhone={userPhone}
//   userEmail={userEmail}
//   userWeb={userWeb}
//   data={data}
//   checkBox={checkBox}
//   state={state}
//  />} fileName="multi-page-sample.pdf">
//       {({ blob, url, loading, error }) =>
//         loading ? 'Generating PDF...' : 'Save PDF'
//       }
//     </PDFDownloadLink>
//   </div>
// );

// /////////////////////////////////////////////////////////////////////////////
// const GeneratePDF = ({
//   data,
//   checkBox,
//   // state,
//   handleStateBtn
// }) => {

//   const handleState = () =>{
//     setTimeout(() => {
//       handleStateBtn(false)
//     }, 3000);
//   }
//   return  (
//     <PDFViewer
//     onClick={handleState}
//       document={
//         <MyDocument
//           data={data}
//           checkBox={checkBox}
//           // state={state}
//         />
//       }
//       fileName="multi-page-sample.pdf"
//     >
//       {({ loading, error }) => {
//         if (error) {
//           console.error('PDF Generation Error:', error);
//           return 'Error generating PDF';
//         }
//         return loading ? 'Generating PDF...' : 'Save PDF';
//       }}
//     </PDFViewer>
// );

// }



// export default GeneratePDF;
