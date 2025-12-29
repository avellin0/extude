
type DadosAcumulados = {
  totalEstudado: string;
  ultima_atualizacao: string;
};

export function getTimeFromStorage(): DadosAcumulados {
    const tempoEstudado: DadosAcumulados = JSON.parse(localStorage.getItem("dadosAcumulados") || "null");

    if (tempoEstudado.ultima_atualizacao === new Date().toISOString().substring(0, 10)) {
        return tempoEstudado;
    } else {
        return { totalEstudado: "0", ultima_atualizacao: "" };
    }  
}