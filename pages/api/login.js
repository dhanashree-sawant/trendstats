import connection from "@/components/connection";

export default async function handler(req,res) {
    let arr = req.body.split(',');
    let email = arr[0];
    let password = arr[1];
    await connection.promise().query('CREATE TABLE IF NOT EXISTS user_signup (ID INTEGER NOT NULL AUTO_INCREMENT, first_name varchar(1000) NOT NULL, last_name varchar(1000), email varchar(100), password varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
    let [rows] = await connection.promise().query('SELECT * FROM user_signup WHERE email="'+email+'" and password="'+password+'"');
    if(rows.length==0){
        res.status(404).json('')
    }
    else{
        res.status(200).json('')
    }
}