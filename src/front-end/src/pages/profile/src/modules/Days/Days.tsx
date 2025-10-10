import { useParams } from "react-router-dom"
import "./Days.css"
import { useEffect, useState} from "react"


export function Days() {

    const { id } = useParams<{ id: string }>()

    const [yesterday, setYesterday] = useState<number>(0)
    const [bestTimer, setBestTimer] = useState<number>(0)



    useEffect(() => {
        getYesterday()
        BestTimer()
    }, [])

    const getYesterday = async () => {
        const timer_spend = await fetch("http://localhost:3000/get_yesterday_timer", {
            method: "POST",
            body: JSON.stringify({ "username": id }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!timer_spend.ok) {
            throw new Error("Deu merda ao tentar pegar o timer de ontem")
        }

        const data = await timer_spend.json()
        setYesterday(data)

        console.log(data)
    }

    const BestTimer = async () => {
        const timer_spend = await fetch("http://localhost:3000/get_best_timer", {
            method: "POST",
            body: JSON.stringify({ "username": id }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!timer_spend.ok) {
            throw new Error("Deu merda ao tentar pegar o timer de ontem")
        }

        const data = await timer_spend.json()
        setBestTimer(data[0].max)
    }



    return (
        <div id="progress_scope">
            <div id="progress_group">
                <div className="progress_side_info">
                    <div className="progress_side_group">
                        <h2>Ontem</h2>
                        <h1>{yesterday}</h1>
                        <h2>Horas</h2>
                    </div>
                </div>

                <div id="progress_main_info">
                    <div className="progress_side_group">
                        <h2>Meta</h2>
                        <h1>{1}</h1>
                        <h2>Horas</h2>
                    </div>
                </div>

                <div className="progress_side_info">
                    <div className="progress_side_group">
                        <h2>Recorde</h2>
                        <h1>{bestTimer}</h1>
                        <h2>Horas</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}