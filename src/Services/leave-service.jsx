import axios from 'axios';
import authHeader from './auth-header';
const API_URL='http://localhost:8080/api/leave';
class LeaveService{
    setLeave(data){
        return axios.post(API_URL+"/set",data,{headers:authHeader()})
    }
    async getLeave(date){
        return await axios.get(API_URL+"/get/"+date,{headers:authHeader()})
    }
}
export default new LeaveService;