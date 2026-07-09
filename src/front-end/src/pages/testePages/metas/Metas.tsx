"use client"

import { useMemo, useState } from "react"
import "./Metas.css"
import { LeftBar } from "../home/components/leftBar/LeftBar"
import type { CreatePostModalProps } from "../home/components/interfaces/interface";
import { IconX } from "../home/components/icons/icons";
/* ============================ TYPES ============================ */

type MtTabKey = "minhas" | "andamento" | "concluidas" | "arquivadas"

type MtGoalStatus = "andamento" | "concluida" | "arquivada"

type MtCategoryKey = "estudos" | "leitura" | "saude" | "pessoal"

interface MtCategory {
  key: MtCategoryKey
  label: string
  color: string
  count: number
}

interface MtGoal {
  id: string
  title: string
  description: string
  icon: MtIconName
  category: MtCategoryKey
  status: MtGoalStatus
  current: number
  total: number
  unit: string
  percent: number
}

interface MtStat {
  id: string
  value: string
  label: string
  icon: MtIconName
  tone: "violet" | "green" | "amber" | "blue"
}

type MtDayTone = "none" | "violet" | "green" | "amber"

interface MtCalendarDay {
  day: number
  outside: boolean
  today: boolean
  selected: boolean
  tone: MtDayTone
}

interface MtTip {
  id: string
  quote: string
  author: string
}

type MtIconName =
  | "home"
  | "explore"
  | "posts"
  | "saved"
  | "video"
  | "book"
  | "transcript"
  | "clips"
  | "community"
  | "chat"
  | "goals"
  | "pomodoro"
  | "flag"
  | "target"
  | "chart"
  | "calendar"
  | "check-circle"
  | "book-open"
  | "play"
  | "bolt"
  | "meditate"
  | "dumbbell"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "plus"
  | "info"
  | "quote"
  | "sun"
  | "moon"
  | "layers"

/* ============================ ICON ============================ */

interface MtIconProps {
  name: MtIconName
  size?: number
}

function MtIcon({ name, size = 20 }: MtIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  switch (name) {
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" />
          <path d="m2 13 10 5 10-5" />
          <path d="m2 18 10 5 10-5" />
        </svg>
      )
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
        </svg>
      )
    case "explore":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      )
    case "posts":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      )
    case "saved":
      return (
        <svg {...common}>
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
        </svg>
      )
    case "video":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 9 5 3-5 3Z" />
        </svg>
      )
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Z" />
          <path d="M4 19a2 2 0 0 1 2-2h12" />
        </svg>
      )
    case "transcript":
      return (
        <svg {...common}>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      )
    case "clips":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M8 6l-2 4M14 6l-2 4" />
        </svg>
      )
    case "community":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6a3 3 0 0 1 0 6M21 20a5.5 5.5 0 0 0-4-5.3" />
        </svg>
      )
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4Z" />
        </svg>
      )
    case "goals":
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 21V4" />
          <path d="M5 4h11l-1.5 3L16 10H5" />
        </svg>
      )
    case "pomodoro":
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 13V9M12 5V3M10 3h4" />
        </svg>
      )
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      )
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="m5 15 4-4 3 3 6-7" />
        </svg>
      )
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      )
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      )
    case "book-open":
      return (
        <svg {...common}>
          <path d="M12 6c-2-1.5-5-1.5-7 0v12c2-1.5 5-1.5 7 0 2-1.5 5-1.5 7 0V6c-2-1.5-5-1.5-7 0Z" />
          <path d="M12 6v14" />
        </svg>
      )
    case "play":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="m10 9 5 3-5 3Z" />
        </svg>
      )
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 3 4 14h6l-1 7 9-11h-6Z" />
        </svg>
      )
    case "meditate":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 8v4M6 20l6-4 6 4M4 13h16" />
        </svg>
      )
    case "dumbbell":
      return (
        <svg {...common}>
          <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />
        </svg>
      )
    case "chevron-left":
      return (
        <svg {...common}>
          <path d="m15 6-6 6 6 6" />
        </svg>
      )
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      )
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      )
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      )
    case "quote":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 7c-2.2 0-4 1.8-4 4v6h6v-6H5c0-1.1.9-2 2-2V7Zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-4c0-1.1.9-2 2-2V7Z" />
        </svg>
      )
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
        </svg>
      )
    case "moon":
      return (
        <svg {...common}>
          <path d="M20 14a8 8 0 1 1-9-11 6 6 0 0 0 9 11Z" />
        </svg>
      )
    default:
      return null
  }
}

