import connection from "@/components/connection"
import requestIp from 'request-ip'

export default async function handler(req,res){
    let clientIp = requestIp.getClientIp(req); 
    console.log('SELECT * FROM user_logins WHERE IP="'+clientIp+'" AND status="logged in"');
    let [rows] = await connection.promise().query('SELECT * FROM user_logins WHERE IP="'+clientIp+'" AND status="logged in"');
    
    if(rows.length==0){
        console.log('Yoo2')
        return res.status(404).json('')
    }
    else{
        console.log("Yoo")
        return res.status(200).json('')
    }
}
