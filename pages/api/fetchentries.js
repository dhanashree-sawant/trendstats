import connection from '@/components/connection'
import requestIp from 'request-ip'

export default async function handler(req,res) {
    let clientIp = requestIp.getClientIp(req); 
    let user_id = '';
    let entries = []

    await connection.promise().query('CREATE TABLE IF NOT EXISTS user_entries (ID INTEGER NOT NULL AUTO_INCREMENT, user_id INTEGER, ticker varchar(1000) NOT NULL, price varchar(1000), shares varchar(100), buy_price varchar(1000), today_gain varchar(1000),today_percent_gain varchar(1000), total_change varchar(1000), total_percent_change varchar(1000),value varchar(1000), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID))')
    let [rows] = await connection.promise().query('SELECT * FROM user_logins WHERE IP="'+clientIp+'" AND status="logged in"');

    if(rows.length==0){
        res.status(404).json('')
    }
    else{
        user_id = rows[0][0];
        let [rows2] = await connection.promise().query('SELECT * FROM user_entries WHERE user_id="'+user_id+'"');
        if(rows.length==0){
            res.status(200).json(entries);
        }
        else{
            for(let i=0; i<rows2.length; i++){
                entries.push({Tickersymbol:rows2[i][2],price: rows2[i][3],shares: rows2[i][4],buyprice: rows2[i][5],todaygain: rows2[i][6],todaygainpercent: rows2[i][7],totalchange: rows2[i][8],totalpercentchange: rows2[i][9],value: rows2[i][10]})
            }
            res.status(200).json(entries)
        }
    }
}