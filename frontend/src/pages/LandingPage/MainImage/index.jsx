import React from "react";

const MainImage = ({ imagePath, title, sub }) => {
  return (
    <div className=" w-full relative h-auto bg-cover bg-center">
      <img src={imagePath} alt="반갑" className=" h-[28rem] w-full" />
      <div className=" absolute bottom-10 left-3 text-white">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
    </div>
  );
};

export default MainImage;
