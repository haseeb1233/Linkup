import React,{useState,useEffect} from 'react'
import "./Topbar.css"
import {Link} from "react-router-dom"
import {useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios"

function Topbar() {
  let navigate=useNavigate()
  const [search,setSearch]=useState([])
    let token=JSON.parse(localStorage.getItem("token"))
   
    const baseUrl="http://localhost:8080/"
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
     
     const changeHandler=async (e)=>{
      console.log(e.target.value)  
      let obj={
        username:e.target.value
      }
      let res= await axios.get(`${baseUrl}user/search/${e.target.value}`)
      setSearch(res.data)
   
     }
     console.log(search)

     const handleLogout=()=>{
      localStorage.clear();
      navigate("/login")
     }

  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className='logo'>Linkup</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                  <SearchIcon className='searchIcon'/>
                  <input type="text" placeholder='Search' onChange={changeHandler} className="searchinput" />
            </div>
            <ul id='itemlist'>
                    
                    {search && search.map((item)=>(
                      <Link to={`/profile/${item}`} style={{textDecoration:"none",color:"black"}}>
                       <li>{item}</li>
                      </Link>
                      
                    )) }
                  </ul>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                 <div className="topbarIconItem">
                 <PersonIcon/>
                 <span className="topbarIconBadge">1</span>
                 </div>
                 <div className="topbarIconItem">
                 <ChatIcon/>
                 <span className="topbarIconBadge">1</span>
                 </div>
                 <div className="topbarIconItem">
                 <NotificationsIcon/>
                 <span className="topbarIconBadge">1</span>
                 </div> 
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture} alt="error" className="topbarImg" /></Link>
            <button onClick={handleLogout}>Logout</button>
        </div>

    </div>
  )
}

export default Topbar
