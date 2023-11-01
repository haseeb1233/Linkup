import React, { useRef } from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const email = useRef();
  const password=useRef();

  const handleClick = async (e)=>{
    let obj={
      email:email.current.value,
      password:password.current.value
    }
   e.preventDefault()
        let res=await axios.post("http://localhost:8080/user/login",obj)
        if(res.data.token){
          localStorage.setItem("token",JSON.stringify({token:res.data.token,username:res.data.name}))
          localStorage.setItem("user",JSON.stringify({user:res.data.user}))
          alert(res.data.msg)
          navigate(`/`)
        }else{
          alert(res.data.msg)
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
             <input type="email" className="loginInput" placeholder='Email' required ref={email} />
             <input type="password" className="loginInput" placeholder='Password' minLength={6} required ref={password} />
             <button className='loginButton'>Log In</button>
             <span className="loginForgot">Forgot Password?</span>
             <Link className="loginRegisterButton" to="/register" style={{textDecoration:"none"}}>
             <button className="loginRegisterButtoni">Create a New Account</button>
             </Link>
           </form>
        </div>
      </div>
    </div>
  )
}

export default Login
