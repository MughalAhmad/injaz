import React from "react";

const Title = ({ titleType = "title" || "subtitle", title = "title", style  }) => {
  return (
    <>
      {titleType === "title" ? (
        <div className={`text-3xl font-bold`} style={style}>{title}</div>
      ) : (
        <div className="min-w-32 text-sm text-[#222A59] font-semibold lg:max-w-48"style={style}>{title}</div>
      )}
    </>
  );
};

export default Title;
