import React, { useState, useRef, useCallback, useEffect } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';

// ---------- Types ----------

type TranslationStatus = 'in-progress' | 'queued' | 'completed';

interface TranslationItem {
  id: string;
  fileName: string;
  langPair: string;
  style: string;
  status: TranslationStatus;
  progress: number; // 0-100
  remainingTime?: string;
  completedAt?: string;
  coverColor: string;
  coverIcon: 'book' | 'dash';
}

type FilterTab = 'todas' | 'andamento' | 'concluidas';

interface HowItWorksStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LanguageOption {
  value: string;
  label: string;
}

interface StyleOption {
  value: string;
  label: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FooterLink {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

// ---------- Icons (inline SVG, no external deps) ----------

// const IconSearch = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="7" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

const IconUpload = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19V6M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 21h14" strokeLinecap="round" />
  </svg>
);

const IconTranslate = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5h7M7 3v2c0 4-1.5 7-5 9M5 9c1.5 2 3 3 6 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 21l4-9 4 9M15.5 18h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSparkles = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
    <path d="M19 16l.7 2.1L22 19l-2.3.9L19 22l-.7-2.1L16 19l2.3-.9L19 16z" strokeLinejoin="round" />
  </svg>
);

const IconBookOpen = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 5c2 0 5 .5 5 2.5v11C7 16.5 4 16 2 16V5zM22 5c-2 0-5 .5-5 2.5v11c0-2.5 3-3 5-3V5z" strokeLinejoin="round" />
    <path d="M7 7.5C7 5.5 10 5 12 5s5 .5 5 2.5" />
  </svg>
);

const IconCloudUpload = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 18a4.5 4.5 0 01-.5-8.97A5.5 5.5 0 0117 8a4 4 0 011 7.87" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12v7M9 16l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />
  </svg>
);

const IconFormat = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinejoin="round" />
  </svg>
);

const IconInfinity = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9a4 4 0 100 6 8 8 0 0012-6 4 4 0 100 6 8 8 0 00-12-6" strokeLinejoin="round" />
  </svg>
);

const IconBooks = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="6" height="16" rx="1" />
    <rect x="10" y="6" width="6" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="17" rx="1" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l2.6 5.9 6.4.6-4.9 4.3 1.5 6.3L12 16.9l-5.6 3.2 1.5-6.3-4.9-4.3 6.4-.6L12 3z" strokeLinejoin="round" />
  </svg>
);

const IconFolder = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" strokeLinejoin="round" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a8 8 0 11-3.2-6.4M21 12l-3-1-1 3-3-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheckShield = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFormatSmall = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h10l4 4v12H4z" strokeLinejoin="round" />
    <path d="M14 4v4h4" strokeLinejoin="round" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z" />
  </svg>
);

// ---------- Mock data ----------

const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    id: 1,
    icon: <IconUpload />,
    title: 'Envie seu livro',
    description: 'Faça o upload do arquivo .EPUB do livro que deseja traduzir.',
  },
  {
    id: 2,
    icon: <IconTranslate />,
    title: 'Escolha o idioma',
    description: 'Selecione para qual idioma você deseja traduzir o seu livro.',
  },
  {
    id: 3,
    icon: <IconSparkles />,
    title: 'Tradução com IA',
    description: 'Nossa IA traduz o conteúdo mantendo a estrutura e o estilo original.',
  },
  {
    id: 4,
    icon: <IconBookOpen />,
    title: 'Receba e leia',
    description: 'Seu livro traduzido ficará disponível na sua biblioteca para você ler quando quiser.',
  },
];

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: '', label: 'Selecione o idioma' },
  { value: 'pt-br', label: 'Português (Brasil)' },
  { value: 'es', label: 'Espanhol' },
  { value: 'en', label: 'Inglês' },
  { value: 'it', label: 'Italiano' },
  { value: 'fr', label: 'Francês' },
  { value: 'de', label: 'Alemão' },
];

