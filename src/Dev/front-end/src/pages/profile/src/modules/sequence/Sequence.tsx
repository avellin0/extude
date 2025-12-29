// Sequence.tsx
import "./Sequence.css";

type Props = {
  totalEstudado: number; // em segundos
};

export function AcumuladoBox({ totalEstudado }: Props) {

  const data = {
    totalEstudado: totalEstudado.toString(),
    ultima_atualizacao: new Date().toISOString().substring(0, 10)
  };

  localStorage.setItem("dadosAcumulados", JSON.stringify(data));


  const tempo_final = Math.floor(totalEstudado / 60);

  return (
    <div className="acumulado-box">
      <strong>Total acumulado:</strong> {tempo_final} minutos
    </div>
  );
}
