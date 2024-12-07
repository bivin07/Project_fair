import React, { useEffect, useState } from 'react'
import Header from'../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'


import { getAllProjectAPI } from '../services/allAPI'

function Projects() {

  const[allProjects,setAllProjects]=useState([])
  const[searchkey,setSearchKey]=useState("")

console.log(searchkey)

  const getAllProjects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "authorization":`Bearer ${token}`

      }

      try{
        const result =await getAllProjectAPI(searchkey,reqHeader)
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
    getAllProjects()
  },[searchkey])

  return (
<>
    <Header/>


    <div className='projects mt-5'>
      <h1 className='text-center mb-5'>
        All  Projects     
      </h1>

      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex border w-50 rounded mb-3'>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" className='form-control ' placeholder='search by technologies'/>
          <i style={{marginLeft:"-40px"}} class="fa-solid fa-magnifying-glass fa-beat"></i>

        </div>
         
      </div>
      
    </div>

<Row >
  {allProjects?.length>0?allProjects.map(project=>(


  <Col sm={12} md={6} lg={4}>
 <ProjectCard project={project}/>
  </Col>
    )):<div>no projects</div>
}
</Row>

    </>
  )
}

export default Projects
