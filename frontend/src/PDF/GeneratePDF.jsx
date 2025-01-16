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
    width:'138.71px',
    height:'40px',
    marginTop:20,
    marginLeft:16
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
    backgroundColor: '#C40014',
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


const formatDate2 = (date) => {
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  const dateParts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);

  const monthFull = dateParts.find(p => p.type === 'month').value;
const monthShort = monthFull.slice(0, 3); // Take the first three characters

  const formattedDate = `${monthShort} ` +
                        `${dateParts.find(p => p.type === 'day').value}, ` +
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
        <View style={{marginTop:8}}>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'20px' }}><Text style={{marginTop:"21px", color:'#182230'}}>Date</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"16px", marginTop:"20px", color:'#182230'}}>{`: ${formatDate2(new Date(data.quotationDate))}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'2px', marginVertical:'3px' }}><Text style={{color:'#182230', paddingTop:'1px'}}>Proposal</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"16px", color:'#182230'}}>{`: CAL/${currentYear}/${getLastDigits(data.clientPhone.split('-').pop())}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'26px' }}><Text style={{ color:'#182230',  paddingTop:'1px'}}>Ref</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"16px", color:'#182230'}}>{`: ${data.reference || "empty"}`}</Text></View>
        </View>
      </View>

  
 <View style={{marginHorizontal: 16}}>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'11px' }}><Text style={{color:'#182230',marginTop:"8px",paddingTop:'1px'}}>Name</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', marginTop:"8px", color:'#182230'}}>{`: ${data?.clientName || "empty"}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'12px' }}><Text style={{color:'#182230', paddingTop:'1px'}}>Email</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', color:'#182230'}}>{`: ${data.clientEmail || "empty"}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'3px' }}><Text style={{ color:'#182230',  paddingTop:'1px'}}>Contact</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', color:'#182230'}}>{`: ${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</Text></View>
      <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'3px' }}><Text style={{ color:'#182230',  paddingTop:'1px'}}>Country</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"4px", color:'#182230'}}>{`: ${data?.country || "empty"}`}</Text><Image style={{width:'18.96px', height:"10px", marginTop:'2px', borderRadius:'1px'}} src={`/flags/${data?.flag.toLowerCase()}.png`} /></View>

        </View>

      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal: 16}}>
        <View style={{backgroundColor:'#FFFAEB', display:'flex', flexDirection:'row', gap:'3px',borderRadius:'100%', alignItems:'center', paddingHorizontal:"5px"  }}>
        <Text style={{backgroundColor:'#F79009', height:'6px', width:'6px', borderRadius:'100%',color:'#F79009'}}>.</Text>
      <Text style={{ paddingLeft:5, fontSize:"12px", fontFamily: 'CustomFont400', color:'#B54708', }}>{data?.stateValue.split(" ")[0] || 'empty'}</Text>
      </View>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"15px", fontFamily: 'CustomFont500', color:'#c40014'}}>License Package including {data?.packageIncludingVisa || 0} Visa</Text>
      </View>

      <View style={{ marginTop: 5, marginHorizontal: 16, backgroundColor: '#F9FAFB', paddingVertical:'7px',display:"flex",flexDirection:'row' }}>
      <Text style={{ fontSize: "8px",   fontFamily:'CustomFont500', width:'15%', color:"#111928",paddingLeft:'7px' }}>Activity Code</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'55%', color:"#111928" }}>Description</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'10%', color:"#111928" }}>Approval</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'17%', color:"#111928"}}>Authority</Text>
      </View>

      <View style={{width:"100vw", marginHorizontal: 16, display:'flex', flexDirection:"row", gap:5,}}>  
       <View style={{width:'95%'}}>

        {state.map((item)=>(
          <View style={{display:'flex', flexDirection:'row',marginTop:5 ,marginLeft:'7px'}}>
        <Image style={{ width:'10px', height:'10px',marginRight:2, marginTop:'-2px' }} src="/check.png" />
        <Text style={{ fontSize: "7px", width:'13%' ,textAlign:'left',color:"#111928" }}>{item.code}</Text>
        <Text style={{ fontSize: "7px", width:'56%' ,textAlign:'left', color:'#667085', paddingLeft:'-5px'}}>{item.description}</Text>
        <Text style={{ fontSize: "7px", width:'10%' ,textAlign:'left',paddingLeft:"3px", color:'#667085'}}>{item.approval}</Text>
        <Text style={{ fontSize: "7px", width:'22%' ,textAlign:'left',paddingLeft:"4px", color:'#667085'}}>{item.authority}</Text>
        </View>
        ))}
     
      </View>

      </View>

