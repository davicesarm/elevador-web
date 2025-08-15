"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ElevadorStatus, Direcao } from "@/types/ElevadorStatus";

interface ContextProps {
  status: ElevadorStatus;
  setStatus: React.Dispatch<React.SetStateAction<ElevadorStatus>>;
  adicionarAndar: (andar: number, direcao: Direcao) => void;
}

const defaultStatus: ElevadorStatus = {
  andarAtual: 0,
  paradoNoAndar: false,
  andarMaximo: 0,
  andarMinimo: 0,
  direcao: "NEUTRO",
  andaresApertados: null,
};

export const ElevadorContext = createContext<ContextProps>({
  status: defaultStatus,
  setStatus: () => {},
  adicionarAndar: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function ElevadorProvider({ children }: ProviderProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [status, setStatus] = useState<ElevadorStatus>(defaultStatus);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      if (!response.ok) throw new Error("Falha ao buscar status");
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.error("Erro ao buscar status:", err);
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
      client.subscribe("/topic/status", (msg) => {
        setStatus((prev) => ({
          ...prev,
          ...JSON.parse(msg.body),
        }));
      });
    };

    client.activate();
    return () => {
      client.deactivate();
    };
  }, []);

  const adicionarAndar = (andar: number, direcao: Direcao) => {
    setStatus((prev) => ({
      ...prev,
      andaresApertados: {
        ...prev.andaresApertados,
        [andar]: [...(prev.andaresApertados?.[andar] || []), direcao],
      },
    }));
  };

  return (
    <ElevadorContext.Provider value={{ status, setStatus, adicionarAndar }}>
      {children}
    </ElevadorContext.Provider>
  );
}
