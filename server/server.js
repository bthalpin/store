const express = require('express');

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


app.use(express.json())

app.use(cors())

console.log('data',database('products').select('*').then(data=>console.log(data)))

// console.log('db',db)
app.get('/',(req,res)=>{
    res.send('working')
})
// app.post('/products',(req,res)=>{
    // console.log(db.select,'here')
    // products.getProduct(req,res,database)})
app.post('/products',(req,res)=>{products.getProduct(req,res,database)})
app.listen(3000,console.log('listening on port 3000'))