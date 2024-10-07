import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PerguntasProps } from "@/interface/PerguntasProps";

export function UnansweredReviews({ perguntas }: PerguntasProps) {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-96 w-96 rounded-md border bg-black text-neutral-400">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-normal leading-none text-neutral-50">
          Perguntas Sem Resposta
        </h4>
        <Accordion type="single"  collapsible>
          {perguntas.map((pergunta) => (
            <AccordionItem value={`item-${pergunta.id}`} key={pergunta.id}>
              <AccordionTrigger className="text-start ">{pergunta.titulo}</AccordionTrigger>
              <AccordionContent>
                <p className="text-white">{pergunta.pergunta}</p>
                <Button
                  variant={"link"}
                  className="mt-2 text-white font-semibold hover:text-purple-primary duration-500"
                  onClick={() => {
                    navigate(`/Empresa/Pergunta/${pergunta.id}`);
                  }}
                >
                  Ir para pergunta
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
