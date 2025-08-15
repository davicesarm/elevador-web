export interface ElevadorStatus {
  andarAtual: number;
  paradoNoAndar: boolean;
  andarMaximo: number;
  andarMinimo: number;
  direcao: "NEUTRO" | "SUBINDO" | "DESCENDO";
  andaresApertados: AndaresApertados | null;
}

export type Direcao = "NEUTRO" | "SUBINDO" | "DESCENDO";

type AndaresApertados = {
  [key: number]: Direcao[];
};
