import { useState } from "react";
import { useParams } from "react-router-dom";

import "./Chart.css"
export type DayData = {
    day: number; // 1 a 31
    level: number; // 1 a 5 (1 = mínimo, 5 = ótimo)
};


export const Chart = ({ data }: { data: DayData[] }) => {

    const [goal, setGoal] = useState("");
    const { name } = useParams<{ id: string | any, name: string }>()
    console.log("name:", name);
    
    const width = 1400;
    const height = 200;

    const getX = (day: any) => (day - 1) * (width / 30);
    const getY = (level: any) => height - (level - 1) * (height / 4);

    const points = data
        .map(d => `${getX(d.day)},${getY(d.level)}`)
        .join(" ");


    const averageLevel = data.reduce((sum, d) => sum + d.level, 0) / data.length;

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setGoal((e.target as HTMLInputElement).value);
            e.currentTarget.value = ""; // limpa o input após definir o objetivo
        }
    };

    return (
        <div id="chart-container">
            <div>
                <svg width={width} height={height}>

                    {/* linhas horizontais (níveis) */}
                    {[1, 2, 3, 4, 5].map(level => (
                        <line
                            key={level}
                            x1={0}
                            x2={width}
                            y1={getY(level)}
                            y2={getY(level)}
                            stroke="#eee"
                        />
                    ))}

                    {/* linha conectando pontos */}
                    <polyline
                        fill="none"
                        stroke="gray"
                        strokeWidth="2"
                        points={points}
                    />

                    {/* pontos */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            cx={getX(d.day)}
                            cy={getY(d.level)}
                            r={15}
                            fill="transparent"
                        />
                    ))}

                </svg>
                <div id="chart-info">
                    <p><strong>Legenda:</strong></p>
                    <p>Nível 1: Muito pouco estudo</p>
                    <p>Nível 2: Pouco estudo</p>
                    <p>Nível 3: Estudo moderado</p>
                    <p>Nível 4: Bom estudo</p>
                    <p>Nível 5: Ótimo estudo</p>
                    <p><strong>Nível médio de estudo: {averageLevel.toFixed(0)}</strong></p>
                </div>
            </div>

            <div id="your-goals">
                <p><strong>Sem um objetivo claro, é difícil manter a motivação.</strong></p>
                <p>Quem tem um porquê enfrenta qualquer como.</p>

                {goal.length > 0 || name === "recruiter"? (
                    <div id="your-goals-list">
                        <p><strong>Seus objetivos:</strong></p>
                        <p>{name === "recruiter" ? "Me tornar um desenvolvedor de software respeitado e criar soluções inovadoras por meio de tecnologia" : goal}</p>
                    </div>
                ) : (
                    <input type="text" placeholder="Digite seu objetivo..." id="your-goals-input" onKeyDown={handleEnter} />
                )}
            </div>

        </div>
    );
};