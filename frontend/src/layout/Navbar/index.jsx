import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Section/NavItem";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="fixed w-full z-10 text-white  ">
      <div className=" mt-4 ">
        <div className="block items-center justify-between  mx-0 sm:mx-5 lg:mx-60 sm:flex">
          <div className="flex items-center text-2xl sm:text-5xl font-bold h-14 text-red-600">
            <Link to={"/"} className="">
              NETFLEIX
            </Link>
          </div>
          {/* <div className="sm:hidden text-2xl">
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div> */}
          <div className="">
            {/* hidden sm:block */}
            <NavItem />
          </div>
        </div>

        {/* <div className="block sm:hidden">{menu && <NavItem mobile />}</div> */}
      </div>
    </section>
  );
};

export default Navbar;
