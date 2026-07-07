"use client"

import { useState } from "react"
import "./Grupo.css"
import { useNavigate, useParams } from "react-router-dom"
import { LeftBar } from "../../home/components/leftBar/LeftBar"

/* ============================================================
   TIPOS
   ============================================================ */

// type gpTabId = "visao" | "ranking" | "chat" | "membros" | "metas" | "config"

// interface gpNavItem {
//   id: string
//   label: string
//   icon: gpIconName
// }

// interface gpNavSection {
//   title?: string
//   items: gpNavItem[]
// }

// interface gpTab {
//   id: gpTabId
//   label: string
// }

interface gpStat {
  id: string
  icon: gpIconName
  value: string
  label: string
  tone: gpTone
}

interface gpActivity {
  id: string
  name: string
  action: string
  time: string
  color: string
  initials: string
  icon: gpIconName
}

interface gpReaction {
  emoji: string
  count: number
}

interface gpMessage {
  id: string
  name: string
  time: string
  text: string
  initials: string
  color: string
  reaction?: gpReaction
}

interface gpRankItem {
  id: string
  position: number
  name: string
  time: string
  progress: number
  initials: string
  color: string
  isMe?: boolean
  medal?: gpTone
}

interface gpAboutItem {
  id: string
  icon: gpIconName
  label: string
  value: string
}

type gpTone = "gold" | "silver" | "bronze" | "indigo" | "green" | "orange"

type gpIconName =
  | "logo"
  | "home"
  | "video"
  | "book"
  | "groups"
  | "chat"
  | "goal"
  | "pomodoro"
  | "profile"
  | "back"
  | "bell"
  | "invite"
  | "dots"
  | "public"
  | "members"
  | "calendar"
  | "clock"
  | "avg"
  | "online"
  | "streak"
  | "trophy"
  | "target"
  | "rules"
  | "category"
  | "pin"
  | "close"
  | "smile"
  | "send"
  | "chevron"

/* ============================================================
   ÍCONES (SVG inline, sem dependências)
   ============================================================ */

function GpIcon({ name, size = 20 }: { name: gpIconName; size?: number }) {
  const s = { width: size, height: size }
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (name) {
    case "logo":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 12 10 5 10-5" />
          <path d="m2 17 10 5 10-5" />
        </svg>
      )
    case "home":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      )
    case "video":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 9 5 3-5 3V9Z" />
        </svg>
      )
    case "book":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
          <path d="M4 19a2 2 0 0 1 2-2h13" />
        </svg>
      )
    case "groups":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6a3 3 0 0 1 0 5" />
          <path d="M19 20a5 5 0 0 0-3-4.6" />
        </svg>
      )
    case "chat":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10Z" />
        </svg>
      )
    case "goal":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M4 21V4" />
          <path d="M4 4h13l-2 4 2 4H4" />
        </svg>
      )
    case "pomodoro":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 13V9" />
          <path d="M9 2h6" />
        </svg>
      )
    case "profile":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      )
    case "back":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      )
    case "chevron":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      )
    case "bell":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      )
    case "invite":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M17 8v6M20 11h-6" />
        </svg>
      )
    case "dots":
      return (
        <svg viewBox="0 0 24 24" style={s} fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      )
    case "public":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      )
    case "members":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6a3 3 0 0 1 0 5M19 20a5 5 0 0 0-3-4.6" />
        </svg>
      )
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      )
    case "clock":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case "avg":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M17 8v6M20 11h-6" />
        </svg>
      )
    case "online":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M3 17 9 11l4 4 8-8" />
          <path d="M21 7v5h-5" />
        </svg>
      )
    case "streak":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1 .5-2 1-3 0 1.5 1 2 2 2 0-3 2-6 2-8Z" />
        </svg>
      )
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 19h6M10 15v4M14 15v4" />
        </svg>
      )
    case "target":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      )
    case "rules":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      )
    case "category":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M4 4h7v7H4zM13 13h7v7h-7zM4 13h7v7H4zM13 4h7v7h-7z" />
        </svg>
      )
    case "pin":
      return (
        <svg viewBox="0 0 24 24" style={s} fill="currentColor">
          <path d="M14 3l7 7-3 1-3 3-1 5-3-3-5 5-1-1 5-5-3-3 5-1 3-3 1-3Z" />
        </svg>
      )
    case "close":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      )
    case "smile":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14a4 4 0 0 0 8 0" />
          <circle cx="9" cy="9" r="0.5" fill="currentColor" />
          <circle cx="15" cy="9" r="0.5" fill="currentColor" />
        </svg>
      )
    case "send":
      return (
        <svg viewBox="0 0 24 24" style={s} fill="currentColor">
          <path d="M3 3l18 9-18 9 4-9-4-9Z" />
        </svg>
      )
    default:
      return null
  }
}

