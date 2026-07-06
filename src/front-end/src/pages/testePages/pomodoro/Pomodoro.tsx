import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Pomodoro.css';
import { LeftBar } from '../home/components/leftBar/LeftBar';

type pdTabId = 'foco' | 'pausaCurta' | 'pausaLonga' | 'historico';

interface pdModeConfig {
  id: pdTabId;
  label: string;
  icon: string;
  durationSeconds: number;
  statusText: string;
  color: string;
}

interface pdHistoricoItem {
  id: string;
  tipo: 'foco' | 'pausaCurta' | 'pausaLonga';
  label: string;
  icon: string;
  minutos: number;
  data: string;
  hora: string;
}

interface pdStat {
  id: string;
  icon: string;
  value: string;
  label: string;
  bg: string;
  hasInfo?: boolean;
}

interface pdStepInfo {
  numero: number;
  titulo: string;
  descricao: string;
}

const pdModes: pdModeConfig[] = [
  {
    id: 'foco',
    label: 'Foco',
    icon: '🍅',
    durationSeconds: 25 * 60,
    statusText: 'Prepare-se e foque!',
    color: '#e5544d',
  },
  {
    id: 'pausaCurta',
    label: 'Pausa Curta',
    icon: '☕',
    durationSeconds: 5 * 60,
    statusText: 'Respire e relaxe um pouco.',
    color: '#2f8f5b',
  },
  {
    id: 'pausaLonga',
    label: 'Pausa Longa',
    icon: '🌿',
    durationSeconds: 15 * 60,
    statusText: 'Aproveite para descansar de verdade.',
    color: '#2f8f5b',
  },
];

const pdInitialHistorico: pdHistoricoItem[] = [
  { id: 'h1', tipo: 'foco', label: 'Foco', icon: '🍅', minutos: 25, data: 'Hoje', hora: '14:30' },
  { id: 'h2', tipo: 'pausaCurta', label: 'Pausa Curta', icon: '☕', minutos: 5, data: 'Hoje', hora: '13:55' },
  { id: 'h3', tipo: 'foco', label: 'Foco', icon: '🍅', minutos: 25, data: 'Hoje', hora: '13:30' },
  { id: 'h4', tipo: 'pausaCurta', label: 'Pausa Curta', icon: '☕', minutos: 5, data: 'Hoje', hora: '13:05' },
  { id: 'h5', tipo: 'foco', label: 'Foco', icon: '🍅', minutos: 25, data: 'Hoje', hora: '12:40' },
];

const pdSteps: pdStepInfo[] = [
  { numero: 1, titulo: 'Defina uma tarefa', descricao: 'Escolha o que você vai focar.' },
  { numero: 2, titulo: 'Foque por 25 min', descricao: 'Trabalhe sem distrações até o timer acabar.' },
  { numero: 3, titulo: 'Faça uma pausa', descricao: 'Descanse e recarregue sua mente.' },
  { numero: 4, titulo: 'Repita o ciclo', descricao: 'A cada 4 ciclos, faça uma pausa longa.' },
];

function pdFormatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pdFormatTempoFocado(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

const pdRadius = 130;
const pdCircumference = 2 * Math.PI * pdRadius;

export const Pomodoro: React.FC = () => {
  const [pdActiveTab, setPdActiveTab] = useState<pdTabId>('foco');
  const [pdSecondsLeft, setPdSecondsLeft] = useState<number>(pdModes[0].durationSeconds);
  const [pdIsRunning, setPdIsRunning] = useState<boolean>(false);
  const [pdTaskName, setPdTaskName] = useState<string>('');
  const [pdShowTaskInput, setPdShowTaskInput] = useState<boolean>(false);
  const [pdTaskDraft, setPdTaskDraft] = useState<string>('');

  const [pdCiclosConcluidos, setPdCiclosConcluidos] = useState<number>(4);
  const [pdTempoFocadoSegundos, setPdTempoFocadoSegundos] = useState<number>(3 * 3600 + 20 * 60);
  const [pdPausasLongas, setPdPausasLongas] = useState<number>(2);
  const [pdFocoScore, setPdFocoScore] = useState<number>(12);

  const [pdHistorico, setPdHistorico] = useState<pdHistoricoItem[]>(pdInitialHistorico);
  const [pdShowFullHistory, setPdShowFullHistory] = useState<boolean>(false);

  const pdIntervalRef = useRef<number | null>(null);

  const pdCurrentMode = pdModes.find((m) => m.id === pdActiveTab) ?? pdModes[0];

  const pdHandleComplete = useCallback(() => {
    setPdIsRunning(false);

    const now = new Date();
    const hora = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const completedMode = pdModes.find((m) => m.id === pdActiveTab) ?? pdModes[0];
    const minutos = Math.round(completedMode.durationSeconds / 60);

    const novoItem: pdHistoricoItem = {
      id: `h-${Date.now()}`,
      tipo: completedMode.id === 'historico' ? 'foco' : (completedMode.id as 'foco' | 'pausaCurta' | 'pausaLonga'),
      label: completedMode.label,
      icon: completedMode.icon,
      minutos,
      data: 'Hoje',
      hora,
    };

    setPdHistorico((prev) => [novoItem, ...prev]);

    if (completedMode.id === 'foco') {
      setPdCiclosConcluidos((prev) => prev + 1);
      setPdTempoFocadoSegundos((prev) => prev + completedMode.durationSeconds);
      setPdFocoScore((prev) => prev + 1);
    } else if (completedMode.id === 'pausaLonga') {
      setPdPausasLongas((prev) => prev + 1);
    }
  }, [pdActiveTab]);

  useEffect(() => {
    if (pdIsRunning) {
      pdIntervalRef.current = window.setInterval(() => {
        setPdSecondsLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(pdIntervalRef.current ?? undefined);
            pdHandleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (pdIntervalRef.current) {
      window.clearInterval(pdIntervalRef.current);
      pdIntervalRef.current = null;
    }

    return () => {
      if (pdIntervalRef.current) {
        window.clearInterval(pdIntervalRef.current);
      }
    };
  }, [pdIsRunning, pdHandleComplete]);

  const pdHandleTabChange = (tabId: pdTabId) => {
    setPdIsRunning(false);
    setPdActiveTab(tabId);
    if (tabId !== 'historico') {
      const mode = pdModes.find((m) => m.id === tabId);
      if (mode) {
        setPdSecondsLeft(mode.durationSeconds);
      }
    }
    setPdShowFullHistory(false);
  };

  const pdHandleStart = () => {
    if (pdActiveTab === 'historico') return;
    setPdIsRunning(true);
  };

  const pdHandlePause = () => {
    setPdIsRunning(false);
  };

  const pdHandleReset = () => {
    setPdIsRunning(false);
    setPdSecondsLeft(pdCurrentMode.durationSeconds);
  };

  const pdHandleStop = () => {
    setPdIsRunning(false);
    setPdSecondsLeft(pdCurrentMode.durationSeconds);
  };

  const pdHandleOpenTaskInput = () => {
    setPdShowTaskInput(true);
    setPdTaskDraft(pdTaskName);
  };

  const pdHandleSaveTask = () => {
    setPdTaskName(pdTaskDraft.trim());
    setPdShowTaskInput(false);
  };

  const pdHandleCancelTask = () => {
    setPdShowTaskInput(false);
    setPdTaskDraft('');
  };

  const pdHandleViewFullHistory = () => {
    setPdActiveTab('historico');
    setPdShowFullHistory(true);
  };

  const pdProgressFraction =
    pdActiveTab === 'historico'
      ? 0
      : 1 - pdSecondsLeft / pdCurrentMode.durationSeconds;
  const pdDashOffset = pdCircumference * (1 - pdProgressFraction);

  const pdStats: pdStat[] = [
    {
      id: 'ciclos',
      icon: '🎯',
      value: `${pdCiclosConcluidos}`,
      label: 'Ciclos concluídos',
      bg: 'pd-stat-icon-purple',
    },
    {
      id: 'tempo',
      icon: '📈',
      value: pdFormatTempoFocado(pdTempoFocadoSegundos),
      label: 'Tempo focado',
      bg: 'pd-stat-icon-green',
    },
    {
      id: 'pausas',
      icon: '📝',
      value: `${pdPausasLongas}`,
      label: 'Pausas longas',
      bg: 'pd-stat-icon-yellow',
    },
    {
      id: 'score',
      icon: '🔥',
      value: `${pdFocoScore}`,
      label: 'Foco score',
      bg: 'pd-stat-icon-blue',
      hasInfo: true,
    },
  ];

  const pdHistoricoVisivel = pdShowFullHistory ? pdHistorico : pdHistorico.slice(0, 5);

  return (
    <div className="pd-page">
      <div className='hp-layout'>
        <LeftBar />
      </div>
      <div className='pd-main'>
        <div className="pd-header-row">
          <div className="pd-header-left">
            <div className="pd-header-icon">🕐</div>
            <div>
              <h1 className="pd-title">Pomodoro</h1>
              <p className="pd-subtitle">Mantenha o foco, elimine distrações e seja consistente.</p>
            </div>
          </div>
          <button type="button" className="pd-settings-button">
            <span className="pd-settings-icon">⚙</span>
            Configurações
          </button>
        </div>

        <div className="pd-content-grid">
          <div className="pd-main-column">
            <div className="pd-card pd-timer-card">
              <div className="pd-tabs" role="tablist">
                {pdModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    role="tab"
                    aria-selected={pdActiveTab === mode.id}
                    className={`pd-tab ${pdActiveTab === mode.id ? 'pd-tab-active' : ''}`}
                    onClick={() => pdHandleTabChange(mode.id)}
                  >
                    <span className="pd-tab-icon">{mode.icon}</span>
                    {mode.label}
                  </button>
                ))}
                <button
                  type="button"
                  role="tab"
                  aria-selected={pdActiveTab === 'historico'}
                  className={`pd-tab ${pdActiveTab === 'historico' ? 'pd-tab-active' : ''}`}
                  onClick={() => pdHandleTabChange('historico')}
                >
                  <span className="pd-tab-icon">📊</span>
                  Histórico
                </button>
              </div>

              {pdActiveTab === 'historico' ? (
                <div className="pd-full-history">
                  {pdHistorico.map((item) => (
                    <div key={item.id} className="pd-history-row">
                      <div className="pd-history-left">
                        <span className="pd-history-icon">{item.icon}</span>
                        <div>
                          <p className="pd-history-label">{item.label}</p>
                          <p className="pd-history-meta">
                            {item.data}, {item.hora}
                          </p>
                        </div>
                      </div>
                      <span className="pd-history-minutes">{item.minutos} min</span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="pd-timer-wrapper">
                    <svg className="pd-timer-ring" viewBox="0 0 300 300">
                      <circle
                        className="pd-ring-track"
                        cx="150"
                        cy="150"
                        r={pdRadius}
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        className="pd-ring-progress"
                        cx="150"
                        cy="150"
                        r={pdRadius}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={pdCircumference}
                        strokeDashoffset={pdDashOffset}
                        transform="rotate(-90 150 150)"
                      />
                      <circle className="pd-ring-handle" cx="150" cy="20" r="7" />
                    </svg>

                    <div className="pd-timer-center">
                      <div className="pd-timer-mode">
                        <span>{pdCurrentMode.icon}</span>
                        {pdCurrentMode.label}
                      </div>
                      <div className="pd-timer-time">{pdFormatTime(pdSecondsLeft)}</div>
                      <p className="pd-timer-status">
                        {pdSecondsLeft === 0 ? 'Concluído! Bom trabalho.' : pdCurrentMode.statusText}
                      </p>
                    </div>
                  </div>

                  <div className="pd-task-area">
                    {!pdShowTaskInput ? (
                      <button type="button" className="pd-add-task-button" onClick={pdHandleOpenTaskInput}>
                        <span className="pd-add-task-icon">📋</span>
                        {pdTaskName ? pdTaskName : 'Adicionar tarefa'}
                      </button>
                    ) : (
                      <div className="pd-task-input-row">
                        <input
                          type="text"
                          className="pd-task-input"
                          value={pdTaskDraft}
                          placeholder="Em que você vai focar?"
                          autoFocus
                          onChange={(e) => setPdTaskDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') pdHandleSaveTask();
                            if (e.key === 'Escape') pdHandleCancelTask();
                          }}
                        />
                        <button type="button" className="pd-task-save-button" onClick={pdHandleSaveTask}>
                          Salvar
                        </button>
                        <button type="button" className="pd-task-cancel-button" onClick={pdHandleCancelTask}>
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pd-controls-row">
                    {!pdIsRunning ? (
                      <button type="button" className="pd-primary-button" onClick={pdHandleStart}>
                        <span>▶</span> Iniciar
                      </button>
                    ) : (
                      <button type="button" className="pd-primary-button" onClick={pdHandlePause}>
                        <span>❚❚</span> Pausar
                      </button>
                    )}
                    <button type="button" className="pd-secondary-button" onClick={pdHandleReset}>
                      <span>↻</span> Reiniciar
                    </button>
                    <button
                      type="button"
                      className="pd-icon-button"
                      onClick={pdHandleStop}
                      aria-label="Parar"
                    >
                      ■
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="pd-card pd-info-card">
              <div className="pd-info-header">
                <span className="pd-info-icon">ⓘ</span>
                <span className="pd-info-title">Como funciona?</span>
              </div>
              <div className="pd-steps-row">
                {pdSteps.map((step, index) => (
                  <React.Fragment key={step.numero}>
                    <div className="pd-step">
                      <div className="pd-step-number">{step.numero}</div>
                      <div>
                        <p className="pd-step-title">{step.titulo}</p>
                        <p className="pd-step-description">{step.descricao}</p>
                      </div>
                    </div>
                    {index < pdSteps.length - 1 && <span className="pd-step-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
              <a
                className="pd-learn-more-link"
                href="#saiba-mais"
                onClick={(e) => e.preventDefault()}
              >
                Saiba mais sobre a técnica Pomodoro ↗
              </a>
            </div>
          </div>

          <div className="pd-side-column">
            <div className="pd-card pd-session-card">
              <h2 className="pd-side-title">Sessão de hoje</h2>
              <div className="pd-stats-list">
                {pdStats.map((stat) => (
                  <div className="pd-stat-row" key={stat.id}>
                    <div className={`pd-stat-icon ${stat.bg}`}>{stat.icon}</div>
                    <div>
                      <p className="pd-stat-value">{stat.value}</p>
                      <p className="pd-stat-label">
                        {stat.label}
                        {stat.hasInfo && <span className="pd-stat-info-icon">ⓘ</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-card pd-history-card">
              <h2 className="pd-side-title">Histórico recente</h2>
              <div className="pd-history-list">
                {pdHistoricoVisivel.slice(0, 5).map((item) => (
                  <div className="pd-history-item" key={item.id}>
                    <div className="pd-history-left">
                      <span className="pd-history-icon">{item.icon}</span>
                      <div>
                        <p className="pd-history-label">{item.label}</p>
                        <p className="pd-history-meta">
                          {item.data}, {item.hora}
                        </p>
                      </div>
                    </div>
                    <span className="pd-history-minutes">{item.minutos} min</span>
                  </div>
                ))}
              </div>
              <button type="button" className="pd-view-history-button" onClick={pdHandleViewFullHistory}>
                Ver histórico completo <span>›</span>
              </button>
            </div>

            <div className="pd-quote-card">
              <span className="pd-quote-mark">“</span>
              <p className="pd-quote-text">Pequenos blocos de foco geram grandes resultados.</p>
              <span className="pd-quote-tomato">🍅</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

