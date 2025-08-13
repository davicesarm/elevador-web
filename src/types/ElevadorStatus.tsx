export default interface ElevadorStatus {
  andarAtual: number;
  paradoNoAndar: boolean;
  andarMaximo: number;
  andarMinimo: number;
  direcao: "NEUTRO" | "SUBINDO" | "DESCENDO";
  andaresApertados: number[];
  tempoRestantePausaMs: number;
}