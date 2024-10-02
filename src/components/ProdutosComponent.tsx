import { Button } from "./ui/button";
import { useState } from "react";
import ProdutosProps from "../interface/ProdutosProps";
import { Trash2, Pencil } from "lucide-react";

function ProdutosComponent({
  id,
  name,
  preco,
  imagem,
  descricao,
  marca,
  status,
}: ProdutosProps) {
  // Estado para mostrar ou esconder os detalhes do produto
  const [showDetails, setShowDetails] = useState(false);

  // Função para alternar a exibição dos detalhes
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col  items-center gap-4 ">
      <div className="flex w-5/6 h-36 p-4 border border-gray-200 rounded-xl">
        <div className="flex cursor-pointer m-1" onClick={toggleDetails}>
          <img src={imagem}  alt={name} className="rounded-3xl" />
          <div className="ml-4 flex flex-col gap-3 text-white justify-center">
            <h3 className="text-lg font-semibold text-wrap">{name}</h3>
            <p className="text-sm text-blue-500">Marca: {marca}</p>
            <p className="text-base font-bold text-white">R$ {preco}</p>
            <p className="text-base font-medium">
              Status: {status.toLocaleLowerCase()}
            </p>
          </div>
        </div>
        <div className="ml-auto mt-2 flex space-x-2 text-white">
          <Button
            variant="ghost"
            className="hover:bg-red-600  hover:text-white bg-none"
          >
            <Trash2 />
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-blue-600 hover:text-white bg-none"
          >
            <Pencil />
          </Button>
        </div>
      </div>
      {showDetails && (
        <div className="mt-4 p-2 border-t border-gray-300">
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Descrição:</strong> {descricao}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProdutosComponent;
