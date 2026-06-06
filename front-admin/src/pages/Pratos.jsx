import React, { useState } from 'react';
import './Pratos.css';

const Pratos = () => {
  // Dados fictícios para visualização do layout
  const [pratos] = useState([
    { id: 1, nome: 'Risoto de Cogumelos Selvagens', categoria: 'Prato Principal', preco: 'R$ 68,00', status: 'Ativo' },
    { id: 2, nome: 'Tartare de Salmão com Avocado', categoria: 'Entrada', preco: 'R$ 52,00', status: 'Ativo' },
    { id: 3, nome: 'Petit Gâteau 70% Cacau', categoria: 'Sobremesa', preco: 'R$ 32,00', status: 'Inativo' },
  ]);

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
                <td>{prato.preco}</td>
                <td>
                  <span className={`status-tag ${prato.status.toLowerCase()}`}>
                    {prato.status}
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