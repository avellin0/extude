import { useEffect, useState } from 'react';
import { Chart, type DayData } from './chart/Chart';
import { scheduleMocked } from './mockDatas/scheduleMocked';

import './schedule.css';

export function Schedule() {
    const [data, setData] = useState<DayData[]>([]);
    const [total, setTotal] = useState<any>(0);

    useEffect(() => {
        const lastSessions = async () => {
            

            const Data = scheduleMocked;

            // 🔹 1. Agrupar por dia (somando minutos)
            const grouped: Record<number, number> = {};

            Data.forEach((session: any) => {
                const day = Number(String(session.started_at).slice(8, 10));
                const minutos = session.duration_at_seconds / 60;
                console.log("dias:", day, "minutos:", minutos);

                if (!grouped[day]) grouped[day] = 0;

                grouped[day] += minutos;
            });

            // 🔹 2. Criar array completo (1 a 31)
            const fullMonth: DayData[] = [];

            for (let i = 1; i <= 31; i++) {
                const totalMin = grouped[i] || 0;

                let level = 0;

                if (totalMin <= 0) level = 0;
                else if (totalMin <= 30) level = 1;
                else if (totalMin <= 60) level = 2;
                else if (totalMin <= 90) level = 3;
                else if (totalMin <= 120) level = 4;
                else level = 5;

                fullMonth.push({ day: i, level });
            }

            // 🔹 3. Garantir ordem (extra segurança)
            fullMonth.sort((a, b) => a.day - b.day);

            setData(fullMonth);
        };


        lastSessions();
    }, []);



    useEffect(() => {
        const teste = () => {
            let horasEstudadas = 0;

            if (!scheduleMocked) return

            for (let x = 0; x < scheduleMocked.length; x++) {
                const teste = scheduleMocked[x].duration_at_seconds
                horasEstudadas += teste 
                console.log(teste);

                console.log("horas estudadas:", horasEstudadas);
            }

            setTotal(horasEstudadas)
            console.log("total de horas estudadas:", total);

        }

        teste()
    }, [data])




    return (
        <div id="schedule-body">
            <div id="schedule-header">
                <h1>Histórico</h1>
                <div id="schedule-btns">
                    <button className="schedule-btn-month">Back</button>
                    <button className="schedule-btn-month">Next</button>
                </div>
            </div>

            <div id="schedule-content">
                <div id="schedule-content-header">
                    <div id="schedule-content-header-name">
                        <h2>Davi</h2>
                    </div>

                    <div id="schedule-content-header-stats">
                        <p>Tempo total estudado: {(total/3600).toFixed(1)} horas</p>
                        <p>Tempo médio por dia: {(total/3600/31).toFixed(1)} horas</p>
                        <p>Número de dias estudados: {data.filter((d) => d.level > 0).length}</p>
                    </div>
                </div>

                <div id="schedule-content-body">
                    <p>Gráfico de evolução do tempo de estudo:</p>

                    <div id="schedule-chart">
                        <Chart data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}


// // const result = await fetch("http://localhost:3000/api/study/sessions/c28cd6d4-5453-4fc0-9331-47daa85107b6", {
            //     headers: {
            //         "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiRGF2aSIsImlkIjoiYzI4Y2Q2ZDQtNTQ1My00ZmMwLTkzMzEtNDdkYWE4NTEwN2I2IiwiZXhwaXJlSW4iOjE3Nzc3NjA2OTA5NzAsImlhdCI6MTc3Nzc1NzA5MH0.UzMuE2cO27wvJzMG9VS9PY_UdQFJ91elRrGxgday0dE"
            //     }
            // });

            // if (!result.ok) return;