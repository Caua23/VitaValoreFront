
  
  function Faq({ perguntas }: { perguntas: Array<{ titulo: string; descricao: string }> }) {
    return (
      <>
        <h2 className="text-center text-white font-bold text-3xl">FAQ - Perguntas Frequentes</h2>
        <section className="items-center flex flex-col justify-center m-10">
          {perguntas.map((pergunta, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-white font-bold text-xl">{pergunta.titulo}</h3>
              <p className="text-white text-sm font-normal text-justify max-w-xl">
                {pergunta.descricao}
              </p>
            </div>
          ))}
        </section>
      </>
    );
  }
  
  export default Faq;
  