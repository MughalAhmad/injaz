// import logo from "./logo.png";



// export const SpinLoader = () => {
//   return (
//     <div className=" flex justify-center items-center   ">
//         <img src={logo} alt="none" className="w-40 my-3"/>
//     </div>
//   );
// }


export const Loader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-black absolute ">
      <div className="w-48 h-16 flex justify-center items-center relative ">
        {/* <img src={logo} alt="none"/> */}
        <h1 className="text-3xl text-red-400">hello</h1>

    </div>
    </div>
  );
}

export const BackDropLoader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-black absolute ">
    <div className="w-48 h-16 flex justify-center items-center relative ">
      {/* <img src={logo} alt="none"/> */}
      <h1 className="text-3xl text-red-400">hello</h1>

  </div>
  </div>
  );
}

export const FallbackLoader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-black absolute ">
    <div className="w-48 h-16 flex justify-center items-center relative ">
      {/* <img src={logo} alt="none"/> */}
      <h1 className="text-3xl text-white">hello</h1>
      <h1 className="text-3xl text-red-400">hello</h1>

  </div>
  </div>
  );
}

// export const spinLoader = () => {
//   return (
//     <div className="w-[100%] h-screen flex justify-center items-center bg-black absolute ">
//     <div className="w-48 h-16 flex justify-center items-center relative ">
//       <img src={logo} alt="none"/>
//   </div>
//   </div>
//   );
// }