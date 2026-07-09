"use client"

import { useState } from "react"
import "./perfil.css"
import { LeftBar } from "../home/components/leftBar/LeftBar"

/* ============================= Tipos ============================= */
interface pfStat {
  id: string
  label: string
  value: string
  delta: string
  icon: JSX.Element
}

interface pfInterest {
  id: string
  label: string
}

interface pfGoal {
  id: string
  label: string
  current: number
  total: number
  unit: string
  color: "purple" | "green" | "orange"
  icon: JSX.Element
}

interface pfAchievement {
  id: string
  title: string
  description: string
  tone: "purple" | "amber" | "blue"
  icon: JSX.Element
  done: boolean
}

interface pfActivity {
  id: string
  action: string
  target: string
  time: string
  icon: JSX.Element
}

interface pfQuickSetting {
  id: string
  label: string
  icon: JSX.Element
}

interface pfChartBar {
  day: string
  hours: number
}

type pfTabId = "visao" | "atividade" | "conquistas" | "config"

/* ============================= Ícones ============================= */
const pfIcon = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  bookOpen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

/* ============================= Dados mockados ============================= */


const pfStatsData: pfStat[] = [
  { id: "s1", label: "Livros lidos", value: "24", delta: "+5 este mês", icon: pfIcon.bookOpen },
  { id: "s2", label: "Vídeos assistidos", value: "127", delta: "+18 este mês", icon: pfIcon.play },
  { id: "s3", label: "Horas de estudo", value: "86h", delta: "+12h este mês", icon: pfIcon.target },
  { id: "s4", label: "Sequência", value: "17", delta: "dias", icon: pfIcon.flame },
]

const pfInitialInterests: pfInterest[] = [
  { id: "i1", label: "Desenvolvimento Web" },
  { id: "i2", label: "Banco de Dados" },
  { id: "i3", label: "Inteligência Artificial" },
  { id: "i4", label: "Design" },
  { id: "i5", label: "Produtividade" },
]

const pfInitialGoals: pfGoal[] = [
  { id: "g1", label: "Estudar 100 horas este mês", current: 86, total: 100, unit: "h", color: "purple", icon: pfIcon.target },
  { id: "g2", label: "Ler 5 livros este mês", current: 3, total: 5, unit: "", color: "green", icon: pfIcon.bookOpen },
  { id: "g3", label: "Manter sequência de estudos", current: 17, total: 30, unit: " dias", color: "orange", icon: pfIcon.clock },
]

const pfAchievementsData: pfAchievement[] = [
  { id: "a1", title: "Foco total", description: "Complete 10 sessões Pomodoro", tone: "purple", icon: pfIcon.star, done: true },
  { id: "a2", title: "Leitor dedicado", description: "Leia 5 livros", tone: "amber", icon: pfIcon.bookOpen, done: true },
  { id: "a3", title: "Estudante consistente", description: "Estude por 7 dias seguidos", tone: "blue", icon: pfIcon.trophy, done: true },
]

const pfActivitiesData: pfActivity[] = [
  { id: "ac1", action: "Você continuou lendo", target: "Guia de SQL", time: "2h atrás", icon: pfIcon.bookOpen },
  { id: "ac2", action: "Assistiu ao vídeo", target: "Como aprender inglês", time: "5h atrás", icon: pfIcon.play },
  { id: "ac3", action: "Concluiu uma sessão", target: "Pomodoro", time: "Ontem", icon: pfIcon.clock },
  { id: "ac4", action: "Participou do grupo", target: "Devs em Foco", time: "2 dias atrás", icon: pfIcon.users },
]

const pfQuickSettingsData: pfQuickSetting[] = [
  { id: "q1", label: "Editar perfil", icon: pfIcon.pencil },
  { id: "q2", label: "Conta e segurança", icon: pfIcon.lock },
  { id: "q3", label: "Notificações", icon: pfIcon.bell },
  { id: "q4", label: "Privacidade", icon: pfIcon.shield },
]

const pfWeekData: pfChartBar[] = [
  { day: "Seg", hours: 3.5 },
  { day: "Ter", hours: 6 },
  { day: "Qua", hours: 2.5 },
  { day: "Qui", hours: 7 },
  { day: "Sex", hours: 5 },
  { day: "Sáb", hours: 1.5 },
  { day: "Dom", hours: 3.5 },
]

