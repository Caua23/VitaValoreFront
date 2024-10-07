
export interface Pergunta {
    id: number;
    titulo: string;
    pergunta: string;
  }
  
  export interface PerguntasProps {
    perguntas: Pergunta[]; 
  }
  