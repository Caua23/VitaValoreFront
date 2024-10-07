import { ChartFature } from "./Statistics/ChartFature";
import { Chartmultiple } from "./Statistics/ChartMultiple";
import { UnansweredReviews } from "./Statistics/UnansweredReviews";
const data = [
  { month: "Janeiro", Compras: 186, Avaliacoes: 80 },
  { month: "Fevereiro", Compras: 305, Avaliacoes: 200 },
  { month: "Março", Compras: 237, Avaliacoes: 120 },
  { month: "Abril", Compras: 73, Avaliacoes: 190 },
  { month: "Maio", Compras: 209, Avaliacoes: 130 },
  { month: "Junho", Compras: 214, Avaliacoes: 140 },
  { month: "Julho", Compras: 250, Avaliacoes: 160 },
  { month: "Agosto", Compras: 300, Avaliacoes: 180 },
  { month: "Setembro", Compras: 280, Avaliacoes: 220 },
  { month: "Outubro", Compras: 310, Avaliacoes: 210 },
];
const MoneyData = [
  { month: "Janeiro", Money: 186.00 , },    
  { month: "Fevereiro", Money: 305.50 , },  
  { month: "Março", Money: 237.75 , },      
  { month: "Abril", Money: 73.20 , },     
  { month: "Maio", Money: 209.99 , },       
  { month: "Junho", Money: 214.00 , },      
  { month: "Julho", Money: 250.30 , },      
  { month: "Agosto", Money: 300.40 , },     
  { month: "Setembro", Money: 280.60 , },   
  { month: "Outubro", Money: 310.80 , },    
];

  
const Perguntas = [
  {
    "id": 1,
    "titulo": "Qual é a capital da França?",
    "pergunta": "A capital da França é Paris. Você gostaria de saber mais sobre essa cidade?"
  },
  {
    "id": 2,
    "titulo": "Como funciona a fotossíntese?",
    "pergunta": "A fotossíntese é o processo pelo qual as plantas usam luz solar para produzir alimentos. Deseja uma explicação mais detalhada?"
  },
  {
    "id": 3,
    "titulo": "O que é a teoria da relatividade?",
    "pergunta": "A teoria da relatividade foi proposta por Albert Einstein e inclui a relatividade restrita e geral. Gostaria de um resumo mais aprofundado?"
  },
  {
    "id": 4,
    "titulo": "Quais são os planetas do sistema solar aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ?",
    "pergunta": "Os planetas do sistema solar incluem Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno. Precisa de mais informações sobre algum deles?"
  },
  {
    "id": 5,
    "titulo": "O que é inteligência artificial?",
    "pergunta": "Inteligência artificial é a simulação da inteligência humana em máquinas. Você gostaria de saber sobre suas aplicações?"
  }
]


function Statistics() {
  return (
    <>
      <h1 className="text-3xl mt-10 font-bold text-white">
        Estatísticas
      </h1>
      <div className="mt-10 mb-10 ml-5 flex flex-wrap justify-center items-center gap-7">
        <Chartmultiple data={data} />
        <UnansweredReviews perguntas={Perguntas} />
      </div>
        <ChartFature data={MoneyData}/>   
    </>
  );
}
export default Statistics;
