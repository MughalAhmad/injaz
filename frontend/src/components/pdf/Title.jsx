import React from "react";

const Title = ({ titleType = "title" || "subtitle", title = "title", style  }) => {
  return (
    <>
      {titleType === "title" ? (
        <div className={`text-xl font-bold`} style={style}>{title}</div>
      ) : (
        <div className="min-w-32 text-xl font-bold lg:max-w-48"style={style}>{title}</div>
      )}
    </>
  );
};

export default Title;
