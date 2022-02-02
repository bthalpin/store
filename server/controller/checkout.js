const temp = async (database,quantity) =>{
    let total= await database('products').select('price').where('id',item.id).then(data=>{
        
    })
    
    console.log(total,'total')
    return total
}

const checkout = (req,res,database)=>{
    const {checkout,quantity} = req.body
console.log(checkout,quantity)
let ids = []
let total = [];
let i=-1
console.log(checkout.reduce((acc,item)=>{
    console.log(acc,item)
    return acc+=(quantity[item.id]*parseFloat(item.price))
},0),'grand total')
    // ids.push(parseInt(item.id))
// })
console.log(ids)
// database('products').select('price').whereIn('id',ids).then(data=>{
//     console.log(data)
//     total=data
    checkout.forEach((item)=>{
        
database('products').where('id',item.id).then(data=>{
    console.log(data[0].quantity,'data',item.quantity)
    let number=data[0].quantity-quantity[item.id]
    console.log(number,'number')
    database('products').where('id',item.id).update('quantity',number).then(data=>{
        console.log(data,'343')
    })
})
        database('products').select('price').where('id',item.id).then(data=>{
            console.log(parseFloat(data[0].price)*quantity[item.id],'inside for each')
            if (parseFloat(data[0].price)>0){
                console.log('yes',checkout)
                item.price=100.00;
                console.log('item,',checkout)
            }
            // total.push(parseFloat(data[0].price)*quantity[item.id])
        }).then(console.log('did it work',checkout))
    })
    console.log('final',total,checkout)
// }).then(console.log(total,'total'))

// temp(database,ids).then(res=>{console.log(res)})
// temp(database,quantity).then(res=>console.log(res))

// console.log(totals,'totals')
// const finalTotal = await total
// const output = await finalTotal.reduce((acc,item)=>{
//     console.log(acc,item)
//     i++
//     return acc + item.price*quantity[i]
// },0)
// console.log(total,'total')
// database.raw('select price from products where id in (?)', [parseInt(ids)]).then(data=>{
//     console.log(data)
// })

// let i=-1
//     checkout.forEach((item)=>{
//         database('products').select('price').where('id',item.id).then(data=>{
//             console.log(data)
//             finalPrice.push(data[0].price)
//         }).then(console.log(finalPrice))
//     })
    // let total = checkout.reduce((acc,item)=>{
    //     database('products').select('price').where('id',item.id).then(data=>{
    //         i++
    //         let currentPrice = parseFloat(data[0].price)*parseInt(quantity[i])
            
    //         console.log(data,quantity[i],currentPrice)
    //         return acc+parseFloat(currentPrice)
    //     })
    //     },0)
    // console.log(finalPrice)
    // console.log(output)
}

module.exports = {
    checkout
}