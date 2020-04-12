require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser')
const Routes = require('./Routes/createPayment');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', Routes)
let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
})