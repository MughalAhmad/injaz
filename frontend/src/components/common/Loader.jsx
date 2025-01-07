import logo from "../../../public/Injaz/page3Logo.png";


export const Loader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-gray-200 bg-opacity-70 absolute z-[1000]">
      <div className="w-48 h-16 flex justify-center items-center relative ">
        <img src={logo} alt="none"/>
    </div>
    </div>
  );
}

export const BackDropLoader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-gray-200 bg-opacity-70 absolute z-[1000]">
    <div className="w-48 h-16 flex justify-center items-center relative ">
      <img src={logo} alt="none"/>
  </div>
  </div>
  );
}

export const FallbackLoader = () => {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-gray-200 bg-opacity-70 absolute z-[1000]">
    <div className="w-48 h-16 flex justify-center items-center relative ">
      <img src={logo} alt="none"/>
  </div>
  </div>
  );
}