{/* step No 1 */}

      
      <View style={{ marginTop: 5,marginHorizontal:16}}>
      <Image style={{width:90, height:'auto', marginTop:6}} src="/step1.png" />
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 16, backgroundColor: '#EDFCF2', paddingVertical: 7, display:'flex', flexDirection:'row',paddingLeft:'7px' }}>
      <Text style={{ fontSize: "8px", width: '20%', fontFamily: 'CustomFont500', color:"#111928"}}>Description</Text>
      <Text style={{ fontSize: "8px", width: '18%', fontFamily: 'CustomFont500', color:"#111928"}}>Conqueror Price</Text>
      <Text style={{ fontSize: "8px", width: '12%', fontFamily: 'CustomFont500', color:"#111928"}}>Price AED</Text>
      <Text style={{ fontSize: "8px", width: '29%', fontFamily: 'CustomFont500', color:"#111928" }}>Remarks</Text>
      <Text style={{ fontSize: "8px", width: '21%', fontFamily: 'CustomFont500', color:"#111928"}}>Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row',paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>License Fee</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#F04438'}}>{data?.step1value.toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%', color:'#667085'}}>{data?.step1value.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px',color:'#F04438'}}>{data?.step1Remarks}</Text>
      <Text style={{ fontSize: "7px", width: '21%', color:'#667085'}}>{data?.step1Timeline}</Text>
      </View>


{/* step No 2 */}
<View style={{ marginTop: 17,marginHorizontal:16}}>
      <Image style={{width:120, height:'16px'}} src="/step2.png" />
      </View>      
      <View style={{ marginTop:4, marginHorizontal: 16, backgroundColor: '#F9F5FF', paddingVertical: 7, display:'flex', flexDirection:'row', paddingLeft:"7px" }}>
      <Text style={{ fontSize: "8px", width: '20%', fontFamily: 'CustomFont500',color:"#111928" }}>Description</Text>
      <Text style={{ fontSize: "8px", width: '18%', fontFamily: 'CustomFont500', color:"#111928"}}>Conqueror Price</Text>
      <Text style={{ fontSize: "8px", width: '12%', fontFamily: 'CustomFont500', color:"#111928"}}>Price AED</Text>
      <Text style={{ fontSize: "8px", width: '29%', fontFamily: 'CustomFont500', color:"#111928" }}>Remarks</Text>
      <Text style={{ fontSize: "8px", width: '21%', fontFamily: 'CustomFont500', color:"#111928"}}>Timeline</Text>
      </View>
      

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:"7px" }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Pre-Approval Fee</Text>    
      <Text style={{ fontSize: "7px", width: '18%', color:'#667085'}}>{Number(data?.step2ApprovalFee).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%', color:'#667085'}}>-</Text>
      <Text style={{ fontSize: "7px", width: '29%' , color:'#667085'}}>One-Time</Text>
      <Text style={{ fontSize: "7px", width: '21%', color:'#667085'}}>5-10 days</Text>
      </View>




      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row',paddingLeft:"7px"  }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Establishment Card</Text>
      <Text style={{ fontSize: "7px", width: '18%', color:'#667085'}}>{Number(data?.step2Establishment).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#F04438',}}>{Number(data?.step2EstablishmentIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px', color: '#F04438'}}>{data?.step2EstablishmentRemark}</Text>
      <Text style={{ fontSize: "7px", width: '21%', color:'#667085'}}>{data?.step2EstablishmentTimeline}</Text>
      </View>


      
      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:"7px"  }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>E-Channel Card</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}>{Number(data?.step2value1).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#F04438',}}>{Number(data?.step2value1IN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px', color:'#F04438'}}></Text>
      <Text style={{ fontSize: "7px", width: '21%', color:"#667085"}}></Text>
      </View>


{/* step No 3 */}
<Image style={{width:100, height:'auto', marginTop: 17, marginLeft: 16,}} src="/step3.png" />

      <View style={{ marginTop: 4, marginHorizontal: 16, backgroundColor: '#FDF2FA', paddingVertical: 7, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "8px", width: '20%', fontFamily: 'CustomFont500', color:"#111928" }}>Description</Text>
      <Text style={{ fontSize: "8px", width: '18%', fontFamily: 'CustomFont500', color:"#111928"}}>Conqueror Price</Text>
      <Text style={{ fontSize: "8px", width: '12%', fontFamily: 'CustomFont500', color:"#111928"}}>Price AED</Text>
      <Text style={{ fontSize: "8px", width: '29%', fontFamily: 'CustomFont500', color:"#111928" }}>Remarks</Text>
      <Text style={{ fontSize: "8px", width: '21%', fontFamily: 'CustomFont500', color:"#111928"}}>Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Visa (Per Visa) Investor</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}>{Number(data?.step2value2a).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#667085',}}>{Number(data?.step2value2aIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px', color:"#667085"}}>{data?.step3Renewable}</Text>
      <Text style={{ fontSize: "7px", width: '21%',color:"#667085"}}>{data?.step3Timeline}</Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Visa (Per Visa) Employment</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}>{Number(data?.step2value2).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#667085',}}>{Number(data?.step2value2IN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px',color:"#667085"}}></Text>
      <Text style={{ fontSize: "7px", width: '21%',color:"#667085"}}></Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px', backgroundColor:'#fdead7', paddingVertical:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%'  , color:"#F04438"}}>Status Change</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#F04438',}}>Conditional</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#F04438',}}>{data?.step2value3IN?.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px',color:"#667085"}}>{data?.step3StatusChange}</Text>
      <Text style={{ fontSize: "7px", width: '21%',color:"#667085"}}>{data?.step3TimelineStatusChange}</Text>
      </View>
      
       <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Medical Test (Per visa)</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}>{Number(data?.medical).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#667085',}}>{Number(data?.medicalIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px', color:"#667085"}}></Text>
      <Text style={{ fontSize: "7px", width: '21%', color:"#667085"}}>{data?.medicalTimeline}</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>Emirates ID (Per Visa)</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}>{Number(data?.emiratesId).toLocaleString() || "0.00"} AED</Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#667085',}}>{Number(data?.emiratesIdIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "7px", width: '29%' ,paddingRight:'3px',color:"#667085"}}></Text>
      <Text style={{ fontSize: "7px", width: '21%', color:"#667085"}}>{data?.emiratesIdTimeline}</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row', paddingLeft:'7px' }}>
      <Text style={{ fontSize: "7px", width: '20%' }}>PRO Fees</Text>
      <Text style={{ fontSize: "7px", width: '18%',color:'#667085',}}></Text>
      <Text style={{ fontSize: "7px", width: '12%',color:'#667085',}}>2500 AED</Text>
      <Text style={{ fontSize: "7px", width: '29%' }}></Text>
      <Text style={{ fontSize: "7px", width: '21%'}}></Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 16, display:'flex', flexDirection:'row',gap:'7px' }}>


        <View  style={{width:'53%',backgroundColor:'#FFFCF5', borderRadius:'4px' }}>

        <View style={{display:'flex',flexDirection:'row', gap:'10px', paddingTop:7}}>

          <View style={{width:'80%',display:"flex", flexDirection:'column', fontSize:'10px', fontFamily:"CustomFont500"}}>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end' }}> 
            <Text style={{color:'#414651'}}>Total Step (</Text>
            <Text style={{color:'#39A0FF'}}>1</Text>
            <Text>,</Text>

            <Text style={{color:'#623AA2'}}>2</Text>
            <Text>,</Text>

            <Text style={{color:'#FD6585'}}>3</Text>
            <Text style={{color:'#414651'}}>):</Text>

           </View>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end' }}>
            <Text style={{ color:'#F79009'}}>Discount</Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',fontFamily:"CustomFont600" }}>
            <Text style={{color:"#111928"}}>Grand Total</Text>
            </View>
          </View>

          <View style={{width:'20%',textAlign:'left', fontSize:'8px'}}>
          <Text style={{height:'15px',paddingTop:3 , color:'#667085'}}>{(Number(data?.step1value) + Number(data?.step2EstablishmentIN) + Number(data?.step2value1IN) + Number(data?.step2value2aIN) + Number(data?.step2value2IN) + 2500 + Number(data?.medicalIN) + Number(data?.emiratesIdIN) ).toLocaleString() } AED</Text>
          <Text style={{height:'15px',paddingTop:3,color:'#F79009'}}>{2500 - Number(data?.discount)} AED</Text>
          <Text style={{height:'16px',paddingTop:1, fontFamily:"CustomFont600", color:"#111928"}}>{data?.gtAmount.toLocaleString() || "0.00"} AED</Text>
          </View>
        </View>

        <View style={{display:'flex', flexDirection:'row', alignItems:'center', padding:9, fontSize:8,}}>
        <Text style={{fontFamily:"CustomFont600", color:"#111928"}}>In Words: </Text>
        <Text style={{color:'#667085'}}>{data?.word || "empty"}</Text>
        </View>
        </View>

        <View  style={{width:'47%',backgroundColor:'#F9FAFB', borderRadius:'4px',fontSize:8, paddingHorizontal:'9px',  }}>
