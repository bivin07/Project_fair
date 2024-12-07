import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import titleimage1 from '../assets/images/titleimg1.gif';
import ProjectCard from '../components/ProjectCard';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI';

function Home() {

const[isLoggedIn,setIsLoggedIn]=useState(false)
const[allProjects,setAllProjects]=useState()



const navigate =useNavigate()
useEffect(()=>{
  getHomeProjects()
  if(sessionStorage.getItem("token")){
    setIsLoggedIn(true)
    
  }else{
    setIsLoggedIn(false)
  }
},[])

const getHomeProjects=async()=>{
  const result =await getHomeProjectAPI()
  if(result.status==200){
    setAllProjects(result.data)
  }else{
    console.log(result)
  }
}

const handleProjectsPage=()=>{
  if(sessionStorage.getItem("token")){
    navigate('/projects')
  }else{
    toast.warning("please login to explore our projects")
  }
}



  return (
<>

<div className="container-fluid rounded bg-info" style={{width:"100%",height:"90vh"}}>
  <Row className="d-flex align-items-center p-5">
    <Col sm={12} md={6} className="mt-5">

<h1 style={{fontSize:"80px"}} className='fw-bolder text-light'><i class="fa-solid fa-list-check me-2"></i>
  Project fair
</h1>
<p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, nihil harum tenetur eum sed rerum quidem, sit 
  expedita ipsa facilis non nostrum eveniet ipsum? Ipsa, possimus! Quisquam eius quibusdam alias.</p>
{isLoggedIn?

  <Link to={'/dashboard'} className='btn btn-warning'>Manage your projects</Link>:

    <Link to={'/login'} className="btn btn-warning">Start to Explore</Link>
}
    </Col>

    <Col sm={12} md={6} className="mt-5 ">
    <img  src={titleimage1} width={"500px"} alt="" />
    </Col>
  </Row>
</div>

<div className='all-projects mt-5'>
  <h1 className='text-primary fw-bolder text-center'>Explore Your Projects</h1>

<marquee scrollAmount={25}>


<Row>

{allProjects?.length>0?allProjects.map(project=>(
<Col sm={6} lg={4} md={2}>
<ProjectCard project={project}/>
</Col>
)):null

}


</Row>
</marquee>

<div className='d-flex justify-content-center text-dark mt-5 btn fs-2 'onClick={handleProjectsPage}>
  <p>view more projects</p>
</div>

</div>
<ToastContainer autoClose={2000} position='top-center' theme='colored'/>

</>
  )
}

export default Home
