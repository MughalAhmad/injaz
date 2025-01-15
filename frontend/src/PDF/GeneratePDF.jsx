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
    width:'96px',
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
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'20px' }}><Text style={{marginTop:"21px", color:'#1e3b4f'}}>Date</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"40px", marginTop:"20px", color:'#1e3b4f'}}>{`: ${formatDate2(new Date(data.quotationDate))}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'2px', marginVertical:'3px' }}><Text style={{color:'#1e3b4f', paddingTop:'1px'}}>Proposal</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"40px", color:'#1e3b4f'}}>{`: CAL/${currentYear}/${getLastDigits(data.clientPhone.split('-').pop())}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'26px' }}><Text style={{ color:'#1e3b4f',  paddingTop:'1px'}}>Ref</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"40px", color:'#1e3b4f'}}>{`: ${data.reference || "empty"}`}</Text></View>
        </View>
      </View>

  
 <View style={{marginHorizontal: 35}}>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'11px' }}><Text style={{color:'#1e3b4f',marginTop:"8px",paddingTop:'1px'}}>Name</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', marginTop:"8px", color:'#1e3b4f'}}>{`: ${data?.clientName || "empty"}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'12px' }}><Text style={{color:'#1e3b4f', paddingTop:'1px'}}>Email</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', color:'#1e3b4f'}}>{`: ${data.clientEmail || "empty"}`}</Text></View>
        <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'3px' }}><Text style={{ color:'#1e3b4f',  paddingTop:'1px'}}>Contact</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500', color:'#1e3b4f'}}>{`: ${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</Text></View>
      <View style={{display:'flex', flexDirection:'row', fontSize:'10px', gap:'3px' }}><Text style={{ color:'#1e3b4f',  paddingTop:'1px'}}>Country</Text><Text style={{fontSize:'10px' ,fontFamily: 'CustomFont500',marginRight:"4px", color:'#1e3b4f'}}>{`: ${data?.country || "empty"}`}</Text><Image style={{width:15, height:10, paddingTop:'1px'}} src={`/flags/${data?.flag.toLowerCase()}.png`} /></View>

        </View>

      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal: 35}}>
        <View style={{backgroundColor:'#FFFAEB', display:'flex', flexDirection:'row', gap:'3px',borderRadius:'100%', alignItems:'center', paddingHorizontal:"5px"  }}>
        <Text style={{backgroundColor:'#F79009', height:'6px', width:'6px', borderRadius:'100%',color:'#F79009'}}>.</Text>
      <Text style={{ paddingLeft:5, fontSize:"12px", fontFamily: 'CustomFont500', color:'#B54708', }}>{data?.stateValue.split(" ")[0] || 'empty'}</Text>
      </View>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"16px", fontFamily: 'CustomFont500'}}>License Package including {data?.packageIncludingVisa || 0} Visa</Text>
      </View>

      <View style={{ marginTop: 5, marginHorizontal: 35, backgroundColor: '#F9FAFB', paddingVertical:'5px',display:"flex",flexDirection:'row' }}>
      <Text style={{ fontSize: "8px",   fontFamily:'CustomFont500', width:'15%' }}>Activity Code</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'55%' }}>Description</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'10%' }}>Approval</Text>
      <Text style={{ fontSize: "8px", fontFamily:'CustomFont500', width:'17%'}}>Authority</Text>
      </View>

      <View style={{width:"100vw", marginHorizontal: 35, display:'flex', flexDirection:"row", gap:5,}}>  
       <View style={{width:'88%'}}>

        {state.map((item)=>(
          <View style={{display:'flex', flexDirection:'row',marginTop:5}}>
        <Image style={{ width:'10px', height:'10px',marginRight:2}} src="/check.png" />
        <Text style={{ fontSize: "7px", fontFamily:'CustomFont500', width:'13%' ,textAlign:'left' }}>{item.code}</Text>
        <Text style={{ fontSize: "7px", fontFamily:'CustomFont500', width:'56%' ,textAlign:'left'}}>{item.description}</Text>
        <Text style={{ fontSize: "7px", fontFamily:'CustomFont500', width:'10%' ,textAlign:'left',paddingLeft:"6px"}}>{item.approval}</Text>
        <Text style={{ fontSize: "7px", fontFamily:'CustomFont500', width:'22%' ,textAlign:'left',paddingLeft:"7px"}}>{item.authority}</Text>
        </View>
        ))}
     
      </View>

      </View>

