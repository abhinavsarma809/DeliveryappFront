
import './App.css'
import { Toaster } from 'react-hot-toast';
import { Login,Registers,Home,Product,Check,Payment,Address,Details} from '../pages/index';

import { BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registers />} />
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/check" element={<Check />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/address" element={<Address />} />
      
      <Route path="/details" element={<Details />} />

    </Routes>
 
       
    </BrowserRouter>
    <Toaster />
    </>
    
  )
}

export default App
