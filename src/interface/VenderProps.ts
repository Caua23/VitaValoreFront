export interface VenderProps {
    id: number;
    idEmpresa: number;
    name: string;
    descricao: string;
    preco: number;
    imagem: string;
    marca: string;
    empresa: Empresa;
    status: string;
}

export interface Empresa {
    id: number;
  }
  
// export interface ProdutosProps {
//   data: Product[];
//   EmpresaProdutosProps: EmpresaProdutosProps; 
// }