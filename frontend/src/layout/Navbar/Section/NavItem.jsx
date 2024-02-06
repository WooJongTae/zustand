import React from "react";
import useStore from "../../../store/store";
import { Link } from "react-router-dom";

const NavItem = ({ mobile }) => {
  const { initialState, userLogout } = useStore();
  const { isAuth } = initialState;

  const routes = [
    { to: "login", name: "로그인", auth: false },
    { to: "register", name: "회원가입", auth: false },
    { to: "logout", name: "로그아웃", auth: true },
    { to: "subscribe", name: "나의 추천", auth: true },
    { to: "search", name: "검색", auth: true },
  ];

  const handleLogout = () => {
    userLogout();
  };
  return (
    <ul
      className={`flex justify-center w-full gap-4 ${
        mobile && " flex-col bg-gray-900 h-full"
      } items-center`}
    >
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null;

        if (name === "로그아웃") {
          return (
            <li key={name} className="py-2 text-center cursor-pointer">
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else {
          return (
            <li key={name} className="py-2 text-center cursor-pointer">
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItem;
