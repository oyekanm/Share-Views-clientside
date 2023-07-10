import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLike } from "react-icons/ai";

function Post({posts,likePost,like, user}) {
    const navigate = useNavigate();
  return (
    <div>
        {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="my-5 p-4 mx-auto cursor-pointer shadow-2xl w-full  bg-slate-500"
          >
            <NavLink
              to={!user && "/profile/" + post.UserId}
              className="text-[1.6rem] font-semibold flex items-center gap-[5px]"
            >
              <span>
                <AiOutlineUser />
              </span>
              {post.username}
            </NavLink>
            <div onClick={() => navigate(`/post/${post.id}`)}>
              <p className="text-[1.5rem] font-normal">{post.title}</p>
              <p className="text-[1.9rem] font-semibold">
                {post.postText.slice(0, 50)}
                {post.postText.length > 50 && "......"}
              </p>
            </div>
            <div className="flex justify-end items-center h-[30px]">
              <AiOutlineLike
                className={`text-[2rem] w-[30px] ${
                  like.includes(post.id) ? "text-red-400" : ""
                }`}
                onClick={() => likePost(post.id)}
              />
              <span className="text-[1.6rem] font-bold w-[30px]">
                {post.Likes.length > 0 && post.Likes.length}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Post