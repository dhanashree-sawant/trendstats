import connection from "@/components/connection";
import requestIp from 'request-ip'


export default async function handler(req,res) {
    let arr = req.body.split(',');
    let email = arr[0];
    let password = arr[1];
    let clientIp = requestIp.getClientIp(req); 
    
    await connection.promise().query('CREATE TABLE IF NOT EXISTS user_signup (ID INTEGER NOT NULL AUTO_INCREMENT, first_name varchar(1000) NOT NULL, last_name varchar(1000), email varchar(100), password varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
    await connection.promise().query('CREATE TABLE IF NOT EXISTS user_logins (ID INTEGER NOT NULL AUTO_INCREMENT,  email varchar(100),IP varchar(100), status varchar(100), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')

    const bcrypt = require('bcrypt');

    let [rows] = await connection.promise().query('SELECT * FROM user_signup WHERE email="'+email+'"');

    let password_db = rows[0][4]

    if(password_db.startsWith('$2b$')){
        const isHashed = await bcrypt.compare(password, password_db);
        if(isHashed){
            await connection.promise().query('DELETE FROM user_logins WHERE email="'+email+'"')
            await connection.promise().query('INSERT INTO user_logins (email,IP,status) VALUES ("'+email+'","'+clientIp+'","logged in")')
            
            res.status(200).json('') 
        }
        else{
            res.status(404).json('')
        }
    }
    else{
        const hashedPassword = await bcrypt.hash(password_db, 10);
        await connection.promise().query('UPDATE user_signup SET password="'+hashedPassword+'" WHERE email="'+email+'"');
        const isHashed = await bcrypt.compare(password, hashedPassword);
        if(isHashed){
            await connection.promise().query('DELETE FROM user_logins WHERE email="'+email+'"')
            await connection.promise().query('INSERT INTO user_logins (email,IP,status) VALUES ("'+email+'","'+clientIp+'","logged in")')
            
            res.status(200).json('') 
        }
        else{
            res.status(404).json('')
        }
    }

    console.log(password_db)

}