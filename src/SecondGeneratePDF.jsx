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
  }else{
    return '/pngJ.png';
  }
}

// Create Document Component
const SecondMyDocument = ({
  data,checkBox
  ,state
}) => (
  <Document>
   

 {/* 2 Page test */}
    {/* <Page size="A4" >
    <Image style={{width:"100%",height:'100%'}} src={setImg(data?.stateValue || "/pngJ.png")} />
    </Page> */}

     {/* 3 Page test */}
     {/* <Page size="A4" style={styles.page} >
      <View style={styles.header}>
      <Image src="/header.png" />
      </View>
      <View>
        <Image style={styles.logo} src="/page3Logo.png" />

      </View>
      

      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal: 35, marginTop:'15px',height:"50px"}}>
        <View style={{width:"10%", height:'100%'}}>
        <Text style={{fontSize:"12px", height:'50%', width:"100%" }}>Name:</Text>
        <Text style={{fontSize:"12px", height:'50%', width:"100%"}}>Ref:</Text>
        </View>

        <View style={{width:"30%", height:'100%'}}>
        <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"12px", fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data?.clientName || "empty"}</Text>
        </View>
        <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"12px", fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data.reference || "empty"}</Text>
        </View>
        </View>

        <View style={{ width:"20%", height:'100%', display:"flex", flexDirection:"row"}}>
        <Text style={{fontSize:"12px", textAlign:'center', fontFamily: 'CustomFont'}}>{data?.country || "empty"}</Text>
        <Image style={{width:23, height:16, marginRight:5, marginLeft:3 }} src={`/flags/${data?.flag.toLowerCase()}.png`} />
        </View>

        <View style={{ width:"10%", height:'100%'}}>
        <Text style={{fontSize:"12px", height:'50%', width:"100%" }}>Email:</Text>
        <Text style={{fontSize:"12px", height:'50%', width:"100%"}}>Contact:</Text>
        </View>

        <View style={{ width:"30%", height:'100%'}}>
          <View style={{ height:'50%', width:"100%"}}>
        <Text style={{fontSize:"12px", fontFamily: 'CustomFont', color:'#C40014', position:"absolute", lineHeight:'1px', top:"-3px"}}>{data.clientEmail || "empty"}</Text>
        </View>
        <Text style={{fontSize:"12px", height:'50%', width:"100%", fontFamily: 'CustomFont', color:'#C40014'}}>{`${data.clientPhone.split('-')[1] || "none"}-${data.clientPhone.split('-')[2] || 'none'}`}</Text>
        </View>
</View>

        

      <View style={{display:'flex', flexDirection:'row', marginTop:'5px', alignItems:'center', justifyContent:'center', marginHorizontal: 35}}>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"16px", fontFamily: 'CustomFont', color:'#C40014'}}>({data?.stateValue || 'empty'})</Text>
      <Text style={{ paddingLeft:5, paddingVertical:5, fontSize:"16px", fontFamily: 'CustomFont'}}>License Package including 2 Visa</Text>
      </View>

      <View style={{ marginTop: 5, marginHorizontal: 35, backgroundColor: '#D9D9D9AB', paddingVertical:'5px', paddingHorizontal:'10px' }}>
      <Text style={{ fontSize: "12px",fontFamily: 'CustomFont500' }}>
      Activity Code
      </Text>
      </View>
       
       <View style={{width:"100vw", minHeight:'100px', marginHorizontal: 35, display:'flex', flexDirection:"row", gap:5,}}>  
       <View style={{width:'43.6%', maxHeight:'100px'}}>

       {state.length >= 1 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[0]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[0]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[0]?.approval}</Text>
        </View>)}

        {state.length >= 2 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[1]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[1]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[1]?.approval}</Text>
        </View>)}

        {state.length >= 3 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10Px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[2]?.code}</Text>
        <Text style={{ fontSize: "10Px", fontFamily:'CustomFont500', width:'65%' }}>{state[2]?.description}</Text>
        <Text style={{ fontSize: "10Px", fontFamily:'CustomFont500', width:'15%' }}>{state[2]?.approval}</Text>
        </View>)}

        {state.length >= 4 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[3]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[3]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[3]?.approval}</Text>
        </View>)}
    
      </View>

      <View style={{width:'43.6%', maxHeight:'100px'}}>

       {state.length >= 5 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[4]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[4]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[4]?.approval}</Text>
        </View>)}

        {state.length >= 6 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[5]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[5]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[5]?.approval}</Text>
        </View>)}

        {state.length >= 7 && (<View style={{display:'flex', flexDirection:'row',marginTop:10, paddingLeft:10}}>
        <Image style={{ width:10, height:10, marginTop:1 }} src="/check.png" />
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', paddingLeft:5, width:'25%' }}>{state[6]?.code}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'65%' }}>{state[6]?.description}</Text>
        <Text style={{ fontSize: "10px", fontFamily:'CustomFont500', width:'15%' }}>{state[6]?.approval}</Text>
        </View>)}
    
      </View>

      </View>

      
      <View style={{ marginTop: 4,marginHorizontal: 35, paddingTop: 10, borderTop:"5px solid black"}}>
      <Text style={{ fontSize: "12px", fontFamily: 'CustomFont',  color: '#c40014', marginLeft: 15, marginTop: 10, }}>Step 1: License</Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal:6, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Description</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Conqueror Price</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Remarks</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}> License Fee</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}> AED {data?.step1value.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}> Government Fee</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}> 3-5 working days</Text>
      </View>


<Text style={{ color: '#c40014', marginLeft: 50, marginTop: 10, fontSize: "12px", fontFamily: 'CustomFont',}}>Step 2: Immigration Card</Text>
      
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
      <Text style={{ fontSize: "8px", width: '25%' }}>E-Channel Card</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {Number(data?.step2value1).toLocaleString() || "0.00"} </Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>Federal Immigration Fee</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Establishment Card</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step2Establishment.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>Renewable every year</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>2-3 working days after license</Text>
      </View>




<Text style={{ color: '#c40014', marginLeft: 50, marginTop: 10, fontSize: "12px", fontFamily: 'CustomFont',}}>Step 3: Entry VISA</Text>
      
      <View style={{ marginTop: 4, marginHorizontal: 35, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal:6, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Description</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Conqueror Price</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500' }}> Remarks</Text>
      <Text style={{ fontSize: "12px", width: '25%', fontFamily: 'CustomFont500'}}> Timeline</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>UID Generate (if required)</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>{data?.uid || "000-000-00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>Immiigration required UID Proof</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>2-3 days</Text>
      </View>
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Visa (Per Visa) Investor</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step2value2a.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>Renewable every 2 years</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>4-7 working days</Text>
      </View>
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Visa (Per Visa) Employment</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step2value2.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>


      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Status Change</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>{`AED ${data?.step2value3.toLocaleString()}` || "Conditional"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED 750-if you are in UAE</Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>During Application</Text>
      </View>
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Medical Test (Per Visa)</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step3Medical.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>1-2 working days after apply</Text>
      </View>
      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>Emirates ID (Per Visa)</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.step3EmiratesId.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}>3-5 working days after apply</Text>
      </View>

      <View style={{ marginTop: 4, marginHorizontal: 35, paddingHorizontal: 10, display:'flex', flexDirection:'row' }}>
      <Text style={{ fontSize: "8px", width: '25%' }}>PRO Fees</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}>AED {data?.discount.toLocaleString() || "0.00"}</Text>
      <Text style={{ fontSize: "8px", width: '25%' }}></Text>
      <Text style={{ fontSize: "8px", width: '25%'}}></Text>
      </View>


      <Text style={{ color: '#c40014', marginLeft: 50, marginTop: 10, fontSize: "12px", fontFamily: 'CustomFont',}}>Total Step (1, 2, 3):</Text>
      
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
    </Page> */}

    {/* 4 Page test */}
    {/* <Page size="A4" >
    <View style={styles.header}>
      <Image src="/header.png" />
      </View>


        <Image style={styles.logo} src="/page3Logo.png" />


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

        <Image style={{ marginHorizontal: 35, marginTop:"13px"}} src="/pngLs1.png" />

        <Image style={{marginHorizontal: 35}} src="/pngLs2.png" />


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

   


    </Page> */}


{/* 5 Page test */}
      {/* <Page size="A4" style={styles.page}>
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
    </Page> */}
    
    {/* {data.pdfLenght === 'full' && ( <><Page size="A4" >
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
    </Page> */}

    {/* {imageSources.map((src, index) => (
      <Page size="A4" key={index}>
        <Image style={styles.fullPageImage} src={src} />
      </Page>
    ))} */}
  </Document>
);
export default SecondMyDocument;
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
