import { useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSetHeight } from '../context/AuthContext';
import '../css/cleanStyle.css';
import '../css/nav.css'

function Nav() {
    const setHeight = useSetHeight()
    const ref = useRef<HTMLElement | any>()

    useEffect(() =>
    {
        setHeight(ref.current.clientHeight)
    })

    return (
        <>
            <header ref={ref}>
                <nav>
                    <ul>
                        <li><Link to='/user/plans'>Tracker</Link></li>
                        <li><Link to='/user/timer'>Timer</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    );
}

export default Nav;