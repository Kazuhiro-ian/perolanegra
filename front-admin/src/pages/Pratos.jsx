import { useState } from 'react';
import api from '../services/api';
import './Pratos.css';

function Pratos() {
  // Estados para guardar o que o usuário digita
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  // Função que roda quando clicamos em "Salvar"
  const salvarPrato = async (e) => {
    e.preventDefault(); // Evita que a página recarregue do zero

    try {
      // Faz o POST para o Spring Boot (localhost:8080/api/pratos)
      await api.post('/pratos', {
        nome: nome,
        descricao: descricao,
        preco: parseFloat(preco) // Garante que o preço vai como número
      });

      alert('Prato cadastrado com sucesso!');
      
      // Limpa os campos após salvar
      setNome('');
      setDescricao('');
      setPreco('');
      
    } catch (error) {
      console.error("Erro ao salvar prato:", error);
      alert('Erro ao salvar o prato. Verifique se o back-end está rodando.');
    }
  };

  return (
    <div className="pratos-container">
      <h2>Gerenciar Pratos</h2>
      
      <div className="card-formulario">
        <h3>Cadastrar Novo Prato</h3>
        <form onSubmit={salvarPrato}>
          
          <div className="grupo-input">
            <label>Nome do Prato</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Ex: Hambúrguer Artesanal"
              required 
            />
          </div>

          <div className="grupo-input">
            <label>Descrição</label>
            <textarea 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Ex: Pão brioche, blend 180g..."
              required 
            />
          </div>

          <div className="grupo-input">
            <label>Preço (R$)</label>
            <input 
              type="number" 
              step="0.01" 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)} 
              placeholder="Ex: 35.50"
              required 
            />
          </div>

          <button type="submit" className="btn-salvar">Salvar Prato</button>
        </form>
      </div>
    </div>
  );
}

export default Pratos;