import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import ProdutosComponent from "../ProdutosComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Plus } from "lucide-react";
import { Product } from "@/interface/ProdutosProps";
import { GetEmpresa } from "@/interface/GetEmpresa";

function Produtos({ apiUrl, id }: GetEmpresa) {



  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Product[]>([]);
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    idEmpresa: id,
    name: "",
    preco: "",
    imagem: "",
    descricao: "",
    marca: "",
  });
  const [descricaoLength, setDescricaoLength] = useState(0);

  const token = Cookies.get("Bearer");
  if (!token) {
    Cookies.remove("Bearer");
    console.error("Token ausente");
    navigate("/auth/login");
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getProdutos = useCallback(async () => {

    try {

      const response = await fetch(
        `${apiUrl}/Produtos/api/getAllProducts/Empresa/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const textResponse = await response.text();
      if (!response.ok) {
        setError(`Erro na resposta da API: ${response.status}`);
        return;
      }

      if (textResponse) {
        const data = JSON.parse(textResponse);
        setProdutos(data);
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao buscar produtos");
    }
  }, [apiUrl, id, token]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  const handleAddProductClick = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    
    setNovoProduto({
      name: "",
      preco: "",
      imagem: "",
      descricao: "",
      marca: "",
      idEmpresa: id,
    });
    setDescricaoLength(0);
    setSuccessMessage("");
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "preco" ? parseFloat(value) : value;
    setNovoProduto((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const sendProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/Produtos/Cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return setError(errorData.error);
      }

      setSuccessMessage("Produto adicionado com sucesso!");
      handleCloseModal();
      getProdutos();
    } catch (error) {
      console.error(error);

    }
  };

  const handleChangeDescricao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 600) {
      setNovoProduto((prev) => ({ ...prev, descricao: value }));
      setDescricaoLength(value.length);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-5">
        <h1 className="text-center text-white font-bold text-3xl">Produtos</h1>
        <div>

        <Button
          className="bg-green-500 hover:bg-green-700 duration-500 p-5 text-white font-bold mr-10"
          onClick={handleAddProductClick}
        >
          <Plus size={15} strokeWidth={4} /> Adicionar Produtos
        </Button>
        <Button
          className="bg-transparent rounded-full hover:bg-neutral-500 duration-500 p-5 text-white font-bold mr-10"
          onClick={() => navigate("/Vender")}
        >

          <ArrowRight size={15} color="white" /> 
        </Button>
        </div>
        
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
          <Card className="w-96 bg-primary text-white ">
            <CardHeader>
              <CardTitle>Adicionar Produto</CardTitle>
              <CardDescription className="text-neutral-400">
                Preencha os detalhes do novo produto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={sendProduct} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={novoProduto.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    id="preco"
                    name="preco"
                    className=""
                    type="number"
                    value={novoProduto.preco}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="imagem">Imagem URL</Label>
                  <Input
                    id="imagem"
                    name="imagem"
                    value={novoProduto.imagem}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="descricao">Descrição</Label>
                  <p className="text-gray-400 text-xs opacity-70">
                    {descricaoLength}/600
                  </p>
                  <Input
                    id="descricao"
                    name="descricao"
                    value={novoProduto.descricao}
                    onChange={handleChangeDescricao}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    name="marca"
                    value={novoProduto.marca}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-slate-200 text-black hover:bg-neutral-400 duration-200"
                >
                  Adicionar Produto
                </Button>
              </form>
              {successMessage && (
                <p className="text-green-500 mt-3">{successMessage}</p>
              )}
              {error && <p className="text-red-500 mt-3">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCloseModal}
                className="bg-red-700 hover:bg-red-900 duration-500"
              >
                Fechar
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="flex flex-col mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <p className="text-start text-white font-bold text-3xl">
          Seus Produtos:
        </p>

        {produtos && produtos.length > 0 ? (
          <ProdutosComponent  data={produtos}  EmpresaProdutosProps={{id: id}} />
        ) : (
          <p className="text-center text-white font-bold text-2xl">
            Nenhum Produto encontrado
          </p>
        )}
      </div>
    </>
  );
}

export default Produtos;
