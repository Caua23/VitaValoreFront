function Main() {
    return (
        <main>
            <section className="Main">
                <div>
                    <div className="circulePurple1"></div>
                    <h1>Vita Valore</h1>
                    <h2>Anuncie seus produtos fitness</h2>
                    <p>
                        Transforme sua marca e alcance novos patamares ao anunciar na
                        VitaValore. Junte-se à nossa comunidade e dê um passo decisivo para o
                        sucesso do seu negócio. Não perca essa oportunidade única de crescer e
                        se destacar!
                    </p>
                    <br />
                    <p>
                        Seja parte da nossa jornada.
                        <a href="/auth/login">
                            <button className="ComeceAgoraButton">Comece agora!</button>
                        </a>
                    </p>
                </div>
                <div>
                    <img src="https://placehold.jp/959x615" alt="" />
                </div>
            </section>

            <section className="SobreNos">

                <h2>Quem Somos Nós?</h2>
                <p>
                    Somos uma equipe dedicada de desenvolvedores apaixonados pela tecnologia e pelo bem-estar. Estamos empenhados em criar o aplicativo <strong>Vita Valore</strong>, uma plataforma inovadora focada na saúde e no bem-estar dos nossos usuários.
                    Nosso app oferece recursos para ajudar você a manter uma vida saudável e equilibrada. Além disso, contamos com um <strong>marketplace de vendas</strong> especialmente projetado para empresas que desejam promover seus produtos fitness. Através do nosso marketplace, empresas podem divulgar seus produtos e alcançar um público engajado e interessado em um estilo de vida saudável.
                    Junte-se a nós e faça parte dessa jornada para transformar a forma como cuidamos da nossa saúde e do nosso bem-estar.
                </p>

            </section>
            <div className="circulePurple2"></div>
            <section className="SectionComoFunciona">
                <h2>Como Funciona?</h2>
                <div className="ComoFunciona">
                    <p className="ComoFuncionaText">
                        <strong>📝 Cadastro Simples</strong>
                        <br />
                        Registre sua empresa e comece a aproveitar as vantagens do nosso marketplace.
                    </p >

                    <p className="ComoFuncionaText">
                        <strong>📢 Divulgação Gratuita</strong><br />
                        Ganhe uma divulgação gratuita para um produto fitness ao se cadastrar!
                    </p>

                    <p className="ComoFuncionaText">
                        <strong>🚀 Aumente Sua Visibilidade</strong>
                        <br />
                        Destaque seus produtos e alcance um público engajado em nossa plataforma.
                    </p>

                </div>

            </section>

            <div className="ComeceAgora">
                <h2>Venha fazer parte!</h2>
                <a href="/auth/register">
                    <button>Comece Agora</button>
                </a>
            </div>


        </main>
    );
}

export default Main;
