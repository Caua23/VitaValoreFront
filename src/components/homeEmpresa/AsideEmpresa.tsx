import { MoreVertical } from "lucide-react";
import { useContext, createContext, useState } from "react";
import logo from "../../assets/Logo.png"; // Substitua pela sua imagem se necessário
import { SidebarItemProps } from "../../interface/SidebarProps";
import { SidebarProps } from "react-pro-sidebar";
import Cookies from 'js-cookie';
import { redirect, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Cnpj2 from "../cnpj2";
const SidebarContext = createContext<{ expanded: boolean }>({
  expanded: false,
});

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      cnpj,
      password,
    };

    const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
    if (!apiUrl) {
      console.error("API URL não configurada");
      return;
    }

    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        Cookies.remove("Bearer");
        console.error("Token ausente");
        redirect("/auth/login");
        return;
      }

      // Fazer a requisição para obter o ID da empresa a partir do token
      const idTokenResponse = await fetch(`${apiUrl}/Empresa/verification/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!idTokenResponse.ok) {
        throw new Error("Falha ao verificar o token");
      }

      const idTokenText = await idTokenResponse.text();
      const { id } = JSON.parse(idTokenText); 

      
      const updateResponse = await fetch(`${apiUrl}/Empresa/Atualizar/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updateResponseText = await updateResponse.text();
      const updateData = JSON.parse(updateResponseText);

      if (updateData.ok) {
        console.log("Dados atualizados com sucesso!");
        return "";
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <aside
      className="h-screen fixed z-10 top-0 bottom-0"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className={`h-full flex flex-col bg-primary shadow-sm`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            alt="Logo"
            className={`select-none overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="select-none w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4 mr-5">
              <h4 className="font-semibold text-neutral-50">John Doe</h4>
              <span className="text-xs text-gray-400">johndoe@gmail.com</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="  ">
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-neutral-900">
                <DropdownMenuLabel className="text-stone-50">
                  Sua Conta
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full border-none p-2 bg-neutral-900 flex justify-normal hover:text-stone-800 hover:bg-white  shadow-none">
                        <div className="flex mr-12">
                          <User className="mr-2 h-4 w-4" />
                          <span className=""> Perfil</span>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-neutral-950">
                      <DialogHeader>
                        <DialogTitle className="">
                          Edite o perfil da empresa
                        </DialogTitle>
                        <DialogDescription className="text-slate-50">
                          Faça alterações em seu perfil aqui. Clique em salvar
                          quando você terminar.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="name"
                              className="text-right text-neutral-50"
                            >
                              Nome
                            </Label>
                            <Input
                              onChange={(e) => setNome(e.target.value)}
                              value={name}
                              id="name"
                              placeholder="Nome da empresa"
                              defaultValue="Nome da empresa"
                              className="text-neutral-50 col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="Email"
                              className="text-right text-neutral-50"
                            >
                              Email
                            </Label>
                            <Input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="Email"
                              type="email"
                              placeholder="email@example.com"
                              defaultValue="email@example.com"
                              className="text-neutral-50 col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="CNPJ"
                              className="text-right text-neutral-50"
                            >
                              CNPJ
                            </Label>
                            <Cnpj2
                              className="text-neutral-50 col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              value={cnpj}
                              onChange={(e) => setCnpj(e.target.value)}
                              placeholder="Digite seu CNPJ"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="Password"
                              className="text-right text-neutral-50"
                            >
                              Senha
                            </Label>
                            <Input
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="Password"
                              defaultValue="********"
                              type="password"
                              placeholder="Confime Sua senha"
                              className="col-span-3  text-neutral-50 "
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem className="text-stone-50">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Planos</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-stone-50">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-stone-50">
                  <a
                    href="https://github.com/caua23"
                    target="_blank"
                    className="flex items-center w-full"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-stone-50">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Ajuda</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-stone-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  path,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <li
      onClick={handleClick}
      className={` select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-950"
          : "hover:bg-indigo-50 hover:text-neutral-900 text-gray-300"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
