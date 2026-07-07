// import { type ChangeEvent } from "react";
// import type { DadosAcumulados } from "./Clock.interface";
// import type { ClockProps } from "./Clock.interface";
// import { AddTimerOnDB } from "../scripts/AddTimerOnDB";

// export class ClockButtons {
//     async reloadPage(params: ClockProps) {
//         if (params.time <= 1) {
//             params.setRunning(false);
//             await AddTimerOnDB(
//                 params.acumulado + params.tempoInicial,
//                 "id_usuario",
//             ); // Substitua "id_usuario" pelo ID real do usuário
//             params.setAcumulado(params.acumulado + params.tempoInicial);
//             params.setTime(0);
//         } else {
//             params.setTime(params.time - 1);
//         }
//     }

//     async AddTimerOnDB(tempoEstudado: DadosAcumulados, id: string) {
//         const result = await fetch(`http://localhost:3000/api/study/sessions/${id}`, {
//             method: "POST",
//             body: JSON.stringify({ tempoEstudado }),
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//             }
//         })

      
//         return result;
//     }
    
//     static addTime = (
//         params: Omit<
//             ClockProps,
//             "acumulado" | "setAcumulado" | "running" | "setRunning"
//         >,
//     ) => {
//         params.setTime(params.time + 1500);
//         params.setTempoInicial(params.tempoInicial + 1500);
//     };

//     static subtractTime = (
//         params: Omit<
//             ClockProps,
//             "acumulado" | "setAcumulado" | "running" | "setRunning"
//         >,
//     ) => {
//         const newTime = Math.max(params.time - 600, 0);
//         params.setTime(newTime);
//         params.setTempoInicial(Math.max(params.tempoInicial - 600, 0));
//     };

//     static handleInputChange = (
//         e: ChangeEvent<HTMLInputElement>,
//         params: Omit<
//             ClockProps,
//             "acumulado" | "setAcumulado" | "running" | "setRunning"
//         >,
//     ) => {
//         const minutes = Number(e.target.value);

//         if (!isNaN(minutes)) {
//             const seconds = minutes * 60;
//             params.setTime(seconds);
//             params.setTempoInicial(params.time);
//         }
//     };

//     static toggleRunning = (
//         params: ClockProps,
//         tempoEstudado: DadosAcumulados,
//     ) => {
//         if (!params.running) {
//             params.setTempoInicial(params.time);
//         } else {
//             const tempoPassado = params.tempoInicial - params.time;
//             if (tempoPassado > 0) {
//                 params.setAcumulado(params.acumulado + tempoPassado);
//                 tempoEstudado.totalEstudado = 0;
//             }
//         }

//         params.setRunning(!params.running);
//     };

//     async handleRestart(params: ClockProps, tempoEstudado: DadosAcumulados) {
//         console.log("tempo acumulado:", params.acumulado);
//         console.log("tempo estudado:", tempoEstudado);

//         await this.AddTimerOnDB(tempoEstudado, "id_usuario"); // Substitua "id_usuario" pelo ID real do usuário

//         params.setTime(0);
//         params.setRunning(false);
//         params.setTempoInicial(0);
//     }
// }
