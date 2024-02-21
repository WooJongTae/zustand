import React from "react";
import { Link } from "react-router-dom";

const Eroor = () => {
  return (
    <div className="flex items-center justify-center">
      <p>페이지 에러 발생</p>
      <Link to="/">
        <p>홈페이지로 이동</p>
      </Link>
    </div>
  );
};

export default Eroor;
