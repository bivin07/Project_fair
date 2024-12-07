const projects =require('../Model/projectSchema')

exports.addProject=async(req,res)=>{
    console.log("inside add project function")
    const{title,languages,overview,github,website}=req.body
    const projectImage=req.file.filename
    const userId=req.payload
    
    //console.log(title,languages,overview,github,website,projectImage)


    try{
    
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json("project already exist ...")
    }else{
        const newProject=new projects({
            title,languages,github,overview,website,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }

    }catch(err){
        res.status(401).json(err)
    }


}


//get homeprojects
exports.getHomeProjects=async(req,res)=>{
    try{
        const getHomeProjects=await projects.find().limit(3)
        res.status(200).json(getHomeProjects)

    }catch(err){
      res.status(401).json(err)
    }
}

//getAllProjects

exports.getAllProjects=async(req,res)=>{
    const searchkey =req.query.search
    const query={
         languages:{$regex:searchkey,$options:"i"}
    }
    try{
     const allProjects=await projects.find(query)
     res.status(200).json(allProjects)
    }catch(err){
     res.status(401).json(err)
    }
}

// getUSerProjects

exports.getUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
       res.status(401).json(err)
    }
}


//editProject

exports.editProject=async(req,res)=>{
    const{title,languages,github,overview,website,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    const userId=req.payload
    const {pid}=req.params

    
    try{
     const updateProject= await projects.findByIdAndUpdate({_id:pid},{
        title,languages,github,overview,website,projectImage:uploadImage,userId
     },{new:true})

       await  updateProject.save()
       res.status(200).json(updateProject)

    }catch(err){
       res.status(401).json(err)
    }

}

//delete project

exports.deleteProject=async(req,res)=>{
    const {pid}=req.params

    try{
        const deleteData= await projects.findByIdAndDelete({_id:pid})
          result.status(200).json(deleteData)
    }catch(err){
     res.status(401).json(err)
    }
}