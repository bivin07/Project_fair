import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'
import Footer from '../components/Footer'

function Dashboard() {

const[username,setUsername]=useState("")

useEffect(()=>{
  if(sessionStorage.getItem("username")){
    setUsername(sessionStorage.getItem("username"))
  }else{
    setUsername("")
  }
},[])



  return (
    <>
<Header insideDashboard/>

<Row>

  {/* my projects */}
<Col sm={12} md={8}>
<h2>Welcome <span className='text-warning fw-bolder'>{username}</span></h2>
<Myprojects/>
</Col>

{/* profile */}

<Col sm={12} md={4}>
<Profile/>
</Col>


</Row>

   <Footer/>   
    </>
  )
}

export default Dashboard
