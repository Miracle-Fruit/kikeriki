import Sidebar from './Sidebar/Sidebar';
import Profile from './Profile/Profile';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import './App.css';
import { useEffect, useState } from 'react';
import { getAuthToken } from './Services/CassandraService';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({userID: "", username: ""});

  const logout = () => {
    setUser({userID: "", username: ""});
  }

  useEffect(() => {
    // Uncomment to skip login
   // setUser({userID: "123456789", username: "Hans63"})
    getAuthToken();
  }, [])
  
  if(user.userID === "") {
    return <Login setUser={setUser} />
  }

  return (
    <div className="app">
      <BrowserRouter>
      <Sidebar logout={logout} />
        <Routes>
          <Route path="*" element={user.userID !== "" && <Navigate replace to="/feed" />}></Route>
          <Route path="/feed" element={<Feed user={user}/>} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      <div className='filler' />
      </BrowserRouter>  
    </div>
  );
}

export default App;
