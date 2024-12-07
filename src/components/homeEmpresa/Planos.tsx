import { GetEmpresa } from "@/interface/GetEmpresa";
import { SetStateAction, useState } from "react";
import Radio, { RadioGroup } from "./plano/Radio";
import { BadgePercent, Sparkle, Gem, Crown, ArrowRight } from "lucide-react"
import '../../Styles/Components/plano.css'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const navigate = useNavigate();
function Planos({ id, apiUrl }: GetEmpresa) {
    const [plan, setPlan] = useState("");
    let planoEscolhido = plan.trim().replace(/\s+/g, '');
    const handleRedirecionar = async () => {

        const token = Cookies.get("Bearer");
        if (!token) {
            Cookies.remove("Bearer");
            console.error("Token ausente");
            navigate("/auth/login");
            return null;
        }

        const response = await fetch(
            `${apiUrl}/Planos/${id}/${planoEscolhido}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao processar o plano");
        }

        const data = await response.json();
        console.log('Resposta do backend:', data);

        
        navigate(`/Planos/${id}/${planoEscolhido}/pagamento`);

    };
    return (

        <main className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold tracking-tight">Escolha seu Plano</h2>
            <hr className="my-3 w-56" />
            <RadioGroup value={plan} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPlan(e.target.value)}>
                <div className="flex flex-row gap-4 justify-center ">

                    <Radio value="basico">
                        <Plan
                            icon={<Sparkle />}
                            title="Basico"
                            features={["Um plano básico que permite a postagem de até cinco produtos, com duração de um 30 dias."]}
                            price={59.90}
                        />
                    </Radio>
                    <Radio value="Plano Avancado">
                        <Plan
                            icon={<Gem />}
                            title="Plano Avancado"
                            features={["Um plano avançado que permite a postagem de até dez produtos, com duração de 60 dias."]}
                            price={149.90}
                        />
                    </Radio>
                    <Radio value="Plano Premium">
                        <Plan
                            icon={<Crown />}
                            title="Plano Premium"
                            features={["Um plano premium que permite a postagem de até vinte e cinco produtos, com duração de 90 dias."]}
                            price={300.00}
                        />
                    </Radio>
                    <Radio value="Plano Personalizado">
                        <Plan
                            icon={<BadgePercent />}
                            title="Plano Personalizado"
                            features={["Um plano premium personalizado que permite a postagem de até cinquenta produtos, com duração estendida de 120 dias. Ideal para empresas de médio porte ou com grande variedade de produtos."]}
                            price={599.90}
                        />
                    </Radio>
                </div>
            </RadioGroup>
            <hr className="my-3 w-56" />


            <button
                onClick={handleRedirecionar}
                className={`
            flex gap-4 items-center px-6 py-3 rounded-lg
            bg-violet-800 hover:bg-violet-700
            font-semibold text-lg text-white
        `}
            >

                Prossiga com o plano {plan}
                <ArrowRight />
            </button>

        </main>
    )
}



function Plan({ icon, title, features, price }: any) {
    return (
        <div className="h-full flex flex-col justify-around select-none gap-4 text-center  text-black ">
            <div className=" gap-2">
                <div className="flex gap-2">
                    {icon}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>

            </div>
            <p className="text-sm text-black max-w-52 text-justify">{features}</p>


            <br />
            <div className="text-center h-10">
                <span className="  ml-auto text-xl text-black font-semibold">R$ {price}</span>
            </div>
        </div>
    )
}

export default Planos;