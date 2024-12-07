const mongoose =require('mongoose')

const connection_string =process.env.connection_string

mongoose.connect(connection_string).then(()=>{
    console.log("project-fair application sucessfull connected to mongoDB-Atlas");
}).catch((err)=>{
    console.log("mongoDB connection faild ",err)
})