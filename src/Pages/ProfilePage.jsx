import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import Post from "../components/Post";
import { useGlobalContext } from "../components/Context";

function ProfilePage() {
  const { session } = useGlobalContext();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState([]);

  const storage = localStorage.getItem("access-Token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/${userId}`)
      .then((res) => {
        // console.log(res);

        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getUserPost();
  }, []);

  const getUserPost = () => {
    axios
      .get(`http://localhost:5000/api/posts/user/${userId}`, {
        headers: {
          accessToken: storage,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setLike(
          res.data.like.map((like) => {
            return like.PostId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  // console.log(userId, session?.id);
  // console.log(user.username);
  // console.log(like);

  return (
    <main className="relative">
      <div>
        <p className="text-[2rem] font-bold">{user?.username}</p>
      </div>
      <section className="mt-8 flex flex-col justify-center  p-16">
        {posts.length > 0 ? (
          <>
            <p className="text-[1.8rem] font-medium">All Posts</p>
            <Post posts={posts} likePost={likePost} like={like} />
          </>
        ) : (
          <p className="text-[1.8rem] font-medium">
            This user does not have any Post
          </p>
        )}
      </section>
      {session?.username === user?.username ? (
        ""
      ) : (
        <NavLink to={"/profile"}>
          <span className="fixed bottom-[20px] right-[10px] bg-white p-[1rem] rounded-[50%]">
            <AiOutlineUser className="text-slate-900 text-[2rem]" />
          </span>
        </NavLink>
      )}
    </main>
  );
}

export default ProfilePage;
