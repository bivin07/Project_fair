import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { server_url } from '../services/server_url';
import { updateProjectAPI } from '../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { editProjectResponseContext } from '../../ContextAPI/ContextShare';



function EditProject({project}) {
    console.log(project)

const{editProjectResponse,seteditProjectResponse}=useContext(editProjectResponseContext)
    
const [show, setShow] = useState(false);

const handleClose = () => {setShow(false);
setProjectData({ title:project?.title,
    languages:project?.languages,
    overview:project?.overview,
    github:project?.github,
    website:project?.website,
    projectImage:""})

  }


const handleShow = () => setShow(true);


const[projectData,setProjectData]=useState({
    id:project?._id,
    title:project?.title,
    languages:project?.languages,
    overview:project?.overview,
    github:project?.github,
    website:project?.website,
    projectImage:""
  })

  const[preview,setPreview]=useState("")

useEffect(()=>{
    if(projectData.projectImage){
        setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
        setPreview("")
    }
},[projectData.projectImage])





const handleUpdate= async()=>{
    const{id,title,languages,github,overview,website,projectImage}=projectData
    console.log(projectData)
    if(!title||!languages||!github||!overview||!website){
      toast.info("please provide missing fileds")
    }else{
      const reqBody=new FormData()
  
      reqBody.append("title",title)
      reqBody.append("languages",languages)
    
      reqBody.append("github",github)
      reqBody.append("overview",overview)
      reqBody.append("website",website)
       preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
  
  
      const token =sessionStorage.getItem("token")
    
      if(token){
        const reqHeader={
          "Content-Type":"multipart?form-data",
          "authorization": `Bearer ${token}`
        }
        //api call
        try{
          const result =await updateProjectAPI(id,reqBody,reqHeader)
          
          if(result.status==200){
            handleClose()
          seteditProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err)
          
        }
      }
    }
  }

  return (
    <div>

<button className='btn'>
<a className='me-3 btn text-dark' onClick={handleShow}><i class="fa-solid fa-pen-to-square"></i></a></button>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Style inside the modal */}
          <div className="row">

            <div className="col-6">
              <label>

                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img height={"350px"} width={"100%"} 
                src={preview?preview:`${server_url}/uploads/${project?.projectImage}`} alt="" />

              </label>
            </div>


            <div className="col-6">
              <Form>

                <FloatingLabel controlId="floatingInput1" label="Project Tile" className='mb-3' >
                  <Form.Control type="text" value={projectData.title} placeholder="Project Title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput2" label="languages used" className='mb-3'>
                  <Form.Control type="text" placeholder="Languages Used" value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput3" label="Overview" className='mb-3'>
                  <Form.Control value={projectData.overview} type="text" placeholder="Overview" onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput4" label="Github" className='mb-3'>
                  <Form.Control type="text" value={projectData.github} placeholder="GitHub"onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput5" label="Website link" className='mb-3'>
                  <Form.Control type="text" value={projectData.website} placeholder="Website Link" onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
                </FloatingLabel>



              </Form>
            </div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>EDIT</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position='top-center' theme="colored" />
      
    </div>

    
  )
}

export default EditProject
