export interface VendasProps {
    id: string;
    pago: number;
    status: "PENDENTE" | "REJEITADO" | "PROCESSANDO" | "APROVADO" | "CANCELADO";
    produto: string;
}
