import React, { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineLike } from "react-icons/ai";

function Posts({posts,Likes,likePost,like}) {
    const { postText, title, username,id,UserId } = posts;
    // console.log(posts);
   
  return (
    <main className="relative sm:min-h-screen px-4">
   <div className='sm:sticky flex-col w-full flex left-0'>
   <div >
              <NavLink to={"/profile/" + UserId} className="text-[1.6rem] font-semibold flex items-center gap-[5px]">
                <span>
                  <AiOutlineUser />
                </span>
                {username}
              </NavLink>
              <p className="text-[1.5rem] font-normal">{title}</p>
              <p className="text-[1.9rem] font-semibold break-all w-full">
                {postText}
              </p>
            </div>
            <div className="flex  items-center h-[30px]">
              <AiOutlineLike
                className={`text-[2rem] w-[30px] ${
                  like ===id ? "text-red-400" : ""
                }`}
                onClick={() => likePost(id)}
              />
              <span className="text-[1.6rem] font-bold w-[30px]">
                {Likes?.length > 0 && Likes?.length}
              </span>
            </div>
   </div> 
  </main>
  )
}

export default Posts