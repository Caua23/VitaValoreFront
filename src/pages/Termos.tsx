import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

const TermsOfService = () => {
  const [alert, setAlert] = useState(false);
  const textoParaCopiar = "contato.vitavalore@gmail.com";
  const copiarParaClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textoParaCopiar);
      setAlert(true);
    } catch (err) {
      console.error("Falha ao copiar texto: ", err);
    }
  };
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <header className="bg-subSecondaryColorF">
      <div className="container m-auto px-4">
        <nav className="py-10">
          <button className="text-white rounded bg-secondaryColorF hover:bg-secondaryColorFHover ring-1 ring-thirdBorderF font-medium transition-colors duration-300 py-2 px-6 text-md">
            Voltar
          </button>
        </nav>
        {alert && (
          <Alert
            className="alert-fixed alert-slide-in"
            severity="success"
            onClose={() => setAlert(false)}
          >
            E-mail copiado para a área de transferência!
          </Alert>
        )}
        <main>
          <h1 className="text-center text-slate-50 font-bold text-4xl pt-5 mb-12">
            Termos
          </h1>
          <section>
            <div className="max-w-3xl m-auto text-zinc-200 py-6">
              <h1>Termos de Serviço da Vita Valore</h1>
              <p className="py-3">
                <strong>Última Atualização:</strong> 15/10/2024
              </p>
              <h2>1. Aceitação dos Termos</h2>
              <p className="py-3">
                Ao usar o software e serviços da Vita Valore, você concorda com
                os seguintes termos e condições. Se você não concordar com esses
                termos, não utilize a Vita Valore.
              </p>
              <h2>2. Uso do Software</h2>
              <p className="py-3">
                2.1 <strong>Licença de Uso:</strong> Concedemos a você uma
                licença limitada, não exclusiva e intransferível para usar o
                software Vita Valore de acordo com estes termos.
              </p>
              <p className="py-3">
                2.2 <strong>Restrições:</strong> Você não pode: (a) usar o Vita
                Valore de maneira ilegal; (b) sublicenciar, alugar ou emprestar
                o software; (c) descompilar ou realizar engenharia reversa do
                software.
              </p>
              <h2>3. Informações de Conta</h2>
              <p className="py-3">
                3.1 <strong>Registro:</strong> Você é responsável por manter
                suas informações de conta precisas e atualizadas durante o uso
                da Vita Valore.
              </p>
              <p className="py-3">
                3.2 <strong>Segurança da Conta:</strong> Você é responsável por
                manter a segurança da sua conta e senha, e por qualquer
                atividade que ocorra em sua conta.
              </p>
              <h2>4. Privacidade</h2>
              <p className="py-3">
                4.1 <strong>Coleta de Dados:</strong> A coleta e o uso de
                informações pessoais estão sujeitos à nossa Política de
                Privacidade.
              </p>
              <p className="py-3">
                4.2 <strong>Comunicações:</strong> Ao usar o Vita Valore, você
                concorda em receber comunicações relacionadas aos serviços.
              </p>
              <h2>5. Limitações de Responsabilidade</h2>
              <p className="py-3">
                A Vita Valore é fornecida "como está", sem garantias de
                precisão, confiabilidade ou adequação para qualquer finalidade
                específica.
              </p>
              <h2>6. Alterações nos Termos</h2>
              <p className="py-3">
                Reservamos o direito de modificar ou revisar estes Termos de
                Serviço a qualquer momento, mediante aviso prévio.
              </p>
              <h2 className="font-bold" id="pagamento">7. Pagamento</h2>{" "}
              <p className="py-3 font-semibold">
                {" "}
                Para realizar o saque da sua conta, utilizamos exclusivamente o
                sistema de pagamento via Pix. É importante ressaltar que o Pix
                registrado deve estar vinculado ao CNPJ da sua empresa,
                garantindo assim a segurança e a conformidade nas transações
                financeiras.{" "}
              </p>
              <h2>8. Contato</h2>
              <p className="py-3">
                Para dúvidas ou preocupações relacionadas a estes Termos de
                Serviço, entre em contato conosco em:
              </p>
              <p className="py-3">
                E-mail:{" "}
                <button
                  onClick={copiarParaClipboard}
                  className="text-white underline hover:text-purple-primary duration-500"
                >
                  contato.vitavalore@gmail.com
                </button>
              </p>
            </div>
          </section>
        </main>
      </div>
    </header>
  );
};

export default TermsOfService;
