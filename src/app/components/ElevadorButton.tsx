import ElevadorStatus from "@/types/ElevadorStatus";

export default function ElevadorButton({
  status,
  handleClick,
}: {
  status: ElevadorStatus;
  handleClick: (andar: number) => void;
}) {
  return (
    <>
      {Array.from(
        { length: status.andarMaximo - status.andarMinimo + 1 },
        (_, i) => status.andarMaximo - i
      ).map((andar) => {
        const isApertado = status.andaresApertados.includes(andar);
        const isAndarAtual = status.andarAtual === andar;
        const isParadoNoAndar =
          status.paradoNoAndar && status.andarAtual === andar;
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
      })}
    </>
  );
}
