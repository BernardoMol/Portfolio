
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home/Home';
import Curriculo from './Paginas/Curriculo/Curriculo';
import  Certificados from './Paginas/Certificados/Certificados';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curriculo" element={<Curriculo />} />
        <Route path="/certificados" element={<Certificados />} />
      </Routes>
    </BrowserRouter>
  );
}


