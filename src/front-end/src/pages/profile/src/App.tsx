""// App.tsx
import { useState } from "react";
import Clock from "./modules/clock/Clock";
import { AcumuladoBox } from "./modules/sequence/Sequence";
import "./App.css";
import { Todo } from "./modules/Todo/Todo";
import { Days } from "./modules/Days/Days";
import { Sidebar } from "./modules/SideBar/Sidebar";

export function UserProfileTimer() {
  const [acumulado, setAcumulado] = useState(0);
  const [tempoInicial, setTempoInicial] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);


  


  return (
    <div id="personal_dashboard">
      <div id="personal_dashboard_sidebar_scope">
        <Sidebar/>
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
            <Todo/>
          </div>
        
        </div>

        <div id='personal_dashboard_main_scope_days'>
          <div id='personal_dashboard_main_scope_days_container'>
            <Days/>
          </div>

          <div id='personal_dashboard_main_scope_sequence'>
            <AcumuladoBox totalEstudado={running ? acumulado + (tempoInicial - time) : acumulado} />
          </div>
        </div>
      </div>
    </div>
  );
}

