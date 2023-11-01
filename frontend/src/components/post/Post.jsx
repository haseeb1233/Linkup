import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {format} from "timeago.js"
import "./Post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
function Post({post}) {
  
  let token=JSON.parse(localStorage.getItem("token"))
   const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser]=useState({})

  const baseUrl="http://localhost:8080/"
  const fetchUser=async() =>{
    let res= await axios.get(`${baseUrl}user?userid=${post.userId}`,{
      headers: {
        'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
      }
    })
    setUser(res.data)
   }
  
   useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

    useEffect(()=>{
       fetchUser()
    },[post.userId])
   
   const likeHandler = async() => {
    try {
     let res=await axios.put(`${baseUrl}post/like/${post._id}`,{userId:user._id},{
      headers: {
        'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
      }
      });
      console.log(res)
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className='post'>
         <div className="postWrapper">
            <div className="postTOP">
                <div className="postTopLeft">
                   
                   <Link to={`/profile/${user.username}`} style={{textDecoration:"none",color:"black"}}>
                   <img className='postProfileImg' src={user.profilePicture} alt="error" />
                    <span className="postUsername">{user.username}</span>
                   </Link>
                    
                    
                    <span className="postDate"> {format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                       <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img className='postImg' src={`${baseUrl}images/`+post.img} alt="error" />
            </div>
            <div className="postBottom">
                <div className="postBottomleft">
                    <img className='likeicon' onClick={likeHandler} src="https://static.vecteezy.com/system/resources/thumbnails/017/745/757/small/heart-love-emoji-3d-png.png" alt="error" />
                    <img className='likeicon' onClick={likeHandler} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREkW-e5lUeFmSG83BrRP-Ebj6yzrF-vtuhol4LjGW1&s" alt="error" />
                    <span className='postLikeCounter'>{like} people like it</span>
                </div>
                <div className="postBottomright">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Post
