const express = require('express');
const path = require('path');
const cors = require('cors');
const knex = require('knex');

const database = knex({
    client:'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'testing',
        database: 'store'
    }});
const app = express();


// const db = knex({
//     client:'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: 'testing',
//         database: 'store'
//     }
// });

const products = require('./controller/products');
const checkout = require('./controller/checkout');
const departments = require('./controller/departments');
const payment = require('./controller/payment');
app.use(express.json())

app.use(cors())

// console.log('data',database('products').select('*').then(data=>console.log(data)))

// console.log('db',db)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./server.html'))
})
app.get('/server.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'./server.css'))
})
// app.post('/products',(req,res)=>{
    // console.log(db.select,'here')
    // products.getProduct(req,res,database)})
app.get('/departments',(req,res)=>{departments.getDepartments(req,res,database)})
app.post('/products',(req,res)=>{products.getProduct(req,res,database)})
app.post('/checkout',(req,res)=>{checkout.checkout(req,res,database)})
app.post('/payment',(req,res)=>{payment.makePayment(req,res,database)})
app.listen(8000,console.log('listening on port 8000'))