<Text style={{paddingVertical:'7px', color:'#F79009', fontFamily:"CustomFont400"}}>Limited-Time Offer: Save {((2500 - Number(data?.discount)) / 2500) * 100}% on PRO Fees!</Text>
<Text style={{lineHeight:'1.5px',color:'#667085', paddingRight:4}}>Enjoy an {((2500 - Number(data?.discount)) / 2500) * 100}% discount on PRO fees if you proceed by {formatDate2(new Date(data?.date))}! Don’t miss this limited-time opportunity to save big on your application.</Text>
        </View>
      </View>

      <View style={styles.footer}>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:10, height:9 }} src="/MailC.png" />
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
        <Image style={styles.logo} src="/page3Logo.png" />



      <View style={{ marginTop: 16,marginHorizontal:16}}>
      <Image style={{width:120, height:'16px'}} src="/package.png" />
      </View>  


      <View style={{marginTop: 4, marginHorizontal: 16,width:"94vw", backgroundColor: '#FDF2FA', paddingVertical:'5px', paddingHorizontal:'10px',display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Text style={{ fontSize: '8px', fontFamily: 'CustomFont500',width:'60%', color:"#111928" }}>Description</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont500', width:'20%', paddingLeft:22,  color:"#111928"}}>Quantity</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont500', paddingLeft:23,  color:"#111928" }}>Remarks</Text>

      </View>
       
       <View style={{width:"94vw", marginHorizontal: 16}}>


       {checkBox.map((item, index)=>(
          <View key={index} style={{display:'flex', flexDirection:'row', alignItems:'center' , marginTop: index === 0 ? '5px' : '9px', paddingLeft:10}}>
            <View style={{marginRight:7}}>
            {checkBox[index]?.status === "0" ? <Image style={{ width:'8px', height:'8px'}} src="/f_uncheck.png" /> : <Image style={{ width:'8px', height:'8px', padding:'0.5px'}} src="/f_check.png" />}
          </View>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400', width:'60%',color:item.status==='1' ? '#B42318' : '#111928',  }}>{checkBox[index]?.title}</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400', width:'20%', color:item.status==='1' ? '#B42318' : '#717680', }}>{checkBox[index]?.value}</Text>
            <Text style={{ fontSize: '8px', fontFamily:'CustomFont400', color:item.status==='1' ? '#B42318' : '#717680', }}>{checkBox[index]?.status === "0" ? 'NOT INCLUDED' : 'INCLUDED'}</Text>
            </View>
        ))}
      </View>

        <Image style={{ marginHorizontal: 16, marginTop:15}} src="/page2Bottom.png" />


    <View style={styles.footer}>

<View style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
<View style={{width:17, height:17, backgroundColor:'white', borderRadius:'100px', display:'flex', justifyContent:'center', alignItems:'center' }}>
<Image style={{width:10, height:9 }} src="/MailC.png" />
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
        <Image style={{marginHorizontal: 16, marginTop: 15,}} src="/page3top.png" />
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
<Image style={{width:10, height:9 }} src="/MailC.png" />
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
    <Page size="A4">
    <Image style={{width:"100%",height:'100%'}} src="/png12.png" />
    </Page>
    </>)}
    {/* <Page size="A4">
    <Image style={{width:"100%",height:'100%'}} src="/png12.png" />
    </Page> */}

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
