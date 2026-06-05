import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Pratos from './pages/Pratos';

function App() {
  return (
    <BrowserRouter>
      {/* Aqui depois vamos colocar uma Navbar lateral ou superior */}
      <div className="container-principal">
        <Routes>
          <Route path="/" element={<h1>Dashboard Principal (Em breve)</h1>} />
          <Route path="/pratos" element={<Pratos />} />
          <Route path="/pedidos" element={<h1>Tela de Pedidos (Em breve)</h1>} />
          <Route path="/usuarios" element={<h1>Tela de Usuários (Em breve)</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;