{/* step No 1 */}

      
      <View style={{ marginTop: 5,marginHorizontal: 35, borderTop:"2px solid black"}}>
      <Image style={{width:90, height:'auto', marginTop:6}} src="/step1.png" />
      </View>


      <View style={{ marginTop: 2, marginHorizontal: 35, backgroundColor: '#EDFCF2', paddingVertical: 7, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "9px", width: '20%', fontFamily: 'CustomFont500' }}>Description</Text>
      <Text style={{ fontSize: "9px", width: '18%', fontFamily: 'CustomFont500'}}>Conqueror Price</Text>
      <Text style={{ fontSize: "9px", width: '12%', fontFamily: 'CustomFont500'}}>Price AED</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500' }}>Remarks</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500'}}>Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>License Fee</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#F04438'}}>AED {data?.step1value.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%', color:'#667085'}}>{data?.step1value.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px',color:'#F04438'}}>{data?.step1Remarks}</Text>
      <Text style={{ fontSize: "8px", width: '25%', color:'#667085'}}>{data?.step1Timeline}</Text>
      </View>


{/* step No 2 */}
      <Image style={{width:120, height:'auto', marginTop: 17, marginLeft: 35,}} src="/step2.png" />
      
      <View style={{ marginTop:2, marginHorizontal: 35, backgroundColor: '#F9F5FF', paddingVertical: 7, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "9px", width: '20%', fontFamily: 'CustomFont500' }}>Description</Text>
      <Text style={{ fontSize: "9px", width: '18%', fontFamily: 'CustomFont500'}}>Conqueror Price</Text>
      <Text style={{ fontSize: "9px", width: '12%', fontFamily: 'CustomFont500'}}>Price AED</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500' }}>Remarks</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500'}}>Timeline</Text>
      </View>
      

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Pre-Approval Fee</Text>    
      <Text style={{ fontSize: "8px", width: '18%', color:'#667085'}}>AED {Number(data?.step2ApprovalFee).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%', color:'#667085'}}>-</Text>
      <Text style={{ fontSize: "8px", width: '25%' , color:'#667085'}}>One-Time</Text>
      <Text style={{ fontSize: "8px", width: '25%', color:'#667085'}}>5-10 days</Text>
      </View>




      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Establishment Card</Text>
      <Text style={{ fontSize: "8px", width: '18%', color:'#667085'}}>AED {Number(data?.step2Establishment).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#F04438',}}>{Number(data?.step2EstablishmentIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px', color: '#F04438'}}>{data?.step2EstablishmentRemark}</Text>
      <Text style={{ fontSize: "8px", width: '25%', color:'#667085'}}>{data?.step2EstablishmentTimeline}</Text>
      </View>


      
      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>E-Channel Card</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}>AED {Number(data?.step2value1).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#F04438',}}>{Number(data?.step2value1IN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px', color:'#F04438'}}></Text>
      <Text style={{ fontSize: "8px", width: '25%', color:"#667085"}}></Text>
      </View>


{/* step No 3 */}
<Image style={{width:100, height:'auto', marginTop: 17, marginLeft: 35,}} src="/step3.png" />

      <View style={{ marginTop: 2, marginHorizontal: 35, backgroundColor: '#FDF2FA', paddingVertical: 7, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "9px", width: '20%', fontFamily: 'CustomFont500' }}>Description</Text>
      <Text style={{ fontSize: "9px", width: '18%', fontFamily: 'CustomFont500'}}>Conqueror Price</Text>
      <Text style={{ fontSize: "9px", width: '12%', fontFamily: 'CustomFont500'}}>Price AED</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500' }}>Remarks</Text>
      <Text style={{ fontSize: "9px", width: '25%', fontFamily: 'CustomFont500'}}>Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Visa (Per Visa) Investor</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}>AED {Number(data?.step2value2a).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#667085',}}>{Number(data?.step2value2aIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px', color:"#667085"}}>{data?.step3Renewable}</Text>
      <Text style={{ fontSize: "8px", width: '25%',color:"#667085"}}>{data?.step3Timeline}</Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Visa (Per Visa) Employment</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}>AED {Number(data?.step2value2).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#667085',}}>{Number(data?.step2value2IN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px',color:"#667085"}}></Text>
      <Text style={{ fontSize: "8px", width: '25%',color:"#667085"}}></Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%'  ,backgroundColor:'#f8c6ab', color:"#F04438"}}>Status Change</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#F04438',backgroundColor:'#f8c6ab',}}>Conditional</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#F04438',backgroundColor:'#f8c6ab',}}>{data?.step2value3IN?.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px',backgroundColor:'#f8c6ab',color:"#667085"}}>{data?.step3StatusChange}</Text>
      <Text style={{ fontSize: "8px", width: '25%',backgroundColor:'#f8c6ab',color:"#667085"}}>{data?.step3TimelineStatusChange}</Text>
      </View>
      
       <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Medical Test (Per visa)</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}>AED {Number(data?.medical).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#667085',}}>{Number(data?.medicalIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px', color:"#667085"}}></Text>
      <Text style={{ fontSize: "8px", width: '25%', color:"#667085"}}>{data?.medicalTimeline}</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>Emirates ID (Per Visa)</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}>AED {Number(data?.emiratesId).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#667085',}}>{Number(data?.emiratesIdIN).toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' ,paddingRight:'3px',color:"#667085"}}></Text>
      <Text style={{ fontSize: "8px", width: '25%', color:"#667085"}}>{data?.emiratesIdTimeline}</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '20%' }}>PRO Fees</Text>
      <Text style={{ fontSize: "8px", width: '18%',color:'#667085',}}></Text>
      <Text style={{ fontSize: "8px", width: '12%',color:'#667085',}}>AED 2500</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, display:'flex', flexDirection:'row',gap:'5px' }}>


        <View  style={{width:'53%',backgroundColor:'#FFFCF5', borderRadius:'3px' }}>

        <View style={{display:'flex',flexDirection:'row', gap:'10px', paddingTop:6}}>

          <View style={{width:'80%',display:"flex", flexDirection:'column', fontSize:'10px', fontFamily:"CustomFont600"}}>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end' }}> 
            <Text>Total Step (</Text>
            <Text style={{color:'#39A0FF'}}>1</Text>
            <Text>,</Text>

            <Text style={{color:'#623AA2'}}>2</Text>
            <Text>,</Text>

            <Text style={{color:'#FD6585'}}>3</Text>
            <Text>):</Text>

           </View>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end' }}>
            <Text style={{ color:'#F79009'}}>Discount</Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end' }}>
            <Text>Grand Total</Text>
            </View>
          </View>

          <View style={{width:'20%',textAlign:'left', fontSize:'8px'}}>
          <Text style={{height:'15px',paddingTop:3}}>{(Number(data?.step1value) + Number(data?.step2EstablishmentIN) + Number(data?.step2value1IN) + Number(data?.step2value2aIN) + Number(data?.step2value2IN) + 2500 + Number(data?.medicalIN) + Number(data?.emiratesIdIN) ).toLocaleString() } AED</Text>
          <Text style={{height:'15px',paddingTop:3,color:'#F79009'}}>{2500 - Number(data?.discount)} AED</Text>
          <Text style={{height:'16px',paddingTop:1, fontFamily:"CustomFont600"}}>{data?.gtAmount.toLocaleString() || "0.00"} AED</Text>
          </View>
        </View>

        <View style={{display:'flex', flexDirection:'row', alignItems:'center', padding:6, fontSize:8,}}>
        <Text style={{fontFamily:"CustomFont600"}}>In Words: </Text>
        <Text>{data?.word || "empty"}</Text>
        </View>
        </View>

        <View  style={{width:'47%',backgroundColor:'#F9FAFB', borderRadius:'3px',fontSize:8, paddingHorizontal:'5px',  }}>
