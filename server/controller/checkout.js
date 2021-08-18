const checkout =(req,res,database)=>{
    const {checkout,quantity} = req.body

let i=-1
    let total = checkout.reduce((acc,item)=>{
        database('products').select('price').where('id',item.id).then(data=>{
            i++
            return acc+=parseFloat(data)*parseInt(quantity[i])
        })
        },0)
    console.log(total)
}

module.exports = {
    checkout
}