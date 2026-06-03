import React, { useState } from 'react';
import axios from 'axios'; // 1. Importamos o Axios aqui
import './App.css';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('pratos');

  const [nomePrato, setNomePrato] = useState('');
  const [descricaoPrato, setDescricaoPrato] = useState('');
  const [precoPrato, setPrecoPrato] = useState('');

  // 2. Nossa função atualizada com Axios
  const salvarPrato = async (event) => {
    event.preventDefault();

    const novoPrato = {
      nome: nomePrato,
      descricao: descricaoPrato,
      preco: parseFloat(precoPrato),
      disponivel: true
    };

    try {
      // O Axios faz o POST de forma direta. Ele já entende que é JSON e já configura os Headers!
      await axios.post('http://localhost:8080/api/pratos', novoPrato);

      alert('Prato salvo com sucesso no banco de dados!');
      
      // Limpa os campos
      setNomePrato('');
      setDescricaoPrato('');
      setPrecoPrato('');

    } catch (erro) {
      console.error("Erro na requisição:", erro);
      
      // O Axios é inteligente: se o Spring Boot devolver um Erro 400 (Bad Request),
      // ele cai direto aqui no catch, e você pode acessar a mensagem exata do erro
      if (erro.response) {
        alert(`Erro retornado pelo servidor: ${erro.response.data}`);
      } else {
        alert('Não foi possível conectar. O Spring Boot está rodando na porta 8080?');
      }
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Alimentar Banco</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-button ${telaAtiva === 'pratos' ? 'active' : ''}`}
            onClick={() => setTelaAtiva('pratos')}
          >
            🍽️ Cadastrar Prato
          </button>
          <button 
            className={`nav-button ${telaAtiva === 'usuarios' ? 'active' : ''}`}
            onClick={() => setTelaAtiva('usuarios')}
          >
            👥 Cadastrar Usuário
          </button>
          <button 
            className={`nav-button ${telaAtiva === 'pedidos' ? 'active' : ''}`}
            onClick={() => setTelaAtiva('pedidos')}
          >
            📝 Cadastrar Pedido
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {telaAtiva === 'pratos' && (
          <form className="form-container" onSubmit={salvarPrato}>
            <h2>Novo Prato</h2>
            
            <div className="form-group">
              <label>Nome do Prato</label>
              <input 
                type="text" 
                required
                value={nomePrato} 
                onChange={(e) => setNomePrato(e.target.value)} 
                placeholder="Ex: Bife Acebolado" 
              />
            </div>
            
            <div className="form-group">
              <label>Descrição</label>
              <input 
                type="text" 
                value={descricaoPrato} 
                onChange={(e) => setDescricaoPrato(e.target.value)} 
                placeholder="Ex: Acompanha arroz e fritas" 
              />
            </div>
            
            <div className="form-group">
              <label>Preço (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                required
                value={precoPrato} 
                onChange={(e) => setPrecoPrato(e.target.value)} 
                placeholder="Ex: 25.00" 
              />
            </div>
            
            <button type="submit" className="btn-primary">Salvar no Banco</button>
          </form>
        )}

        {/* Mantenha aqui os formulários de usuários e pedidos que criamos antes */}

      </main>
    </div>
  );
}

export default App;