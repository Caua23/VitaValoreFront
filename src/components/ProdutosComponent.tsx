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

function ProdutosComponent({ data }: ProdutosProps) {
  const [search, setSearch] = useState("");

  const isMatchingSearch = (productName: string) => {
    return productName.toLowerCase().includes(search.toLowerCase());
  };

  const filteredProducts = data.filter((product) =>
    isMatchingSearch(product.name)
  );

  const deleteProduct = async (id: number) => {
    try {
      const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
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

  return (
    <Card className="bg-black text-white mr-2">
      <CardHeader>
        <CardTitle>Produtos</CardTitle>
        <CardDescription className="max-w-xl text-justify">
          Gerencie seus produtos de forma eficiente com Vita Valore! Adicione,
          edite ou exclua produtos facilmente e veja suas vendas crescerem ainda
          mais.
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
                      <Button aria-haspopup="true" size="icon" variant="ghost">
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
                        onClick={() => {}}
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
  );
}

export default ProdutosComponent;
