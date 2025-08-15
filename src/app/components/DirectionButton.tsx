import { ElevadorContext } from "@/context/ElevadorContext";
import { Direcao } from "@/types/ElevadorStatus";
import { useContext } from "react";

export default function DirectionButton({
  andar,
  direcao,
  className,
  children,
}: {
  andar: number;
  direcao: Direcao;
  className: string;
  children: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { status, adicionarAndar } = useContext(ElevadorContext);

  if (status.andaresApertados === null) return;

  const isApertado = status.andaresApertados?.[andar]?.includes(direcao);
  const isAndarAtual = status.andarAtual === andar;
  const isParadoNoAndar = status.paradoNoAndar && isAndarAtual;

  let bgColorClass = "bg-white hover:bg-neutral-300 text-neutral-500";

  if (isParadoNoAndar) {
    bgColorClass = "bg-blue-500 text-white hover:bg-blue-600";
  } else if (isApertado) {
    bgColorClass = "bg-green-500 text-white hover:bg-green-600";
  }

  const handleClick = async (andar: number, direcao: Direcao) => {
    adicionarAndar(andar, direcao);
    try {
      const response = await fetch(`${API_URL}/addAndar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: andar, direcao }),
      });

      if (!response.ok) {
        throw new Error("Falha ao adicionar andar.");
      }
    } catch (err) {
      console.error("Erro ao adicionar andar:", err);
    }
  };

  return (
    <button
      key={andar}
      onClick={() => handleClick(andar, direcao)}
      className={`${className}
                  ${bgColorClass}
                  border-neutral-300 cursor-pointer
                `}>
      {children}
    </button>
  );
}
