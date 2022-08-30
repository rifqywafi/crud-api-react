import React, {useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    
    useEffect(() => {
      if(localStorage.getItem('token')){
          navigate('/home');
      }
    },[]);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

    const [validationError,setValidationError] = useState({})

    const register = async (e) => {
        e.preventDefault();
    
    const formData = new FormData()
    
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', passwordconfirm)

    await axios.post(`http://localhost:8000/api/auth/register`, formData)
    .then(({data})=>{
        Swal.fire({
          icon:"success",
          text:"Akun Berhasil Dibuat"
        })
        navigate("/login")
      }).catch((error)=>{
          setValidationError(error.response.data)
      })
    }

    {  

    return(
        <div>
          <Form onSubmit={register}>
            <div className="container">
            <div className="col-sm-4 offset-sm-4">
            <h3 className="mb-5 text-center">Halaman Register</h3>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="name">Nama  :</label>
                    </div>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name"></input>
                        {
                          validationError.name && (
                            <small className="text-danger">
                              {validationError.name[0]}
                            </small>
                          )
                        }
                </div>
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
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="password_confirm">Konfirmasi Password  :</label>
                    </div>
                        <input type="password" value={passwordconfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} className="form-control" id="password_confirmation"></input>
                        {
                          validationError.passwordconfirm && (
                            <small className="text-danger">
                              {validationError.passwordconfirm[0]}
                            </small>
                          )
                        }
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
            </div>
            </Form>
        </div>
    )
}
}

export default Register