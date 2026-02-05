const mongoose=require('mongoose')


const dbCon=async(url)=>{
    try{
        await mongoose.connect(url)
        console.log('db connected')
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
module.exports=dbCon