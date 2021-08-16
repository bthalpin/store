const getProduct = (req,res,database)=>{
    // console.log('db',database)
    const { category } = req.body;
// console.log(category)
database
.select('*')
.from('products')
.then(data=>{
    res.json(data)
})
.catch(err=>res.status(400).json('Unable to fetch data'))

}

module.exports = {
    getProduct
}