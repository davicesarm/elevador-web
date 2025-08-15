import { ElevadorStatus } from "@/types/ElevadorStatus";
import ElevadorButton from "./ElevadorButton";

export default function ElevadorPanel({
  elevadorStatus,
}: {
  elevadorStatus: ElevadorStatus;
}) {
  return (
    <>
      {Array.from(
        { length: elevadorStatus.andarMaximo - elevadorStatus.andarMinimo + 1 },
        (_, i) => elevadorStatus.andarMaximo - i
      ).map((andar) => {
        return (
          <ElevadorButton
            key={andar}
            andar={andar}
            elevadorStatus={elevadorStatus}
          />
        );
      })}
    </>
  );
}
