export interface VendasProps {
    id: string;
    produto: string;
    pago: number;
    status: "PENDENTE" | "REJEITADO" | "PROCESSANDO" | "APROVADO" | "CANCELADO";
}


    
