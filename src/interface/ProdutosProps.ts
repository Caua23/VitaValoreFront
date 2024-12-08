// interface/ProdutosProps.ts
export interface Product {
  id: number;
  name: string;
  preco: number;
  imagem: string;
  descricao: string;
  marca: string;
  status: "APROVADO" | "PENDENTE" | "REPROVADO";
  quantidade?: number;
}

export interface EmpresaProdutosProps {
  id: string;
  
}

export interface ProdutosProps {
  data: Product[];
  EmpresaProdutosProps: EmpresaProdutosProps; 
}