/* ============================ MOCK DATA ============================ */

// const MT_NAV_LEARN: { label: string; icon: MtIconName }[] = [
//   { label: "Home", icon: "home" },
//   { label: "Explorar", icon: "explore" },
//   { label: "Meus Posts", icon: "posts" },
//   { label: "Salvos", icon: "saved" },
// ]

// const MT_NAV_APRENDER: { label: string; icon: MtIconName }[] = [
//   { label: "Vídeos", icon: "video" },
//   { label: "Livros", icon: "book" },
//   { label: "Transcrições", icon: "transcript" },
//   { label: "Clips", icon: "clips" },
// ]

// const MT_NAV_COMUNIDADE: { label: string; icon: MtIconName }[] = [
//   { label: "Comunidade", icon: "community" },
//   { label: "Chat", icon: "chat" },
// ]

// const MT_NAV_PRODUTIVIDADE: { label: string; icon: MtIconName }[] = [
//   { label: "Metas", icon: "goals" },
//   { label: "Pomodoro", icon: "pomodoro" },
// ]

const MT_STATS: MtStat[] = [
  { id: "s1", value: "5", label: "Metas ativas", icon: "target", tone: "violet" },
  { id: "s2", value: "62%", label: "Progresso médio", icon: "chart", tone: "green" },
  { id: "s3", value: "12", label: "Dias em sequência", icon: "calendar", tone: "amber" },
  { id: "s4", value: "18", label: "Metas concluídas", icon: "check-circle", tone: "blue" },
]

const MT_CATEGORIES: MtCategory[] = [
  { key: "estudos", label: "Estudos", color: "#7c6cf5", count: 3 },
  { key: "leitura", label: "Leitura", color: "#22c55e", count: 1 },
  { key: "saude", label: "Saúde", color: "#f5c518", count: 1 },
  { key: "pessoal", label: "Pessoal", color: "#94a3b8", count: 0 },
]

const MT_INITIAL_GOALS: MtGoal[] = [
  {
    id: "g1",
    title: "Ler 12 livros este ano",
    description: "Manter a consistência na leitura e absorver novos conhecimentos.",
    icon: "book-open",
    category: "leitura",
    status: "andamento",
    current: 7,
    total: 12,
    unit: "livros",
    percent: 58,
  },
  {
    id: "g2",
    title: "Estudar 1h por dia",
    description: "Dedicar pelo menos 1 hora líquida de estudos todos os dias.",
    icon: "play",
    category: "estudos",
    status: "andamento",
    current: 18,
    total: 30,
    unit: "dias",
    percent: 60,
  },
  {
    id: "g3",
    title: "Finalizar curso de React",
    description: "Completar todos os módulos do curso e construir os projetos.",
    icon: "bolt",
    category: "estudos",
    status: "andamento",
    current: 70,
    total: 100,
    unit: "%",
    percent: 70,
  },
  {
    id: "g4",
    title: "Meditar 10 minutos por dia",
    description: "Melhorar o foco e o bem-estar com a meditação diária.",
    icon: "meditate",
    category: "pessoal",
    status: "andamento",
    current: 8,
    total: 30,
    unit: "dias",
    percent: 27,
  },
  {
    id: "g5",
    title: "Treinar 4x por semana",
    description: "Manter a disciplina nos treinos e cuidar da saúde.",
    icon: "dumbbell",
    category: "saude",
    status: "andamento",
    current: 12,
    total: 16,
    unit: "treinos",
    percent: 75,
  },
  {
    id: "g6",
    title: "Concluir maratona de estudos",
    description: "Finalizei a maratona intensiva de 30 dias com sucesso.",
    icon: "target",
    category: "estudos",
    status: "concluida",
    current: 30,
    total: 30,
    unit: "dias",
    percent: 100,
  },
  {
    id: "g7",
    title: "Antigo desafio de leitura",
    description: "Desafio arquivado para retomar futuramente.",
    icon: "book",
    category: "leitura",
    status: "arquivada",
    current: 3,
    total: 20,
    unit: "livros",
    percent: 15,
  },
]

