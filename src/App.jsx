
import './App.css'
import { Toaster } from 'react-hot-toast';
import { Login,Registers } from '../pages/index';
import { BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registers />} />
      {/*<Route path="/product" element={<Product />} />*/}

    </Routes>
 
       
    </BrowserRouter>
    <Toaster />
    </>
    
  )
}

export default App
