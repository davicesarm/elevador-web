"use client";

import { useEffect, useState } from "react";
import { ElevadorStatus, Direcao } from "@/types/ElevadorStatus";
import ElevadorPanel from "./ElevadorPanel";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const defaultStatus: ElevadorStatus = {
  andarAtual: 0,
  paradoNoAndar: false,
  andarMaximo: 0,
  andarMinimo: 0,
  direcao: "NEUTRO",
  andaresApertados: null,
};

export default function Elevador() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [status, setStatus] = useState<ElevadorStatus>(defaultStatus);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      if (!response.ok) {
        throw new Error("Falha ao buscar status.");
      }
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.error("Erro ao buscar status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const socket = new SockJS(`${API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/status", (data) => {
        setStatus((prevStatus) => ({
          ...prevStatus,
          ...JSON.parse(data.body),
        }));
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

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

      {/* <LoadingIndicator /> */}
      {loading && (
        <p className="text-sm text-gray-500 mt-3">Carregando andares…</p>
      )}

      {/* <LoadingError /> */}
      {!loading &&
        (status.andarMinimo == null || status.andarMaximo == null) && (
          <p className="text-sm text-red-600 mt-3">
            Não foi possível carregar os andares.
          </p>
        )}

      {/* Content loaded */}
      {!loading && status.andarMinimo != null && status.andarMaximo != null && (
        <div className="flex flex-row-reverse flex-wrap gap-2 justify-center p-2">
          <ElevadorPanel elevadorStatus={status} />
        </div>
      )}
    </div>
  );
}
