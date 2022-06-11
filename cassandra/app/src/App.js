import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Feed />
      <div className='filler' />
    </div>
  );
}

export default App;
