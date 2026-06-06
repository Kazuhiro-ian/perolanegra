import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>PÉROLA NEGRA</h2>
        <span className="sidebar-subtitle">Painel de Controle</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link to="/pratos" className={`nav-item ${location.pathname === '/pratos' ? 'active' : ''}`}>
          Gerenciar Pratos
        </Link>
        <Link to="/pedidos" className={`nav-item ${location.pathname === '/pedidos' ? 'active' : ''}`}>
          Pedidos
        </Link>
        <Link to="/usuarios" className={`nav-item ${location.pathname === '/usuarios' ? 'active' : ''}`}>
          Usuários
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout">Sair do Sistema</button>
      </div>
    </aside>
  );
};

export default Sidebar;