const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config()
const port =  5000




const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4chh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
  const registerCollection = client.db("regCollection").collection("users");
  

app.post('/registered', (req,res)=>{
      
//     const password = req.body.password
//     const email = req.body.email
//    console.log(email, password)
const newEvent = req.body;
      console.log('adding', newEvent)
     
   
   registerCollection.insertOne(newEvent)
               .then(result => {
                  
                  res.send(result.insertedCount > 0);
                  
                   
               })
   
    })

    app.get('/users',(req,res)=>{
      console.log('email',req.query.email)
      registerCollection.find({email: req.query.email})
      .toArray((err, items) => {
      console.log(err)
        res.send(items)

      })

    })
    
});


console.log(uri)



app.get('/', (req, res)=>{



    res.send('hello nibir')
});


app.listen(process.env.PORT || port)