<Text style={{paddingVertical:'8px', color:'#F79009'}}>Limited-Time Offer: Save {((2500 - Number(data?.discount)) / 2500) * 100}% on PRO Fees!</Text>
<Text style={{lineHeight:'1.5px'}}>Enjoy an {((2500 - Number(data?.discount)) / 2500) * 100}% discount on PRO fees if you proceed by {formatDate2(new Date(data?.date))}! Don’t miss this limited-time opportunity to save big on your application.</Text>
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




      <Image style={{width:110, height:'auto', marginTop:10, marginLeft: 35,}} src="/package.png" />

      <View style={{marginTop: 3, marginHorizontal: 35,width:"100vw", backgroundColor: '#FDF2FA', paddingVertical:'5px', paddingHorizontal:'10px',display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Text style={{ fontSize:'12px', fontFamily: 'CustomFont500',width:'54%' }}>Description</Text>
            <Text style={{ fontSize: '12px', fontFamily:'CustomFont500', width:'18%', paddingLeft:22}}>Quantity</Text>
            <Text style={{ fontSize: '12px', fontFamily:'CustomFont500', paddingLeft:23 }}>Remarks</Text>

      </View>
       
       <View style={{width:"100vw", marginHorizontal: 35}}>


       {checkBox.map((item, index)=>(
          <View key={index} style={{display:'flex', flexDirection:'row', alignItems:'center' , marginTop: index === 0 ? '1px' : '5px', paddingLeft:10, color:item.status==='1' ? 'red' : 'black',}}>
            <View style={{marginRight:7}}>
            {checkBox[index]?.status === "0" ? <Image style={{ width:'12px', height:'12px'}} src="/f_uncheck.png" /> : <Image style={{ width:'12px', height:'12px', padding:'0.5px'}} src="/f_check.png" />}
          </View>
            <Text style={{ fontSize: '10px', fontFamily:'CustomFont400', width:'54%'  }}>{checkBox[index]?.title}</Text>
            <Text style={{ fontSize: '10px', fontFamily:'CustomFont400', width:'18%' }}>{checkBox[index]?.value}</Text>
            <Text style={{ fontSize: '10px', fontFamily:'CustomFont400' }}>{checkBox[index]?.status === "0" ? 'NOT INCLUDED' : 'INCLUDED'}</Text>
            </View>
        ))}
      </View>

        <Image style={{ marginHorizontal: 35, marginTop:20}} src="/page2Bottom.png" />


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
        <Image style={{marginHorizontal: 35, marginTop: 15,}} src="/page3top.png" />
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
