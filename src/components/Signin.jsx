import React, { useState } from "react";
import { Form,FormGroup,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/auth-service";
function Signin (props){
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [user,setUser]=useState('');
  const[password,setPassword]=useState('');
  const [empId,setEmpId]=useState('');
  const [confirmPassWord,setConfirmPassWord]=useState('');
  const [role,setRole]=useState('MANAGER');
  const navigate =useNavigate();
  const to="/login";
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await AuthService. register(empId,firstName,lastName,user,password,role);
      if(response.status===200){
         navigate(to,{replace:true});
      }

    }
    catch(err){
      console.log(err)
    }
   
  }

  return(<><div className=" container-fluid  ">
  <div className="  align-items-center justify-content-center d-flex h-100 ">
      <div className="card border border-warning  ">
          <div className="card-header bg-warning">
          <h3 className="card-title">Register</h3>
          </div>
          <div className="card-body bg-secondary text-white ">
          <Form onSubmit={handleSubmit} >
      <FormGroup  >
        <Form.Label className="label_align_left text-white" style={{fontSize:"14px"}} >Emp Id</Form.Label>
        <Form.Control className="mb-2" type='text'  onChange={(e)=>{setEmpId(e.target.value)}} style={{height:"25px" ,fontSize:"14px"}} required/>
          <Form.Label className=" label_align_left"  style={{fontSize:"14px"}}>First Name</Form.Label>
        <Form.Control className="mb-2" type='text'  onChange={(e)=>{setFirstName(e.target.value)}} style={{height:"25px",fontSize:"14px"}} required/>
          <Form.Label className=" label_align_left" style={{fontSize:"14px"}}>Lastname</Form.Label>
          <Form.Control className="mb-2" type="text" onChange={(e)=>{setLastName(e.target.value)}} style={{height:"25px",fontSize:"14px"}} required/>
          <Form.Label className=" label_align_left" style={{fontSize:"14px"}}>Email</Form.Label>
          <Form.Control className="mb-2" type="email" placeholder="Example@email.com" onChange={(e)=>{setUser(e.target.value)}} style={{height:"25px",fontSize:"14px"}} required/>
          <Form.Label className=" label_align_left" style={{fontSize:"14px"}}>Password</Form.Label>
          <Form.Control className="mb-2" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} style={{height:"25px",fontSize:"14px"}} required />
          <Form.Label className=" label_align_left" style={{fontSize:"14px"}}>Confirm Password</Form.Label>
          <Form.Control className="mb-2 " type="password" placeholder="Re-Enter Password" onChange={(e)=>{setConfirmPassWord(e.target.value)}}style={{height:"25px",fontSize:"14px"}} required/>
          <Form.Label className=" label_align_left" style={{fontSize:"14px"}}>Role</Form.Label> <br/>
          <Form.Select className="mb-2 " required onChange={(e)=>{setRole(e.target.value)}} style={{height:"30px",fontSize:"12px"}} defaultValue="">
            <option aria-disabled  style={{fontSize:"14px"}} >Select a role</option>
            <option value='MANAGER'  style={{fontSize:"14px"}}>Manager</option>
            <option value='EMPLOYEE'  style={{fontSize:"14px"}}>Employee</option>
          </Form.Select>
          <Button  className="btn btn-success" type="submit" >Register</Button>
      </FormGroup>
  </Form>

          </div>
      </div>
 
  </div>
  </div>
  </>)
}
export default Signin;