/* ============================================================
   DADOS MOCKADOS
   ============================================================ */

// const gpNavSections: gpNavSection[] = [
//   {
//     items: [
//       { id: "home", label: "Home", icon: "home" },
//       { id: "videos", label: "Vídeos", icon: "video" },
//       { id: "livros", label: "Livros", icon: "book" },
//     ],
//   },
//   {
//     title: "Conectar",
//     items: [
//       { id: "grupos", label: "Grupos", icon: "groups" },
//       { id: "chat", label: "Chat", icon: "chat" },
//     ],
//   },
//   {
//     title: "Produtividade",
//     items: [
//       { id: "metas", label: "Metas", icon: "goal" },
//       { id: "pomodoro", label: "Pomodoro", icon: "pomodoro" },
//     ],
//   },
// ]

// const gpTabs: gpTab[] = [
//   { id: "visao", label: "Visão geral" },
//   { id: "ranking", label: "Ranking" },
//   { id: "chat", label: "Chat" },
//   { id: "membros", label: "Membros" },
//   { id: "metas", label: "Metas" },
//   { id: "config", label: "Configurações" },
// ]

const gpStatsData: gpStat[] = [
  { id: "s1", icon: "clock", value: "376h 20m", label: "Tempo total estudado", tone: "indigo" },
  { id: "s2", icon: "avg", value: "3h 08m", label: "Média por membro", tone: "green" },
  { id: "s3", icon: "online", value: "27", label: "Membros online agora", tone: "green" },
  { id: "s4", icon: "streak", value: "12 dias", label: "Maior sequência", tone: "orange" },
]

const gpActivitiesData: gpActivity[] = [
  {
    id: "a1",
    name: "Mariana Costa",
    action: "completou 4 pomodoros",
    time: "há 10 min",
    color: "#f59e0b",
    initials: "MC",
    icon: "pomodoro",
  },
  {
    id: "a2",
    name: "Lucas Mendes",
    action: "atingiu 8h estudadas hoje",
    time: "há 25 min",
    color: "#6366f1",
    initials: "LM",
    icon: "clock",
  },
  {
    id: "a3",
    name: "Davi Avelino",
    action: "entrou no grupo",
    time: "há 1 h",
    color: "#10b981",
    initials: "DA",
    icon: "invite",
  },
  {
    id: "a4",
    name: "Rafael Alves",
    action: "completou a meta diária",
    time: "há 2 h",
    color: "#ef4444",
    initials: "RA",
    icon: "target",
  },
]

const gpInitialMessages: gpMessage[] = [
  {
    id: "m1",
    name: "Lucas Mendes",
    time: "09:15",
    text: "Bom dia, pessoal! Já começaam os estudos? 💪",
    initials: "LM",
    color: "#6366f1",
    reaction: { emoji: "🔥", count: 8 },
  },
  {
    id: "m2",
    name: "Mariana Costa",
    time: "09:16",
    text: "Já fiz 2 pomodoros! Bora bater a meta hoje! 🎯",
    initials: "MC",
    color: "#f59e0b",
    reaction: { emoji: "🔥", count: 5 },
  },
  {
    id: "m3",
    name: "Davi Avelino",
    time: "09:17",
    text: "Partiu mais um ciclo! 🚀",
    initials: "DA",
    color: "#8b5cf6",
  },
  {
    id: "m4",
    name: "Rafael Alves",
    time: "09:18",
    text: "Foco total hoje, pessoal! Estamos juntos! 💪",
    initials: "RA",
    color: "#0ea5e9",
    reaction: { emoji: "🔥", count: 3 },
  },
  {
    id: "m5",
    name: "Juliana Pereira",
    time: "09:19",
    text: "Vou começar agora. Bom estudo a todos! 📚",
    initials: "JP",
    color: "#ec4899",
  },
]

