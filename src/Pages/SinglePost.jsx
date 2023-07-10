import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../components/Posts";
import Comments from "../components/Comments";

function SinglePost() {
  const [posts, setPosts] = useState();
  const [likes,setLikes] = useState([])
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [like, setLike] = useState();

  // const navigate = useNavigate();
  const storage = localStorage.getItem("access-Token");


  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:5000/api/posts/" + id,
    {
      headers: {
        accessToken: storage,
      },
    }).then((res) => {
      if (res.status !== 200) {
        setPosts(null);
      } else {
        
        setPosts(res?.data?.posts);
        setLike(res?.data?.likes?.PostId);
        setLikes(res?.data?.like)
      }
    }).catch(err=>{
      console.log(err);
    })
    setLoading(false)
  }, []);

  // console.log(likes);

  
  const likePost = async (Id) => {
    await axios
      .post(
        "http://localhost:5000/api/likes",
        { PostId: Id },
        {
          headers: {
            accessToken: storage,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if(res.data.Liked){
        setLikes([...likes,0])
        }else{
          const likesArray = likes
          likesArray.pop()
          setLikes(likesArray)
        }
       
        if (like === Id) {
          setLike("")
        } else {
          setLike(Id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if(loading){
    return   <main className="p-4 flex justify-center items-center">
    <h1>Loading ...</h1>
  </main>
  }

  if (!posts) {
    return (
      <main className="p-4">
        <p>Post {id} Not Found</p>
      </main>
    );
  }
  
  // console.log(posts);
  return (
    <main className="grid sm:grid-cols-2 gap-8 ">
    <Posts posts={posts} Likes={likes} like={like} likePost={likePost}/>
    <Comments id={id}/>
    </main>
  )
}

export default SinglePost;
