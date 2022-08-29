import React, {useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [validationError,setValidationError] = useState({})
    const register = async (e) => {
        e.preventDefault();
    
    const formData = new FormData()
    
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)

    await axios.post(`http://localhost:8000/api/register`, formData).then(({data})=>{
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/register")
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

    {  

    return(
        <div>
            <div className="container">
            <div className="col-sm-4 offset-sm-4">
            <h3 className="mb-5 text-center">Halaman Register</h3>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="name">Nama Lengkap  :</label>
                    </div>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name"></input>
                </div>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="email">Email  :</label>
                    </div>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email"></input>
                </div>
                <div className="form-group mb-3">
                    <div className="text-start mb-1">
                        <label htmlFor="password">Password  :</label>
                    </div>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password"></input>
                </div>
                <button type="submit" onClick={register} class="btn btn-primary">Sign Up</button>
            </div>
            </div>
        </div>
    )
}
}

export default Register