const STYLE_OPTIONS: StyleOption[] = [
  { value: 'equilibrado', label: 'Equilibrado (recomendado)' },
  { value: 'literal', label: 'Literal' },
  { value: 'livre', label: 'Livre / fluido' },
  { value: 'formal', label: 'Formal' },
];

const FEATURES: FeatureItem[] = [
  {
    icon: <IconShield />,
    title: 'Privacidade total',
    description: 'Seus arquivos são criptografados e nunca compartilhados.',
  },
  {
    icon: <IconBolt />,
    title: 'Tradução rápida',
    description: 'IA avançada que entrega traduções de alta qualidade.',
  },
  {
    icon: <IconFormat />,
    title: 'Formato preservado',
    description: 'Mantemos a estrutura, capítulos e formatação do original.',
  },
  {
    icon: <IconInfinity />,
    title: 'Sem limites',
    description: 'Traduza quantos livros quiser e leia onde quiser.',
  },
];

const FOOTER_LINKS: FooterLink[] = [
  { icon: <IconBooks />, title: 'Milhares de livros', subtitle: 'Explore nossa coleção' },
  { icon: <IconStar />, title: 'Recomendações', subtitle: 'Feitas para você' },
  { icon: <IconFolder />, title: 'Sua biblioteca', subtitle: 'Organize e salve' },
  { icon: <IconChat />, title: 'Traduza textos', subtitle: 'Aprenda sem limites' },
];

const INITIAL_TRANSLATIONS: TranslationItem[] = [
  {
    id: 't1',
    fileName: 'O Conde de Monte Cristo.epub',
    langPair: 'EN → PT-BR',
    style: 'Equilibrado',
    status: 'in-progress',
    progress: 65,
    remainingTime: 'Tempo restante: 8 min',
    coverColor: '#c0392b',
    coverIcon: 'book',
  },
  {
    id: 't2',
    fileName: '1984.epub',
    langPair: 'EN → PT-BR',
    style: 'Equilibrado',
    status: 'queued',
    progress: 0,
    remainingTime: 'Aguardando sua vez',
    coverColor: '#2c3a8c',
    coverIcon: 'dash',
  },
  {
    id: 't3',
    fileName: 'Moby Dick.epub',
    langPair: 'EN → PT-BR',
    style: 'Equilibrado',
    status: 'completed',
    progress: 100,
    completedAt: 'Concluído em 18 de jun, 14:32',
    coverColor: '#1d6b4a',
    coverIcon: 'book',
  },
];

const LANG_BADGES = [
  { id: 'b1', label: 'EN → PT' },
  { id: 'b2', label: 'EN → ES' },
  { id: 'b3', label: 'EN → IT' },
];

// ---------- Component ----------

