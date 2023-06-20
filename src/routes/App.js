import CrudApi from "../components/CrudApi";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "../components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route   path="/"  element={<Login />}/>
      <Route   path="/formulario"  element={<CrudApi />}/>
      </Routes>
    </Router>
  );
}

export default App;
