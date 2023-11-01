import React, { useEffect, useState } from 'react'
import "./Feed.css"
import Post from '../post/Post'
import Share from '../share/Share'

import axios from "axios"
function Feed({username,val}) {
  let token=JSON.parse(localStorage.getItem("token"))
  const baseUrl="http://localhost:8080/"
  const [posts,setPosts]=useState([]);
  const [user,setUser]=useState({})

  const fetchUser=async() =>{
      let res= await axios.get(`${baseUrl}user`,{
        headers: {
          'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
        }
      })
      setUser(res.data)
     }

     useEffect(()=>{
      fetchUser()
   },[])
 const fetchPosts=async() =>{
  let res= username && val ?await axios.get(`${baseUrl}post/profile/${username}`,{
    headers: {
      'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
    }
  }) : await axios.get(`${baseUrl}post/all/timeline`,{
    headers: {
      'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
    }
  })
  setPosts(res.data.sort((p1,p2)=>{
    return new Date(p2.createdAt)- new Date(p1.createdAt)
  }))
 }
  useEffect(()=>{
     fetchPosts()
  },[username])
  return (
    <div className='feed'>
      <div className="feedWrapper">
        {username===user.username && <Share/>}
         {posts.map((item)=>(
            <Post key={item._id} post={item} />
         ))
         }
        
      </div>
    </div>
  )
}

export default Feed
