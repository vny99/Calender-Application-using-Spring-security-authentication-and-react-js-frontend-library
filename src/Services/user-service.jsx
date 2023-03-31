import axios from "axios";
import authHeader from "./auth-header";

const API_URL="http://localhost:8080/api/user/";
class UserService {
    getUserByEmail=async(email)=>{
        var user;
        return  await axios.get(API_URL+email,{headers:authHeader()})
         
    }

}


export default new UserService;
