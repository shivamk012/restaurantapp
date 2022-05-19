const {MongoClient} = require('mongodb');
const s = require('./services');
const express = require('express');
const cors = require('cors');
const ajfdslkfa = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();
// require('./routes')(app)
app.use(cors());
app.use(ajfdslkfa.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, ".." , "client", "build")))
const port = process.env.PORT ;

let dbClient = null;

async function main(){
    const uri = 'mongodb+srv://admin:shivamk012@restaurant.wectp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client = new MongoClient(uri);
    try{
        await client.connect();

        dbClient = client;
        console.log('connected');
    }catch(err){
        console.log(err);
    }
}

async function getData(){
    let food = await dbClient.db('FoodItems').collection('Food').find().toArray();
    // console.log(food);
    return food;
}

app.get('/getFood', (req,res)=>{
    getData().then(res1=>{
        res.send(res1);
    });
})

app.post('/setUser' , (req,res)=>{
    s.insertUser(dbClient , req.body).then((res1)=>{
        // console.log(res1);
        // res1.data = res1.insertedId;
        res.send(res1);
    })
})

app.post('/loginUser' , (req,res)=>{
    s.login(dbClient , req.body).then((res1)=>{
        res.send(res1);
    })
})

app.post('/updateCart' , (req,res)=>{
    s.updateCart(dbClient , req.body).then((res1)=>{
        res.send(res1);    
    })
})

app.post('/addNewProduct' , (req,res)=>{
    s.addProduct(dbClient , req.body).then((res1)=>{
        console.log(res1);
        res.send(res1);
    });
})

app.post('/requestOrder' , (req,res)=>{
    s.sendRequest(dbClient , req.body).then((res1)=>{
        console.log(res1);
        res.send(res1);
    });
})

app.get('/getRequest' , (req,res)=>{
    s.getRequestArr(dbClient).then((res1)=>{
        res.send(res1);
    })
})

async function setRequestData(data){
    console.log(data);
    const cursor = await dbClient.db("FoodItems").collection("User").findOne({
        isAdmin : true
    });
    const result = await dbClient.db("FoodItems").collection("User").updateOne({_id:cursor._id} , {$set:{
        request : data
    }});
    return result;
}

app.post('/setRequest' , (req,res)=>{
    setRequestData(req.body).then((res1)=>{
        res.send(res1);
    });
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ".." , "client", "build", "index.html"));
});

app.listen(port);
main();