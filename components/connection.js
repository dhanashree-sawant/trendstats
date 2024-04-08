
import mysql, { ConnectionOptions } from 'mysql2';

const connection = mysql.createConnection({
    host:'localhost',
    password: '',
    user: 'root',
    database: 'tradestats',
    rowsAsArray: true,
});

export default connection
