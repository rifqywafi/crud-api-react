import React, {useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/home');
        }
    },[]);
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [validationError,setValidationError] = useState({})

    const login = async (e) => {
        e.preventDefault();
    
    const formData = new FormData()
    
    formData.append('email', email)
    formData.append('password', password)

    await axios.post(`http://localhost:8000/api/auth/login`, formData)
    .then((response)=>{

        console.log(response.data.access_token)
        localStorage.setItem('token',response.data.access_token);

        Swal.fire({
          icon:"success",
          text:"Anda Berhasil Login"
        })

        navigate("/home")

      }).catch((error)=>{
        if(error.response){
          setValidationError(error.response.data)
        } 
        if(error.response.status === 401){
          Swal.fire({
            text:"Akun Belum Didaftarkan",
            icon:"error"
          })
        }
      })
    }

    return(
        <div>
          <Form onSubmit={login}>
            <div className="container">
            <div className="col-sm-4 offset-sm-4">
            <h3 className="mb-5 text-center">Halaman Login</h3>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="email">Email  :</label>
                    </div>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email"></input>
                        {
                          validationError.email && (
                            <small className="text-danger">
                              {validationError.email[0]}
                            </small>
                          )
                        }
                </div>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="password">Password  :</label>
                    </div>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password"></input>
                        {
                          validationError.password && (
                            <small className="text-danger">
                              {validationError.password[0]}
                            </small>
                          )
                        }
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </div>
            </div>
            </Form>
        </div>
    )
}

export default Login