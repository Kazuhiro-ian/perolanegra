import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Pratos from './pages/Pratos';
import Sidebar from './components/Sidebar'; // 1. Importando a Sidebar

function App() {
  return (
    <BrowserRouter>
      {/* 2. Usando a classe definida no seu App.css */}
      <div className="app-container">
        
        {/* 3. Renderizando a Sidebar */}
        <Sidebar /> 
        
        {/* 4. Usando a classe main-content para empurrar o conteúdo 250px para a direita */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h1>Dashboard Principal (Em breve)</h1>} />
            <Route path="/pratos" element={<Pratos />} />
            <Route path="/pedidos" element={<h1>Tela de Pedidos (Em breve)</h1>} />
            <Route path="/usuarios" element={<h1>Tela de Usuários (Em breve)</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;