import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Section/NavItem";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="fixed w-full z-10 text-white bg-gray-900  ">
      <div className=" ">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          <div className="flex items-center text-2xl h-14 text-red-600">
            <Link to={"/"}>NETFLEIX</Link>
            <Link to={"/subscribe"}>나의 추천페이지</Link>
          </div>
          <div className="sm:hidden text-2xl">
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>
          <div className="hidden sm:block">
            <NavItem />
          </div>
        </div>

        <div className="block sm:hidden">{menu && <NavItem mobile />}</div>
      </div>
    </section>
  );
};

export default Navbar;
