import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate } from "react-router-dom";


import axios from "axios"
import "./Rightbar.css"
import Online from '../online/Online'
import {Add,Remove} from "@mui/icons-material"
export default function Rightbar({user,val}) {
    
  let navigate=useNavigate()
  let token=JSON.parse(localStorage.getItem("token"))
   
 
  const baseUrl="http://localhost:8080/"
  const [currentuser, setCurrentuser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); 
  console.log(currentuser,user._id)
   const [follow,setFollow]=useState(false)
   useEffect(() => {
    const getcurrentuser = () => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
      if (userFromLocalStorage) {
        setCurrentuser(userFromLocalStorage);
      }
    };
    getcurrentuser();
  }, []);

  const setFollowState = () => {
    if (currentuser.following && currentuser.following.includes(user._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  };

  useEffect(() => {
    if (currentuser) {
      setFollowState();
    }
  }, [currentuser]);
   
    useEffect(()=>{
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`${baseUrl}user/friends/${user._id}`,{
            headers: {
              'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
            }
          });
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    },[user])
console.log(follow)
    const handleClick = async()=>{
      try {
        if (currentuser.following.includes(user._id)) {
          let res= await axios.put(`${baseUrl}user/unfollow`, {
            id: user._id,
          },{
            headers: {
              'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
            } 
          })
          console.log(res.data)
          
            if(res.data.data){
              localStorage.setItem("user",JSON.stringify(res.data.data))
              setFollow(false)
         alert(res.data.msg)
        
            }
        } else {
          let res=await axios.put(`${baseUrl}user/follow`, {
            id: user._id,
          },{
            headers: {
              'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
            }
          });
          console.log(res.data)
          if(res.data.data){
            localStorage.setItem("user",JSON.stringify(res.data.data))
            setFollow(true)
       alert(res.data.msg)
       
          }
        
        }
       

      } catch (error) {
        console.log(error);
      }
    }
   
  const HomeRightbar=()=>{
    return(
      <>
      <div className="birthdayContainer">
            <img className='birthdayImg' src="https://www.freeiconspng.com/thumbs/birthday-icon/birthday-icon-4.png" alt="error" />
            <span className='birthdayText'><b>shamil</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img className='rightbarAd' src="https://external-preview.redd.it/hi521f9yBuaUZHYESLWqNONEaCx2bVnAmy0-shCdRP4.jpg?auto=webp&s=f12b4d40befeb3870bad7f76e16f41296954c937" alt="error" />
        <h4 className="rightbarTitle">
        Online Friends
        </h4>
        <ul className="rightbarfriendList">
               
               <Online/>
            </ul>
      </>
    )
  }

  const ProfileRightbar =({follow})=>{
   
    return(<>
     {user.username !== currentuser.username && (<button className="rightbarFollowButton" onClick={handleClick}>
      {currentuser.following.includes(user._id)  ? "Unfollow":"Follow"}
      {currentuser.following.includes(user._id) ? <Remove/>:<Add/>}
      </button>
    )}
      <h4 className='RightbarTitle'>User Information</h4>
      <div className="rightbarinfo">
        <div className="rightbarInfoItem">
          <span className='rightbarInfoKey'>City:</span>
          <span className='rightbarInfoValue'>{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className='rightbarInfoKey'>From:</span>
          <span className='rightbarInfoValue'>{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className='rightbarInfoKey'>Realtionship:</span>
          <span className='rightbarInfoValue'>{user.realtionship===1 ? "single":user.realtionship===2 ? "Married":"-"}</span>
        </div>
      </div>
      <h4 className='RightbarTitle'>User friends</h4>
      <div className="rightbarFollowings">
      {friends.map((friend) => (
            <Link
              to={"/profile/"+friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
      </div>
    </>)
  }
  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
        {currentuser? ( // Only render when currentuser is available
        user && val ? <ProfileRightbar  /> : <HomeRightbar />
      ) : (
        // Render a loading indicator or placeholder while data is being fetched
        <div>Loading...</div>
      )}
        </div>
    </div>
  )
  }


