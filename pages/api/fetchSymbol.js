const baseURL = 'https://financialmodelingprep.com/api/v3/';
const APIKey = 'b87ac7126c3632e79564e8bc76f28d60';

export default async function handler(req,res){
    let type = 'search';
    console.log('Yoo')
    let appendUrl = type + '?query=' + req.body+ '&limit=5&apikey='+APIKey;
    console.log(baseURL+ appendUrl)
    const response = await fetch(baseURL+ appendUrl, {
        method: 'GET',
      })
    console.log(response.body)
    res.status(200)
}