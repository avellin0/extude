import { IconBooks, IconChat, IconClips, IconCommunity, IconExplore, IconGoals, IconHome, IconPomodoro, IconPosts, IconSaved, IconTranscripts, IconVideos } from "../icons/icons";
import type { LoggedUser, PopularContent, Post, Topic } from "../interfaces/interface";


export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    type: "RESUMO",
    title: "Guia completo de SQL para iniciantes",
    description: "Um guia prático com exemplos reais para você entender SQL de verdade.",
    author: "Lucas Mendes",
    username: "@lucasmendes",
    avatarInitials: "LM",
    avatarColor: "#6366f1",
    timeAgo: "3h atrás",
    tags: ["#sql", "#database", "#iniciante"],
    likes: 128,
    comments: 24,
    bookmarked: false,
    liked: false,
    thumbnailType: "sql",
  },
  {
    id: 2,
    type: "VÍDEO",
    title: "Como aprender inglês com vídeos (meu método)",
    description: "As estratégias que me ajudaram a evoluir meu listening de forma rápida.",
    author: "Mariana Costa",
    username: "@marianacosta",
    avatarInitials: "MC",
    avatarColor: "#8b5cf6",
    timeAgo: "5h atrás",
    tags: ["#inglês", "#estudos", "#videos"],
    likes: 96,
    comments: 18,
    bookmarked: false,
    liked: false,
    thumbnailType: "audio",
    duration: "32:14",
  },
  {
    id: 3,
    type: "LIVRO",
    title: "Clean Code: princípios que realmente importam",
    description: "Notas e aprendizados do livro Clean Code, de Robert C. Martin.",
    author: "Rafael Alves",
    username: "@rafaelalves",
    avatarInitials: "RA",
    avatarColor: "#10b981",
    timeAgo: "8h atrás",
    tags: ["#programação", "#clean-code", "#livros"],
    likes: 142,
    comments: 31,
    bookmarked: false,
    liked: false,
    thumbnailType: "book",
  },
  {
    id: 4,
    type: "CLIP",
    title: "Explicação rápida sobre LEFT JOIN",
    description: "Clip retirado de uma aula sobre joins no SQL.",
    author: "Juliana Ferreira",
    username: "@julianaferreira",
    avatarInitials: "JF",
    avatarColor: "#f59e0b",
    timeAgo: "1d atrás",
    tags: ["#sql"],
    likes: 87,
    comments: 12,
    bookmarked: false,
    liked: false,
    thumbnailType: "code",
    duration: "00:45",
  },
  {
    id: 5,
    type: "TRANSCRIÇÃO",
    title: "Podcast: O futuro do trabalho com IA",
    description: "Transcrição do episódio sobre como a IA está mudando o mercado de trabalho.",
    author: "Carlos Lima",
    username: "@carloslima",
    avatarInitials: "CL",
    avatarColor: "#3b82f6",
    timeAgo: "2d atrás",
    tags: ["#ia", "#trabalho", "#futuro"],
    likes: 203,
    comments: 45,
    bookmarked: true,
    liked: false,
    thumbnailType: "audio",
  },
  {
    id: 6,
    type: "RESUMO",
    title: "Atomic Habits: hábitos que transformam",
    description: "As principais ideias do livro de James Clear sobre formação de hábitos.",
    author: "Ana Souza",
    username: "@anasouza",
    avatarInitials: "AS",
    avatarColor: "#ec4899",
    timeAgo: "3d atrás",
    tags: ["#hábitos", "#produtividade", "#livros"],
    likes: 319,
    comments: 67,
    bookmarked: false,
    liked: false,
    thumbnailType: "book",
  },
];

export const INITIAL_TOPICS: Topic[] = [
    { id: 1, name: "SQL", postCount: "1.2k posts", following: false },
    { id: 2, name: "Inglês", postCount: "987 posts", following: false },
    { id: 3, name: "Python", postCount: "756 posts", following: false },
    { id: 4, name: "Produtividade", postCount: "642 posts", following: false },
    { id: 5, name: "Leitura", postCount: "532 posts", following: false },
];

export const popularIcons: Record<string, React.ReactNode> = {
    video: <IconVideos />,
    book: <IconBooks />,
    audio: <IconTranscripts />,
    clip: <IconClips />,
};

export const POPULAR_CONTENT: PopularContent[] = [
    { id: 1, title: "SQL Joins Explicados", subtitle: "Vídeo · 18 min", icon: "video", iconBg: "#1e293b" },
    { id: 2, title: "Hábitos Atômicos", subtitle: "Resumo · 10 min leitura", icon: "book", iconBg: "#dcfce7" },
    { id: 3, title: "Inglês com Séries", subtitle: "Transcrição · 15 min", icon: "audio", iconBg: "#ede9fe" },
    { id: 4, title: "Subquery com EXISTS", subtitle: "Clip · 45s", icon: "clip", iconBg: "#fef9c3" },
];

export const LOGGED_USER: LoggedUser = {
    name: "Davi Avelino",
    username: "@davelino",
    initials: "DA",
};

export const navSections = [
    {
        items: [
            { id: "home", label: "Home", icon: <IconHome /> },
        ],
    },
    {
        label: "APRENDER",
        items: [
            { id: "videos", label: "Vídeos", icon: <IconVideos /> },
            { id: "books", label: "Livros", icon: <IconBooks /> },
        ],
    },
    {
        label: "COMUNIDADE",
        items: [
            { id: "grupos", label: "Comunidade", icon: <IconCommunity /> },
            { id: "chat", label: "Chat", icon: <IconChat /> },
        ],
    },
    {
        label: "PRODUTIVIDADE",
        items: [
            { id: "metas", label: "Metas", icon: <IconGoals /> },
            { id: "pomodoro", label: "Pomodoro", icon: <IconPomodoro /> },
        ],
    },
];