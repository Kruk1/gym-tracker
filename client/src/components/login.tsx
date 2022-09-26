import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import '../css/login.css';
import '../css/cleanStyle.css';
import {useAuth,useSetAuth} from '../context/AuthContext'
import axios from 'axios';

function LoginForm() {
    const [login, setLogin] = useState({
        login: '',
        password: ''
    })
    const setAuth = useSetAuth()
    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setLogin(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        const res = await axios.post(`/auth/login`, {
            login: login.login,
            password: login.password
        })
        if(res.status === 200)
        {
            setAuth(res.data)
            navigate('/plans')
        }
    }

    return (
        <main className="log-in-center">
            <form className='log-in-form' onSubmit={handleSubmit}>
                <i className="icon-user"></i>
                <label htmlFor="text">Login</label>
                <input type="text" name='login' value={login.login} onChange={handleChange} className="log-in-input" placeholder='login' autoComplete='off' />
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={login.password} onChange={handleChange} className="log-in-input" placeholder='password' />
                <button>Log In</button>
            </form>
        </main>
    );
}

export default LoginForm;