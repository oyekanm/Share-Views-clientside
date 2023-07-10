import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineUser } from "react-icons/ai";

import { useGlobalContext } from "./Context";
import { NavLink } from "react-router-dom";

function Comments({ id }) {
  const [comments, setComments] = useState([]);

  const { session } = useGlobalContext();
  // console.log(comments);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/comments/" + id)
      .then((res) => {
        if (res.status !== 200) {
          setComments(null);
        } else {
          // console.log("successfull",res.data);

          setComments(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const deleteComment = (ID) => {
    axios
      .delete("http://localhost:5000/api/comments/" + ID)
      .then((res) => {
        setComments(comments.filter(c=>c.id !== ID))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      body: e.target[0].value,
      PostId: id,
    };
    const storage = localStorage.getItem("access-Token");

    axios
      .post("http://localhost:5000/api/comments/", data, {
        headers: {
          accessToken: storage,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status !== 201) {
          setComments(null);
        } else {
          //  console.log("successfull",res.data);

          setComments([res.data, ...comments]);
          e.target[0].value = ""
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    // console.log(e);
  };
  // console.log(comments);

  return (
    <main className="relative flex flex-col justify-between min-h-screen w-full max-w-[100%]">
      <section>
        {comments &&
          comments.map((c) => {
            return (
              <div
                key={c.id}
                className={`relative bg-slate-500  w-full rounded p-[5px] mb-[1px]`}
              >
                 <NavLink to={"/profile/" + c.UserId} className="text-[1.6rem] font-semibold flex items-center gap-[5px]">
                <span>
                  <AiOutlineUser />
                </span>
                {c.username}
              </NavLink>
                <p className="text-[1.5rem] font-normal break-all">{c.body}</p>
                {session.username === c.username && (
                  <span onClick={()=>deleteComment(c.id)} className="absolute top-[5px] right-[5px]">
                    <AiFillDelete className="text-black text-[1.5rem]" />
                  </span>
                )}
              </div>
            );
          })}
      </section>

      <form
        onSubmit={(e) => submitForm(e)}
        className="sticky bottom-0 right-0 w-[inherit] max-w-[inherit]  bg-slate-600 border-t-slate-950 border-t-2 flex justify-center items-center"
      >
        <input
          type="text"
          name="comment"
          id="comment"
          autoComplete="false"
          className="w-full p-4 py-6 focus-visible:outline-none !bg-slate-600  text-[1.6rem] font-medium "
        />
        <button
          type="submit"
          className="p-4 py-1 text-[1.6rem] font-medium rounded-xl  bg-white text-slate-600 shadow-[0_5px_15px_rgba(0,0,0,0.6)] "
        >
          Reply
        </button>
      </form>
    </main>
  );
}

export default Comments;
