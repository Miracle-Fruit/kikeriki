import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import './App.css';
import { useEffect } from 'react';
import { getAuthToken } from './Services/CassandraService';

function App() {
  useEffect(() => {
    getAuthToken();
  }, [])
  


  return (
    <div className="app">
      <Sidebar />
      <Feed />
      <div className='filler' />
    </div>
  );
}

export default App;
