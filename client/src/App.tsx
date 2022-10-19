import './css/App.css';
import LoginForm from './components/login';
import {Route, Routes} from "react-router-dom"
import {AuthProvider} from './context/AuthContext';
import MainContent from './components/mainContent';
import { CookiesProvider } from 'react-cookie';
import Training from './components/training';
import Nav from './components/nav';
import Error404 from './components/error';
import Timer from './components/timer';

function App() {
    return (
        <>
            <CookiesProvider>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<LoginForm />} />
                        <Route path='/user' element={<Nav />}> 
                            <Route path='plans'>
                                <Route index element={<MainContent />} />
                                <Route path=':id' element={<Training />} />
                            </Route>
                            <Route path='timer' element={<Timer />} />
                        </Route>
                        <Route path='*' element={<Error404 />} />
                    </Routes>
                </AuthProvider>
            </CookiesProvider>
        </>
    );
}

export default App;
