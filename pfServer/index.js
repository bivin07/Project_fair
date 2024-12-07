//loads env file contents into process.env by default 

require('dotenv').config()
const express =require('express')
const cors =require('cors')
const router =require('./Router/router')



const pfServer =express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))


require('../pfServer//DB/connection')

const PORT =3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer started running at PORT:${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.send("<h1>Project-Fair server  Running &  waiting for client requset </h1>")
})
