import axios from "axios";
import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/auth/me')
        .then((response) => {
            setUser(response.data);
        })
    }

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
        fetchData();
    },[]);

    return(
        <div>
            <h1>Hello, {user.name}</h1>
        </div>
    )
}