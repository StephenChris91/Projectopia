import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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



function App() {

  const { user, authIsReady } = useAuthContext();


  return (
    
      <div className="App">
        {authIsReady && (<BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />

              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard/>}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create/>}
                </Route>
                <Route path="/Project/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project/>}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login/>}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/" />}
                  {!user && <SignUp/>}
                </Route>
              </Switch>
            </div>
            {user && <OnlineUsers />}
          </BrowserRouter>
        )}
      </div>
    
  );
}

export default App
