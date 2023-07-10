import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import { useGlobalContext } from "../Context";

function Navbar() {
  const { session,logout } = useGlobalContext();
  const inActive = `text-[1.8rem] text-slate-900 font-bold mr-4 sm:mr-8`;
  const active = `${inActive} font-extrabold`;

  if (!session) {
    return (
      <nav className="bg-white shadow-lg p-16 py-10 ">
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? `${active} ` : inActive)}
        >
          Login
        </NavLink>
        ;
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Register
        </NavLink>
        ;
      </nav>
    );
  }

  return (
    <nav className=" relative z-[10000] h-[100px] ">
      <ul className="fixed flex items-center justify-between w-full bg-white shadow-lg p-16 py-10">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `${active} ` : inActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/new-post"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Create Post
          </NavLink>
        </div>
        <span onClick={logout}>
          <AiOutlineLogout className="text-slate-900 text-[2.5rem] font-bold" />
        </span>
      </ul>
    </nav>
  );
}

export default Navbar;
