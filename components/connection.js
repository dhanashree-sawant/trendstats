import mysql, { ConnectionOptions } from 'mysql2';

const connection = mysql.createConnection({
    host:'localhost',
    //password: 'Tradestats@mysql1',
    password:'',
    user: 'root',
    database: 'tradestats',
    rowsAsArray: true,
});

export default connection