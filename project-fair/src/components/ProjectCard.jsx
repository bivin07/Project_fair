import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Modal, Row } from 'react-bootstrap';
import { server_url } from '../services/server_url';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${server_url}/uploads/${project?.projectImage}`} onClick={handleShow} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>       
      </Card.Body>
    </Card>




    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Projects Details</Modal.Title>
        </Modal.Header>
        


        <Row>
          <Col md={6}>
          <img src={`${server_url}/uploads/${project?.projectImage}`} width={"100%"} alt="" />
          </Col>
       <Col>
          <h1 className='fw-bolder text-danger'>{project?.title}</h1>
          <h3 className='fw-bolder text-danger'> Languages Used:{project?.languages}</h3>
          <p><span className='fw-bolder text-danger'>OverView:</span>{project?.overview}</p>
          </Col>


        </Row>


<div className='mt-2'>
  <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github"></i></a>
  <a href={project?.website}  target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github"></i></a>

</div>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      


    </>
  )
}

export default ProjectCard
