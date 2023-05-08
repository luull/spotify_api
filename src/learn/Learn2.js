
import React, { useEffect, useState } from 'react'
import {Container, Table, Row, Col, Button,Modal, Form} from 'react-bootstrap'
import axios from "axios";
import Swal from 'sweetalert2'
const Learn2 = () => {
    useEffect(()=> {
        getData()
        getJabatan()
        getKontrak()
    },[])
const [data, setData]=useState([])
const [jabatan, setJabatan]=useState([])
const [kontrak, setKontrak]=useState([])
const [onload, setOnload]=useState(true)
const [show, setShow]=useState(false)
const [send, setSend]=useState([])
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const getData = async() => {
    const ress = await axios.get('http://127.0.0.1:8000/api/pegawai').then((response) => {
        console.log(response.data.data)
        setData(response.data.data)
        setOnload(false)
      });
    // const response = await fetch('http://127.0.0.1:8000/api/pegawai',{
    //     method:'GET',
    // }).then((response)=>response.json())

}
const getJabatan = async() => {
    const ress = await fetch('http://127.0.0.1:8000/api/jabatan',{
        method:'GET',
    }).then((ress) => ress.json())
    setJabatan(ress.data)
    setOnload(false)
}
const getKontrak = async() => {
    const res = await fetch('http://127.0.0.1:8000/api/kontrak',{
        method:'GET',
    }).then((res)=>res.json())
    setKontrak(res.data)
    setOnload(false)
}

const handleChange = (event) => {
    const label = event.target.name
    const value = event.target.value
    setSend(values=> ({...values, [label] : value}))
}
const handleSubmit = (event) => {
    event.preventDefault()
    console.log(send)
    axios.post('http://127.0.0.1:8000/api/pegawai/add/',{
            'nama' : send.nama,
            'jab_id' : send.jabatan,
            'kon_id' : send.kontrak,
    }).then(function (response) {
        console.log(response);
        setShow(false)
        setOnload(false)
        console.log(data)
        Swal.fire({
            title: 'Success!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  
}
const handleDelete = (id) => {
    console.log(id)
    axios.delete('http://127.0.0.1:8000/api/pegawai/delete/'+id).then(function (response) {
        console.log(response.data);
        Swal.fire({
            title: 'Success!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    })
}
  return (
    <>
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={10}>
                    <Button variant='dark' className="mb-3" onClick={handleShow}>Tambah</Button>
                {onload === false ? (

                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Jabatan</th>
                                <th>Kontrak</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((datas, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{datas.nama}</td>
                                <td>{datas.jabatan.jabatan}</td>
                                <td>{datas.kontrak.kontrak}</td>
                                <td><a href="#" onClick={()=> handleDelete(datas.id)}>Hapus</a></td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    ):(
                    <p>Loading</p>
                    )}
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" name="nama" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Select name="jabatan" onChange={handleChange}>
                                {jabatan.map((datas, i) => (
                                    <option key={i} value={datas.id}>{datas.jabatan}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Kontrak</Form.Label>
                            <Form.Select name="kontrak" onChange={handleChange}>
                                {kontrak.map((datas, i) => (
                                    <option key={i} value={datas.id}>{datas.kontrak}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </>
  )
}

export default Learn2