// Clock.tsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import "./Clock.css";
import {AddTimerOnDB} from "../scripts/AddTimerOnDB"

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};


type ClockProps = {
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

export default function Clock({time,setTime,tempoInicial,setTempoInicial,acumulado,setAcumulado,running,setRunning}: ClockProps) {

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const started = tempoInicial > 0;

    const {id} = useParams<{id: string}>()
  
  const tempoEstudado: DadosAcumulados = JSON.parse(localStorage.getItem("dadosAcumulados") || "null");

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        if (time <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setAcumulado(acumulado + tempoInicial);
          setTime(0);
        } else {
          setTime(time - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, time, tempoInicial, acumulado, setAcumulado, setRunning, setTime]);

  const handleRestart = () => {
    setTime(0);
    setRunning(false);
    setTempoInicial(0);
    AddTimerOnDB(tempoEstudado, id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(e.target.value);
    
    if (!isNaN(minutes)) {
      const seconds = minutes * 60;
      setTime(seconds);
      setTempoInicial(time);
    }
  };

  const addTime = () => {
    setTime(time + 600);
    setTempoInicial(tempoInicial + 600);
  };

  const subtractTime = () => {
    const newTime = Math.max(time - 600, 0);
    setTime(newTime);
    setTempoInicial(Math.max(tempoInicial - 600, 0));
  };

  const toggleRunning = () => {
    if (!running) {
      setTempoInicial(time);
      AddTimerOnDB(tempoEstudado, id);
    } else {
      const tempoPassado = tempoInicial - time;
      if (tempoPassado > 0) {
        setAcumulado(acumulado + tempoPassado);
      }
    }

    setRunning(!running);
  };

  return (
    <div className="container">
      <div className="clock">
        <div className="circle">
          <div className="time">{formatTime(time)}</div>
        </div>
      </div>

      {!started && (
        <div className="controls">
          <button onClick={addTime} className="arrow">↑</button>
          <input
            type="number"
            placeholder="Minutos"
            onChange={handleInputChange}
            className="time-input"
          />
          <button onClick={subtractTime} className="arrow">↓</button>
        </div>
      )}

      <div className="actions">
        <button onClick={toggleRunning} className="action-btn">
          {running ? "⏸" : "▶"}
        </button>
        <button onClick={handleRestart} className="action-btn">↻</button>
      </div>
    </div>
  );
}