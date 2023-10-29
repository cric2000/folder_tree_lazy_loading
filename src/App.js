import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Structure from './pages/Structure/index';
import Lazyloading from './pages/Lazyloading/index';
function App() {
  return (
    <Router>
    <div>
      <nav className="bg-gray-800 text-white w-full py-2 fixed top-0 z-999">
      <div className="container mx-auto py-2 flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-4xl font-bold ml-2">StrucTure</Link>
            </div>
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/lazy-loading">lazyLoading</Link></li>
             
            </ul>
          </div>
      </nav>
    
    <Routes>
      <Route path="/" exact element={<Structure/>} />
      <Route path="/lazy-loading" exact element={<Lazyloading/>} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
