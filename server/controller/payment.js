
require("dotenv").config()
const stripe = require('stripe')(process.env.YOUR_SECRET_KEY)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port:465,
    host:'smtp.gmail.com',
    auth:{
        user:'halpinsoftware@gmail.com',
        pass:process.env.PASSWORD
    },
    secure:true,
})

const checkStock = async (checkout,quantity,database) => {
    
        const promises=checkout.map((item)=>{
            return new Promise((resolve,reject)=>{
            database('products').where('id',item.id).then(data=>{
                resolve(data[0].quantity-quantity[item.id]>=0)
                    
                
                })
        })})
        return await Promise.all(promises)
        // console.log(out,checkout.length,'check')
       
       
            
}

const makePayment = async (req,res,database) => {

    const { amount,id,first,last,email,checkout,quantity } = req.body
    let processed = false
    // let stock = true
    // for (let i=0;i<checkout.length;i++){
    //     database('products').where('id',checkout[i].id).then(data=>{
    //         if (data[0].quantity-quantity[checkout[i].id]<0){
    //             stock=false
    //         }
    //     })
    //     if (i=checkout.length-1){

    //     }
    // }
    // checkout.every((item)=>database('products').where('id',item.id).then(data=>{
    //     data[0].quantity-quantity[item.id]>=0
            
    //     })).then(async (data)=>{

        // console.log(stock)
        // if (stock){
                console.log('CHECKOUT',checkout)
                const mailData = {
                    from:'halpinsoftware@gmail.com',
                    to:email,
                    subject:'Payment Confirmation',
                    text:`Dear ${first},\nYour card was charged $${parseFloat(amount/100)}. Thank you for your purchase.\nThe software design team at Halpin Software`
                }
                try {
                    const payment = await stripe.paymentIntents.create({
                        amount,
                        currency: 'USD',
                        description: 'Halpin Merchandise',
                        payment_method: id,
                        confirm: true
                    })
                    console.log('payment',payment,first,last,email)
                    transporter.sendMail(mailData,(err,info)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(info,'mail sent')
                        }
                    })
                    res.json({
                        message:'Payment Succesful',
                        success:true
                    })
                    processed=true
                    
                } catch(error) {
                    console.log('Error This card failed!!!!',error)
                    res.json({
                        message:'Payment Fail',
                        success:false
                    })
                }
                if(processed){
                    checkout.forEach((item)=>{
                    
                        database('products').where('id',item.id).then(data=>{
                            let number=data[0].quantity-quantity[item.id]
                            database('products').where('id',item.id).update('quantity',number).then(data=>{
                                console.log(data,'343')
                            })
                        })})}
            // }else{
            //     res.json({
            //         message:'Out of Stock',
            //         success:false
            //     })
            // }
        
            
        
    
    
}

module.exports = {
    makePayment
}