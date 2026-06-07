import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Certifique-se de que o caminho da importação está correto
import './Pratos.css';

const Pratos = () => {
  // 1. Declaração dos estados (States)
  const [pratos, setPratos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. UseEffect para carregar os dados assim que a tela abrir
  useEffect(() => {
    carregarPratos();
  }, []);

  // 3. Função que busca os dados do backend (Spring Boot)
  const carregarPratos = async () => {
    try {
      const response = await api.get('/api/pratos'); 
      setPratos(response.data); 
    } catch (error) {
      console.error('Erro ao buscar os pratos:', error);
      alert('Não foi possível carregar o menu.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Tela de carregamento enquanto espera o backend responder
  if (loading) {
    return <div style={{ padding: '3rem', color: '#000' }}>Carregando dados do banco...</div>;
  }

  // 5. Renderização da interface principal
  return (
    <div className="pratos-container">
      <header className="pratos-header">
        <div>
          <h1>Menu & Pratos</h1>
          <p className="subtitle">Gerencie os itens disponíveis no cardápio do restaurante.</p>
        </div>
        <button className="btn-add">Adicionar Novo Item</button>
      </header>

      <div className="filter-bar">
        <input type="text" placeholder="Filtrar por nome..." className="search-input" />
        <select className="filter-select">
          <option value="">Todas as Categorias</option>
          <option value="entradas">Entradas</option>
          <option value="principais">Pratos Principais</option>
          <option value="sobremesas">Sobremesas</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="minimal-table">
          <thead>
            <tr>
              <th>Nome do Prato</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pratos.map((prato) => (
              <tr key={prato.id}>
                <td className="font-bold">{prato.nome}</td>
                <td>{prato.categoria}</td>
                {/* Ajuste o prato.preco dependendo de como está no seu Prato.java (se é BigDecimal, etc) */}
                <td>R$ {prato.preco}</td>
                <td>
                  <span className={`status-tag ${prato.status ? prato.status.toLowerCase() : 'indefinido'}`}>
                    {prato.status || 'Ativo'}
                  </span>
                </td>
                <td className="text-right actions-cell">
                  <button className="btn-table-action">Editar</button>
                  <button className="btn-table-action delete">Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pratos;