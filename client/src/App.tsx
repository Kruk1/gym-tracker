import './App.css';
import {useState, useEffect} from 'react';
const axios = require('axios')

function App() {
    const [api, setApi] = useState('')

    useEffect(() =>
    {
        async function apiGet()
        {
            const req = await axios.get('/api')
            setApi(req.data.elo)
        }
        apiGet()
    }, [])

    return (
        <div className="App">
        {api}
        </div>
    );
}

export default App;
