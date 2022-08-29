import {useRef, useState, useEffect} from 'react';
import '../../index.css';



function Login(){
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('' );
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, [])

    return(
        <section>
            <p ref={errRef} className={errMsg ? "errsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        </section>
    )
}

export default Login