import './css/App.css';
import LoginForm from './components/login';
import {Route, Routes} from "react-router-dom"
import {AuthProvider} from './context/AuthContext';
import MainContent from './components/mainContent';
import { CookiesProvider } from 'react-cookie';
import Training from './components/training';

function App() {
    return (
        <>
            <CookiesProvider>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<LoginForm />} />
                        <Route path='/plans'>
                            <Route index element={<MainContent />} />
                            <Route path=':id' element={<Training />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </CookiesProvider>
        </>
    );
}

export default App;
