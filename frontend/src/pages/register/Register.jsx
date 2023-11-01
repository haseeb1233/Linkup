import React,{ useRef } from 'react'
import "./Register.css"
import axios from "axios"
import {Link} from "react-router-dom"
import {useNavigate } from "react-router-dom";
function Register() {
  let navigate=useNavigate()
  const email = useRef();
  const password=useRef();
  const username = useRef();
  const passwordagain=useRef();
  const handleClick = async (e)=>{
    e.preventDefault()
   
    if(password.current.value!=passwordagain.current.value){
      passwordagain.current.setCustomValidity("password don't match!");
    }else{
      let obj={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
        passwordagain:passwordagain.current.value
        
      }
      let res=await axios.post("http://localhost:8080/user/register",obj)
      if(res.data){
        console.log(res.data)
        alert(res.data.message)
        navigate("/login")
      }else{
        alert(res.data.msg)
      }
    }
   
        
  }
  return (
    <div className='login'>
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">LinkUp</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on Linkup.
        </span>
      </div>
      <div className="loginRight">
         <form className="loginBox" onSubmit={handleClick}>
         <input type="text" required className="loginInput" placeholder='Username' ref={username} />
           <input type="email" required className="loginInput" placeholder='Email' ref={email} />
           <input type="password" required minLength={6} className="loginInput" ref={password} placeholder='Password' />
           <input type="password" required className="loginInput" ref={passwordagain} placeholder='re-type Password' />
           <button className='loginButton' type='submit' >Sign Up</button>
           <Link to={"/login"} className="loginRegisterButton" style={{textDecoration:"none"}}>
           <button className="loginRegisterButton">Log Into Account</button>
           </Link>
         </form>
      </div>
    </div>
  </div>
  )
}

export default Register
