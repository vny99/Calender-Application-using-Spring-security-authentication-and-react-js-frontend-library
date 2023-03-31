
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import authService from "../Services/auth-service";
import { useNavigate,useLocation } from "react-router-dom";
import './login.css'
import userService from "../Services/user-service";
import useAuth from "../hooks/useAuth";
function Login (){
 
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    const location=useLocation();
    const from =location.state?.from?.pathname || "/calender";
    const handleSubmit=async(e)=>{
        var user;
        e.preventDefault();
        await authService.login(userName,password).then(res=>{
        if(res.status===200){
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',userName)
            localStorage.setItem('loginTime',new Date());
            localStorage.setItem('valid',true);
            navigate(from,{replace:true});
            user=userName;
        }
       })
        
        //  await userService.getUserByEmail(userName).then(response=>{
        //     user=response.data})
        //     setAuth({user})
        


    }
    return (<>
    
    <div className="container-fluid">
    <div className="  align-items-center justify-content-center d-flex h-100  ">
        <div className="card border border-warning">
            <div className="card-header bg-warning">
            <h3 className="card-title ">Sign In</h3>
            </div>
            <div className="card-body  bg-secondary">
            <Form onSubmit={handleSubmit} >
        <FormGroup  >
            <Form.Label className="mb-3 label_align_left text-white"style={{fontSize:"14px"}} >Email</Form.Label>
            <Form.Control className="mb-3" type="email" placeholder="Example@email.com" onChange={(e)=>{setUserName(e.target.value)}} style={{height:"25px" ,fontSize:"14px"}} required/>
            <Form.Label className="mb-3 label_align_left text-white" style={{fontSize:"14px"}} >Password</Form.Label>
            <Form.Control className="mb-3" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} style={{height:"25px" ,fontSize:"14px"}} required />
            <Button  className="btn btn-success" type="submit" >Login</Button>
        </FormGroup>
    </Form>

            </div>
        </div>
   
    </div>
    </div>
    
    </>)
}
export default Login;