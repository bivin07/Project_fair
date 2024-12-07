import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../../ContextAPI/ContextShare';

function AddProject() {

  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)


const [show, setShow] = useState(false);

const handleClose = () => {setShow(false);
setProjectData({title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
setPreview("")
  }

const handleShow = () => setShow(true);



const[projectData,setProjectData]=useState({
  title:"",languages:"",overview:"",github:"",website:"",projectImage:""
})

const[fileStatus,setFileStatus]=useState(false)
const[preview,setPreview]=useState("")
 console.log(projectData.projectImage.type)

useEffect(()=>{
  if(projectData.projectImage.type=='image/png'||projectData.projectImage.type=='image/jpeg'||projectData.projectImage.type=='image/jpg'){
    // console.log("generate url");
    setPreview(URL.createObjectURL(projectData.projectImage))
    setFileStatus(false)
  }else{
    // console.log("please provide following extension")
    setFileStatus(true)
    setProjectData({...projectData,projectImage:""})
  }
},[projectData.projectImage])

console.log(projectData)


const handleAddProjects= async()=>{
  const{title,languages,github,overview,website,projectImage}=projectData
  if(!title||!languages||!github||!overview||!website||!projectImage){
    toast.info("please provide missing fileds")
  }else{
    const reqBody=new FormData()

    reqBody.append("title",title)
    reqBody.append("languages",languages)
  
    reqBody.append("github",github)
    reqBody.append("overview",overview)
    reqBody.append("website",website)
    reqBody.append("projectImage",projectImage)



    const token =sessionStorage.getItem("token")
  
    if(token){
      const reqHeader={
        "Content-Type":"multipart?form-data",
        "authorization": `Bearer ${token}`
      }
      //api call
      try{
        const result =await addProjectAPI(reqBody,reqHeader)
        console.log(result)
        if(result.status==200){
          handleClose()
          setAddProjectResponse(result.data)
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
    <>

<Button className='m-2' variant="primary" onClick={handleShow}>
        Add-Projects
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>projects detils</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label >
                <input type="file" style={{display:"none"}}
                onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}
                
                
                />
                <img height={"350px"} width={"100%"} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpk8phgHgvuMbFyWkqa092rxHgdj9fbX_Uw&s "} alt="" />
              </label>
              {fileStatus&& <div className='mt-3 text-danger'>Please upload the following file extensions (jpeg/png/jpg)</div> }
            </div>

            <div className="col-6">
 <Form>

        <FloatingLabel
        controlId="floatingInput"
        label="Project-Title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Project_title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
      </FloatingLabel>
      

         <FloatingLabel
        controlId="floatingInput"
        label="language used"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="language used"onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
      </FloatingLabel>



         <FloatingLabel
        controlId="floatingInput"
        label="overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="overview" onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
      </FloatingLabel>


         <FloatingLabel
        controlId="floatingInput"
        label="Github"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Github" onChange={e=>setProjectData({...projectData,github:e.target.value})} />
      </FloatingLabel>


         <FloatingLabel
        controlId="floatingInput"
        label="Website link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="website link" onChange={e => setProjectData({...projectData, website: e.target.value})} />

      </FloatingLabel>
      



     </Form>

            </div>

          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProjects}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position='top-center' theme="colored" />
      
    </>
  )
}

export default AddProject
