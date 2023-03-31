import { Link, Outlet } from "react-router-dom";
import { Card } from "react-bootstrap";
const Layout =()=>{
    return(
        <main className="App d-flex  justify-content-around align-items-center container-fluid ">
            <Card className="bg-info" style={{ width: '18rem', height:'30px' }}>
                <Link className="text-white"  style={{textDecoration : 'none'}} to='/login'>Login</Link>
            </Card>
            <Card  className="bg-warning" style={{ width: '18rem', height:'30px'  }}>
                <Link className="text-white"  style={{textDecoration : 'none'}} to='/signup'>Register</Link>
            </Card> 
            <Card  className="bg-info" style={{ width: '18rem', height:'30px'  }}>
                <Link className="text-white" style={{textDecoration : 'none'}} to='/calender'>Calender</Link>
            </Card> 
        </main>
    )
}
export default Layout