
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'

import Projects from './Pages/Projects'
import Auth from './Pages/Auth'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'
import { useContext } from 'react'

function App() {
 
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={isAuthorized?  <Dashboard/>:<Home/>}/>
    <Route path='/login' element={ <Auth/>}/>
    <Route path='/register' element={<Auth register/>}/>
    <Route path='/projects' element={isAuthorized? < Projects/>:<Home/>}/>
    <Route path='/*' element={ <Navigate to={'/'}/>}/>
   

    </Routes>



    </>
  )
}

export default App