const pfTabs: { id: pfTabId; label: string }[] = [
  { id: "visao", label: "Visão geral" },
  { id: "atividade", label: "Atividade" },
  { id: "conquistas", label: "Conquistas" },
  { id: "config", label: "Configurações" },
]

/* ============================= Subcomponentes ============================= */
function PfStatsCard({ stat }: { stat: pfStat }) {
  return (
    <div className="pf-stat">
      <div className="pf-stat-icon">{stat.icon}</div>
      <div className="pf-stat-body">
        <span className="pf-stat-label">{stat.label}</span>
        <span className="pf-stat-value">{stat.value}</span>
        <span className="pf-stat-delta">{stat.delta}</span>
      </div>
    </div>
  )
}

function PfGoalCard({ goal, onIncrement }: { goal: pfGoal; onIncrement: (id: string) => void }) {
  const pfPct = Math.min(100, Math.round((goal.current / goal.total) * 100))
  return (
    <button type="button" className="pf-goal" onClick={() => onIncrement(goal.id)} title="Atualizar progresso">
      <span className={`pf-goal-icon pf-goal-icon--${goal.color}`}>{goal.icon}</span>
      <div className="pf-goal-main">
        <div className="pf-goal-top">
          <span className="pf-goal-label">{goal.label}</span>
          <span className="pf-goal-count">
            {goal.current}/{goal.total}
            {goal.unit}
          </span>
        </div>
        <div className="pf-goal-track">
          <div className={`pf-goal-fill pf-goal-fill--${goal.color}`} style={{ width: `${pfPct}%` }} />
        </div>
      </div>
    </button>
  )
}

function PfCategoryBadge({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="pf-tag">
      {label}
      {onRemove && (
        <button type="button" className="pf-tag-remove" onClick={onRemove} aria-label={`Remover ${label}`}>
          ×
        </button>
      )}
    </span>
  )
}

function PfAchievementRow({ item }: { item: pfAchievement }) {
  return (
    <div className="pf-ach">
      <span className={`pf-ach-icon pf-ach-icon--${item.tone}`}>{item.icon}</span>
      <div className="pf-ach-body">
        <span className="pf-ach-title">{item.title}</span>
        <span className="pf-ach-desc">{item.description}</span>
      </div>
      {item.done && <span className="pf-ach-check">{pfIcon.check}</span>}
    </div>
  )
}