export const Translate: React.FC = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Traduzir');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translationStyle, setTranslationStyle] = useState('equilibrado');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [translations, setTranslations] = useState<TranslationItem[]>(INITIAL_TRANSLATIONS);
  const [activeTab, setActiveTab] = useState<FilterTab>('todas');
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const intervalsRef = useRef<Record<string, number>>({});

  // Show a temporary toast message
  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  // Simulate progress for an in-progress translation
  useEffect(() => {
    translations.forEach((item) => {
      if (item.status === 'in-progress' && !intervalsRef.current[item.id]) {
        const id = window.setInterval(() => {
          setTranslations((prev) =>
            prev.map((t) => {
              if (t.id !== item.id) return t;
              if (t.progress >= 100) return t;
              const nextProgress = Math.min(100, t.progress + Math.floor(Math.random() * 4) + 1);
              const isDone = nextProgress >= 100;
              return {
                ...t,
                progress: nextProgress,
                status: isDone ? 'completed' : 'in-progress',
                remainingTime: isDone ? undefined : `Tempo restante: ${Math.max(1, Math.ceil((100 - nextProgress) / 8))} min`,
                completedAt: isDone
                  ? new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) +
                  ', ' +
                  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                  : undefined,
              };
            })
          );
        }, 1800);
        intervalsRef.current[item.id] = id;
      }
    });

    return () => {
      Object.values(intervalsRef.current).forEach((id) => window.clearInterval(id));
      intervalsRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clean up finished intervals
  useEffect(() => {
    translations.forEach((item) => {
      if (item.status === 'completed' && intervalsRef.current[item.id]) {
        window.clearInterval(intervalsRef.current[item.id]);
        delete intervalsRef.current[item.id];
      }
    });
  }, [translations]);

  // const handleNavClick = useCallback((label: string) => {
  //   setActiveNav(label);
  // }, []);

  const handleSelectFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const validateAndSetFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const isEpub = file.name.toLowerCase().endsWith('.epub');
      const isUnder100MB = file.size <= 100 * 1024 * 1024;
      if (!isEpub) {
        showToast('Apenas arquivos .EPUB são aceitos.');
        return;
      }
      if (!isUnder100MB) {
        showToast('O arquivo excede o limite de 100MB.');
        return;
      }
      setSelectedFile(file);
      showToast(`Arquivo "${file.name}" selecionado.`);
    },
    [showToast]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndSetFile(e.target.files?.[0]);
    },
    [validateAndSetFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndSetFile(e.dataTransfer.files?.[0]);
    },
    [validateAndSetFile]
  );

  const handleStartTranslation = useCallback(() => {
    if (!selectedFile) {
      showToast('Selecione um arquivo .EPUB antes de continuar.');
      return;
    }
    if (!targetLanguage) {
      showToast('Escolha um idioma de destino.');
      return;
    }
    const styleLabel = STYLE_OPTIONS.find((s) => s.value === translationStyle)?.label ?? 'Equilibrado';
    const langLabel = LANGUAGE_OPTIONS.find((l) => l.value === targetLanguage)?.label ?? targetLanguage;

    const newItem: TranslationItem = {
      id: `t-${Date.now()}`,
      fileName: selectedFile.name,
      langPair: `EN → ${targetLanguage.toUpperCase()}`,
      style: styleLabel,
      status: 'in-progress',
      progress: 2,
      remainingTime: 'Tempo restante: calculando...',
      coverColor: '#5a4fcf',
      coverIcon: 'book',
    };

    setTranslations((prev) => [newItem, ...prev]);
    showToast(`Tradução de "${selectedFile.name}" para ${langLabel} iniciada.`);
    setSelectedFile(null);
    setTargetLanguage('');

    // kick off simulated progress for this new item
    const id = window.setInterval(() => {
      setTranslations((prev) =>
        prev.map((t) => {
          if (t.id !== newItem.id) return t;
          if (t.progress >= 100) return t;
          const nextProgress = Math.min(100, t.progress + Math.floor(Math.random() * 5) + 2);
          const isDone = nextProgress >= 100;
          return {
            ...t,
            progress: nextProgress,
            status: isDone ? 'completed' : 'in-progress',
            remainingTime: isDone ? undefined : `Tempo restante: ${Math.max(1, Math.ceil((100 - nextProgress) / 8))} min`,
            completedAt: isDone
              ? new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) +
              ', ' +
              new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
              : undefined,
          };
        })
      );
    }, 1500);
    intervalsRef.current[newItem.id] = id;
  }, [selectedFile, targetLanguage, translationStyle, showToast]);

  const handleCancelQueued = useCallback(
    (id: string) => {
      setTranslations((prev) => prev.filter((t) => t.id !== id));
      showToast('Tradução cancelada.');
    },
    [showToast]
  );

  const handleViewProgress = useCallback(
    (item: TranslationItem) => {
      showToast(`"${item.fileName}" está ${item.progress}% concluído.`);
    },
    [showToast]
  );

  const handleViewInLibrary = useCallback(
    (item: TranslationItem) => {
      showToast(`Abrindo "${item.fileName}" na sua biblioteca.`);
    },
    [showToast]
  );

  const handleClearCompleted = useCallback(() => {
    setTranslations((prev) => prev.filter((t) => t.status !== 'completed'));
    showToast('Traduções concluídas removidas da lista.');
  }, [showToast]);

  const filteredTranslations = translations.filter((t) => {
    if (activeTab === 'andamento') return t.status === 'in-progress' || t.status === 'queued';
    if (activeTab === 'concluidas') return t.status === 'completed';
    return true;
  });


  // ---------- Navigation ----------

  const navigate = useNavigate()
  const { name, id } = useParams<{ name: string; id: string }>();

  const handleNav = useCallback((nav: string) => {
    setActiveNav(nav);
    const msgs: Record<string, string> = {
      Traduzir: 'Tradução disponível em breve',
      Favoritos: 'Abrindo favoritos…',
      Biblioteca: 'Abrindo biblioteca…',
    };
    if (msgs[nav]) showToast(msgs[nav]);

    navigate(`/${nav.toLowerCase()}/${name}/${id}`);

  }, [showToast]);

  const NAV_ITEMS = [{ label: 'Início', url: 'books' }, { label: 'Biblioteca', url: 'biblioteca' }, { label: 'Traduzir', url: 'traduzir' }];

  // ---------- User Menu ----------

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="tl-app-shell">
      {toast && (
        <div className="tl-toast" role="status">
          {toast}
        </div>
      )}

      {/* ---------- Header ---------- */}
      {/* <header className="tl-header">
        <div className="tl-header__left">
          <div className="tl-logo">∨·1</div>
          <div className="tl-search-bar">
            <span className="tl-search-bar__icon">
              <IconSearch />
            </span>
            <input
              type="text"
              className="tl-search-bar__input"
              placeholder="Buscar livros, autores, gêneros"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="tl-search-bar__kbd">⌘K</span>
          </div>
        </div>
        <nav className="tl-nav">
          {['Início', 'Biblioteca', 'Favoritos', 'Traduzir'].map((label) => (
            <button
              key={label}
              type="button"
              className={`nav__item ${activeNav === label ? 'nav__item--active' : ''}`}
              onClick={() => handleNavClick(label)}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </nav>
        <div className="tl-header__right">
          <button type="button" className="tl-avatar-btn" aria-label="Conta do usuário">
            <span className="tl-avatar-btn__circle" />
            <IconChevronDown />
          </button>
        </div>
      </header> */}

      <header id="library_header">
        <div id="library_header_logo">√·1</div>

        <form id="library_header_search" role="search">
          <span>🔍</span>
          <input
            type="search"
            placeholder="Buscar livros, autores, gêneros…"
            // onChange={e => setQuery(e.target.value)}
            aria-label="Buscar livros"
          />
          <kbd>⌘K</kbd>
        </form>


        <nav id="library_header_nav" aria-label="Navegação principal">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              data-active={activeNav === item.label}
              onClick={() => handleNav(item.url)}
            >
              {item.label}
            </button>
          ))}
        </nav>

         <button className="library_btn" id="library_header_avatar" aria-label="Perfil" onClick={() => setUserMenuOpen(prev => !prev)}>
          <span>👤</span> <span>▾</span>
        </button>
      </header>
        
        {userMenuOpen && (
          <div id="lc_user_menu">
            <button className="lc_dropdown_item">Perfil</button>
            <button className="lc_dropdown_item">Configurações</button>
            <button className="lc_dropdown_item lc_dropdown_danger" onClick={() => handleNav('home')}>Sair</button>
          </div>
        )}

      <main className="tl-main">
        {/* ---------- Hero ---------- */}
        <section className="tl-hero">
          <div className="tl-hero__text">
            <h1 className="tl-hero__title">
              Traduza qualquer livro
              <br />e leia <em>sem limites.</em>
            </h1>
            <p className="tl-hero__subtitle">
              Envie seu livro em .EPUB e nossa IA traduz para o idioma que você quiser com qualidade e fidelidade ao
              texto original.
            </p>
            <div className="tl-hero__badges">
              <span className="tl-hero__badge">
                <IconCheckShield /> Tradução inteligente com IA
              </span>
              <span className="tl-hero__badge">
                <IconFormatSmall /> Preserva formatação e estrutura
              </span>
            </div>
          </div>
          <div className="tl-hero__art">
            <div className="tl-hero__art-book tl-hero__art-book--source">.EPUB</div>
            <div className="tl-hero__art-arrow">
              <svg viewBox="0 0 60 12" width="60" height="12">
                <line x1="0" y1="6" x2="48" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M44 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="tl-hero__art-book tl-hero__art-book--target">
              <IconGlobe />
            </div>
            <span className="tl-hero__sparkle">✦</span>
            {LANG_BADGES.map((badge, i) => (
              <span key={badge.id} className={`tl-hero__lang-badge tl-hero__lang-badge--${i + 1}`}>
                {badge.label}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="tl-how-it-works">
          <h2 className="tl-section-title">Como funciona</h2>
          <div className="tl-how-it-works__steps">
            {HOW_IT_WORKS.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="tl-step-card">
                  <span className="tl-step-card__number">{step.id}</span>
                  <span className="tl-step-card__icon">{step.icon}</span>
                  <h3 className="tl-step-card__title">{step.title}</h3>
                  <p className="tl-step-card__description">{step.description}</p>
                </div>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <span className="tl-step-connector">
                    <IconChevronRight />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ---------- Upload + Preferences ---------- */}
        <section className="tl-upload-section">
          <div
            ref={dropZoneRef}
            className={`tl-drop-zone ${isDragging ? 'tl-drop-zone--dragging' : ''} ${selectedFile ? 'tl-drop-zone--has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span className="tl-drop-zone__icon">
              <IconCloudUpload />
            </span>
            {selectedFile ? (
              <>
                <p className="tl-drop-zone__title">Arquivo pronto: {selectedFile.name}</p>
                <p className="tl-drop-zone__or">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                <button type="button" className="tl-btn tl-btn--outline" onClick={handleSelectFileClick}>
                  Escolher outro arquivo
                </button>
              </>
            ) : (
              <>
                <p className="tl-drop-zone__title">Arraste e solte seu arquivo .EPUB aqui</p>
                <p className="tl-drop-zone__or">ou</p>
                <button type="button" className="tl-btn tl-btn--outline" onClick={handleSelectFileClick}>
                  Selecionar arquivo
                </button>
              </>
            )}
            <p className="tl-drop-zone__hint">Apenas arquivos .EPUB até 100MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".epub"
              className="tl-drop-zone__input"
              onChange={handleFileInputChange}
            />
          </div>

          <aside className="tl-preferences-panel">
            <h3 className="tl-preferences-panel__title">Preferências de tradução</h3>

            <label className="tl-field-label" htmlFor="target-language">
              Idioma de destino
            </label>
            <div className="tl-select-wrapper">
              <select
                id="target-language"
                className="tl-select-input"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="tl-select-wrapper__chevron">
                <IconChevronDown />
              </span>
            </div>

            <label className="tl-field-label" htmlFor="translation-style">
              Estilo de tradução
            </label>
            <div className="tl-select-wrapper">
              <select
                id="translation-style"
                className="tl-select-input"
                value={translationStyle}
                onChange={(e) => setTranslationStyle(e.target.value)}
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="tl-select-wrapper__chevron">
                <IconChevronDown />
              </span>
            </div>

            <button type="button" className="tl-btn tl-btn--primary tl-btn--full" onClick={handleStartTranslation}>
              Iniciar tradução
            </button>
          </aside>
        </section>

        <p className="tl-privacy-note">
          <IconCheckShield /> Seus arquivos são seguros e privados. Ninguém mais terá acesso.
        </p>

        {/* ---------- My translations ---------- */}
        <section className="tl-translations-section">
          <div className="tl-translations-section__header">
            <h2 className="tl-section-title">Minhas traduções</h2>
          </div>

          <div className="tl-tabs">
            {(
              [
                { key: 'todas', label: 'Todas' },
                { key: 'andamento', label: 'Em andamento' },
                { key: 'concluidas', label: 'Concluídas' },
              ] as { key: FilterTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`tl-tabs__item ${activeTab === tab.key ? 'tl-tabs__item--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
            <button type="button" className="tl-tabs__clear" onClick={handleClearCompleted}>
              <IconTrash /> Limpar concluídos
            </button>
          </div>

          <div className="tl-translations-list">
            {filteredTranslations.length === 0 ? (
              <div className="tl-translations-empty">Nenhuma tradução nesta categoria ainda.</div>
            ) : (
              filteredTranslations.map((item) => (
                <div key={item.id} className="tl-translation-row">
                  <div className="tl-translation-row__cover" style={{ backgroundColor: item.coverColor }}>
                    {item.coverIcon === 'book' ? <IconBookOpen /> : <span className="tl-translation-row__dash" />}
                  </div>
                  <div className="tl-translation-row__info">
                    <p className="tl-translation-row__name">{item.fileName}</p>
                    <p className="tl-translation-row__meta">
                      {item.langPair} &nbsp;•&nbsp; {item.style}
                    </p>
                  </div>
                  <div className="tl-translation-row__progress">
                    <div className="tl-translation-row__progress-top">
                      <span className={`tl-status-label tl-status-label--${item.status}`}>
                        {item.status === 'in-progress' && 'Em andamento'}
                        {item.status === 'queued' && 'Em fila'}
                        {item.status === 'completed' && 'Concluído'}
                      </span>
                      {item.status === 'in-progress' && <span className="tl-status-percent">{item.progress}%</span>}
                    </div>
                    <div className="tl-progress-bar">
                      <div
                        className={`tl-progress-bar__fill ${item.status === 'queued' ? 'tl-progress-bar__fill--queued' : ''}`}
                        style={{ width: item.status === 'completed' ? '100%' : `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="tl-translation-row__time">
                    {item.status === 'completed' ? item.completedAt : item.remainingTime}
                  </div>
                  <div className="tl-translation-row__action">
                    {item.status === 'in-progress' && (
                      <button type="button" className="tl-btn tl-btn--outline tl-btn--small" onClick={() => handleViewProgress(item)}>
                        Ver progresso
                      </button>
                    )}
                    {item.status === 'queued' && (
                      <button type="button" className="tl-btn tl-btn--ghost tl-btn--small" onClick={() => handleCancelQueued(item.id)}>
                        Cancelar
                      </button>
                    )}
                    {item.status === 'completed' && (
                      <button
                        type="button"
                        className="tl-btn tl-btn--outline tl-btn--small tl-btn--success"
                        onClick={() => handleViewInLibrary(item)}
                      >
                        Ver na biblioteca
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="tl-features">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="tl-feature-card">
              <span className="tl-feature-card__icon">{feature.icon}</span>
              <div>
                <h4 className="tl-feature-card__title">{feature.title}</h4>
                <p className="tl-feature-card__description">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* ---------- Footer links ---------- */}
      <footer className="tl-footer">
        {FOOTER_LINKS.map((link) => (
          <button
            key={link.title}
            type="button"
            className="tl-footer__link"
            onClick={() => showToast(`Abrindo "${link.title}"...`)}
          >
            <span className="tl-footer__link-icon">{link.icon}</span>
            <span>
              <span className="tl-footer__link-title">{link.title}</span>
              <span className="tl-footer__link-subtitle">{link.subtitle}</span>
            </span>
          </button>
        ))}
      </footer>
    </div>
  );
};

