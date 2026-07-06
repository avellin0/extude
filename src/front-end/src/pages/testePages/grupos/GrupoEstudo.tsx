import React, { useMemo, useRef, useState } from "react";
import "./GrupoEstudo.css";
import { LeftBar } from "../home/components/leftBar/LeftBar";
import { useNavigate, useParams } from "react-router-dom";

/* =========================================================================
   TIPOS
   ========================================================================= */

interface GeMember {
  id: string;
  initials: string;
  color: string;
}

interface GeCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface GeGroup {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  categoryId: string;
  minTime: string;
  membersCount: number;
  maxMembers: number;
  monthlyGoal: string;
  members: GeMember[];
  extraMembers: number;
  iconBg: string;
  iconColor: string;
  icon: string;
  verified: boolean;
  beginnerFriendly: boolean;
  createdAt: number;
}

interface GeFeaturedGroup extends GeGroup {
  badge?: string;
  gradientClass: string;
  bigIcon: React.ReactNode;
}

type GeSortOption = "popular" | "recent" | "members" | "alphabetical";

type GeNavId =
  | "home"
  | "videos"
  | "livros"
  | "grupos"
  | "chat"
  | "metas"
  | "pomodoro"
  | "perfil";

interface GeNavItemData {
  id: GeNavId;
  label: string;
  icon: React.ReactNode;
}

interface GeFilterState {
  comVagas: boolean;
  verificado: boolean;
  iniciante: boolean;
}

/* =========================================================================
   ÍCONES (SVG inline, sem dependências externas)
   ========================================================================= */

const geIconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GeIconSearch: React.FC = () => (
  <svg {...geIconProps}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GeIconFilter: React.FC = () => (
  <svg {...geIconProps}>
    <polygon points="4 4 20 4 14 12.5 14 19 10 21 10 12.5 4 4" />
  </svg>
);

const GeIconChevronDown: React.FC = () => (
  <svg {...geIconProps} width={14} height={14}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const GeIconChevronLeft: React.FC = () => (
  <svg {...geIconProps} width={16} height={16}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const GeIconChevronRight: React.FC = () => (
  <svg {...geIconProps} width={16} height={16}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const GeIconStar: React.FC = () => (
  <svg {...geIconProps} fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.63 22 9.24 16.8 14.14 18.18 21 12 17.4 5.82 21 7.2 14.14 2 9.24 8.91 8.63" />
  </svg>
);

const GeIconClock: React.FC = () => (
  <svg {...geIconProps} width={14} height={14}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

const GeIconUsers: React.FC = () => (
  <svg {...geIconProps} width={14} height={14}>
    <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
    <circle cx="9.5" cy="7.5" r="3.5" />
    <path d="M16 6.2a3 3 0 0 1 0 5.8" />
    <path d="M20 20v-1.5a3 3 0 0 0-2-2.8" />
  </svg>
);

const GeIconTarget: React.FC = () => (
  <svg {...geIconProps} width={14} height={14}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const GeIconPlus: React.FC = () => (
  <svg {...geIconProps} width={16} height={16}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GeIconCheck: React.FC = () => (
  <svg {...geIconProps} width={16} height={16}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const GeIconHome: React.FC = () => (
  <svg {...geIconProps}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9.5a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1V10" />
  </svg>
);

const GeIconPlay: React.FC = () => (
  <svg {...geIconProps}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="10 8.5 16 12 10 15.5" fill="currentColor" stroke="none" />
  </svg>
);

const GeIconBook: React.FC = () => (
  <svg {...geIconProps}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21Z" />
    <line x1="4" y1="19" x2="4" y2="5.5" />
  </svg>
);

const GeIconGroupUsers: React.FC = () => (
  <svg {...geIconProps}>
    <circle cx="8.5" cy="8" r="3.2" />
    <circle cx="16" cy="9" r="2.6" />
    <path d="M3.5 19v-1.3A4 4 0 0 1 7.5 13.7h2a4 4 0 0 1 4 4V19" />
    <path d="M14.7 14.1a3.2 3.2 0 0 1 3.8 3.15V19" />
  </svg>
);

const GeIconChat: React.FC = () => (
  <svg {...geIconProps}>
    <path d="M4 5.5h16v10.5H9l-4.5 4V16H4Z" />
  </svg>
);

const GeIconFlag: React.FC = () => (
  <svg {...geIconProps}>
    <line x1="5" y1="3" x2="5" y2="21" />
    <path d="M5 4.5h13l-3 4 3 4H5" />
  </svg>
);

const GeIconTimer: React.FC = () => (
  <svg {...geIconProps}>
    <circle cx="12" cy="13" r="8" />
    <line x1="12" y1="13" x2="12" y2="9" />
    <line x1="9.5" y1="3" x2="14.5" y2="3" />
  </svg>
);

const GeIconUser: React.FC = () => (
  <svg {...geIconProps}>
    <circle cx="12" cy="8" r="3.7" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const GeIconSun: React.FC = () => (
  <svg {...geIconProps} width={15} height={15}>
    <circle cx="12" cy="12" r="4.2" />
    <line x1="12" y1="2.5" x2="12" y2="4.5" />
    <line x1="12" y1="19.5" x2="12" y2="21.5" />
    <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
    <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
    <line x1="2.5" y1="12" x2="4.5" y2="12" />
    <line x1="19.5" y1="12" x2="21.5" y2="12" />
    <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
    <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
  </svg>
);

const GeIconMoon: React.FC = () => (
  <svg {...geIconProps} width={15} height={15} fill="currentColor" stroke="none">
    <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.6 8.6 0 1 0 10.2 10.2Z" />
  </svg>
);

const GeIconBell: React.FC = () => (
  <svg {...geIconProps}>
    <path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.5 5.2 1.5 5.2H4.5S6 14.5 6 10.5Z" />
    <path d="M10.3 19a1.9 1.9 0 0 0 3.4 0" />
  </svg>
);

const GeIconGraduationCap: React.FC = () => (
  <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4.5 2.5 9 12 13.5 21.5 9Z" />
    <path d="M6.5 11.2V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.8" />
    <path d="M21.5 9v5.5" />
  </svg>
);

const GeIconCode: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 3 12 9 18" />
    <polyline points="15 6 21 12 15 18" />
  </svg>
);

const GeIconBrain: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4.2a2.6 2.6 0 0 0-2.6 2.6 2.6 2.6 0 0 0-1.4 4.6 2.8 2.8 0 0 0 1.3 5 2.7 2.7 0 0 0 2.7 3.4 2.6 2.6 0 0 0 2.5-1.8V6.4A2.2 2.2 0 0 0 9 4.2Z" />
    <path d="M15 4.2a2.6 2.6 0 0 1 2.6 2.6 2.6 2.6 0 0 1 1.4 4.6 2.8 2.8 0 0 1-1.3 5 2.7 2.7 0 0 1-2.7 3.4 2.6 2.6 0 0 1-2.5-1.8V6.4A2.2 2.2 0 0 1 15 4.2Z" />
  </svg>
);

const GeIconOpenBook: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6.2c-1.6-1.4-4-2-6.5-2v13c2.5 0 4.9.6 6.5 2 1.6-1.4 4-2 6.5-2v-13c-2.5 0-4.9.6-6.5 2Z" />
    <line x1="12" y1="6.2" x2="12" y2="19.2" />
  </svg>
);

const GeIconFire: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2c1 3-2.5 4.2-2.5 7.3A3 3 0 0 0 12 12a2.2 2.2 0 0 0 2.2-2.2c1.6 1.4 2.8 3.4 2.8 5.6A5 5 0 0 1 7 15.4C7 10.4 11 8.3 12 2Z" />
  </svg>
);

const GeIconRuler: React.FC = () => (
  <span className="ge-emoji-icon">📐</span>
);
const GeIconGlobe2: React.FC = () => <span className="ge-emoji-icon">🌐</span>;
const GeIconAim: React.FC = () => <span className="ge-emoji-icon">🎯</span>;
const GeIconHeartbeat: React.FC = () => <span className="ge-emoji-icon">💓</span>;
const GeIconFlask: React.FC = () => <span className="ge-emoji-icon">⚗️</span>;
const GeIconFlagBr: React.FC = () => <span className="ge-emoji-icon">🇪🇸</span>;
const GeIconPuzzle: React.FC = () => <span className="ge-emoji-icon">🧩</span>;
const GeIconColumns: React.FC = () => <span className="ge-emoji-icon">🏛️</span>;

const GeIconGrid: React.FC = () => (
  <svg {...geIconProps} width={15} height={15}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" />
  </svg>
);
const GeIconGraduate: React.FC = () => <span className="ge-emoji-icon">🎓</span>;
const GeIconTrophy: React.FC = () => <span className="ge-emoji-icon">🏆</span>;
const GeIconCodeSmall: React.FC = () => <span className="ge-emoji-icon">{"</>"}</span>;
const GeIconSpeech: React.FC = () => <span className="ge-emoji-icon">💬</span>;
const GeIconHeart: React.FC = () => <span className="ge-emoji-icon">❤️</span>;
const GeIconFlagCheckered: React.FC = () => <span className="ge-emoji-icon">🏁</span>;
const GeIconScale: React.FC = () => <span className="ge-emoji-icon">⚖️</span>;
const GeIconPalette: React.FC = () => <span className="ge-emoji-icon">🎨</span>;
const GeIconChartUp: React.FC = () => <span className="ge-emoji-icon">📈</span>;
const GeIconMoneyBag: React.FC = () => <span className="ge-emoji-icon">💰</span>;

/* =========================================================================
   DADOS MOCKADOS
   ========================================================================= */

const geCategories: GeCategory[] = [
  { id: "todos", label: "Todos", icon: <GeIconGrid /> },
  { id: "vestibulares", label: "Vestibulares", icon: <GeIconOpenBook /> },
  { id: "concursos", label: "Concursos", icon: <GeIconTrophy /> },
  { id: "programacao", label: "Programação", icon: <GeIconCodeSmall /> },
  { id: "idiomas", label: "Idiomas", icon: <GeIconSpeech /> },
  { id: "medicina", label: "Medicina", icon: <GeIconHeart /> },
  { id: "enem", label: "Enem", icon: <GeIconFlagCheckered /> },
];

const geExtraCategories: GeCategory[] = [
  { id: "direito", label: "Direito", icon: <GeIconScale /> },
  { id: "design", label: "Design", icon: <GeIconPalette /> },
  { id: "marketing", label: "Marketing", icon: <GeIconChartUp /> },
  { id: "financas", label: "Finanças", icon: <GeIconMoneyBag /> },
];

const geMembersPool: GeMember[] = [
  { id: "m1", initials: "AC", color: "#6C5DD3" },
  { id: "m2", initials: "PL", color: "#F5834A" },
  { id: "m3", initials: "RS", color: "#1FB6A6" },
  { id: "m4", initials: "JN", color: "#EF4B70" },
  { id: "m5", initials: "MV", color: "#3E8EF7" },
  { id: "m6", initials: "TB", color: "#F5A623" },
];

const geFeaturedGroups: GeFeaturedGroup[] = [
  {
    id: "f1",
    name: "Desafio ENEM 2024",
    emoji: "🚀",
    subtitle: "Preparação intensa para o ENEM 2024",
    categoryId: "enem",
    minTime: "2h/dia",
    membersCount: 256,
    maxMembers: 260,
    monthlyGoal: "1.000h",
    members: geMembersPool,
    extraMembers: 23,
    iconBg: "#1B2340",
    iconColor: "#F5A623",
    icon: "🎓",
    verified: true,
    beginnerFriendly: false,
    createdAt: 5,
    badge: "Em alta",
    gradientClass: "ge-gradient-navy",
    bigIcon: <GeIconGraduationCap />,
  },
  {
    id: "f2",
    name: "Dev em Ação",
    emoji: "💻",
    subtitle: "Evolua como desenvolvedor",
    categoryId: "programacao",
    minTime: "1h/dia",
    membersCount: 124,
    maxMembers: 150,
    monthlyGoal: "600h",
    members: geMembersPool,
    extraMembers: 15,
    iconBg: "#0B3D24",
    iconColor: "#3ED598",
    icon: "</>",
    verified: true,
    beginnerFriendly: true,
    createdAt: 12,
    gradientClass: "ge-gradient-green",
    bigIcon: <GeIconCode />,
  },
  {
    id: "f3",
    name: "Medicina Foco Total",
    emoji: "🩺",
    subtitle: "Rumo à aprovação na residência",
    categoryId: "medicina",
    minTime: "3h/dia",
    membersCount: 89,
    maxMembers: 90,
    monthlyGoal: "900h",
    members: geMembersPool,
    extraMembers: 9,
    iconBg: "#0B2A45",
    iconColor: "#5FB3F5",
    icon: "🧠",
    verified: true,
    beginnerFriendly: false,
    createdAt: 30,
    gradientClass: "ge-gradient-blue",
    bigIcon: <GeIconBrain />,
  },
  {
    id: "f4",
    name: "Leitura Diária",
    emoji: "📚",
    subtitle: "Crie o hábito da leitura",
    categoryId: "vestibulares",
    minTime: "30m/dia",
    membersCount: 184,
    maxMembers: 300,
    monthlyGoal: "200h",
    members: geMembersPool,
    extraMembers: 18,
    iconBg: "#34205C",
    iconColor: "#C9A6FF",
    icon: "📖",
    verified: false,
    beginnerFriendly: true,
    createdAt: 2,
    gradientClass: "ge-gradient-purple",
    bigIcon: <GeIconOpenBook />,
  },
  {
    id: "f5",
    name: "Redação Nota Mil",
    emoji: "✍️",
    subtitle: "Domine a redação dissertativa",
    categoryId: "vestibulares",
    minTime: "1h/dia",
    membersCount: 143,
    maxMembers: 200,
    monthlyGoal: "500h",
    members: geMembersPool,
    extraMembers: 11,
    iconBg: "#4A1D2E",
    iconColor: "#F58AA6",
    icon: "✍️",
    verified: false,
    beginnerFriendly: true,
    createdAt: 8,
    gradientClass: "ge-gradient-rose",
    bigIcon: <GeIconOpenBook />,
  },
  {
    id: "f6",
    name: "Inglês Fluente",
    emoji: "🌎",
    subtitle: "Pratique conversação todos os dias",
    categoryId: "idiomas",
    minTime: "45m/dia",
    membersCount: 210,
    maxMembers: 220,
    monthlyGoal: "400h",
    members: geMembersPool,
    extraMembers: 20,
    iconBg: "#0F3D3A",
    iconColor: "#3ED5C8",
    icon: "🌎",
    verified: true,
    beginnerFriendly: true,
    createdAt: 20,
    gradientClass: "ge-gradient-teal",
    bigIcon: <GeIconBrain />,
  },
];

const geAllGroups: GeGroup[] = [
  {
    id: "g1",
    name: "Matemática 360",
    emoji: "📐",
    subtitle: "Domine matemática do básico ao avançado",
    categoryId: "vestibulares",
    minTime: "1h/dia",
    membersCount: 76,
    maxMembers: 100,
    monthlyGoal: "400h",
    members: geMembersPool,
    extraMembers: 11,
    iconBg: "#FFE8DA",
    iconColor: "#F5834A",
    icon: "📐",
    verified: true,
    beginnerFriendly: true,
    createdAt: 3,
  },
  {
    id: "g2",
    name: "Inglês na Prática",
    emoji: "🌐",
    subtitle: "Pratique todos os dias",
    categoryId: "idiomas",
    minTime: "30m/dia",
    membersCount: 142,
    maxMembers: 150,
    monthlyGoal: "300h",
    members: geMembersPool,
    extraMembers: 19,
    iconBg: "#D9F5F0",
    iconColor: "#1FB6A6",
    icon: "🌐",
    verified: true,
    beginnerFriendly: true,
    createdAt: 15,
  },
  {
    id: "g3",
    name: "Concurso Público",
    emoji: "🎯",
    subtitle: "Foco, disciplina e aprovação",
    categoryId: "concursos",
    minTime: "2h/dia",
    membersCount: 198,
    maxMembers: 219,
    monthlyGoal: "800h",
    members: geMembersPool,
    extraMembers: 21,
    iconBg: "#FFF1D6",
    iconColor: "#F5A623",
    icon: "🎯",
    verified: true,
    beginnerFriendly: false,
    createdAt: 25,
  },
  {
    id: "g4",
    name: "Bio Resumos",
    emoji: "🧬",
    subtitle: "Resumos e questões de biologia",
    categoryId: "medicina",
    minTime: "1h/dia",
    membersCount: 63,
    maxMembers: 70,
    monthlyGoal: "250h",
    members: geMembersPool,
    extraMembers: 7,
    iconBg: "#FCE0E8",
    iconColor: "#EF4B70",
    icon: "🧬",
    verified: false,
    beginnerFriendly: true,
    createdAt: 1,
  },
  {
    id: "g5",
    name: "Química Rápida",
    emoji: "⚗️",
    subtitle: "Fórmulas e reações sem complicação",
    categoryId: "vestibulares",
    minTime: "1h/dia",
    membersCount: 54,
    maxMembers: 120,
    monthlyGoal: "300h",
    members: geMembersPool,
    extraMembers: 4,
    iconBg: "#EDEAFB",
    iconColor: "#6C5DD3",
    icon: "⚗️",
    verified: false,
    beginnerFriendly: true,
    createdAt: 18,
  },
  {
    id: "g6",
    name: "Espanhol Básico",
    emoji: "🇪🇸",
    subtitle: "Primeiros passos no espanhol",
    categoryId: "idiomas",
    minTime: "30m/dia",
    membersCount: 88,
    maxMembers: 200,
    monthlyGoal: "200h",
    members: geMembersPool,
    extraMembers: 6,
    iconBg: "#E1F5E5",
    iconColor: "#2FBF6F",
    icon: "🇪🇸",
    verified: true,
    beginnerFriendly: true,
    createdAt: 40,
  },
  {
    id: "g7",
    name: "Lógica de Programação",
    emoji: "🧩",
    subtitle: "Estruturas de dados e algoritmos",
    categoryId: "programacao",
    minTime: "1h/dia",
    membersCount: 97,
    maxMembers: 100,
    monthlyGoal: "350h",
    members: geMembersPool,
    extraMembers: 13,
    iconBg: "#DCEBFF",
    iconColor: "#3E8EF7",
    icon: "🧩",
    verified: true,
    beginnerFriendly: false,
    createdAt: 6,
  },
  {
    id: "g8",
    name: "História Geral",
    emoji: "🏛️",
    subtitle: "Linha do tempo e fatos marcantes",
    categoryId: "concursos",
    minTime: "1h/dia",
    membersCount: 71,
    maxMembers: 150,
    monthlyGoal: "300h",
    members: geMembersPool,
    extraMembers: 5,
    iconBg: "#FFE8DA",
    iconColor: "#F5834A",
    icon: "🏛️",
    verified: false,
    beginnerFriendly: true,
    createdAt: 22,
  },
];

const geMainNav: GeNavItemData[] = [
  { id: "home", label: "Home", icon: <GeIconHome /> },
  { id: "videos", label: "Vídeos", icon: <GeIconPlay /> },
  { id: "livros", label: "Livros", icon: <GeIconBook /> },
];

const geConnectNav: GeNavItemData[] = [
  { id: "grupos", label: "Grupos", icon: <GeIconGroupUsers /> },
  { id: "chat", label: "Chat", icon: <GeIconChat /> },
];

const geProductivityNav: GeNavItemData[] = [
  { id: "metas", label: "Metas", icon: <GeIconFlag /> },
  { id: "pomodoro", label: "Pomodoro", icon: <GeIconTimer /> },
];

const geNavLabels: Record<GeNavId, string> = {
  home: "Home",
  videos: "Vídeos",
  livros: "Livros",
  grupos: "Grupos",
  chat: "Chat",
  metas: "Metas",
  pomodoro: "Pomodoro",
  perfil: "Perfil",
};

const geSortLabels: Record<GeSortOption, string> = {
  popular: "Mais populares",
  recent: "Mais recentes",
  members: "Mais membros",
  alphabetical: "Ordem alfabética",
};

/* =========================================================================
   SUBCOMPONENTES
   ========================================================================= */

const GeAvatarStack: React.FC<{ members: GeMember[]; extra: number }> = ({
  members,
  extra,
}) => (
  <div className="ge-avatar-stack">
    {members.slice(0, 4).map((m) => (
      <span
        key={m.id}
        className="ge-avatar"
        style={{ backgroundColor: m.color }}
        title={m.initials}
      >
        {m.initials}
      </span>
    ))}
    {extra > 0 && <span className="ge-avatar ge-avatar-extra">+{extra}</span>}
  </div>
);

const GeStat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <div className="ge-stat">
    <span className="ge-stat-icon">{icon}</span>
    <span className="ge-stat-texts">
      <span className="ge-stat-label">{label}</span>
      <span className="ge-stat-value">{value}</span>
    </span>
  </div>
);

const GeFeaturedCard: React.FC<{
  group: GeFeaturedGroup;
  joined: boolean;
  onToggleJoin: () => void;
}> = ({ group, joined, onToggleJoin }) => (
  <article className="ge-featured-card">
    <div className={`ge-featured-banner ${group.gradientClass}`}>
      {group.badge && (
        <span className="ge-featured-badge">
          <GeIconFire /> {group.badge}
        </span>
      )}
      <span className="ge-featured-bigicon">{group.bigIcon}</span>
    </div>
    <div className="ge-featured-body">
      <h3 className="ge-card-title">
        {group.name} <span>{group.emoji}</span>
      </h3>
      <p className="ge-card-subtitle">{group.subtitle}</p>
      <div className="ge-stats-row">
        <GeStat icon={<GeIconClock />} label="Mínimo" value={group.minTime} />
        <GeStat
          icon={<GeIconUsers />}
          label="Membros"
          value={group.membersCount}
        />
        <GeStat
          icon={<GeIconTarget />}
          label="Meta mensal"
          value={group.monthlyGoal}
        />
      </div>
      <div className="ge-card-footer">
        <GeAvatarStack members={group.members} extra={group.extraMembers} />
      </div>
      <button
        className={`ge-btn-join ${joined ? "ge-btn-joined" : ""}`}
        onClick={onToggleJoin}
      >
        {joined ? (
          <>
            <GeIconCheck /> Você entrou
          </>
        ) : (
          "Entrar no grupo"
        )}
      </button>
    </div>
  </article>
);

const GeGroupCard: React.FC<{
  group: GeGroup;
  joined: boolean;
  onToggleJoin: () => void;
}> = ({ group, joined, onToggleJoin }) => (
  <article className="ge-group-card">
    <div className="ge-group-card-top">
      <span
        className="ge-group-icon"
        style={{ backgroundColor: group.iconBg, color: group.iconColor }}
      >
        {group.icon}
      </span>
      <button
        className={`ge-btn-join-sm ${joined ? "ge-btn-joined-sm" : ""}`}
        onClick={onToggleJoin}
      >
        {joined ? <GeIconCheck /> : null}
        {joined ? "Você entrou" : "Entrar"}
      </button>
    </div>
    <h3 className="ge-card-title">
      {group.name} <span>{group.emoji}</span>
    </h3>
    <p className="ge-card-subtitle">{group.subtitle}</p>
    <div className="ge-stats-row">
      <GeStat icon={<GeIconClock />} label="Mínimo" value={group.minTime} />
      <GeStat
        icon={<GeIconUsers />}
        label="Membros"
        value={group.membersCount}
      />
      <GeStat
        icon={<GeIconTarget />}
        label="Meta mensal"
        value={group.monthlyGoal}
      />
    </div>
    <div className="ge-card-footer">
      <GeAvatarStack members={group.members} extra={group.extraMembers} />
    </div>
  </article>
);

/* =========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================= */

const GrupoEstudo: React.FC = () => {
  const [geSearchTerm, setGeSearchTerm] = useState<string>("");
  const [geActiveCategory, setGeActiveCategory] = useState<string>("todos");
  const [geSortOption, setGeSortOption] = useState<GeSortOption>("popular");
  const [geShowSortMenu, setGeShowSortMenu] = useState<boolean>(false);
  const [geShowFilterPanel, setGeShowFilterPanel] = useState<boolean>(false);
  const [geFilters, setGeFilters] = useState<GeFilterState>({
    comVagas: false,
    verificado: false,
    iniciante: false,
  });
  const [geShowMoreCategories, setGeShowMoreCategories] =
    useState<boolean>(false);
  const [geActiveNav, setGeActiveNav] = useState<GeNavId>("grupos");
  const [geJoinedFeatured, setGeJoinedFeatured] = useState<Set<string>>(
    new Set()
  );
  const [geJoinedGroups, setGeJoinedGroups] = useState<Set<string>>(
    new Set()
  );
  const [geTheme, setGeTheme] = useState<"light" | "dark">("light");
  const [geShowNotifications, setGeShowNotifications] =
    useState<boolean>(false);
  const [geShowUserMenu, setGeShowUserMenu] = useState<boolean>(false);
  const [geShowAllDestaque, setGeShowAllDestaque] = useState<boolean>(false);
  const [geShowCreateModal, setGeShowCreateModal] = useState<boolean>(false);
  const [geNewGroupName, setGeNewGroupName] = useState<string>("");
  const [geToastMessage, setGeToastMessage] = useState<string>("");

  const geCarouselRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()
  const {name,id} = useParams<{name: string, id: string}>()
  /* ---------------- Handlers ---------------- */

  const geHandleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeSearchTerm(e.target.value);
  };

  const geHandleCategorySelect = (id: string) => {
    setGeActiveCategory(id);
    setGeShowMoreCategories(false);
  };

  const geToggleSortMenu = () => {
    setGeShowSortMenu((prev) => !prev);
    setGeShowFilterPanel(false);
  };

  const geHandleSortSelect = (opt: GeSortOption) => {
    setGeSortOption(opt);
    setGeShowSortMenu(false);
  };

  const geToggleFilterPanel = () => {
    setGeShowFilterPanel((prev) => !prev);
    setGeShowSortMenu(false);
  };

  const geToggleFilterOption = (key: keyof GeFilterState) => {
    setGeFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const geToggleMoreCategories = () => {
    setGeShowMoreCategories((prev) => !prev);
  };

  const geHandleNavClick = (id: GeNavId) => {
    setGeActiveNav(id);
  };

  const geToggleJoinFeatured = (id: string) => {
    setGeJoinedFeatured((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setGeToastMessage("Você entrou no grupo! 🎉");
        navigate(`/grupo/${name}/${id}`)
        window.setTimeout(() => setGeToastMessage(""), 2200);
      }
      return next;
    });
  };

  const geToggleJoinGroup = (id: string) => {
    setGeJoinedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        navigate(`/grupo/${name}/${id}`)
        setGeToastMessage("Você entrou no grupo! 🎉");
        window.setTimeout(() => setGeToastMessage(""), 2200);
      }
      return next;
    });
  };

  const geToggleTheme = () => {
    setGeTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const geToggleNotifications = () => {
    setGeShowNotifications((prev) => !prev);
    setGeShowUserMenu(false);
  };

  const geToggleUserMenu = () => {
    setGeShowUserMenu((prev) => !prev);
    setGeShowNotifications(false);
  };

  const geToggleShowAllDestaque = () => {
    setGeShowAllDestaque((prev) => !prev);
  };

  const geScrollDestaque = (direction: "left" | "right") => {
    if (geCarouselRef.current) {
      geCarouselRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const geOpenCreateModal = () => {
    setGeShowCreateModal(true);
  };

  const geCloseCreateModal = () => {
    setGeShowCreateModal(false);
    setGeNewGroupName("");
  };

  const geHandleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeToastMessage(
      geNewGroupName.trim()
        ? `Grupo "${geNewGroupName.trim()}" criado com sucesso! 🎉`
        : "Grupo criado com sucesso! 🎉"
    );
    window.setTimeout(() => setGeToastMessage(""), 2600);
    geCloseCreateModal();
  };

  /* ---------------- Filtro / Ordenação ---------------- */

  const geMatchesQuery = (group: GeGroup, query: string): boolean => {
    const haystack = `${group.name} ${group.subtitle}`.toLowerCase();
    return haystack.includes(query);
  };

  const geMatchesFilters = (group: GeGroup): boolean => {
    if (geFilters.comVagas && group.membersCount >= group.maxMembers) {
      return false;
    }
    if (geFilters.verificado && !group.verified) {
      return false;
    }
    if (geFilters.iniciante && !group.beginnerFriendly) {
      return false;
    }
    return true;
  };

  const geFilteredFeatured = useMemo<GeFeaturedGroup[]>(() => {
    const query = geSearchTerm.trim().toLowerCase();
    return geFeaturedGroups.filter((group) => {
      const categoryMatch =
        geActiveCategory === "todos" || group.categoryId === geActiveCategory;
      const queryMatch = query === "" || geMatchesQuery(group, query);
      return categoryMatch && queryMatch && geMatchesFilters(group);
    });
  }, [geSearchTerm, geActiveCategory, geFilters]);

  const geFilteredGroups = useMemo<GeGroup[]>(() => {
    const query = geSearchTerm.trim().toLowerCase();
    const filtered = geAllGroups.filter((group) => {
      const categoryMatch =
        geActiveCategory === "todos" || group.categoryId === geActiveCategory;
      const queryMatch = query === "" || geMatchesQuery(group, query);
      return categoryMatch && queryMatch && geMatchesFilters(group);
    });

    const sorted = [...filtered];
    switch (geSortOption) {
      case "members":
        sorted.sort((a, b) => b.membersCount - a.membersCount);
        break;
      case "recent":
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        break;
      case "popular":
      default:
        sorted.sort((a, b) => b.membersCount - a.membersCount);
        break;
    }
    return sorted;
  }, [geSearchTerm, geActiveCategory, geFilters, geSortOption]);

  const geSortOptions: GeSortOption[] = [
    "popular",
    "recent",
    "members",
    "alphabetical",
  ];

  /* ---------------- Render ---------------- */

  return (
    <div className={`ge-app ge-theme-${geTheme}`}>
      {/* ---------------- SIDEBAR ---------------- */}
      {/* <aside className="ge-sidebar">
        <div className="ge-logo">
          <span className="ge-logo-badge">
            <GeIconBook />
          </span>
          <span className="ge-logo-text">ESTUDE</span>
        </div>

        <nav className="ge-nav-block">
          {geMainNav.map((item) => (
            <button
              key={item.id}
              className={`ge-nav-item ${
                geActiveNav === item.id ? "ge-nav-item-active" : ""
              }`}
              onClick={() => geHandleNavClick(item.id)}
            >
              <span className="ge-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ge-nav-section">
          <span className="ge-nav-section-title">CONECTAR</span>
          {geConnectNav.map((item) => (
            <button
              key={item.id}
              className={`ge-nav-item ${
                geActiveNav === item.id ? "ge-nav-item-active" : ""
              }`}
              onClick={() => geHandleNavClick(item.id)}
            >
              <span className="ge-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="ge-nav-section">
          <span className="ge-nav-section-title">PRODUTIVIDADE</span>
          {geProductivityNav.map((item) => (
            <button
              key={item.id}
              className={`ge-nav-item ${
                geActiveNav === item.id ? "ge-nav-item-active" : ""
              }`}
              onClick={() => geHandleNavClick(item.id)}
            >
              <span className="ge-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="ge-nav-section ge-nav-section-noline">
          <button
            className={`ge-nav-item ${
              geActiveNav === "perfil" ? "ge-nav-item-active" : ""
            }`}
            onClick={() => geHandleNavClick("perfil")}
          >
            <span className="ge-nav-icon">
              <GeIconUser />
            </span>
            <span>Perfil</span>
          </button>
        </div>

        <div className="ge-sidebar-spacer" />

        <div className="ge-user-card-wrapper">
          <button className="ge-user-card" onClick={geToggleUserMenu}>
            <span className="ge-user-avatar">DA</span>
            <span className="ge-user-info">
              <span className="ge-user-name">Davi Avelino</span>
              <span className="ge-user-sub">Ver perfil</span>
            </span>
            <span className="ge-user-chevron">
              <GeIconChevronDown />
            </span>
          </button>
          {geShowUserMenu && (
            <div className="ge-dropdown ge-user-menu">
              <button onClick={() => geHandleNavClick("perfil")}>
                Meu perfil
              </button>
              <button onClick={() => geHandleNavClick("metas")}>
                Configurações
              </button>
              <button className="ge-dropdown-danger">Sair</button>
            </div>
          )}
        </div>

        <div className="ge-sidebar-footer">
          <div className="ge-theme-toggle">
            <GeIconSun />
            <button
              className={`ge-switch ${
                geTheme === "dark" ? "ge-switch-on" : ""
              }`}
              onClick={geToggleTheme}
              aria-label="Alternar tema"
            >
              <span className="ge-switch-knob" />
            </button>
            <GeIconMoon />
          </div>
          <div className="ge-notif-wrapper">
            <button
              className="ge-notif-btn"
              onClick={geToggleNotifications}
              aria-label="Notificações"
            >
              <GeIconBell />
              <span className="ge-notif-dot" />
            </button>
            {geShowNotifications && (
              <div className="ge-dropdown ge-notif-panel">
                <p className="ge-notif-item">
                  <strong>Dev em Ação</strong> tem 3 novas mensagens.
                </p>
                <p className="ge-notif-item">
                  Sua meta semanal está 80% concluída.
                </p>
                <p className="ge-notif-item">
                  <strong>Matemática 360</strong> começou um novo desafio.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside> */}
      <div className="hp_layout">
        <LeftBar />
      </div>

      {/* ---------------- MAIN ---------------- */}
      <main className="ge-main">
        {geActiveNav === "grupos" ? (
          <>
            {/* <header className="ge-page-header">
              <div className="ge-page-header-left">
                <span className="ge-page-icon">
                  <GeIconGroupUsers />
                </span>
                <div>
                  <h1>Grupos de estudo</h1>
                  <p>
                    Encontre grupos motivadores e estude junto com outras
                    pessoas.
                  </p>
                </div>
              </div>
              <button className="ge-btn-primary" onClick={geOpenCreateModal}>
                <GeIconPlus /> Criar grupo
              </button>
            </header> */}

            <div className="ge-toolbar">
              <div className="ge-search-box">
                <GeIconSearch />
                <input
                  type="text"
                  placeholder="Buscar grupos por nome, matéria ou objetivo..."
                  value={geSearchTerm}
                  onChange={geHandleSearchChange}
                />
              </div>

              <div className="ge-toolbar-actions">
                <div className="ge-dropdown-wrapper">
                  <button
                    className={`ge-btn-outline ${geShowFilterPanel ? "ge-btn-outline-active" : ""
                      }`}
                    onClick={geToggleFilterPanel}
                  >
                    <GeIconFilter /> Filtros
                  </button>
                  {geShowFilterPanel && (
                    <div className="ge-dropdown ge-filter-panel">
                      <label className="ge-checkbox-row">
                        <input
                          type="checkbox"
                          checked={geFilters.comVagas}
                          onChange={() => geToggleFilterOption("comVagas")}
                        />
                        Com vagas disponíveis
                      </label>
                      <label className="ge-checkbox-row">
                        <input
                          type="checkbox"
                          checked={geFilters.verificado}
                          onChange={() => geToggleFilterOption("verificado")}
                        />
                        Grupo verificado
                      </label>
                      <label className="ge-checkbox-row">
                        <input
                          type="checkbox"
                          checked={geFilters.iniciante}
                          onChange={() => geToggleFilterOption("iniciante")}
                        />
                        Indicado para iniciantes
                      </label>
                    </div>
                  )}
                </div>

                <div className="ge-dropdown-wrapper">
                  <button className="ge-btn-outline" onClick={geToggleSortMenu}>
                    {geSortLabels[geSortOption]} <GeIconChevronDown />
                  </button>
                  {geShowSortMenu && (
                    <div className="ge-dropdown ge-sort-menu">
                      {geSortOptions.map((opt) => (
                        <button
                          key={opt}
                          className={`ge-dropdown-option ${geSortOption === opt
                              ? "ge-dropdown-option-active"
                              : ""
                            }`}
                          onClick={() => geHandleSortSelect(opt)}
                        >
                          {geSortLabels[opt]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="ge-categories">
              {geCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`ge-pill ${geActiveCategory === cat.id ? "ge-pill-active" : ""
                    }`}
                  onClick={() => geHandleCategorySelect(cat.id)}
                >
                  <span className="ge-pill-icon">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}

              <div className="ge-dropdown-wrapper ge-more-categories-wrapper">
                <button
                  className="ge-more-categories-btn"
                  onClick={geToggleMoreCategories}
                >
                  Mais categorias <GeIconChevronDown />
                </button>
                {geShowMoreCategories && (
                  <div className="ge-dropdown ge-more-categories-menu">
                    {geExtraCategories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`ge-dropdown-option ${geActiveCategory === cat.id
                            ? "ge-dropdown-option-active"
                            : ""
                          }`}
                        onClick={() => geHandleCategorySelect(cat.id)}
                      >
                        <span className="ge-pill-icon">{cat.icon}</span>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <section className="ge-section">
              <div className="ge-section-header">
                <h2>
                  <GeIconStar /> Grupos em destaque
                </h2>
                <button
                  className="ge-link-btn"
                  onClick={geToggleShowAllDestaque}
                >
                  {geShowAllDestaque ? "Ver menos" : "Ver todos"}{" "}
                  <GeIconChevronRight />
                </button>
              </div>

              {geFilteredFeatured.length === 0 ? (
                <div className="ge-empty">
                  Nenhum grupo em destaque corresponde à sua busca.
                </div>
              ) : geShowAllDestaque ? (
                <div className="ge-featured-grid">
                  {geFilteredFeatured.map((group) => (
                    <GeFeaturedCard
                      key={group.id}
                      group={group}
                      joined={geJoinedFeatured.has(group.id)}
                      onToggleJoin={() => geToggleJoinFeatured(group.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="ge-featured-carousel">
                  <button
                    className="ge-carousel-arrow ge-carousel-arrow-left"
                    onClick={() => geScrollDestaque("left")}
                    aria-label="Rolar para a esquerda"
                  >
                    <GeIconChevronLeft />
                  </button>
                  <div className="ge-featured-track" ref={geCarouselRef}>
                    {geFilteredFeatured.map((group) => (
                      <GeFeaturedCard
                        key={group.id}
                        group={group}
                        joined={geJoinedFeatured.has(group.id)}
                        onToggleJoin={() => geToggleJoinFeatured(group.id)}
                      />
                    ))}
                  </div>
                  <button
                    className="ge-carousel-arrow ge-carousel-arrow-right"
                    onClick={() => geScrollDestaque("right")}
                    aria-label="Rolar para a direita"
                  >
                    <GeIconChevronRight />
                  </button>
                </div>
              )}
            </section>

            <section className="ge-section">
              <div className="ge-section-header">
                <h2>Todos os grupos</h2>
                <span className="ge-results-count">
                  {geFilteredGroups.length} grupo
                  {geFilteredGroups.length !== 1 ? "s" : ""} encontrado
                  {geFilteredGroups.length !== 1 ? "s" : ""}
                </span>
              </div>

              {geFilteredGroups.length === 0 ? (
                <div className="ge-empty">
                  Nenhum grupo encontrado com esses filtros. Tente ajustar sua
                  busca.
                </div>
              ) : (
                <div className="ge-groups-grid">
                  {geFilteredGroups.map((group) => (
                    <GeGroupCard
                      key={group.id}
                      group={group}
                      joined={geJoinedGroups.has(group.id)}
                      onToggleJoin={() => geToggleJoinGroup(group.id)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="ge-cta-banner">
              <div className="ge-cta-left">
                <span className="ge-cta-icon">
                  <GeIconGroupUsers />
                </span>
                <div>
                  <h3>Não encontrou o grupo ideal?</h3>
                  <p>Crie o seu próprio grupo e convide outros estudantes!</p>
                </div>
              </div>
              <button className="ge-btn-secondary" onClick={geOpenCreateModal}>
                <GeIconPlus /> Criar meu grupo
              </button>
            </section>
          </>
        ) : (
          <div className="ge-placeholder">
            <span className="ge-placeholder-icon">
              <GeIconUser />
            </span>
            <h2>{geNavLabels[geActiveNav]}</h2>
            <p>
              Esta seção está em construção. Volte para "Grupos" para ver a
              funcionalidade completa da tela.
            </p>
            <button
              className="ge-btn-primary"
              onClick={() => geHandleNavClick("grupos")}
            >
              Voltar para Grupos
            </button>
          </div>
        )}
      </main>

      {/* ---------------- MODAL CRIAR GRUPO ---------------- */}
      {geShowCreateModal && (
        <div className="ge-modal-overlay" onClick={geCloseCreateModal}>
          <div
            className="ge-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3>Criar novo grupo</h3>
            <p className="ge-modal-subtitle">
              Preencha os dados básicos para criar seu grupo de estudos.
            </p>
            <form onSubmit={geHandleCreateGroupSubmit}>
              <label className="ge-form-label">
                Nome do grupo
                <input
                  type="text"
                  className="ge-form-input"
                  placeholder="Ex: Redação Nota Mil"
                  value={geNewGroupName}
                  onChange={(e) => setGeNewGroupName(e.target.value)}
                  autoFocus
                />
              </label>
              <label className="ge-form-label">
                Categoria
                <select className="ge-form-input" defaultValue="vestibulares">
                  {[...geCategories, ...geExtraCategories]
                    .filter((c) => c.id !== "todos")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </label>
              <div className="ge-modal-actions">
                <button
                  type="button"
                  className="ge-btn-outline"
                  onClick={geCloseCreateModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="ge-btn-primary">
                  <GeIconPlus /> Criar grupo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- TOAST ---------------- */}
      {geToastMessage && <div className="ge-toast">{geToastMessage}</div>}
    </div>
  );
};

export default GrupoEstudo;
