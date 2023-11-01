import React,{useState,useEffect, useRef} from 'react'
import './Share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios"
import { Cancel } from '@mui/icons-material';
function Share() {
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
  

  const desc =useRef()
  const [file,setFile]=useState(null)

 


  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(`${baseUrl}backend/upload`,data)
      } catch (err) {
        console.log(err);
      }
    }
    try {
      let res=await axios.post(`${baseUrl}post`,newPost,{
        headers: {
          'Authorization': `${token.token}` // Replace 'YourAuthToken' with your actual token
        }
      })  
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img className='shareProfileImg' src={user.profilePicture} alt="" />
            <input placeholder={"whats in Your mind " + user.username+"?"} ype="text" className="shareInput" ref={desc}/>
        </div>
        <hr className='shareHr'/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMediaIcon htmlColor='tomato' className='shareIcon'/>
                    <span className='shareOptionText'>Photo or Video</span>
                    <input style={{display:"none"}} type="file" id='file' accept='.png,.jpg,.jpeg' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <LabelIcon htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'>Tag</span>
                </div>
                <div className="shareOption">
                    <LocationOnIcon htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'>Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon'/>
                    <span className='shareOptionText'>Feelings</span>
                </div>
            </div>
            <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
