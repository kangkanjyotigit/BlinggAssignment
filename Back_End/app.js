const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT =4000;
const {Pool,Client} = require('pg');

const connectionString ='postgressql://Blingg:Kangkan@123@localhost:5432/Blingg_Exercise'

app.listen(PORT,()=>{console.log('Listening to the port')});


const client= new Client({
    connectionString:connectionString
});

client.connect(err=>{
    if(err){
        console.log('error occured',err);
    }
    else{
        console.log('Connected');
    }
});

app.use(bodyParser.json());

app.use(function(req,res,next){

    res.setHeader("Access-control-allow-origin","*");
    res.setHeader("Access-Control-Allow-Methods",'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested_With,Content-Type,Accept,Authorization");
    next();
});

app.get('/',async (req,res)=>{

     var result = await client.query('SELECT * from banners,details where Image = name').then(res=>{return res;});
    console.log(result.rows);
    res.send(result.rows);

})
app.post('/DataPost',(req,res)=>{
    var data = req.body;
    console.log('The data recieved' + data.name);
    client.query('Insert into details values(data.name,data.description,data.url)').then(res=>{console.log('success',res)});
})

