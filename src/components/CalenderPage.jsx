import React, { useEffect, useState } from "react";
import { Button, Modal, Navbar, ToggleButton } from "react-bootstrap";
import { Calendar } from "react-calendar";
import Tesco from "../assets/tesco.png"
import Nav from "react-bootstrap/Nav"
import "./calender.css"
import { useNavigate } from "react-router-dom";
import authService from "../Services/auth-service";
import { RiCheckboxBlankFill } from "react-icons/ri"
import leaveService from "../Services/leave-service";
import userService from "../Services/user-service";

function CalenderPage() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [fdChecked, setFdChecked] = useState(false);
    const [hdChecked, setHdChecked] = useState(false);
    const [aN, setAN] = useState(false);
    const [fN, setFN] = useState(false);
    const [eventVariant, setEvetVariant] = useState("outline-light")
    const [fdVariantDisabled, setFdVariantDisabled] = useState("outline-success");
    const [aNVariantDisabled, setANVariantDisabled] = useState("outline-warning");
    const [fNVariantDisabled, setFNVariantDisabled] = useState('outline-warning');
    const [select, setSelect] = useState(false);
    const [day, setDay] = useState('');
    const [fdDisabled, setFdDisabled] = useState(false);
    const [aNDisabled, setANDisabled] = useState(false);
    const [fNDisabled, setFNDisabled] = useState(false);
    const [onLeave, setOnLeave] = useState([]);
    const [name,setName]=useState('');
    const[status,setStatus]=useState()
    const [submitDisabled ,setSubmitDisabled]=useState(false);
    const today= new Date();
    const maxDate=new Date();
    const minDate=new Date();
     maxDate.setFullYear(today.getFullYear()+1);
     minDate.setFullYear(today.getFullYear()-1);
    useEffect(() => {
        if(new Date().getTime()>date.getTime()){
            setSelect(false)
            setEvetVariant("outline-light")
            setStatus('')
        }
        
       if(isWeekend(date)){
        setSelect(false)
        setEvetVariant("outline-light")
        setStatus('')
       }
       else{
        userService.getUserByEmail(localStorage.getItem('user')).then(res=>{
            setName(res.data);
          })
          leaveService.getLeave(date).then(res => {
              if (res.data.day !== undefined || res.data.fN!==undefined || res.data.aN!==undefined ) {
                  if(res.data.day!==null){
                     if (res.data.day.length === 1) {
                        if(new Date().getTime()>date.getTime()){
                            setStatus('');
                        }
                        else{
                            setStatus('p');
                        }
                      if(res.data.day[0]===name){
                          setFdDisabled(true);
                          setANDisabled(true);
                          setFNDisabled(true);
                          setANVariantDisabled("secondary");
                          setFdVariantDisabled('secondary');
                          setFNVariantDisabled("secondary")
                      }
                      let ol = onLeave;
                      ol.push(res.data.day[0]);
                      if (res.data.aN !== null && res.data.fN !== null) {
                          setSelect(false)
                          if(new Date().getTime()>date.getTime()){
                            setStatus('');
                        }
                        else{
                            setStatus('b');
                        }
                          ol.push(res.data.aN[0] + " - AN");
                          ol.push(res.data.fN[0] + " - FN");
                      }
                      if (res.data.aN !== null) {
                          ol.push(res.data.aN[0] + " - AN");
                          setANDisabled(true);
                          setANVariantDisabled("secondary");
                          setFdDisabled(true);
                          setFdVariantDisabled('secondary');
                      }
                      if (res.data.fN !== null) {
                          ol.push(res.data.fN[0] + " - FN");
                          setFNDisabled(true);
                          setFNVariantDisabled("secondary")
                          setFdDisabled(true);
                          setFdVariantDisabled('secondary');
                      }
                      let set = new Set(ol);
                      setOnLeave(Array.from(set));
  
                  }
                  if (res.data.day.length === 2) {
                    if(new Date().getTime()>date.getTime()){
                        setStatus('');
                    }
                    else{
                        setStatus('b');
                    }
                      let ol = onLeave;
                      ol.push(res.data.day[0]);
                      ol.push(res.data.day[1]);
                      let set = new Set(ol);
                      setOnLeave(Array.from(set));
                      setSelect(false);
                  }
                  
              }
              else {
                  
                  if (res.data.aN !== null) {
                    if(new Date().getTime()>date.getTime()){
                        setStatus('');
                    }
                    else{
                        setStatus('p');
                    }
                      if(res.data.aN[0]===name){
                          setFdDisabled(true);
                          setANDisabled(true);
                          setANVariantDisabled("secondary");
                          setFdVariantDisabled('secondary');
                      }
                      let ol = onLeave;
                      ol.push(res.data.aN[0] + " - AN");
                      if (res.data.aN.length > 1) {
                          ol.push(res.data.aN[1] + " - AN");
                          setANDisabled(true);
                          setANVariantDisabled("secondary");
                          setFdDisabled(true);
                          setFdVariantDisabled('secondary');
                      }
                      let set = new Set(ol);
                      setOnLeave(Array.from(set));
  
                  }
                  if (res.data.fN !== null) {
                    if(new Date().getTime()>date.getTime()){
                        setStatus('');
                    }
                    else{
                        setStatus('p');
                    }
                      if(res.data.fN[0]===name){
                          setFdDisabled(true);
                          setFNDisabled(true);
                          setFNVariantDisabled("secondary");
                          setFdVariantDisabled('secondary');
                      }
                      let ol = onLeave;
                      if(res.data.fN[0])
                      ol.push(res.data.fN[0] + " - FN");
                      if (res.data.fN.length > 1) {
                          ol.push(res.data.fN[1] + " - FN");
                          setFNDisabled(true);
                          setFNVariantDisabled('secondary');
                          setFdDisabled(true);
                          setFdVariantDisabled('secondary');
                      }
                      let set = new Set(ol);
                      setOnLeave(Array.from(set));
                  }
                  if(res.data.aN!==null && res.data.fN!==null){
                      if(res.data.aN.length===2 && res.data.fN.length===2){
                        if(new Date().getTime()>date.getTime()){
                            setStatus('');
                        }
                        else{
                            setStatus('p');
                        }
                          setSelect(false)
                      }
  
                  }
              }
  
                  
              }
              
              else {
                  setOnLeave([])
                  setFdVariantDisabled('outline-success')
                  setANVariantDisabled('outline-warning')
                  setFNVariantDisabled('outline-warning')
                  setANDisabled(false)
                  setFNDisabled(false)
                  setFdDisabled(false)
                  setSelect(true)
                 
                  if(new Date().getTime()>date.getTime() || isWeekend(date))
                  {
                    setStatus('')
                  }
                  else{
                    setStatus('a');
                  }
              }
  
          })
              .catch(e => {
  
  
              })
  
       }

    }, [date])
   function renderDay(props){
   
      
   }
    const handleShow = () => setShow(!show);
    const handleHdChecked = () => {
        setFdChecked(false)
        setHdChecked(true)
        setSubmitDisabled(false)
    }
    const handleFdChecked = () => {
        setHdChecked(false)
        setFdChecked(true)
        setSubmitDisabled(true)
        setDay('FD')
    }
    const handleANChecked = () => {
        setFN(false)
        setAN(true)
        setDay('AN')
        setSubmitDisabled(true)
    }
    const handleFNChecked = () => {
        setAN(false)
        setFN(true)
        setDay('FN')
        setSubmitDisabled(true)
    }
    const handleSelect = () => {
        setSelect(true);
        setEvetVariant("danger")
    }
    const handleEvent = async () => {
        setShow(false)
        let data = {}
        data.user = localStorage.getItem('user')
        data.date = date
        data.day = day
        leaveService.setLeave(data);
        window.location.reload()
    }
    const isWeekend=(date)=>{
        const day= date.getDay();
        return day===0 || day===6;
    }
    const logout = () => {
        authService.logout();
        navigate('/login', { replace: true })
    }
    return (<>
        <div className="container-fluid calendar-fluid p-2 d-flex align-content-center align-items-center ">
            <Navbar fixed="top" bg='primary' expand='lg' variant="dark">
                <Navbar.Brand className=" p-2  " style={{ cursor: "pointer" }}><img src={Tesco} width="80px" height='' /> </Navbar.Brand>
                <Navbar.Brand className=" nav-brand p-2" style={{ cursor: "pointer" }} >Employee Leave Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto nav-items '  >
                        <Button disabled={!select} variant={eventVariant} onClick={() => { setShow(true) }}  >Add Event</Button>
                        <Button onClick={logout} >Logout</Button>
                        <Button style={{ cursor: "pointer" }}>Profile</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="calendarContainer d-flex ">
                <Calendar onChange={setDate} onClickDay={handleSelect} maxDate={maxDate}  minDate={minDate} renderDay={renderDay}  />
            </div>
            < div className="legend  row text-white d-flex " style={{ width: "100%" }} >
                <div className="col-sm-3 d-flex">
                    <p className="">Your leaves :&nbsp;</p>
                </div>
                <div className="col-sm-3 d-flex">
                    <p>Slot :<p style={{fontSize:'14px',color:'#f4c842' }} >{status==='a'&& <p><RiCheckboxBlankFill style={{ color: "#78e75c" }} /> Available</p>} {status==='b'&& <p><RiCheckboxBlankFill style={{ color: '#c91b1b' }} /> Booked</p>}{status==='p'&& <p> <RiCheckboxBlankFill style={{ color: "yellow" }}/> Partly Available</p>}</p></p>
                </div>
                <div className="col-sm-3 d-flex " >
                    <p >On leave :{onLeave.length > 0 && (onLeave.map(person => {
                        return (
                            <li style={{ listStyle: "none",fontSize:'14px',color:'#f4c842' }} className=" d-flex " key={person.toString()}>
                                {person}
                            </li>
                        )
                    }))} </p>
                </div>
                <div className="col-sm-3 d-flex legend-contents">
                    <p className=""><RiCheckboxBlankFill style={{ color: "#78e75c" }} /> Available<br /><RiCheckboxBlankFill style={{ color: "yellow" }} /> Partly available<br /><RiCheckboxBlankFill style={{ color: '#c91b1b' }} /> Booked </p>
                </div>
            </div>
        </div>
        <div className="leave_event">
            <Modal show={show} onHide={handleShow} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Enter Leave Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='status'>
                        <p>Date&nbsp;&nbsp;&nbsp;: {date.toDateString()}</p>
                        <p>Status&nbsp;:</p>
                        <div className="d-flex justify-content-between">
                            <div >
                                <ToggleButton type="checkbox" variant={fdVariantDisabled} checked={fdChecked} disabled={fdDisabled} onClick={handleFdChecked} >Full Day</ToggleButton> &nbsp;
                                <ToggleButton type="checkbox" variant="outline-success" checked={hdChecked} onClick={handleHdChecked} >Half Day</ToggleButton>
                            </div>
                            {hdChecked && <div>
                                <ToggleButton type="checkbox" variant={fNVariantDisabled} checked={fN} disabled={fNDisabled} onClick={handleFNChecked} >FN</ToggleButton> &nbsp;
                                <ToggleButton type="checkbox" variant={aNVariantDisabled} checked={aN} disabled={aNDisabled} onClick={handleANChecked} >AN</ToggleButton>
                            </div>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow} >Close</Button>
                    <Button variant="primary" disabled={!submitDisabled} onClick={handleEvent}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>

    </>)
}
export default CalenderPage;