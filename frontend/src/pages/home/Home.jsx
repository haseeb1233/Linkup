import React,{useState,useEffect} from 'react'
import axios from "axios"
import "./Home.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
function Home() {
  let token=JSON.parse(localStorage.getItem("token"))
  const currentuser=JSON.parse(localStorage.getItem("user"))
  const baseUrl="http://localhost:8080/"
  const [user,setUser]=useState({})

  const fetchUser=async() =>{
      let res= await axios.get(`${baseUrl}user`,{
        headers: {
          'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
        }
      })
      localStorage.setItem("user",JSON.stringify(res.data))
      setUser(res.data)
     }

     useEffect(()=>{
      fetchUser()
   },[])
  return (
    <div>
      <Topbar/>
      <div className="homeContainer">
      <Sidebar/>
      <Feed username={user.username} val={false}/>
      <Rightbar user={user} val={false} currentuser={currentuser}/>
      </div>
      
    </div>
  )
}

export default Home
