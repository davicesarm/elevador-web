import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import DirectionButton from "./DirectionButton";
import { useContext } from "react";
import { ElevadorContext } from "@/context/ElevadorContext";

export default function ElevadorButton({ andar }: { andar: number }) {
  const { status: elevadorStatus } = useContext(ElevadorContext);

  const isAndarAtual = elevadorStatus.andarAtual === andar;
  const isParadoNoAndar = elevadorStatus.paradoNoAndar && isAndarAtual;

  let borderColorClass = "border-neutral-300 hover:border-neutral-400";

  if (isAndarAtual && !isParadoNoAndar) {
    borderColorClass = "border-blue-500";
  }

  return (
    <div
      className={`flex text-sm font-semibold cursor-pointer h-14 w-14 shadow-sm border rounded ${borderColorClass}`}>
      <DirectionButton
        andar={andar}
        direcao="NEUTRO"
        className="w-1/2 border-r">
        {andar}
      </DirectionButton>
      <div className="flex flex-col w-1/2">
        <DirectionButton
          andar={andar}
          direcao="SUBINDO"
          className="h-1/2 flex justify-center items-center border-b">
          <FaCaretUp />
        </DirectionButton>
        <DirectionButton
          andar={andar}
          direcao="DESCENDO"
          className="h-1/2 flex justify-center items-center">
          <FaCaretDown />
        </DirectionButton>
      </div>
    </div>
  );
}
