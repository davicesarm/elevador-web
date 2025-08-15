"use client";

import ElevadorPanel from "./ElevadorPanel";
import { ElevadorProvider, ElevadorContext } from "@/context/ElevadorContext";
import { useContext } from "react";

export default function Elevador() {
  return (
    <ElevadorProvider>
      <ElevadorContent />
    </ElevadorProvider>
  );
}

function ElevadorContent() {
  const { status } = useContext(ElevadorContext);

  return (
    <div className="w-3xs m-auto border border-neutral-200 shadow-lg p-4 rounded-lg">
      <div className="flex justify-between border-b border-neutral-300 pb-2 px-2 mb-4 font-bold text-neutral-500">
        <h1>Andar: {status.andarAtual}</h1>
        <h1>
          {status.direcao === "NEUTRO"
            ? "Ocioso"
            : status.direcao.charAt(0).toUpperCase() +
              status.direcao.slice(1).toLowerCase()}
        </h1>
      </div>

      {status.andarMinimo == null || status.andarMaximo == null ? (
        <p className="text-sm text-red-600 mt-3">
          Não foi possível carregar os andares.
        </p>
      ) : (
        <ElevadorPanel />
      )}
    </div>
  );
}
