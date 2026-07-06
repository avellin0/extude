import "./App.css";
import { AcumuladoBox } from "./modules/sequence/Sequence";
import { Todo } from "./modules/Todo/Todo";
import { Days } from "./modules/Days/Days";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Clock from "./modules/clock/Clock";


import user from "@/pages/image/profile.png"
import arrow_back from "@/pages/icons/arrow_back.png"



export function UserProfileTimer() {
  const [acumulado, setAcumulado] = useState(0);
  const [tempoInicial, setTempoInicial] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const { name, id } = useParams<{ name: string; id: string }>()

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };



  return (
    <div id="personal_dashboard">

      <div id="personal_dashboard_sidebar_scope">
        <div>
          <img src={arrow_back} alt="voltar" id="personal_dashboard_back_icon" onClick={handleBackClick} />
        </div>

        <div id="personal_dashboard_content_header">
          <img src={user} alt="Imagem do usuário" />
          <h1>{name}</h1>
        </div>

        <div id="personal_dashboard_content_list">
          <p>Level</p>
          <h3>Mid level</h3>

          <p>Timer</p>
          <h3 >Pomodoro+</h3>

          <p>Space</p>
          <h3>Software Engineer</h3>

          <p>Email</p>
          <h4>Ploglamador@hotmail.com</h4>

          <p>Phone</p>
          <h3>+55 21 96595-1085</h3>
        </div>
      </div>

      <div id="personal_dashboard_main_scope">
        <div id='personal_dashboard_main_scope_time'>

          <div id='personal_dashboard_main_scope_time_container'>
            <Clock
              time={time}
              setTime={setTime}
              tempoInicial={tempoInicial}
              setTempoInicial={setTempoInicial}
              acumulado={acumulado}
              setAcumulado={setAcumulado}
              running={running}
              setRunning={setRunning}
            />
          </div>

          <div id='personal_dashboard_main_scope_todo'>
            <Todo />
          </div>

        </div>

        <div id='personal_dashboard_main_scope_days'>
          <div id='personal_dashboard_main_scope_days_container'>
            <Days />
          </div>

          <div id='personal_dashboard_main_scope_sequence'>
            <AcumuladoBox totalEstudado={running ? acumulado + (tempoInicial - time) : acumulado} />
            <div id="personal_dashboard_statistics">
              <div>
                <h2>Estatísticas</h2>
              </div>
              <p>Tempo médio por sessão: 25 minutos</p>
              <p>Sessões concluídas: 10</p>
              <a href={`/schedule/${name}/${id}`}>Ver histórico do último mês</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

