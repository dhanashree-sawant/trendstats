import { z } from 'zod'
import connection from '@/components/connection'
import { NextResponse } from 'next/server'

 
export default async function handler(req,res) {
  let email = req.body
  await connection.promise().query('CREATE TABLE IF NOT EXISTS user_signup (ID INTEGER NOT NULL AUTO_INCREMENT, first_name varchar(1000) NOT NULL, last_name varchar(1000), email varchar(100), password varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
  let [rows] = await connection.promise().query('SELECT * FROM user_signup WHERE email="'+email+'"');
  if(rows.length==0){
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