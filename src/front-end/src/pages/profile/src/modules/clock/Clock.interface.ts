export type ClockProps = {
  time: number;
  setTime: (value: number) => void;
  tempoInicial: number;
  setTempoInicial: (value: number) => void;
  acumulado: number;
  setAcumulado: (value: number) => void;
  running: boolean;
  setRunning: (value: boolean) => void;
};


export type DadosAcumulados = {
  totalEstudado: number;
  ultima_atualizacao: string;
};
