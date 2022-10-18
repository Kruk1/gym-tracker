import { useHeight } from '../context/AuthContext';
import '../css/cleanStyle.css';
import '../css/loading.css'

function Loading() {
    const height = useHeight()

    return (
        <div className="center" style={{height: window.innerHeight - height}}>
            <div className="loading-spinner"></div>
        </div>
    );
}

export default Loading;