/* ============================= Componente principal ============================= */
export function Perfil() {
  const [pfSearchTerm, pfSetSearchTerm] = useState<string>("")
  const [pfActiveTab, pfSetActiveTab] = useState<pfTabId>("visao")
  const [pfInterests, pfSetInterests] = useState<pfInterest[]>(pfInitialInterests)
  const [pfGoals, pfSetGoals] = useState<pfGoal[]>(pfInitialGoals)
  const [pfAchExpanded, pfSetAchExpanded] = useState<boolean>(false)
  const [pfChartPeriod, pfSetChartPeriod] = useState<string>("Esta semana")
  const [pfNotifOpen, pfSetNotifOpen] = useState<boolean>(true)

  const pfTotalMinutes = Math.round(pfWeekData.reduce((acc, d) => acc + d.hours, 0) * 60)
  const pfTotalLabel = `${Math.floor(pfTotalMinutes / 60)}h ${pfTotalMinutes % 60}m`

  const pfHandleAddInterest = () => {
    const pfNext = pfInterests.length + 1
    pfSetInterests([...pfInterests, { id: `i-${Date.now()}`, label: `Novo tema ${pfNext}` }])
  }

  const pfHandleRemoveInterest = (id: string) => {
    pfSetInterests(pfInterests.filter((i) => i.id !== id))
  }

  const pfHandleProgressUpdate = (id: string) => {
    pfSetGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, current: Math.min(g.total, g.current + 1) } : g)),
    )
  }

  return (
    <div className="pf-app">
      {/* ===================== Sidebar ===================== */}
      {/* <aside className="pf-sidebar">
        <div className="pf-brand">
          <span className="pf-brand-logo">{pfIcon.layers}</span>
          <span className="pf-brand-name">Extude</span>
        </div>

        <nav className="pf-nav">
          {pfNavGroups.map((group, gi) => (
            <div className="pf-nav-group" key={group.title ?? `g-${gi}`}>
              {group.title && <span className="pf-nav-title">{group.title}</span>}
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`pf-nav-item ${pfActiveNav === item.id ? "pf-nav-item--active" : ""}`}
                  onClick={() => pfSetActiveNav(item.id)}
                >
                  <span className="pf-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="pf-sidebar-user">
          <span className="pf-avatar pf-avatar--sm">DA</span>
          <div className="pf-sidebar-user-info">
            <span className="pf-sidebar-user-name">Davi Avelino</span>
            <span className="pf-sidebar-user-handle">@davelino</span>
          </div>
          <span className="pf-sidebar-user-caret">{pfIcon.chevronDown}</span>
        </div>
      </aside> */}
      <div className="hp-layout">
        <LeftBar />
      </div>

      {/* ===================== Conteúdo ===================== */}
      <div className="pf-main">
        {/* Topbar */}
        <header className="pf-topbar">
          <div className="pf-searchbar">
            <span className="pf-search-icon">{pfIcon.search}</span>
            <input
              className="pf-search-input"
              type="text"
              placeholder="Buscar conteúdos, livros, vídeos..."
              value={pfSearchTerm}
              onChange={(e) => pfSetSearchTerm(e.target.value)}
            />
          </div>
          <div className="pf-topbar-actions">
            <button
              type="button"
              className={`pf-icon-btn ${pfNotifOpen ? "pf-icon-btn--dot" : ""}`}
              onClick={() => pfSetNotifOpen((v) => !v)}
              aria-label="Notificações"
            >
              {pfIcon.bell}
            </button>
            <button type="button" className="pf-btn pf-btn--primary">
              <span className="pf-btn-icon">{pfIcon.plus}</span>
              Novo Post
            </button>
          </div>
        </header>

        <div className="pf-content">
          {/* ---------- Coluna central ---------- */}
          <div className="pf-center">
            <div className="pf-page-head">
              <h1 className="pf-page-title">Perfil</h1>
              <p className="pf-page-sub">Gerencie suas informações, conquistas e preferências.</p>
            </div>

            {/* Card do perfil */}
            <section className="pf-card pf-profile">
              <div className="pf-profile-avatar-wrap">
                <span className="pf-avatar pf-avatar--lg">DA</span>
                <button type="button" className="pf-avatar-edit" aria-label="Alterar foto">
                  {pfIcon.pencil}
                </button>
              </div>
              <div className="pf-profile-info">
                <div className="pf-profile-top">
                  <div>
                    <h2 className="pf-profile-name">Davi Avelino</h2>
                    <span className="pf-profile-handle">@davelino</span>
                  </div>
                  <button type="button" className="pf-btn pf-btn--ghost">
                    <span className="pf-btn-icon">{pfIcon.pencil}</span>
                    Editar perfil
                  </button>
                </div>
                <p className="pf-profile-bio">Estudante e desenvolvedor em constante aprendizado.</p>
                <div className="pf-profile-meta">
                  <span className="pf-meta-item">
                    <span className="pf-meta-icon">{pfIcon.calendar}</span>
                    <span>
                      <small>Membro desde</small>
                      <br />
                      Março de 2024
                    </span>
                  </span>
                  <span className="pf-meta-item">
                    <span className="pf-meta-icon">{pfIcon.pin}</span>
                    Rio de Janeiro, RJ
                  </span>
                  <span className="pf-meta-item">
                    <span className="pf-meta-icon">{pfIcon.link}</span>
                    <a href="#link" className="pf-meta-link">
                      extude.com/davelino
                    </a>
                  </span>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="pf-card pf-stats">
              {pfStatsData.map((s) => (
                <PfStatsCard key={s.id} stat={s} />
              ))}
            </section>

            {/* Tabs */}
            <nav className="pf-tabs">
              {pfTabs.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`pf-tab ${pfActiveTab === t.id ? "pf-tab--active" : ""}`}
                  onClick={() => pfSetActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Grid inferior */}
            <div className="pf-grid">
              <section className="pf-card pf-block">
                <h3 className="pf-block-title">Sobre mim</h3>
                <p className="pf-block-text">
                  Apaixonado por tecnologia, programação e aprendizado contínuo. Aqui para evoluir todos os dias e
                  compartilhar conhecimento.
                </p>
                <button type="button" className="pf-btn pf-btn--ghost pf-btn--sm">
                  <span className="pf-btn-icon">{pfIcon.pencil}</span>
                  Editar bio
                </button>
              </section>

              <section className="pf-card pf-block">
                <h3 className="pf-block-title">Interesses</h3>
                <div className="pf-tags">
                  {pfInterests.map((i) => (
                    <PfCategoryBadge key={i.id} label={i.label} onRemove={() => pfHandleRemoveInterest(i.id)} />
                  ))}
                  <button type="button" className="pf-tag pf-tag--add" onClick={pfHandleAddInterest}>
                    + Adicionar
                  </button>
                </div>
              </section>

              <section className="pf-card pf-block">
                <h3 className="pf-block-title">Metas atuais</h3>
                <div className="pf-goals">
                  {pfGoals.map((g) => (
                    <PfGoalCard key={g.id} goal={g} onIncrement={pfHandleProgressUpdate} />
                  ))}
                </div>
              </section>

              <section className="pf-card pf-block">
                <h3 className="pf-block-title">Resumo semanal</h3>
                <div className="pf-chart">
                  <div className="pf-chart-yaxis">
                    <span>8h</span>
                    <span>6h</span>
                    <span>4h</span>
                    <span>2h</span>
                    <span>0h</span>
                  </div>
                  <div className="pf-chart-bars">
                    {pfWeekData.map((d) => (
                      <div className="pf-chart-col" key={d.day}>
                        <div className="pf-chart-bar-wrap">
                          <div
                            className="pf-chart-bar"
                            style={{ height: `${(d.hours / 8) * 100}%` }}
                            title={`${d.hours}h`}
                          />
                        </div>
                        <span className="pf-chart-day">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pf-chart-foot">
                  <span className="pf-chart-total">Total: {pfTotalLabel}</span>
                  <div className="pf-select-wrap">
                    <select
                      className="pf-select"
                      value={pfChartPeriod}
                      onChange={(e) => pfSetChartPeriod(e.target.value)}
                    >
                      <option>Esta semana</option>
                      <option>Semana passada</option>
                      <option>Este mês</option>
                    </select>
                    <span className="pf-select-caret">{pfIcon.chevronDown}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ---------- Coluna direita ---------- */}
          <aside className="pf-side">
            <section className="pf-card pf-block">
              <div className="pf-block-head">
                <h3 className="pf-block-title">Conquistas</h3>
                <button type="button" className="pf-link-btn">
                  Ver todas
                </button>
              </div>
              <div className="pf-ach-list">
                {pfAchievementsData.map((a) => (
                  <PfAchievementRow key={a.id} item={a} />
                ))}
                {pfAchExpanded && (
                  <div className="pf-ach-extra">
                    <PfAchievementRow
                      item={{
                        id: "a4",
                        title: "Maratonista",
                        description: "Assista a 100 vídeos",
                        tone: "purple",
                        icon: pfIcon.play,
                        done: true,
                      }}
                    />
                    <PfAchievementRow
                      item={{
                        id: "a5",
                        title: "Comunicador",
                        description: "Participe de 5 grupos",
                        tone: "blue",
                        icon: pfIcon.users,
                        done: true,
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className={`pf-ach-toggle ${pfAchExpanded ? "pf-ach-toggle--open" : ""}`}
                onClick={() => pfSetAchExpanded((v) => !v)}
              >
                {pfAchExpanded ? "Ver menos" : "+ 8 conquistas"}
                <span className="pf-ach-toggle-icon">{pfIcon.chevronDown}</span>
              </button>
            </section>

            <section className="pf-card pf-block">
              <div className="pf-block-head">
                <h3 className="pf-block-title">Atividade recente</h3>
                <button type="button" className="pf-link-btn">
                  Ver tudo
                </button>
              </div>
              <div className="pf-activity-list">
                {pfActivitiesData.map((a) => (
                  <div className="pf-activity" key={a.id}>
                    <span className="pf-activity-icon">{a.icon}</span>
                    <div className="pf-activity-body">
                      <span className="pf-activity-action">{a.action}</span>
                      <span className="pf-activity-target">{a.target}</span>
                    </div>
                    <span className="pf-activity-time">{a.time}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pf-card pf-block">
              <h3 className="pf-block-title">Configurações rápidas</h3>
              <div className="pf-quick-list">
                {pfQuickSettingsData.map((q) => (
                  <button type="button" className="pf-quick" key={q.id}>
                    <span className="pf-quick-icon">{q.icon}</span>
                    <span className="pf-quick-label">{q.label}</span>
                    <span className="pf-quick-caret">{pfIcon.chevronRight}</span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

