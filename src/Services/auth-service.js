import axios from "axios";
 const API_URL="http://localhost:8080/api/auth/";
 class AuthService{
   async login(email,password){  
   return await axios.post(API_URL+"authenticate",{email,password})
   }
     register(empId,firstName,lastName,email,password,role){
        return axios.post(API_URL+"register",{
            empId,
            firstName,
            lastName,
            email,
           password,
           role
        })
     }
     logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("valid");
      localStorage.removeItem("token");
      localStorage.removeItem("loginTime");
     }

     
 }
 export default new AuthService;