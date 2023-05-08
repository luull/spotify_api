import React, { useState } from 'react'
import { Button, Form, Row, Col, Container, Card, Modal } from 'react-bootstrap';

const Learn1 = () => {
  const [data, setData]=useState([])
  const [modal, setModal]=useState(false)
  const handleChange = (event) => {
    const label = event.target.name;
    const value = event.target.value;
    setData(values => ({...values, [label] : value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data)
    setModal(true)
  }
  const handleClose = () => setModal(false);
  return (
    <>
    <Container>
      <Row className="justify-content-center my-5">
      <Col md={10}>
        <Row className="mb-3 justify-content-center">
          <Col md={10}>
              <Card>
                <Card.Body className="p-5">
                  <h1>Login</h1>
                  <hr style={{width:'10%',border:'2px solid grey'}}/>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name='username' value={data.username || ''} onChange={handleChange} required/> 
                        <Form.Control.Feedback type="invalid">
                          Username is required
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={data.password || ''} onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">
                          Username is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='my-4'>
                
                      <div className="d-grid gap-2">
                        <Button type="submit" variant='dark'>Login</Button>
                      </div>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Col>
      </Row>
      </Container>
      <Modal show={modal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {Object.entries(data).map(([key,value], i) => 
                <p>
                  {key} : {value}
                </p>
              )}
          </Modal.Body>
      </Modal>
    </>
  )
}

export default Learn1