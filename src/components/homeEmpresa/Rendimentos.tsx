/* eslint-disable react-hooks/rules-of-hooks */
import { BadgeDollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ChartFature2 } from "./Rendimentos/ChartFature2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Alert } from "@mui/material";
import { GetEmpresa } from "@/interface/GetEmpresa";

function Rendimentos({ id, apiUrl, cnpj, wallet }: GetEmpresa) {
  const navigate = useNavigate();

  const [valorSaque, setValorSaque] = useState<number>(0);

  const [alertMessage, setAlertMessage] = useState<string>("");

  const logout = () => {
    Cookies.remove("Bearer");
    navigate("/auth/login");
  };
  if (!apiUrl) {
    console.error("API URL não configurada");
    return;
  }

  const saque = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = {
      valor: valorSaque,
      cnpj: cnpj,
    };

    if (!apiUrl) {
      console.error("API URL não configurada");
      return;
    }

    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        return logout();
      }

      if (valorSaque <= 0 || valorSaque > wallet) {
        setAlertMessage("Valor inválido. Insira um valor dentro do limite.");
        return;
      }

      const response = await fetch(`${apiUrl}/Empresa/Saque/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      });

      const dataResponse = await response.text();
      if (!response.ok) {
        throw new Error(dataResponse);
      }

      // setAlertMessage(dataResponse);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setAlertMessage("Ocorreu um erro ao processar seu saque.");
    }
  };

  const chartData = [
    { month: "Janeiro", Ganhos: 186 },
    { month: "Fevreiro", Ganhos: 305 },
    { month: "Março", Ganhos: 237 },
    { month: "Abril", Ganhos: 73 },
    { month: "Maio", Ganhos: 209 },
    { month: "Junho", Ganhos: 214 },
  ];
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 50000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  return (
    <section className="flex">
      {alertMessage && (
        <Alert
          className="alert-slide-in alert-fixed"
          severity="info"
          onClose={() => setAlertMessage("")}
        >
          {alertMessage}
        </Alert>
      )}
      <div className="flex flex-col justify-center m-10">
        <h1 className="font-bold text-3xl text-white mb-10">Rendimentos: </h1>
        <h2 className="mt-10">Valor: </h2>
        <div className="flex items-center">
          <div className="rounded-lg mr-4 bg-green-800 p-2">
            <BadgeDollarSign size={25} className="text-white" />
          </div>
          <p className="text-white font-normal text-5xl">
            R$ <strong>{wallet.toFixed(2)}</strong> 
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-10 w-96 p-2 bg-green-600 hover:bg-green-800 hover:text-white text-white font-semibold border-green-300 hover:border-green-600"
            >
              Sacar
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white">
            <form onSubmit={saque}>
              <DialogHeader>
                <DialogTitle className="text-white text-center font-bold text-xl">
                  Deseja sacar Quanto?
                </DialogTitle>
                <DialogDescription className="text-white text-center font-normal text-sm">
                  Defina um valor de quanto deseja sacar:
                </DialogDescription>

                <Input
                  id="sacar"
                  type="number"
                  className="text-white"
                  onChange={(e) => setValorSaque(Number(e.target.value))}
                  placeholder="Valor desejado"
                />
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="w-40 mt-5 bg-green-500 text-white hover:bg-green-700 hover:text-white font-semibold	 duration-500 border-none"
                  variant="outline"
                  type="submit"
                >
                  Sacar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <p className="text-neutral-500 text-xs font-semibold text-wrap w-96 mt-4">
          Antes de sacar, Leia os Termos de saque e como sacar o dinheiro das
          suas vendas.{" "}
          <a
            href="/Termos/#pagamento"
            className="italic font-normal text-purple-500 hover:text-purple-700 duration-500"
          >
            Clique aqui
          </a>
        </p>
      </div>
      <div className="mt-36 ml-40">
        <ChartFature2 data={chartData} />
      </div>
    </section>
  );
}
export default Rendimentos;
