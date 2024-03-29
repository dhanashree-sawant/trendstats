import connection from "@/components/connection";

export default async function intialization(){
    await connection.promise().query('CREATE TABLE IF NOT EXISTS user_signup (ID INTEGER NOT NULL AUTO_INCREMENT, first_name varchar(1000) NOT NULL, last_name varchar(1000), email varchar(100), password varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
}