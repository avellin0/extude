import { DadosAcumulados } from "../clock/Clock"

export async function AddTimerOnDB(tempoEstudado: DadosAcumulados, username: string | undefined) {
    try {

        let minutes = Math.floor(tempoEstudado.totalEstudado / 60);
        let tempo_minutos = minutes > 0 ? minutes : 0

        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"

        console.log("duração em segundos:", tempoEstudado.totalEstudado);
        console.log("duracao em minutos:", tempo_minutos);
        

        const data = { username: username, duration: tempo_minutos, session_date: dateString };


        const response = await fetch("https://extude.onrender.com/update_timer", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            throw new Error("Deu merda ao tentar criar timer")
        }

        const responseJson = await response.json()


        return responseJson

    } catch (err) {
        console.error(`Deu merda aqui: ${err}`);
        return { status: 400, message: "error!" }
    }
}