import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Fpwd from './pages/Fpwd';
import Agents from './pages/Agents';
import AdminLogin from './pages/AdminLogin';
import Error from './pages/Error';
import Customers from './pages/dashboard/Customers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact Component={Login}/>
          <Route path="/agents" exact Component={Agents}/>
          <Route path="/signup" exact Component={Signup}/>
          <Route path="/forgot-password" exact Component={Fpwd}/>

          <Route path="/admin" exact Component={AdminLogin}/>
          <Route path="/admin/home" exact Component={Home}/>
          <Route path="/404" exact Component={Error}/>
          <Route path="/admin/customers" exact Component={Customers}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
