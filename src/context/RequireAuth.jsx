import { useEffect } from "react";
import { useLocation,Navigate,Outlet } from "react-router-dom";
const RequireAuth=()=>{
    const location=useLocation();
    useEffect(()=>{
        let loginTime=new Date(localStorage.getItem('loginTime'));
        let logoutTime= loginTime.getTime()+(60*60*1000)
       if(new Date(logoutTime) > new Date() && localStorage.getItem('valid')==="true"){
        localStorage.setItem('valid',"true");
        } 
        else{
            localStorage.setItem('valid',"false");
            window.location.reload()
        }
        
    },[])
    return(
       (localStorage.getItem('valid')==="true")
        ?<Outlet />
        :<Navigate to='/login' state={{from:location}} replace />
    )
    
}
export default RequireAuth;