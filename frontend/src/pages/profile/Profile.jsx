import React,{ useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router";

import "./Profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

function Profile() {
  const currentuser=JSON.parse(localStorage.getItem("user"))
  const username = useParams().username;
  console.log(username.split("%").join(" "))
  let token=JSON.parse(localStorage.getItem("token"))
  const baseUrl="http://localhost:8080/"
  const [user,setUser]=useState({})
  const fetchUser=async() =>{
    let res= await axios.get(`${baseUrl}user?username=${username}`,{
      headers: {
        'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
      }
    })
    setUser(res.data)
   }

   useEffect(()=>{
    fetchUser()
 },[username])

  return (
    <div>
       <Topbar/>
      <div className="profile">
      <Sidebar/>
      <div className='profileRight'>
        <div className="profileRightTop">
            <div className="profileCover">
            <img className='profileCoverImg' src={user.profilePicture} alt="error" />
            <img className='profileUserImg' src={user.coverPicture} alt="error" />
            </div>
              <div className="profileInfo">
                 <h4 className='profileInfoName'>{user.username}</h4>
                 <span className="profileDesc">{user.desc}</span>
              </div>
        </div>
        <div className="profileRightBottom">
        <Feed username={user.username} val={true} currentuser={currentuser}/>
      <Rightbar user={user} val={true}/>
        </div>

     
      </div>
      </div>
    </div>
  )
}

export default Profile
