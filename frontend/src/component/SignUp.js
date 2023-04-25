import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = ()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    useEffect(() =>{
       const auth = localStorage.getItem('user');
       if(auth){
        navigate('/')
       } 
    },[]) // eslint-disable-line 

    const handlesignup = async ()=>{
        let result = await fetch('http://localhost:8000/signup',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
            'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result)
            localStorage.setItem('user',JSON.stringify(result.result));
            localStorage.setItem('token',JSON.stringify(result.auth));
            
            navigate('/')
        
    }
    return(
        <div className="inputbox">
            <h1>Register here</h1>
            <input className="input" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" required/>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" required/>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" required/>
            <button className="btn" type="submit" onClick={handlesignup}>Sign Up</button>
        </div>
    )
}

export default SignUp