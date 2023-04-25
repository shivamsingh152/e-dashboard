import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth){
        navigate('/')
       } 
    }, [])   // eslint-disable-line
    

    const handlelogin = async ()=>{
        let result = await fetch('http://localhost:8000/login', {
            method:'post',
            body:JSON.stringify({email,password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        }
        else{
            alert(' User not found, please enter correct details')
        }
    }

    return (
        <div className="inputbox">
            <h1>Log in here</h1>
            <input className="input" type="email" placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <input className="input" type="password" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password} required/>
            <button onClick={handlelogin} className="btn" type="submit">Log in</button>
        </div>
    )
}

export default Login;