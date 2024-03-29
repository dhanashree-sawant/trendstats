import { z } from 'zod'
import connection from '@/components/connection'
import { NextResponse } from 'next/server'
import requestIp from 'request-ip'

 
export default async function handler(req,res) {
  let email = req.body
  let clientIp = requestIp.getClientIp(req); 
  await connection.promise().query('CREATE TABLE IF NOT EXISTS user_signup (ID INTEGER NOT NULL AUTO_INCREMENT, first_name varchar(1000) NOT NULL, last_name varchar(1000), email varchar(100), password varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
  await connection.promise().query('CREATE TABLE IF NOT EXISTS user_logins (ID INTEGER NOT NULL AUTO_INCREMENT,  email varchar(100),IP varchar(100), status varchar(100), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
  let [rows] = await connection.promise().query('SELECT * FROM user_signup WHERE email="'+email+'"');
  if(rows.length==0){
    await connection.promise().query('DELETE FROM user_logins WHERE email="'+email+'"')
    await connection.promise().query('INSERT INTO user_logins (email,IP,status) VALUES ("'+email+'","'+clientIp+'","logged in")')
    res.status(200).json('')
  }
  else{
    res.status(404).json('')
  }
}

function createSignup(data){
    console.log(data)
    return 1;
}