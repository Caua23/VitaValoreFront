import { useParams } from 'react-router-dom';

const Pagamento: React.FC = () => {
  // Pegando os parâmetros da URL
  const { id, planoName } = useParams<{ id: string; planoName: string }>();

  return (
    <div>
      <h1>Página de Pagamento</h1>
      <p>Usuário ID: {id}</p>
      <p>Plano selecionado: {planoName}</p>

      <div>
        <h2>Resumo do Plano: {planoName}</h2>
        <p>Detalhes do plano: </p>
        <button className="bg-green-500 p-3 rounded text-white">
          Finalizar pagamento
        </button>
      </div>
    </div>
  );
};

export default Pagamento;
