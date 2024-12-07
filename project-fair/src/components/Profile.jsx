import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'

function Profile() {

  const [open,setOpen] =useState(false);

  return (
    <div style={{marginTop:"50px"}}>

      <div className="card shadow p-5 me-2 mt-5 ">

        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button onClick={()=>setOpen(!open)} className='btn btn-outline-info '><i class="fa-solid fa-angle-down"></i></button>

        </div>


      <Collapse in={open}>
     <div className='row   p-5'>
        <label >
          <input type="file" style={{display:"none"}} />
          <img className='ms-3' width={'70%'} height={'200px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" alt="Profile" />
        </label>

        <div className='mt-5'>
          <input type="text" placeholder='GitHub Link' className='form-control' />
          <br />
          <input type="text" placeholder='GitHub Link' className='form-control' />
        </div>

        <div className='d-grid mt-5'>
          <button className='btn btn-warning'>Update</button>

        </div>

      </div>
     </Collapse>
      
      </div>
     

    


    </div>
  )
}

export default Profile