const MT_TABS: { key: MtTabKey; label: string }[] = [
  { key: "minhas", label: "Minhas Metas" },
  { key: "andamento", label: "Em Andamento" },
  { key: "concluidas", label: "Concluídas" },
  { key: "arquivadas", label: "Arquivadas" },
]

const MT_WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"]

const MT_CALENDAR: MtCalendarDay[] = buildCalendar()

function buildCalendar(): MtCalendarDay[] {
  const toned = new Map<number, MtDayTone>([
    [3, "violet"],
    [4, "amber"],
    [5, "green"],
    [6, "green"],
    [7, "amber"],
    [8, "green"],
    [9, "amber"],
    [10, "green"],
    [11, "green"],
    [12, "green"],
    [13, "green"],
    [14, "green"],
    [15, "green"],
    [16, "green"],
    [17, "green"],
    [18, "green"],
    [19, "green"],
    [20, "green"],
    [21, "green"],
    [22, "green"],
    [23, "green"],
    [24, "green"],
    [25, "green"],
    [26, "green"],
    [27, "green"],
    [28, "green"],
    [29, "green"],
    [30, "violet"],
  ])

  const cells: MtCalendarDay[] = []
  // Trailing days of previous month (26..31) + 1
  const lead = [26, 27, 28, 29, 30, 31, 1]
  lead.forEach((d) =>
    cells.push({ day: d, outside: true, today: false, selected: false, tone: "none" }),
  )
  for (let d = 2; d <= 30; d++) {
    cells.push({
      day: d,
      outside: false,
      today: d === 3,
      selected: d === 3,
      tone: toned.get(d) ?? "none",
    })
  }
  // Trailing next month days
  const trail = [1, 2, 3, 4, 5, 6]
  trail.forEach((d) =>
    cells.push({ day: d, outside: true, today: false, selected: false, tone: "none" }),
  )
  return cells
}

const MT_TIPS: MtTip[] = [
  { id: "t1", quote: "Consistência não é fazer tudo perfeito, é fazer todos os dias.", author: "Autor desconhecido" },
  { id: "t2", quote: "Pequenos progressos diários levam a grandes resultados.", author: "Robert Collier" },
  { id: "t3", quote: "A disciplina é a ponte entre metas e realizações.", author: "Jim Rohn" },
  { id: "t4", quote: "Você não precisa ser grande para começar, mas precisa começar para ser grande.", author: "Zig Ziglar" },
]

/* ============================ SUB COMPONENTS ============================ */

interface MtStatsCardProps {
  stat: MtStat
}

function MtStatsCard({ stat }: MtStatsCardProps) {
  return (
    <div className="mt-stat">
      <span className={`mt-stat-icon mt-stat-icon--${stat.tone}`}>
        <MtIcon name={stat.icon} size={20} />
      </span>
      <div className="mt-stat-text">
        <span className="mt-stat-value">{stat.value}</span>
        <span className="mt-stat-label">{stat.label}</span>
      </div>
    </div>
  )
}

interface MtCategoryBadgeProps {
  category: MtCategory
  active: boolean
  onSelect: (key: MtCategoryKey) => void
}

function MtCategoryBadge({ category, active, onSelect }: MtCategoryBadgeProps) {
  return (
    <button
      type="button"
      className={`mt-cat-row${active ? " mt-cat-row--active" : ""}`}
      onClick={() => onSelect(category.key)}
    >
      <span className="mt-cat-left">
        <span className="mt-cat-dot" style={{ backgroundColor: category.color }} />
        <span className="mt-cat-label">{category.label}</span>
      </span>
      <span className="mt-cat-count">{category.count}</span>
    </button>
  )
}

