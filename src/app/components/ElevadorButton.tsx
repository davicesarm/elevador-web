import { ElevadorStatus } from "@/types/ElevadorStatus";

export default function ElevadorButton({
  andar,
  elevadorStatus,
}: {
  andar: number;
  elevadorStatus: ElevadorStatus;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (elevadorStatus.andaresApertados === null) return;

  const isApertado =
    elevadorStatus.andaresApertados?.[andar]?.includes("NEUTRO");
  const isAndarAtual = elevadorStatus.andarAtual === andar;
  const isParadoNoAndar =
    elevadorStatus.paradoNoAndar && elevadorStatus.andarAtual === andar;

  let bgColorClass = "bg-white hover:bg-neutral-300 text-neutral-500";
  let borderColorClass = "border-neutral-300 hover:border-neutral-400";

  if (isParadoNoAndar) {
    bgColorClass = "bg-blue-500 text-white hover:bg-blue-600";
  } else if (isApertado) {
    bgColorClass = "bg-green-500 text-white hover:bg-green-600";
  }

  if (isAndarAtual && !isParadoNoAndar) {
    borderColorClass = "border-blue-500";
  }

  const handleClick = async (andar: number) => {
    try {
      const response = await fetch(`${API_URL}/addAndar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: andar }),
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
      onClick={() => handleClick(andar)}
      className={`text-sm font-semibold cursor-pointer h-12 w-12 shadow-sm border rounded 
                  ${bgColorClass}
                  ${borderColorClass}
                `}>
      {andar}
    </button>
  );
}
