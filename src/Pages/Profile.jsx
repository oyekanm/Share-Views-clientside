import axios from "axios";
import React, { useEffect, useState } from "react";

import Post from "../components/Post";
import { useGlobalContext } from "../components/Context";

function Profile() {
  const { session } = useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState([]);

  const storage = localStorage.getItem("access-Token");

  useEffect(() => {
    getUserPost();
  }, []);
  

  const getUserPost = () => {
    axios
      .get(`${import.meta.env.VITE_PORT}/api/posts/user/${session?.id}`, {
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
        `${import.meta.env.VITE_PORT}/api/likes`,
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

  // console.log(posts);
  // console.log(session);
  // console.log(like);
  return (
    <main>
      <div>
        <p className="text-[2rem] font-bold">{session?.username}</p>
      </div>
      <section className="mt-8 flex flex-col justify-center  p-16">
        {posts.length > 0 ? (
          <>
            <p className="text-[1.8rem] font-medium">All Posts</p>
            <Post posts={posts} user={true} likePost={likePost} like={like} />
          </>
        ) : (
          <p className="text-[1.8rem] font-medium">You do not have any Post</p>
        )}
      </section>
    </main>
  );
}

export default Profile;
