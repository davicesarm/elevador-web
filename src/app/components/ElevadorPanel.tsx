import ElevadorButton from "./ElevadorButton";
import { ElevadorContext } from "@/context/ElevadorContext";
import { useContext } from "react";

export default function ElevadorPanel() {
  const { status } = useContext(ElevadorContext);

  return (
    <div className="flex flex-row-reverse flex-wrap gap-2 justify-center p-1">
      {Array.from(
        { length: status.andarMaximo - status.andarMinimo + 1 },
        (_, i) => status.andarMaximo - i
      ).map((andar) => {
        return <ElevadorButton key={andar} andar={andar} />;
      })}
    </div>
  );
}
