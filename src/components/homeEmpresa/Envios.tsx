import { GetEmpresa } from "@/interface/GetEmpresa";

export function Envios({id, email , nome}: GetEmpresa) {
    return(
        <>
            <p>{id}, {email}, {nome}</p>
        </>
    )
}