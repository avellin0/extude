// // Clock.tsx
// import "./Clock.css";

// import type { ClockProps, DadosAcumulados } from "./Clock.interface";
// import type { ChangeEvent } from "react";

// import { ClockButtons } from "./Clock.buttons";
// import { useEffect, useRef } from "react";

// const formatTime = (seconds: number): string => {
//   const m = Math.floor(seconds / 60);
//   const s = seconds % 60;
//   return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
// };

// export default function Clock({
//   time,
//   setTime,
//   tempoInicial,
//   setTempoInicial,
//   acumulado,
//   setAcumulado,
//   running,
//   setRunning

// }: ClockProps) {

//   const params: ClockProps = { time, setTime, tempoInicial, setTempoInicial, acumulado, setAcumulado, running, setRunning };
//   const OmitParams: Omit<ClockProps, "acumulado" | "setAcumulado" | "running" | "setRunning"> = { time, setTime, tempoInicial, setTempoInicial };
//   const ClockButtonsInstance = new ClockButtons();

//   let tempoEstudado: DadosAcumulados = JSON.parse(localStorage.getItem("dadosAcumulados") || "null");

//   const started = tempoInicial > 0;
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);


//   useEffect(() => {
//     if (params.running) {
//       intervalRef.current = setInterval(() => {
//         ClockButtonsInstance.reloadPage(params);
//       }, 1000);
//     }
//     else {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     }

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };

//   }, [running, time, acumulado]);


//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => ClockButtons.handleInputChange(e, OmitParams);
//   const handleRestart = () => ClockButtonsInstance.handleRestart(params, tempoEstudado);

//   const toggleRunning = () => ClockButtons.toggleRunning(params, tempoEstudado);
//   const addTime = () => ClockButtons.addTime(OmitParams);
//   const subtractTime = () => ClockButtons.subtractTime(OmitParams);


//   return (
//     <div className="container">
//       <div className="clock">
//         <div className="circle">
//           <div className="time">{formatTime(time)}</div>
//         </div>
//       </div>

//       {!started && (
//         <div className="controls">
//           <button onClick={addTime} className="arrow">↑</button>
//           <input
//             type="number"
//             placeholder="Minutos"
//             onChange={handleInputChange}
//             className="time-input"
//           />
//           <button onClick={subtractTime} className="arrow">↓</button>
//         </div>
//       )}

//       <div className="actions">
//         <button onClick={toggleRunning} className="action-btn">
//           {running ? "⏸" : "▶"}
//         </button>
//         <button onClick={handleRestart} className="action-btn">↻</button>
//       </div>
//     </div>
//   );
// }