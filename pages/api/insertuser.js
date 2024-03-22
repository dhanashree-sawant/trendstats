import connection from '@/components/connection'

export default async function handler(req,res) {
    let arr = req.body.split(',');
    let first_name = arr[0];
    let last_name = arr[1];
    let email = arr[2];
    let password = arr[3];
    //console.log('INSERT INTO user_signup (first_name,last_name,email,password) VALUES ("'+first_name+'","'+last_name+'","'+email+'","'+password+'")');
    await connection.promise().query('INSERT INTO user_signup (first_name,last_name,email,password) VALUES ("'+first_name+'","'+last_name+'","'+email+'","'+password+'")');

    res.status(200).json('')
    
}