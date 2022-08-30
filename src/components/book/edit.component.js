import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditBook() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [judul, setJudul] = useState("")
  const [penulis, setPenulis] = useState("")
  const [penerbit, setPenerbit] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [tahun_terbit, setTahun] = useState("")
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchBook()
  },[])

  const fetchBook = async () => {
    await axios.get(`http://localhost:8000/api/book/${id}`).then(({data})=>{
      const { judul,penulis,penerbit,deskripsi,tahun_terbit } = data.book
      setJudul(judul)
      setPenulis(penulis)
      setPenerbit(penerbit)
      setDeskripsi(deskripsi)
      setTahun(tahun_terbit)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const updateBooks = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('judul', judul)
    formData.append('penulis', penulis)
    formData.append('penerbit', penerbit)
    formData.append('deskripsi', deskripsi)
    formData.append('tahun_terbit', tahun_terbit)

    await axios.post(`http://localhost:8000/api/books/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/book")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Book</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateBooks}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="judul">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" value={judul} onChange={(event)=>{
                              setJudul(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="penulis">
                            <Form.Label>Penulis</Form.Label>
                            <Form.Control type="text" value={penulis} onChange={(event)=>{
                              setPenulis(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="penerbit" className="mb-3">
                        <Form.Label>Penerbit</Form.Label>
                        <Form.Control type="text" value={penerbit} onChange={(event)=>{
                              setPenerbit(event.target.value)
                            }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="deskripsi" className="mb-3">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control type="textarea" rows={3} value={deskripsi} onChange={(event)=>{
                              setDeskripsi(event.target.value)
                            }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="tahun_terbit" className="mb-3">
                        <Form.Label>Tahun Terbit</Form.Label>
                        <Form.Control type="date" selected={tahun_terbit} onChange={(event)=>{
                              setTahun(event.target.value)
                            }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}