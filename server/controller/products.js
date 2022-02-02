const getProduct = (req,res,database)=>{
    // console.log('db',database)
    const { order } = req.body;
console.log(order)

database('products')
.select('*')
.orderBy('price',order)
.then(data=>{
    res.json(data)
})
.catch(err=>res.status(400).json('Unable to fetch data'))

}

module.exports = {
    getProduct
}