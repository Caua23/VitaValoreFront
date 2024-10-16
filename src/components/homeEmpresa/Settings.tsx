import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import "../../Styles/Components/Alert.css";
import { GetEmpresa } from "@/interface/GetEmpresa";

function Configuracao({ apiUrl, id }: GetEmpresa) {
  const [senha, setSenha] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get("Bearer");
  if (!token) {
    Cookies.remove("Bearer");
    navigate("/auth/login");
  }

  const handleSenhaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senhaNova !== repetirSenha) {
      setAlertMessage("Erro:As senhas não são iguais.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/Empresa/Atualizar/Password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword: senha, newPassword: senhaNova }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar a senha");
      }

      setAlertMessage("Senha Atualizada com sucesso.");
    } catch (error) {
      console.error(error);
      setAlertMessage("Erro ao atualizar a senha.");
    }
  };

  const logout = () => {
    Cookies.remove("Bearer");
    navigate("/auth/login");
  };

  const destructiveAction = async () => {
    try {
      const response = await fetch(`${apiUrl}/Empresa/Deletar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      Cookies.remove("Bearer");
      navigate("/auth/register");
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white fixed m-10">
        Configurações
      </h1>

      {alertMessage && (
        <Alert
          severity={alertMessage.includes("Erro") ? "error" : "success"}
          className="alert-slide-in alert-fixed"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="flex justify-between mt-36 m-5">
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-bold text-white">Excluir conta</h2>
          <p className="text-neutral-500 text-xs font-normal text-wrap max-w-96">
            Lembre-se que excluir sua conta será permanente, e não haverá como
            recuperar os dados e nem o saldo da conta.
          </p>
        </div>
        <Button
          variant={"destructive"}
          className="w-32 hover:bg-red-800 duration-500"
          onClick={destructiveAction}
        >
          Excluir conta
        </Button>
      </div>

      <div className="flex justify-between mt-10 m-5">
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-bold text-white">Sair da conta</h2>
        </div>
        <Button
          variant={"secondary"}
          className="w-32 duration-500"
          onClick={logout}
        >
          Sair
        </Button>
      </div>

      <div className="flex justify-between mt-10 m-5">
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-bold text-white">Recuperar Senha</h2>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"outline"}
              className="w-32 bg-green-600 hover:bg-green-800 duration-500 text-white text-xs hover:text-white"
            >
              Recuperar Senha
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white">
            <DialogHeader>
              <DialogTitle>Perdeu sua senha?</DialogTitle>
              <DialogDescription>Troque ela facilmente:</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSenhaSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="SenhaAtual" className="text-right">
                    Senha atual
                  </Label>
                  <Input
                    id="SenhaAtual"
                    placeholder="Coloque sua senha"
                    className="col-span-3"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Senha" className="text-right">
                    Senha nova
                  </Label>
                  <Input
                    id="Senha"
                    placeholder="Coloque a nova senha"
                    className="col-span-3"
                    value={senhaNova} // Corrigido para usar senhaNova
                    onChange={(e) => setSenhaNova(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="RepetirSenha" className="text-right">
                    Repetir Senha
                  </Label>
                  <Input
                    id="RepetirSenha"
                    placeholder="Repita sua senha"
                    className="col-span-3"
                    value={repetirSenha}
                    onChange={(e) => setRepetirSenha(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="text-black font-semibold"
                  variant={"outline"}
                  type="submit"
                >
                  Enviar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-between mt-10 m-5">
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-bold text-white">Melhorar Planos</h2>
        </div>
        <Button
          variant={"outline"}
          className="w-32 duration-500 hover:bg-purple-primary hover:text-white hover:border-purple-primary"
          onClick={() => navigate("/Empresa/planos")}
        >
          Planos
        </Button>
      </div>
    </>
  );
}

export default Configuracao;
