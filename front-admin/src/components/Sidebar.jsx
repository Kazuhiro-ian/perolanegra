import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Pérola Negra</h2>
        <p>Painel Admin</p>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/pratos" className="nav-link">Gerenciar Pratos</Link>
        <Link to="/pedidos" className="nav-link">Acompanhar Pedidos</Link>
        <Link to="/usuarios" className="nav-link">Usuários</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;