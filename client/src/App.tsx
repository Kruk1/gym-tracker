import './css/App.css';
import LoginForm from './components/login';
import {Route, Routes} from "react-router-dom"
import {AuthProvider} from './context/AuthContext';

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                    <Route path='/plans' />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
