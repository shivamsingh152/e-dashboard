import './App.css';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (
    <div className="container">
      <Router>
      <Navbar />
      <Routes>

        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProductList />}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/update/:_id' element={<UpdateProduct />}/>
        <Route path='/logout' element={<h1>Product Log Out</h1>}/>
        </Route>

        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