interface MtGoalCardProps {
  goal: MtGoal
  expanded: boolean
  onToggle: (id: string) => void
  onProgress: (id: string, delta: number) => void
}

function MtGoalCard({ goal, expanded, onToggle, onProgress }: MtGoalCardProps) {
  const statusLabel =
    goal.status === "concluida" ? "Concluída" : goal.status === "arquivada" ? "Arquivada" : "Em andamento"

  return (
    <article className={`mt-goal${expanded ? " mt-goal--expanded" : ""}`}>
      <button type="button" className="mt-goal-head" onClick={() => onToggle(goal.id)}>
        <span className="mt-goal-icon">
          <MtIcon name={goal.icon} size={22} />
        </span>

        <div className="mt-goal-body">
          <h3 className="mt-goal-title">{goal.title}</h3>
          <p className="mt-goal-desc">{goal.description}</p>
          <div className="mt-progress-track">
            <span className="mt-progress-fill" style={{ width: `${goal.percent}%` }} />
          </div>
          <span className="mt-goal-count">
            {goal.current} / {goal.total} {goal.unit}
          </span>
        </div>

        <div className="mt-goal-side">
          <span className="mt-goal-percent">{goal.percent}%</span>
          <span className={`mt-goal-status mt-goal-status--${goal.status}`}>
            <span className="mt-status-dot" />
            {statusLabel}
          </span>
        </div>

        <span className={`mt-goal-chevron${expanded ? " mt-goal-chevron--open" : ""}`}>
          <MtIcon name="chevron-right" size={20} />
        </span>
      </button>

      {expanded && (
        <div className="mt-goal-detail">
          <p className="mt-goal-detail-text">
            Atualize o progresso desta meta para manter sua sequência ativa.
          </p>
          <div className="mt-goal-actions">
            <button
              type="button"
              className="mt-step-btn"
              onClick={() => onProgress(goal.id, -1)}
              disabled={goal.current <= 0}
            >
              -
            </button>
            <span className="mt-step-value">
              {goal.current} / {goal.total}
            </span>
            <button
              type="button"
              className="mt-step-btn"
              onClick={() => onProgress(goal.id, 1)}
              disabled={goal.current >= goal.total}
            >
              +
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

/* ============================ MAIN COMPONENT ============================ */

export function Metas() {
  // const [mtActiveNav, setMtActiveNav] = useState<string>("Metas")
  const [mtActiveTab, setMtActiveTab] = useState<MtTabKey>("minhas")
  const [mtCategoryFilter, setMtCategoryFilter] = useState<MtCategoryKey | "all">("all")
  const [mtCategoryOpen, setMtCategoryOpen] = useState<boolean>(false)
  const [mtGoals, setMtGoals] = useState<MtGoal[]>(MT_INITIAL_GOALS)
  const [mtExpandedId, setMtExpandedId] = useState<string | null>(null)
  const [mtGoalCounter, setMtGoalCounter] = useState<number>(MT_INITIAL_GOALS.length)
  const [mtTipIndex, setMtTipIndex] = useState<number>(0)
  // const [mtDarkMode, setMtDarkMode] = useState<boolean>(false)
  const [mtSelectedDay, setMtSelectedDay] = useState<number>(3)
  const [mtEditGoal, setMtEditGoal] = useState(false);

  const mtHandleTabChange = (tab: MtTabKey): void => {
    setMtActiveTab(tab)
    setMtExpandedId(null)
  }

  const mtHandleCategorySelect = (key: MtCategoryKey | "all"): void => {
    setMtCategoryFilter(key)
    setMtCategoryOpen(false)
  }

  const mtHandleToggleGoal = (id: string): void => {
    setMtExpandedId((prev) => (prev === id ? null : id))
  }

  const mtHandleProgressUpdate = (id: string, delta: number): void => {
    setMtGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g
        const next = Math.min(g.total, Math.max(0, g.current + delta))
        const percent = Math.round((next / g.total) * 100)
        const status: MtGoalStatus = percent >= 100 ? "concluida" : g.status === "arquivada" ? "arquivada" : "andamento"
        return { ...g, current: next, percent, status }
      }),
    )
  }

  const mtHandleCreateGoal = (): void => {
    setMtEditGoal(true)
    // const nextId = mtGoalCounter + 1
    // const newGoal: MtGoal = {
    //   id: `g${nextId}`,
    //   title: `Nova meta ${nextId}`,
    //   description: "Descreva o objetivo e comece a acompanhar seu progresso.",
    //   icon: "target",
    //   category: "estudos",
    //   status: "andamento",
    //   current: 0,
    //   total: 10,
    //   unit: "etapas",
    //   percent: 0,
    // }
    // setMtGoals((prev) => [newGoal, ...prev])
    // setMtGoalCounter(nextId)
    // setMtActiveTab("minhas")
    // setMtCategoryFilter("all")
    // setMtExpandedId(newGoal.id)
  }

  const mtHandleTipChange = (index: number): void => {
    setMtTipIndex(index)
  }

  const mtFilteredGoals = useMemo<MtGoal[]>(() => {
    return mtGoals.filter((g) => {
      const byTab =
        mtActiveTab === "minhas"
          ? true
          : mtActiveTab === "andamento"
            ? g.status === "andamento"
            : mtActiveTab === "concluidas"
              ? g.status === "concluida"
              : g.status === "arquivada"
      const byCat = mtCategoryFilter === "all" ? true : g.category === mtCategoryFilter
      return byTab && byCat
    })
  }, [mtGoals, mtActiveTab, mtCategoryFilter])

  const mtFilterLabel =
    mtCategoryFilter === "all"
      ? "Todas as categorias"
      : MT_CATEGORIES.find((c) => c.key === mtCategoryFilter)?.label ?? "Todas as categorias"


  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagGoal, setTagGoal] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleTagKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^#/, "");
      if (tag && !tags.includes(`#${tag}`)) {
        setTags([...tags, `#${tag}`]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handlePublish = () => {
    if (!title.trim()) { setError("O título é obrigatório."); return; }
    const nextId = mtGoalCounter + 1
    const newGoal: MtGoal = {
      id: `g${nextId}`,
      title: title,
      description: body,
      icon: "target",
      category: "estudos",
      status: "andamento",
      current: 0,
      total: Number(tagGoal),
      unit: tagInput,
      percent: 0,
    }
    setMtGoals((prev) => [newGoal, ...prev])
    setMtGoalCounter(nextId)
    setMtActiveTab("minhas")
    setMtCategoryFilter("all")
    setMtExpandedId(newGoal.id)
    setMtEditGoal(false)
  };


  return (
    <div className={`mt-app`}>
      {/* ============ SIDEBAR ============ */}
      <div className="hp-layout">
        <LeftBar />
      </div>

      {/* ============ MAIN ============ */}
      <main className="mt-main">
        <div className="mt-content">
          <section className="mt-content-main">

            <div className="mt-page-head">
              <div className="mt-page-title">
                <h1 className="mt-page-title">Metas</h1>
                <p className="mt-page-subtitle">
                  Defina objetivos, acompanhe seu progresso e mantenha a consistência.
                </p>
              </div>
            </div>

            {/* Resumo geral */}
            <div className="mt-summary-card">
              <div className="mt-summary-head">
                <h2 className="mt-summary-title">Resumo geral</h2>
                <p className="mt-summary-sub">Acompanhe seu progresso das metas</p>
              </div>
              <div className="mt-stats-grid">
                {MT_STATS.map((stat) => (
                  <MtStatsCard key={stat.id} stat={stat} />
                ))}
              </div>
            </div>

            {/* Tabs + filter */}
            <div className="mt-toolbar">
              <div className="mt-tabs" role="tablist">
                {MT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={mtActiveTab === tab.key}
                    className={`mt-tab${mtActiveTab === tab.key ? " mt-tab--active" : ""}`}
                    onClick={() => mtHandleTabChange(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-dropdown">
                <button
                  type="button"
                  className="mt-dropdown-trigger"
                  onClick={() => setMtCategoryOpen((v) => !v)}
                >
                  {mtFilterLabel}
                  <MtIcon name="chevron-down" size={16} />
                </button>
                {mtCategoryOpen && (
                  <ul className="mt-dropdown-menu">
                    <li>
                      <button
                        type="button"
                        className={`mt-dropdown-item${mtCategoryFilter === "all" ? " mt-dropdown-item--active" : ""}`}
                        onClick={() => mtHandleCategorySelect("all")}
                      >
                        Todas as categorias
                      </button>
                    </li>
                    {MT_CATEGORIES.map((cat) => (
                      <li key={cat.key}>
                        <button
                          type="button"
                          className={`mt-dropdown-item${mtCategoryFilter === cat.key ? " mt-dropdown-item--active" : ""}`}
                          onClick={() => mtHandleCategorySelect(cat.key)}
                        >
                          <span className="mt-cat-dot" style={{ backgroundColor: cat.color }} />
                          {cat.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Goal list */}
            <div className="mt-goal-list">

              {mtFilteredGoals.length > 0 ? (
                mtFilteredGoals.map((goal) => (
                  <MtGoalCard
                    key={goal.id}
                    goal={goal}
                    expanded={mtExpandedId === goal.id}
                    onToggle={mtHandleToggleGoal}
                    onProgress={mtHandleProgressUpdate}
                  />
                ))
              ) : (
                <div className="mt-empty">Nenhuma meta encontrada para este filtro.</div>
              )}
            </div>
          </section>

          {/* ============ RIGHT RAIL ============ */}
          <aside className="mt-rail">
            <div>
              <button type="button" className="mt-primary-btn" onClick={mtHandleCreateGoal}>
                <MtIcon name="plus" size={18} />
                Nova Meta
              </button>
            </div>

            {/* Calendar */}
            <div className="mt-panel">
              <div className="mt-panel-head">
                <h3 className="mt-panel-title">
                  Calendário de consistência
                  <span className="mt-panel-info">
                    <MtIcon name="info" size={14} />
                  </span>
                </h3>
              </div>
              <div className="mt-cal-nav">
                <button type="button" className="mt-cal-arrow" aria-label="Mês anterior">
                  <MtIcon name="chevron-left" size={18} />
                </button>
                <span className="mt-cal-month">Junho 2025</span>
                <button type="button" className="mt-cal-arrow" aria-label="Próximo mês">
                  <MtIcon name="chevron-right" size={18} />
                </button>
              </div>
              <div className="mt-cal-grid">
                {MT_WEEKDAYS.map((wd, i) => (
                  <span key={`wd-${i}`} className="mt-cal-weekday">
                    {wd}
                  </span>
                ))}
                {MT_CALENDAR.map((cell, i) => (
                  <button
                    key={`day-${i}`}
                    type="button"
                    disabled={cell.outside}
                    className={[
                      "mt-cal-day",
                      cell.outside ? "mt-cal-day--outside" : "",
                      mtSelectedDay === cell.day && !cell.outside ? "mt-cal-day--selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => !cell.outside && setMtSelectedDay(cell.day)}
                  >
                    <span className="mt-cal-num">{cell.day}</span>
                    {cell.tone !== "none" && (
                      <span className={`mt-cal-dot mt-cal-dot--${cell.tone}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-panel">
              <h3 className="mt-panel-title">Categorias</h3>
              <div className="mt-cat-list">
                {MT_CATEGORIES.map((cat) => (
                  <MtCategoryBadge
                    key={cat.key}
                    category={cat}
                    active={mtCategoryFilter === cat.key}
                    onSelect={mtHandleCategorySelect}
                  />
                ))}
              </div>
              <button
                type="button"
                className="mt-panel-link"
                onClick={() => mtHandleCategorySelect("all")}
              >
                Ver todas categorias
                <MtIcon name="chevron-right" size={16} />
              </button>
            </div>

            {/* Tip */}
            <div className="mt-panel mt-tip-panel">
              <h3 className="mt-panel-title">Dica do dia</h3>
              <span className="mt-tip-quote-mark">
                <MtIcon name="quote" size={26} />
              </span>
              <p className="mt-tip-text">{MT_TIPS[mtTipIndex].quote}</p>
              <span className="mt-tip-author">– {MT_TIPS[mtTipIndex].author}</span>
              <div className="mt-tip-dots">
                {MT_TIPS.map((tip, i) => (
                  <button
                    key={tip.id}
                    type="button"
                    aria-label={`Dica ${i + 1}`}
                    className={`mt-tip-dot${mtTipIndex === i ? " mt-tip-dot--active" : ""}`}
                    onClick={() => mtHandleTipChange(i)}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {mtEditGoal && (
        <>
          <div className="mt_modal_overlay" onClick={(e) => e.target === e.currentTarget && setMtEditGoal(false)}>
            <div className="mt_modal" role="dialog" aria-label="Criar novo post">
              <div className="mt_modal_header">
                <h2>Criar Meta</h2>
                <button className="mt_modal_close" onClick={() => setMtEditGoal(false)} aria-label="Fechar modal">
                  <IconX />
                </button>
              </div>
              <div className="mt_modal_body">
                {error && <p className="mt_modal_error">{error}</p>}
                <label className="mt_modal_label" htmlFor="mt_modal_title">Meta <span className="mt_required">*</span></label>
                <input
                  id="mt_modal_title"
                  className="mt_modal_input"
                  type="text"
                  placeholder="Escreva sua meta"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setError(""); }}
                />
                <label className="mt_modal_label" htmlFor="mt_modal_body">Descrição</label>
                <textarea
                  id="mt_modal_body"
                  className="mt_modal_textarea"
                  placeholder="Descrever uma meta torna mais fácil de alcança-la"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <label className="mt_modal_label">Progesso</label>
                <div className="mt_tags_input_wrap">
                  {tags.map((tag) => (
                    <span key={tag} className="mt_tag_chip">
                      {tag}
                      <button onClick={() => removeTag(tag)} aria-label={`Remover tag ${tag}`}><IconX /></button>
                    </span>
                  ))}
                  <input
                    className="mt_tags_input"
                    type="text"
                    placeholder={`De nome ao progresso (ex: livros)`}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKey}
                  />
                </div>
                <div className="mt_tags_input_wrap">
                  {tags.map((tag) => (
                    <span key={tag} className="mt_tag_chip">
                      {tag}
                      <button onClick={() => removeTag(tag)} aria-label={`Remover tag ${tag}`}><IconX /></button>
                    </span>
                  ))}
                  <input
                    className="mt_tags_input"
                    type="number"
                    placeholder={`Divida em pequenos passos (ex: 10)`}
                    onChange={(e) => setTagGoal(e.target.value)}
                    onKeyDown={handleTagKey}
                  />
                </div>
              </div>
              <div className="mt_modal_footer">
                <button className="mt_btn_secondary" onClick={() => setMtEditGoal(false)}>Cancelar</button>
                <button className="mt_btn_primary" onClick={handlePublish}>Publicar</button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

/* ============================ NAV ITEM ============================ */

// interface MtNavItemProps {
//   item: { label: string; icon: MtIconName }
//   active: string
//   onClick: (label: string) => void
// }

// function MtNavItem({ item, active, onClick }: MtNavItemProps) {
//   return (
//     <button
//       type="button"
//       className={`mt-nav-item${active === item.label ? " mt-nav-item--active" : ""}`}
//       onClick={() => onClick(item.label)}
//     >
//       <MtIcon name={item.icon} size={20} />
//       <span>{item.label}</span>
//     </button>
//   )
// }
