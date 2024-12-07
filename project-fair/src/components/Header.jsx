import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../../ContextAPI/TokenAuth'

function Header({ insideDashboard}) {
  const navigate=useNavigate()
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  const handleLogOut=()=>{
sessionStorage.removeItem("username")
sessionStorage.removeItem("token")
setIsAuthorized(false)
navigate("/")
  }




  return (
    <div>
       <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
            <i class="fa-solid fa-list-check"></i>Project-fair

            </Link>
          </Navbar.Brand>

{insideDashboard&&
        <Button onClick={handleLogOut} className="btn btn-outline-warning text-light">
          Logout
        </Button>}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
