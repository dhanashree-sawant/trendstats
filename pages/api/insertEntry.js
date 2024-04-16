import connection from '@/components/connection'
import requestIp from 'request-ip'

export default async function handler(req,res) {
    let clientIp = requestIp.getClientIp(req); 
    let user_id = '';
    let [rows] = await connection.promise().query('SELECT * FROM user_logins WHERE IP="'+clientIp+'" AND status="logged in"');

    if(rows.length==0){
        res.status(404).json('')
    }
    else{
        user_id = rows[0][0];
        await connection.promise().query('CREATE TABLE IF NOT EXISTS user_entries (ID INTEGER NOT NULL AUTO_INCREMENT, user_id INTEGER, ticker varchar(1000) NOT NULL, price varchar(1000), shares varchar(100), buy_price varchar(1000), today_gain varchar(1000),today_percent_gain varchar(1000), total_change varchar(1000), total_percent_change varchar(1000),value varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
        let arr = req.body.split(',');
        let ticker = arr[0];
        let price = arr[1];
        let shares = arr[2];
        let buy_price = arr[3];
        let today_gain = arr[4];
        let today_percent_gain = arr[5];
        let total_change = arr[6];
        let total_percent_change = arr[7];
        let value = arr[8];
    
        await connection.promise().query('INSERT INTO user_entries (user_id,ticker,price,shares, buy_price, today_gain,today_percent_gain, total_change, total_percent_change,value) VALUES ('+user_id+',"'+ticker+'","'+price+'","'+shares+'","'+buy_price+'","'+today_gain+'","'+today_percent_gain+'","'+total_change+'","'+total_percent_change+'","'+value+'")');
        res.status(200).json('')

    }
  
}