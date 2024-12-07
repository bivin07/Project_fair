import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { useContext } from 'react';
import { TokenAuthContext } from '../../ContextAPI/TokenAuth';


function Auth({register}) {

const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

    const isRegisterForm=register?true:false
    const navigate=useNavigate()

   
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })


const handleRegister= async(e)=>{
    e.preventDefault()
 const{username,email,password}=userData
 if(!username||!email||!password){
    toast.info("please fill the missing field")
 }else{
    try{
       const result =await registerAPI(userData)
       console.log(result);
       
       if(result.status==200){
        toast.success(`${result.data.username} has sucesfully registered`)
        console.log(result.data.username);
        
        navigate('/login')
        setUserData({username:"",email:"",password:""})
       }else{
        toast.warning(result.response.data)
       }
    }catch(err){
        console.log(err)

    }
 }

}


const handleLogin= async(e)=>{
 e.preventDefault()

 const{email,password}=userData
 if(!email||!password){
    toast.info("please fill the filling fields")
 }else{
    try{
        const result =await loginAPI({email,password})
        console.log(result);
        
        if(result.status==200){
            sessionStorage.setItem("username",result.data.existingUser.username)
            sessionStorage.setItem("token",result.data.token)
            navigate('/')
            setIsAuthorized(true)
            setUserData({email:"",password:""})
        }else{
            toast.warning(result.response.data)
        }
    }catch(err){
      console.log(err)
    }
 }


 }






  return (
    <>

    <div style={{marginTop:"50px"}} className='d-flex justify-content-center align-items-center'>

        <div className='container w-75'>
            <Link to={'/'} style={{textDecoration:"none",color:"blue",fontWeight:"bolder"}}>
            Back to Home
            </Link>
        <div className="card shadow p-3 bg-info ">
            <div className="row align-items-center ">
                <div className="col-lg-6">
                    <img src="https://img.freepik.com/premium-vector/login-form-computer-sign-account_7087-1749.jpg" alt="" width={"100%"}/>
                    
                </div>
                <div className="col-lg-6">
                    <div className='d-flex align-items-center flex-column '>
                        <h1 className='fw-bolder text-light mt-2'>Project Fair</h1>
                        <h5 className='fw-bolder text-light mt-2 '>
                            {
                                isRegisterForm?"sign up to your account  ":"sign in to your account"
                            }
                        

                        <Form className="mt-4 text-dark">
                            {
                                isRegisterForm&& 

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                
                                  <Form.Control type="text" placeholder="enter your username"
                                  onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
                                  
                                </Form.Group>
                            }



      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      
        <Form.Control size="lg" type="email" placeholder="Enter your email" 
        onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        
        <Form.Control size="lg" type="password" placeholder="enter your password" 
        onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
      </Form.Group>
      {

isRegisterForm?
<div className='mt-3'>
    <button className='btn btn-warning'onClick={handleRegister} > Register </button>
    <p className='text-light fw-bolder mt-2'>  Already have an account ?Click here to  <Link to={'/login'}  style={{textDecoration:"none",color:"green"}}>login</Link>  </p>
</div>:

<div className='mt-3' >
    <button className='btn btn-warning ' onClick={handleLogin}>login</button>
    <p className='text-light fw-bolder mt-2'>New User?Click here to <Link to={'/register'}  style={{textDecoration:"none",color:"red"}}>Register</Link> </p>

</div>
     }

    </Form>

      </h5>

                    </div>

                </div>
            </div>
        </div>



        </div>
    </div>
    <ToastContainer autoClose={2000} position='top-center' theme="colored" />
      
    </>
  )
}

export default Auth
