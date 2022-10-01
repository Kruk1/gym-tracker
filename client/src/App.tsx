import './css/App.css';
import LoginForm from './components/login';
import {Route, Routes} from "react-router-dom"
import {AuthProvider} from './context/AuthContext';
import MainContent from './components/mainContent';
import { CookiesProvider } from 'react-cookie';

function App() {
    return (
        <>
            <CookiesProvider>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<LoginForm />} />
                        <Route path='/plans' element={<MainContent />}/>
                    </Routes>
                </AuthProvider>
            </CookiesProvider>
        </>
    );
}

export default App;
