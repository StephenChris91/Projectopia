import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


//styles
import './Navbar.css';

//create a new functional component and export it as default
const Navbar = () => {

    const { logout, error, isPending } = useLogout();
    const { user } = useAuthContext();
    
        return (
            <div className="navbar">
                <ul>
                    <li className="logo">
                        <span>Projectopia</span>
                    </li>

                    {!user && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}

                    {user && (
                            <li>
                                <button className="btn" onClick={logout}>Logout</button>
                            </li>
                    )}
                    {error && <div>{error}</div>}
                </ul>
            </div>
        );
}

export default Navbar;