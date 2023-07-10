import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLike } from "react-icons/ai";

import Form from "../components/Form";
import { useGlobalContext } from "../components/Context";

function CreatePost() {
  // const { session } = useGlobalContext();

  // const navigate = useNavigate();

  // if (!session) {
  //   return navigate("/login");
  // }
  return (
    <main className="relative">
      <Form />
  
  <NavLink to={"/profile"}>
        <span className="fixed bottom-[20px] right-[10px] bg-white p-[1rem] rounded-[50%]">
          <AiOutlineUser className="text-slate-900 text-[2rem]" />
        </span>
      </NavLink>
    </main>
  );
}

export default CreatePost;
