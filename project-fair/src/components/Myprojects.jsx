import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import {  deleteProjectAPI, getuserProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../../ContextAPI/ContextShare'
import EditProject from './EditProject'


function Myprojects() {

   const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

  const[allProjects,setAllProjects]=useState([])

  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)


const getUserProjects= async()=>{
  const token =sessionStorage.getItem('token')
  if(token){
    const reqHeader={
      "Content-Type":"multipart/form-data",
      "authorization":`Bearer ${token}`
    }
     try{
      const result =await getuserProjectAPI(reqHeader)
      if(result.status==200){
        setAllProjects(result.data)
      }else{
        console.log(result)
      }
     }catch(err){
      console.log(err)
     }


  }
}

console.log(allProjects)

useEffect(()=>{
  getUserProjects()
},[addProjectResponse,editProjectResponse])



const deleteProjects=async(pid)=>{
  const token=sessionStorage.getItem("token")

if(token){
  const reqHeader={
       "Content-Type":"application/json",
      "authorization":`Bearer ${token}`
  }
//api call
try{
  const result =await deleteProjectAPI(pid,reqHeader)
  if(result.status==200){
getUserProjects()
  }else{
    console.log(result.response.data)
  }
 }catch(err){
  console.log(err)
 }



}


}


  return (
    <>
    <div className="card shadow mt-5 ">
      <div className="d-flex">
        <h2>My Projects</h2>
      </div>
      <div className="ms-auto">
        <AddProject/>
      </div>

{ allProjects.length>0?allProjects.map((project,index)=>(

      <div key={index} className=" mt-4 border container-fluid d-flex ">

         <h2 className='text-danger fw-bolder'>{project?.title} </h2> 
       <div className='  d-flex ms-auto align-items-center '> 

       <EditProject project={project} />
      
       <a className='me-3 btn text-dark' href={project?.title} target='_blank'><i class="fa-brands fa-github"></i></a>
      <button className='btn' onClick={()=>deleteProjects(project?._id)} > 
         <i class="fa-solid fa-trash"></i>
        </button>

       </div>
   

      </div>
  

)):  <p className='text-danger fw-bolder '>No Projects added yet</p>
  
}
    </div>
      
    </>
  )
}

export default Myprojects
