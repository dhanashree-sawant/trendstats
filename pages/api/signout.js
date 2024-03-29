import connection from "@/components/connection";
import requestIp from 'request-ip'

 
export default async function handler(req,res) {
    let clientIp = requestIp.getClientIp(req); 
    let [rows] = await connection.promise().query('SELECT * FROM user_logins WHERE IP="'+clientIp+'"');
    console.log('SELECT * FROM user_logins WHERE IP="'+clientIp+'"');
    if(rows.length==0){
        res.status(200).json('');
    }
    else{
        let email = rows[0][1];
        console.log(email);
        await connection.promise().query('DELETE FROM user_logins WHERE email="'+email+'"')
        await connection.promise().query('INSERT INTO user_logins (email,IP,status) VALUES ("'+email+'","'+clientIp+'","logged out")')
        res.status(200).json('');
    }
}