
export interface Pergunta {
    id: number;
    titulo: string;
    descricao: string;
  }
  
  export interface PerguntasProps {
    perguntas: Pergunta[]; 
  }
  