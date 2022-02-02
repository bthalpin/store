const getDepartments = (req,res,database)=>{


database('departments')
.select('*')
.then(data=>{
    res.json(data)
})
.catch(err=>res.status(400).json('Unable to fetch data'))

}

module.exports = {
    getDepartments
}