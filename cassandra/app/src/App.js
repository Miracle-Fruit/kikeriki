import Sidebar from './Sidebar/Sidebar';
import Profile from './Profile/Profile';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import './App.css';
import { useEffect, useState } from 'react';
import { getAuthToken } from './Services/CassandraService';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({userID: "", username: ""});


  useEffect(() => {
    //setUser({userID: "123456789", username: "Hans63"})
    getAuthToken();
  }, [])
  
  if(user.userID === "") {
    return <Login setUser={setUser} />
  }

  return (
    <div className="app">
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed user={user}/>} />
          {console.log(user)}
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </BrowserRouter>  
      <div className='filler' />
    </div>
  );
}

export default App;
