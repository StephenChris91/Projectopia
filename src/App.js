import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import './App.css'

//components
import Dashboard from './Pages/Dashboard/Dashboard';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Project from './Pages/Project/Project';
import Create from './Pages/Create/Create';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import OnlineUsers from './Components/OnlineUsers';
import Profile from './Pages/Profile/Profile';
import  ProtectedRoutes from './hooks/ProtectedRoutes';



function App() {
  

  const { user, authIsReady } = useAuthContext();


  return (
    
      <div className="App">
        {authIsReady && (<BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/project/:id" element={<Project />} />
                </Route>
              </Routes>
            </div>
            {user && <OnlineUsers />}
          </BrowserRouter>
        )}
      </div>
    
  );
}

export default App
