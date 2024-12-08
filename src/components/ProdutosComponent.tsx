import { Button } from "@/components/ui/button";
import { ProdutosProps } from "../interface/ProdutosProps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import Cookies from "js-cookie";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";

function ProdutosComponent({ data,EmpresaProdutosProps }: ProdutosProps ) {
  const navigate = useNavigate();
  const id = EmpresaProdutosProps.id;
  const [search, setSearch] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updateId, setUpdateId] = useState(0);
  const [updateProduto, setUpdateProduto] = useState({
    idEmpresa: id,
    name: "",
    preco: "",
    imagem: "",
    descricao: "",
    marca: "",
  });
  const isMatchingSearch = (productName: string) => {
    return productName.toLowerCase().includes(search.toLowerCase());
  };

  const filteredProducts = data.filter((product) =>
    isMatchingSearch(product.name)
  );

  const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
  const updateProduct = async () => {
    try {
      if (!apiUrl) {
        console.error("API URL não configurada");
        return;
      }
      const token = Cookies.get("Bearer");
      if (!token) {
        return;
      }
      const response = await fetch(`${apiUrl}/Produtos/Atualizar/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateProduto),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (id: number) => {
    try {
      if (!apiUrl) {
        console.error("API URL não configurada");
        return;
      }
      const token = Cookies.get("Bearer");
      if (!token) {
        return;
      }
      const response = await fetch(`${apiUrl}/Produtos/Deletar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const formatarDinheiro = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };
  
  const [descricaoLength, setDescricaoLength] = useState(0);
  const handleCloseModal = () => {
    setIsModalOpenEdit(false);
    
    setUpdateProduto({
      name: "",
      preco: "",
      imagem: "",
      descricao: "",
      marca: "",
      idEmpresa : id,
    });
    setDescricaoLength(0);
    setSuccessMessage("");
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "preco" ? parseFloat(value) : value;
    setUpdateProduto((prev) => ({ ...prev, [name]: updatedValue }));
  };
  const handleChangeDescricao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 600) {
      setUpdateProduto((prev) => ({ ...prev, descricao: value }));
      setDescricaoLength(value.length);
    }
  };

  const callUpdate = async (id: number) => {
    setIsModalOpenEdit(true);
    setUpdateId(id);
  }

  return (
    <>
      <Card className="bg-black text-white mr-2">
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription className="max-w-xl text-justify">
            Gerencie seus produtos de forma eficiente com Vita Valore! Adicione,
            edite ou exclua produtos facilmente e veja suas vendas crescerem
            ainda mais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Procurar pelo nome do produto"
            className="w-1/3 text-white rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Nome do produto</TableHead>
                <TableHead className="text-white">Marca</TableHead>
                <TableHead className="text-white">Preço</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-start space-x-4 p-2">
                      <img
                        src={product.imagem}
                        alt=""
                        className="w-20 h-20 object-cover border rounded-md"
                      />
                      <div>
                        <span className="block break-words max-w-xs font-normal text-xs">
                          {product.name}
                        </span>
                        <p className="text-gray-200 max-w-xs truncate text-xs">
                          {product.descricao}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.marca}</TableCell>
                  <TableCell>{formatarDinheiro(product.preco)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "APROVADO" ? "outline" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="flex flex-col gap-1 bg-black text-white"
                        align="end"
                      >
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="duration-500 cursor-pointer"
                          onClick={() => callUpdate(product.id)}  
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="duration-500 cursor-pointer"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      
        {isModalOpenEdit && (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
          <Card className="w-96 bg-primary text-white ">
            <CardHeader>
              <CardTitle>Adicionar Produto</CardTitle>
              <CardDescription className="text-neutral-400">
                Preencha os detalhes do novo produto.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={updateProduto.name}
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
                    value={updateProduto.preco}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="imagem">Imagem URL</Label>
                  <Input
                    id="imagem"
                    name="imagem"
                    value={updateProduto.imagem}
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
                    value={updateProduto.descricao}
                    onChange={handleChangeDescricao}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    name="marca"
                    value={updateProduto.marca}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="button"
                  onClick={updateProduct}
                  className="w-full bg-slate-200 text-black hover:bg-neutral-400 duration-200"
                >
                  Atualizar Produto
                </Button>
              
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
    </>
  );
}

export default ProdutosComponent;
