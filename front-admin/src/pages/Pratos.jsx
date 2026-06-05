import { useState, useEffect } from 'react';
import api from '../services/api';
import './Pratos.css';

function Pratos() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  
  // Novo estado para armazenar a lista de pratos vinda do banco
  const [pratos, setPratos] = useState([]);

  // useEffect roda a função carregarPratos assim que o componente é montado na tela
  useEffect(() => {
    carregarPratos();
  }, []);

  // Função que faz o GET no Spring Boot
  const carregarPratos = async () => {
    try {
      const response = await api.get('/pratos');
      setPratos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
    }
  };

  const salvarPrato = async (e) => {
    e.preventDefault();

    try {
      await api.post('/pratos', {
        nome: nome,
        descricao: descricao,
        preco: parseFloat(preco)
      });

      alert('Prato cadastrado com sucesso!');
      
      // Limpa os campos
      setNome('');
      setDescricao('');
      setPreco('');
      
      // Atualiza a lista exibida abaixo chamando o GET novamente
      carregarPratos();
      
    } catch (error) {
      console.error("Erro ao salvar prato:", error);
      alert('Erro ao salvar o prato. Verifique se o back-end está rodando.');
    }
  };

  // Função auxiliar para formatar o preço para Reais (R$)
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="pratos-container">
      <h2>Gerenciar Pratos</h2>
      
      {/* Formulário de Cadastro */}
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

      {/* Seção de Listagem dos Pratos */}
      <div className="lista-pratos-section">
        <h3>Pratos Cadastrados</h3>
        
        {pratos.length === 0 ? (
          <p className="mensagem-vazia">Nenhum prato cadastrado ainda.</p>
        ) : (
          <div className="grid-pratos">
            {pratos.map((prato) => (
              <div key={prato.id} className="prato-card">
                <div className="prato-card-header">
                  <h4>{prato.nome}</h4>
                  <span className={`badge-status ${prato.disponivel ? 'ativo' : 'inativo'}`}>
                    {prato.disponivel ? 'Disponível' : 'Esgotado'}
                  </span>
                </div>
                <p className="prato-card-descricao">{prato.descricao}</p>
                <div className="prato-card-footer">
                  <span className="prato-card-preco">{formatarMoeda(prato.preco)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Pratos;