const gpRankingData: gpRankItem[] = [
  { id: "r1", position: 1, name: "Lucas Mendes", time: "42h 15m", progress: 100, initials: "LM", color: "#6366f1", medal: "gold" },
  { id: "r2", position: 2, name: "Mariana Costa", time: "39h 40m", progress: 92, initials: "MC", color: "#f59e0b", medal: "silver" },
  { id: "r3", position: 3, name: "Davi Avelino (você)", time: "37h 25m", progress: 86, initials: "DA", color: "#8b5cf6", isMe: true, medal: "bronze" },
  { id: "r4", position: 4, name: "Rafael Alves", time: "31h 10m", progress: 72, initials: "RA", color: "#0ea5e9" },
  { id: "r5", position: 5, name: "Juliana Pereira", time: "28h 45m", progress: 66, initials: "JP", color: "#ec4899" },
]

const gpAboutData: gpAboutItem[] = [
  { id: "ab1", icon: "trophy", label: "Categoria", value: "Enem" },
  { id: "ab2", icon: "target", label: "Objetivo", value: "Aprovação no ENEM 2024" },
  { id: "ab3", icon: "clock", label: "Tempo mínimo", value: "2h por dia" },
  { id: "ab4", icon: "members", label: "Criado por", value: "Lucas Mendes" },
  { id: "ab5", icon: "rules", label: "Regras do grupo", value: "Seja respeitoso, mantenha o foco e nenhum tipo de spam." },
]

/* ============================================================
   COMPONENTES INTERNOS
   ============================================================ */

function GpAvatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <span
      className="gp-avatar"
      style={{ background: color, width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

function GpDonut({ percent }: { percent: number }) {
  const radius = 52
  const circ = 2 * Math.PI * radius
  const offset = circ - (percent / 100) * circ
  return (
    <div className="gp-donut">
      <svg viewBox="0 0 130 130" className="gp-donut-svg">
        <circle cx="65" cy="65" r={radius} className="gp-donut-track" />
        <circle
          cx="65"
          cy="65"
          r={radius}
          className="gp-donut-value"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="gp-donut-center">
        <span className="gp-donut-percent">{percent}%</span>
        <span className="gp-donut-label">da meta</span>
      </div>
    </div>
  )
}

function GpStatsCard({ stat }: { stat: gpStat }) {
  return (
    <li className="gp-stat-row">
      <span className={`gp-stat-icon gp-tone-${stat.tone}`}>
        <GpIcon name={stat.icon} size={18} />
      </span>
      <span className="gp-stat-value">{stat.value}</span>
      <span className="gp-stat-label">{stat.label}</span>
    </li>
  )
}

function GpCategoryBadge({ icon, tone }: { icon: gpIconName; tone: gpTone }) {
  return (
    <span className={`gp-about-icon gp-tone-${tone}`}>
      <GpIcon name={icon} size={16} />
    </span>
  )
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */

export function Grupo() {
  // const [gpActiveNav, setGpActiveNav] = useState<string>("grupos")
  // const [gpActiveTab, setGpActiveTab] = useState<gpTabId>("visao")
  const [gpMessages, setGpMessages] = useState<gpMessage[]>(gpInitialMessages)
  const [gpDraft, setGpDraft] = useState<string>("")
  const [gpPinnedOpen, setGpPinnedOpen] = useState<boolean>(true)
  const [gpReactions, setGpReactions] = useState<Record<string, boolean>>({})
  // const [gpDark, setGpDark] = useState<boolean>(false)
  const [gpJoined, setGpJoined] = useState<boolean>(true)
  // const [gpProfileOpen, setGpProfileOpen] = useState<boolean>(false)

  const gpGoalTotal = 500
  const gpGoalDone = 376
  const gpGoalPercent = Math.round((gpGoalDone / gpGoalTotal) * 100)

  const navigate = useNavigate()
  const { name, id } = useParams<{ name: string, id: string }>()

  const gpHandleSend = () => {
    const text = gpDraft.trim()
    if (!text) return
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const gpNew: gpMessage = {
      id: `m-${Date.now()}`,
      name: "Davi Avelino",
      time: `${hh}:${mm}`,
      text,
      initials: "DA",
      color: "#8b5cf6",
    }
    setGpMessages((prev) => [...prev, gpNew])
    setGpDraft("")
  }

  const gpHandleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      gpHandleSend()
    }
  }

  const gpHandleReaction = (id: string) => {
    setGpReactions((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // const gpToggleTheme = () => setGpDark((d) => !d)

  return (
    <div className={`gp-app`}>
      {/* ============ SIDEBAR ============ */}
      {/* <aside className="gp-sidebar">
        <div className="gp-brand">
          <span className="gp-brand-mark">
            <GpIcon name="logo" size={22} />
          </span>
          <span className="gp-brand-name">ESTUDE</span>
        </div>

        <nav className="gp-nav">
          {gpNavSections.map((section, i) => (
            <div className="gp-nav-section" key={i}>
              {section.title && <p className="gp-nav-title">{section.title}</p>}
              <ul className="gp-nav-list">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`gp-nav-item${gpActiveNav === item.id ? " gp-nav-item-active" : ""}`}
                      onClick={() => setGpActiveNav(item.id)}
                    >
                      <GpIcon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="gp-nav-section gp-nav-bottom">
            <ul className="gp-nav-list">
              <li>
                <button
                  type="button"
                  className={`gp-nav-item${gpActiveNav === "perfil" ? " gp-nav-item-active" : ""}`}
                  onClick={() => setGpActiveNav("perfil")}
                >
                  <GpIcon name="profile" size={20} />
                  <span>Perfil</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="gp-sidebar-footer">
          <button
            type="button"
            className="gp-user-card"
            onClick={() => setGpProfileOpen((o) => !o)}
          >
            <GpAvatar initials="DA" color="#8b5cf6" size={40} />
            <span className="gp-user-info">
              <span className="gp-user-name">Davi Avelino</span>
              <span className="gp-user-sub">Ver perfil</span>
            </span>
            <span className={`gp-user-chevron${gpProfileOpen ? " gp-rotated" : ""}`}>
              <GpIcon name="chevron" size={16} />
            </span>
          </button>

          <div className="gp-theme-toggle">
            <button
              type="button"
              className={`gp-theme-btn${!gpDark ? " gp-theme-active" : ""}`}
              onClick={() => setGpDark(false)}
              aria-label="Tema claro"
            >
              ☀️
            </button>
            <button
              type="button"
              className={`gp-theme-btn${gpDark ? " gp-theme-active" : ""}`}
              onClick={() => setGpDark(true)}
              aria-label="Tema escuro"
            >
              🌙
            </button>
          </div>
        </div>
      </aside> */}
      <div className="hp-layout">
        <LeftBar />
      </div>

      {/* ====
      ======== CONTEÚDO ============ */}
      <main className="gp-main">
        {/* Top bar */}
        <div id="gp-main-header">
          <div className="gp-topbar">
            <button type="button" className="gp-back" onClick={() => navigate(`/grupos/${name}/${id}`)}>
              <GpIcon name="back" size={18} />
              <span>Voltar para grupos</span>
            </button>

            <div className="gp-topbar-actions">
              <button type="button" className="gp-icon-btn" aria-label="Notificações">
                <GpIcon name="bell" size={20} />
              </button>
              <button type="button" className="gp-btn gp-btn-primary">
                <GpIcon name="invite" size={18} />
                <span>Convidar amigos</span>
              </button>
              <button type="button" className="gp-icon-btn" aria-label="Mais opções">
                <GpIcon name="dots" size={20} />
              </button>
            </div>
          </div>
        </div>


        {/* Group header */}
        <section className="gp-group-header">
          <div className="gp-group-top">
            <span className="gp-group-avatar">ENEM</span>
            <div className="gp-group-titles">
              <h1 className="gp-group-name">
                Desafio ENEM Julho <span className="gp-fire">🔥</span>
              </h1>
              <p className="gp-group-desc">Preparação intensa para o ENEM 2024</p>
              <ul className="gp-group-meta">
                <li>
                  <GpIcon name="public" size={15} /> Público
                </li>
                <li>
                  <GpIcon name="members" size={15} /> 120 membros
                </li>
                <li>
                  <GpIcon name="calendar" size={15} /> Criado em 10 de jun. de 2024
                </li>
              </ul>
            </div>
            <button
              type="button"
              className={`gp-btn gp-btn-danger-outline${gpJoined ? "" : " gp-btn-joined"}`}
              onClick={() => setGpJoined((j) => !j)}
            >
              {gpJoined ? "Sair do grupo" : "Entrar no grupo"}
            </button>
          </div>

          <div className="gp-goal">
            <div className="gp-goal-head">
              <p className="gp-goal-caption">Meta coletiva deste mês</p>
              <p className="gp-goal-title">500 horas de estudo</p>
            </div>
            <div className="gp-goal-bar-wrap">
              <div className="gp-goal-bar">
                <div className="gp-goal-bar-fill" style={{ width: `${gpGoalPercent}%` }} />
              </div>
              <span className="gp-goal-numbers">
                {gpGoalDone} / {gpGoalTotal} horas
              </span>
            </div>
            <div className="gp-goal-right">
              <span className="gp-goal-percent">{gpGoalPercent}%</span>
              <span className="gp-goal-remaining">Faltam {gpGoalTotal - gpGoalDone} horas</span>
            </div>
          </div>
        </section>

        {/* Tabs */}
       

        {/* Grid de conteúdo */}
        <div className="gp-grid">
          {/* ------- Coluna esquerda ------- */}
          <div className="gp-col gp-col-left">
            <section className="gp-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Progresso do grupo</h2>
                <button type="button" className="gp-card-select">
                  Este mês <GpIcon name="chevron" size={14} />
                </button>
              </div>
              <div className="gp-progress-body">
                <GpDonut percent={75} />
                <ul className="gp-progress-list">
                  <li>
                    <strong>376 horas</strong>
                    <span>Estudadas</span>
                  </li>
                  <li>
                    <strong>124 horas</strong>
                    <span>Restantes</span>
                  </li>
                  <li>
                    <strong>15 dias</strong>
                    <span>Restantes no mês</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="gp-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Estatísticas do grupo</h2>
              </div>
              <ul className="gp-stats-list">
                {gpStatsData.map((stat) => (
                  <GpStatsCard key={stat.id} stat={stat} />
                ))}
              </ul>
            </section>

            <section className="gp-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Atividades recentes</h2>
                <button type="button" className="gp-link">Ver todas</button>
              </div>
              <ul className="gp-activity-list">
                {gpActivitiesData.map((act) => (
                  <li className="gp-activity" key={act.id}>
                    <GpAvatar initials={act.initials} color={act.color} size={36} />
                    <span className="gp-activity-badge" style={{ color: act.color }}>
                      <GpIcon name={act.icon} size={14} />
                    </span>
                    <span className="gp-activity-text">
                      <strong>{act.name}</strong> {act.action}
                    </span>
                    <span className="gp-activity-time">{act.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ------- Coluna central (Chat) ------- */}
          <div className="gp-col gp-col-center">
            <section className="gp-card gp-chat-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Chat do grupo</h2>
                <button type="button" className="gp-card-select">
                  Todas as mensagens <GpIcon name="chevron" size={14} />
                </button>
              </div>

              {gpPinnedOpen && (
                <div className="gp-pinned">
                  <div className="gp-pinned-head">
                    <span className="gp-pinned-label">
                      <GpIcon name="pin" size={14} /> Mensagem fixada
                    </span>
                    <button
                      type="button"
                      className="gp-pinned-close"
                      onClick={() => setGpPinnedOpen(false)}
                      aria-label="Fechar mensagem fixada"
                    >
                      <GpIcon name="close" size={16} />
                    </button>
                  </div>
                  <p className="gp-pinned-text">
                    Mantenha o foco e a constância! 🚀
                    <br />
                    Vamos juntos bater nossa meta! 💪
                  </p>
                  <p className="gp-pinned-author">Lucas Mendes • 10/06/2024</p>
                </div>
              )}

              <div className="gp-messages">
                {gpMessages.map((msg) => {
                  const active = gpReactions[msg.id]
                  const baseCount = msg.reaction?.count ?? 0
                  const count = baseCount + (active ? 1 : 0)
                  return (
                    <div className="gp-message" key={msg.id}>
                      <GpAvatar initials={msg.initials} color={msg.color} size={38} />
                      <div className="gp-message-body">
                        <p className="gp-message-head">
                          <strong>{msg.name}</strong>
                          <span className="gp-message-time">{msg.time}</span>
                        </p>
                        <p className="gp-message-text">{msg.text}</p>
                        {(msg.reaction || active) && (
                          <button
                            type="button"
                            className={`gp-reaction${active ? " gp-reaction-active" : ""}`}
                            onClick={() => gpHandleReaction(msg.id)}
                          >
                            {msg.reaction?.emoji ?? "🔥"} {count}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="gp-composer">
                <input
                  type="text"
                  className="gp-composer-input"
                  placeholder="Digite sua mensagem..."
                  value={gpDraft}
                  onChange={(e) => setGpDraft(e.target.value)}
                  onKeyDown={gpHandleKey}
                />
                <button type="button" className="gp-composer-emoji" aria-label="Emoji">
                  <GpIcon name="smile" size={20} />
                </button>
                <button
                  type="button"
                  className="gp-composer-send"
                  onClick={gpHandleSend}
                  aria-label="Enviar mensagem"
                >
                  <GpIcon name="send" size={18} />
                </button>
              </div>
            </section>
          </div>

          {/* ------- Coluna direita ------- */}
          <div className="gp-col gp-col-right">
            <section className="gp-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Ranking do grupo</h2>
                <button type="button" className="gp-link">Ver completo</button>
              </div>
              <ul className="gp-rank-list">
                {gpRankingData.map((item) => (
                  <li className={`gp-rank${item.isMe ? " gp-rank-me" : ""}`} key={item.id}>
                    <span className={`gp-rank-pos${item.medal ? ` gp-tone-${item.medal}` : ""}`}>
                      {item.medal ? <GpIcon name="trophy" size={16} /> : item.position}
                    </span>
                    <GpAvatar initials={item.initials} color={item.color} size={34} />
                    <div className="gp-rank-info">
                      <p className="gp-rank-name">{item.name}</p>
                      <div className="gp-rank-bar">
                        <div className="gp-rank-bar-fill" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                    <span className="gp-rank-time">{item.time}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="gp-btn gp-btn-soft gp-btn-block">
                Ver ranking completo
              </button>
            </section>

            <section className="gp-card">
              <div className="gp-card-head">
                <h2 className="gp-card-title">Sobre o grupo</h2>
              </div>
              <ul className="gp-about-list">
                {gpAboutData.map((item) => (
                  <li className="gp-about" key={item.id}>
                    <GpCategoryBadge icon={item.icon} tone="indigo" />
                    <div className="gp-about-info">
                      <p className="gp-about-label">{item.label}</p>
                      <p className="gp-about-value">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="gp-btn gp-btn-soft gp-btn-block">
                Ver todas as regras
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
