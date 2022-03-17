import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'


//styles
import './Sidebar.css';

//icons
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

//avatar
import Avatar from './Avatar';

export default function Sidebar () {

    const { user } = useAuthContext();
    const navigate = useNavigate()

    const showProfile = () => {
        navigate('/profile')
    }
    
        return (
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="user" >
                        <Avatar src={user.photoURL} />
                        <p>Hey {user.displayName}</p>
                        <button className='btn edit' onClick={showProfile}>Edit Profile</button>
                    </div>
                    <nav className="links">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    <img src={DashboardIcon} alt="dashboard" />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/create">
                                    <img src={AddIcon} alt="AddIcon" />
                                    <span>New Project</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
}

