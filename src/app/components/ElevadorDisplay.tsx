"use client";

import { useEffect, useState } from "react";
import ElevadorStatus from "@/types/ElevadorStatus";
import ElevadorButton from "./ElevadorButton";

const defaultStatus: ElevadorStatus = {
  andarAtual: 0,
  paradoNoAndar: false,
  andarMaximo: 0,
  andarMinimo: 0,
  direcao: "NEUTRO",
  andaresApertados: [],
  tempoRestantePausaMs: 800,
};

export default function ElevadorDisplay() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [status, setStatus] = useState<ElevadorStatus>(defaultStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${apiUrl}/status`, {
          cache: "no-store",
        });
        const data = await response.json();
        console.log("Dados recebidos:", data);
        setStatus((prevStatus) => ({
          ...prevStatus,
          ...data,
        }));
      } catch (err) {
        console.error("Erro ao buscar /status:", err);
      } finally {
        setLoading(false);
      }
    }, status.tempoRestantePausaMs);

    return () => clearInterval(interval);
  }, [status.tempoRestantePausaMs]);

  const handleClick = async (andar: number) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      andaresApertados: [...prevStatus.andaresApertados, andar],
    }));

    try {
      const response = await fetch(`${apiUrl}/addAndar`, {
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
    <div className="w-3xs m-auto border border-neutral-200 shadow-lg p-4 rounded-lg">
      <div className="flex justify-between border-b border-neutral-300 pb-2 px-2 mb-4 font-bold text-neutral-500">
        <h1>Andar: {status.andarAtual}</h1>
        <h1>{status.direcao === "NEUTRO" ? "Ocioso" : status.direcao.charAt(0).toUpperCase() + status.direcao.slice(1).toLowerCase()}</h1>
      </div>
      
      {loading && (
        <p className="text-sm text-gray-500 mt-3">Carregando andares…</p>
      )}

      {!loading &&
        (status.andarMinimo == null || status.andarMaximo == null) && (
          <p className="text-sm text-red-600 mt-3">
            Não foi possível carregar os andares.
          </p>
        )}

      {!loading && status.andarMinimo != null && status.andarMaximo != null && (
        <div className="flex flex-row-reverse flex-wrap gap-2 justify-center p-2">
          <ElevadorButton status={status} handleClick={handleClick} />
        </div>
      )}
    </div>
  );
}
