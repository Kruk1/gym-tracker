import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import '../css/login.css';
import '../css/cleanStyle.css';
import axios from 'axios';

function LoginForm() {
    const [login, setLogin] = useState({
        login: '',
        password: ''
    })
    const [height, setHeight] = useState<number>()
    const location = useLocation()
    const [response, setResponse] = useState(location.state)
    const navigate = useNavigate()
    window.history.replaceState({}, document.title)

    useEffect(() =>
    {
        setHeight(window.innerHeight)
    }, [])

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
        try
        {
            event.preventDefault();
            if(!login.login)
            {
                setResponse('Username is required!')
                return
            }
            if(!login.password)
            {
                setResponse('Password is required!')
                return
            }
            await axios.post(`http://localhost:5000/auth/login`, {
                login: login.login.trim(),
                password: login.password
            })
            navigate('/user/plans', { replace: true })        
        }
        catch(e: any)
        {
            event.preventDefault()
            const errors = e.response.data.message
            setResponse(errors)
        }
    }

    return (
        <main className="log-in-center" style={{height: height}}>
            <form className='log-in-form' onSubmit={handleSubmit}>
                {response && <div className="error">{response}</div>}
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