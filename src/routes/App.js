import CrudApi from "../components/CrudApi";
import 'bootstrap/dist/css/bootstrap.css';
import LoginApi from "../components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route   path="/"  element={<LoginApi />}/>
      <Route   path="/formulario"  element={<CrudApi />}/>
      </Routes>
    </Router>
  );
}

export default App;
