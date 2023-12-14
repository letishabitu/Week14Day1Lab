// require dotenv so that I can use the .env fil
require('dotenv').config();
const express = require('express');
// require mongoose so that I can connect to my db
const mongoose = require('mongoose');
const app = express();
// const fruits = require('./models/fruits.js');
// we want to import the fruit model
// const Fruit = require('./models/fruit');
const jsxViewEngine = require('jsx-view-engine');
const Log= require('./models/log')

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());



// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));



app.get('/', (req, res) => {
    res.send('this is my Capitains log');
});

// I - INDEX - dsiplays a list of all fruits
app.get('/logs/', async (req, res) => {
    // res.send(fruits);
    try {
        const foundLog= await Log.find({});
        res.status(200).render('Index', {logs: foundLog})
    } 
    catch(err){
      res.status(400).send(err);
    }
    
});


// N - NEW - allows a user to input a new fruit
app.get('/logs/new', (req, res) => {
    res.render('New');
});


// C - CREATE - update our data store
app.post('/logs', async (req, res) => {
    console.log('in post route');
    if(req.body.shipIsBroken === 'on') { 
        req.body.shipIsBroken = true;
    } else {  
        req.body.shipIsBroken = false;
    }
    console.log(req.body);

    try {
        const createdLog = await Log.create(req.body);
       
        res.status(200).redirect('/logs/');
    } catch (err) {
        res.status(400).send(err);
    }
    
    
})

// S - SHOW - show route displays details of an individual fruit
app.get('/logs/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundLog = await Log.findById(req.params.id);
        res.render('Show', {// second parameter must be an object
            log: foundLog
        });
        
    } 
    catch(err){
        res.status(400).send(err);
    }
    
})

app.listen(3010, () => {
    console.log('listening');
});