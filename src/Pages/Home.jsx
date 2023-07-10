import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineLike } from "react-icons/ai";
import Post from "../components/Post";
// import { toast } from 'react-toastify';


function Home() {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState([]);
  // const { session } = useGlobalContext();
  const storage = localStorage.getItem("access-Token");



  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts", {
        headers: {
          accessToken: storage,
        },
      })
      .then((res) => {
        // console.log(res);
        setPosts(res.data.posts);
        setLike(
          res.data.like.map((like) => {
            return like.PostId;
          })
        );
      });
  }, []);
  // console.log(posts);

  const likePost = async (id) => {
    await axios
      .post(
        "http://localhost:5000/api/likes",
        { PostId: id },
        {
          headers: {
            accessToken: storage,
          },
        }
      )
      .then((res) => {
        // console.log(res);

        if (res.data.Liked) {
          setPosts(
            posts.map((post) => {
              if (post.id === id) {
                return {
                  ...post,
                  Likes: [...post.Likes, 0],
                };
              } else {
                return post;
              }
            })
          );
        } else {
          setPosts(
            posts.map((post) => {
              if (post.id === id) {
                const likesArray = post.Likes;
                likesArray.pop();
                return {
                  ...post,
                  Likes: likesArray,
                };
              } else {
                return post;
              }
            })
          );
        }
        if (like.includes(id)) {
          setLike(
            like.filter((i) => {
              return i != id;
            })
          );
        } else {
          setLike([...like, id]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex flex-col justify-center items-center p-16 relative">
      <Post posts={posts} likePost={likePost} like={like}/>
      <NavLink to={"/profile"}>
        <span className="fixed bottom-[20px] right-[10px] bg-white p-[1rem] rounded-[50%]">
          <AiOutlineUser className="text-slate-900 text-[2rem]" />
        </span>
      </NavLink>
    </main>
  );
}

export default Home;
