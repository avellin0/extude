import React, { useState, useRef, useCallback, useMemo } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
// import { ScrollRow } from '../library/Component2';

// ---------- Types ----------

type LibraryTab = 'continuar' | 'salvos';

interface ContinueReadingBook {
  id: string;
  title: string;
  author: string;
  progress: number; // 0-100
  lastRead: string;
  coverColor: string;
  coverLabel: string;
}

interface SavedBook {
  id: string;
  title: string;
  author: string;
  savedOn: string;
  coverColor: string;
  coverLabel: string;
  coverTextColor?: string;
}

// interface NavItem {
//   label: string;
// }

interface FooterLinkItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

// ---------- Icons ----------

// const IconSearch = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="7" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

// const IconList = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 7h12M4 12h16M4 17h12" strokeLinecap="round" />
//   </svg>
// );

// const IconBookmark = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 4h12v17l-6-4-6 4V4z" strokeLinejoin="round" />
//   </svg>
// );

const IconBookmarkFilled = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M6 3h12v18l-6-4-6 4V3z" />
  </svg>
);

// const IconChevronLeft = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const IconChevronRight = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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

const IconSparkleBooks = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" >
    <rect x="4" y="6" width="12" height="15" rx="1.5" transform="rotate(-6 4 6)" />
    <rect x="8" y="4" width="12" height="15" rx="1.5" />
    <path d="M20 3l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="currentColor" stroke="none" />
  </svg>
);

// const IconChevronDown = () => (
//   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// ---------- Mock data ----------

// const NAV_ITEMS: NavItem[] = [{ label: 'Início' }, { label: 'Biblioteca' }, { label: 'Favoritos' }, { label: 'Traduzir' }];

const INITIAL_CONTINUE_READING: ContinueReadingBook[] = [
  {
    id: 'monte-cristo',
    title: 'O Conde de Monte Cristo',
    author: 'Alexandre Dumas',
    progress: 65,
    lastRead: 'Hoje, 14:32',
    coverColor: '#a32f2f',
    coverLabel: 'MONTE\nCRISTO',
  },
  {
    id: 'poemas',
    title: 'Poemas',
    author: 'Charles Baudelaire',
    progress: 28,
    lastRead: 'Ontem, 22:15',
    coverColor: '#2c2f6e',
    coverLabel: 'Poemas',
  },
  {
    id: 'cartas-lucilio',
    title: 'Cartas a Lucílio',
    author: 'Sêneca',
    progress: 12,
    lastRead: '20 de jun, 10:08',
    coverColor: '#3b4d34',
    coverLabel: 'SÊNECA',
  },
];

const INITIAL_SAVED_BOOKS: SavedBook[] = [
  {
    id: 'moby-dick',
    title: 'Moby Dick',
    author: 'Herman Melville',
    savedOn: 'Salvo em 18 de jun',
    coverColor: '#8a6326',
    coverLabel: 'MOBY\nDICK',
  },
  {
    id: 'dom-casmurro',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    savedOn: 'Salvo em 17 de jun',
    coverColor: '#1f4a4f',
    coverLabel: 'DOM\nCASMURRO',
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    savedOn: 'Salvo em 15 de jun',
    coverColor: '#15161a',
    coverLabel: '1984',
    coverTextColor: '#c0392b',
  },
  {
    id: 'fausto',
    title: 'Fausto',
    author: 'Johann Wolfgang von Goethe',
    savedOn: 'Salvo em 12 de jun',
    coverColor: '#8a5a26',
    coverLabel: 'FAUSTO',
  },
  {
    id: 'metamorfose',
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    savedOn: 'Salvo em 10 de jun',
    coverColor: '#1d2a4d',
    coverLabel: 'A\nMETAMORFOSE',
  },
  {
    id: 'orgulho-preconceito',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    savedOn: 'Salvo em 8 de jun',
    coverColor: '#3e5c2a',
    coverLabel: 'ORGULHO E\nPRECONCEITO',
  },
];

const FOOTER_LINKS: FooterLinkItem[] = [
  { icon: <IconBooks />, title: 'Milhares de livros', subtitle: 'Explore nossa coleção' },
  { icon: <IconStar />, title: 'Recomendações', subtitle: 'Feitas para você' },
  { icon: <IconFolder />, title: 'Sua biblioteca', subtitle: 'Organize e salve' },
  { icon: <IconChat />, title: 'Traduza textos', subtitle: 'Aprenda sem limites' },
];

// ---------- Component ----------

export const Biblioteca: React.FC = () => {
  const [searchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Biblioteca');
  const [activeTab, setActiveTab] = useState<LibraryTab>('continuar');
  const [continueReading, setContinueReading] = useState<ContinueReadingBook[]>(INITIAL_CONTINUE_READING);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>(INITIAL_SAVED_BOOKS);
  const [toast, setToast] = useState<string | null>(null);
  const [loadingBookId, setLoadingBookId] = useState<string | null>(null);

  const navigate = useNavigate()
  const { name, id } = useParams<{ name: string; id: string }>();

  const continueScrollRef = useRef<HTMLDivElement>(null);
  const savedScrollRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  // const handleNavClick = useCallback((label: string) => {
  //   setActiveNav(label);
  // }, []);

  const handleScroll = useCallback((ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.85;
    ref.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  const handleViewAllContinue = useCallback(() => {
    showToast('Exibindo todos os livros em andamento.');
  }, [showToast]);

  const handleViewAllSaved = useCallback(() => {
    showToast('Exibindo todos os livros salvos.');
  }, [showToast]);

  const handleOpenBook = useCallback(
    (book: ContinueReadingBook) => {
      showToast(`Abrindo "${book.title}" em ${book.progress}%...`);
    },
    [showToast]
  );

  const handleContinueReading = useCallback(
    (book: SavedBook) => {
      setLoadingBookId(book.id);
      window.setTimeout(() => {
        setLoadingBookId(null);
        showToast(`Iniciando a leitura de "${book.title}".`);
        // Move book into "continue reading" with 0% progress
        setContinueReading((prev) => {
          if (prev.some((b) => b.id === book.id)) return prev;
          const newEntry: ContinueReadingBook = {
            id: book.id,
            title: book.title,
            author: book.author,
            progress: 1,
            lastRead: 'Agora mesmo',
            coverColor: book.coverColor,
            coverLabel: book.coverLabel,
          };
          return [newEntry, ...prev];
        });
      }, 900);
    },
    [showToast]
  );

  const handleUnsaveBook = useCallback(
    (book: SavedBook) => {
      setSavedBooks((prev) => prev.filter((b) => b.id !== book.id));
      showToast(`"${book.title}" removido dos salvos.`);
    },
    [showToast]
  );

  const handleExploreLibrary = useCallback(() => {
    showToast('Explorando recomendações personalizadas...');
  }, [showToast]);

  const handleFooterLinkClick = useCallback(
    (link: FooterLinkItem) => {
      showToast(`Abrindo "${link.title}"...`);
    },
    [showToast]
  );

  const filteredContinueReading = useMemo(() => {
    if (!searchQuery.trim()) return continueReading;
    const q = searchQuery.trim().toLowerCase();
    return continueReading.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }, [continueReading, searchQuery]);

  const filteredSavedBooks = useMemo(() => {
    if (!searchQuery.trim()) return savedBooks;
    const q = searchQuery.trim().toLowerCase();
    return savedBooks.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }, [savedBooks, searchQuery]);

  const renderCoverLabel = (label: string) =>
    label.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <br />}
        {line}
      </React.Fragment>
    ));

  const handleNav = useCallback((nav: string) => {
    setActiveNav(nav);
    const msgs: Record<string, string> = {
      Inicio: 'Abrindo página inicial…',
      Traduzir: 'Tradução disponível em breve',
      Favoritos: 'Abrindo favoritos…',
      Biblioteca: 'Abrindo biblioteca…',
    };
    if (msgs[nav]) showToast(msgs[nav]);

    navigate(`/${nav.toLowerCase()}/${name}/${id}`);

  }, [showToast]);

  const NAV_ITEMS = [{ label: 'Início', url: 'books' }, { label: 'Biblioteca', url: 'biblioteca' }, { label: 'Traduzir', url: 'traduzir' }];

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="lc_app-shell">
      {toast && (
        <div className="lc_toast" role="status">
          {toast}
        </div>
      )}

      {/* ---------- Header ---------- */}
      {/* <header className="lc_header">
        <div className="lc_header__left">
          <div className="lc_logo">∨·1</div>
          <div className="lc_search-bar">
            <span className="lc_search-bar__icon">
              <IconSearch />
            </span>
            <input
              type="text"
              className="lc_search-bar__input"
              placeholder="Buscar livros, autores, gêneros"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="lc_search-bar__kbd">⌘K</span>
          </div>
        </div>
        <nav className="lc_nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav__item ${activeNav === item.label ? 'nav__item--active' : ''}`}
              onClick={() => handleNavClick(item.label)}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </nav>
        <div className="lc_header__right">
          <button type="button" className="lc_avatar-btn" aria-label="Conta do usuário">
            <span className="lc_avatar-btn__circle" />
            <IconChevronDown />
          </button>
        </div>
      </header> */}
      <header id="library_header">
        <div id="library_header_logo">√·1</div>

        <form id="library_header_search" role="search">
          {/* onSubmit={handleSearch} */}
          <span>🔍</span>
          <input
            // ref={searchRef}
            type="search"
            placeholder="Buscar livros, autores, gêneros…"
            // value={query}
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

      <main className="lc_main">
        {/* ---------- Page title ---------- */}
        <div className="lc_page-heading">
          <h1 className="lc_page-heading__title">Minha Biblioteca</h1>
          <p className="lc_page-heading__subtitle">Continue sua jornada de leitura.</p>
        </div>

        {/* ---------- Tabs ---------- */}
        <div className="lc_library-tabs">
          <button
            type="button"
            className={`lc_library-tabs__item ${activeTab === 'continuar' ? 'lc_library-tabs__item--active' : ''} `}
            onClick={() => setActiveTab('continuar')}
          >
            Continuar Lendo
          </button>
          <button
            type="button"
            className={`lc_library-tabs__item ${activeTab === 'salvos' ? 'lc_library-tabs__item--active' : ''} `}
            onClick={() => setActiveTab('salvos')}
          >
            Salvos
          </button>
        </div>

        {/* ---------- Continue Lendo ---------- */}
        <section className="lc_library-section">
          <div className="lc_library-section__header">
            <div>
              <h2 className="lc_section-title">Continue Lendo</h2>
              <p className="lc_section-subtitle">Retome suas leituras de onde parou.</p>
            </div>
            <div className="lc_section-controls">
              <button type="button" className="lc_link-btn" onClick={handleViewAllContinue}>
                Ver todos
              </button>
              <button
                type="button"
                className="lc_scroll-btn"
                onClick={() => handleScroll(continueScrollRef, 'left')}
                aria-label="Rolar para a esquerda"
              >
                ‹
              </button>
              <button
                type="button"
                className="lc_scroll-btn"
                onClick={() => handleScroll(continueScrollRef, 'right')}
                aria-label="Rolar para a direita"
              >
                ›
              </button>
            </div>
          </div>

          <div className="lc_continue-row" ref={continueScrollRef}>
            {filteredContinueReading.length === 0 ? (
              <div className="lc_empty-state">Nenhum livro em andamento encontrado.</div>
            ) : (
              filteredContinueReading.map((book) => (
                <div key={book.id} className="lc_continue-card">
                  <div className="lc_continue-card__cover" style={{ backgroundColor: book.coverColor }}>
                    <span className="lc_continue-card__cover-label">{renderCoverLabel(book.coverLabel)}</span>
                    {book.progress < 100 && book.progress > 0 && book.lastRead === 'Agora mesmo' && (
                      <span className="lc_continue-card__badge-new">Novo</span>
                    )}
                  </div>
                  <div className="lc_continue-card__info">
                    <h3 className="lc_continue-card__title">{book.title}</h3>
                    <p className="lc_continue-card__author">{book.author}</p>
                    <p className="lc_continue-card__progress-label">Progresso da leitura</p>
                    <p className="lc_continue-card__progress-value">{book.progress}%</p>
                    <div className="lc_progress-bar">
                      <div className="lc_progress-bar__fill" style={{ width: `${book.progress}%` }} />
                    </div>
                    <p className="lc_continue-card__last-read">
                      Última leitura
                      <br />
                      {book.lastRead}
                    </p>
                    <button type="button" className="lc_btn lc_btn--ghost lc_btn--small lc_continue-card__cta" onClick={() => handleOpenBook(book)}>
                      Continuar leitura
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ---------- Salvos ---------- */}
        <section className="lc_library-section">
          <div className="lc_library-section__header">
            <div>
              <h2 className="lc_section-title">Salvos</h2>
              <p className="lc_section-subtitle">Livros que você salvou para ler depois.</p>
            </div>
            <div className="lc_section-controls">
              <button type="button" className="lc_link-btn" onClick={handleViewAllSaved}>
                Ver todos
              </button>
              <button
                type="button"
                className="lc_scroll-btn"
                onClick={() => handleScroll(continueScrollRef, 'left')}
                aria-label="Rolar para a esquerda"
              >
                ‹
              </button>
              <button
                type="button"
                className="lc_scroll-btn"
                onClick={() => handleScroll(continueScrollRef, 'right')}
                aria-label="Rolar para a direita"
              >
                ›
              </button>
            </div>
          </div>

          <div className="lc_saved-grid" ref={savedScrollRef}>
            {filteredSavedBooks.length === 0 ? (
              <div className="lc_empty-state">Nenhum livro salvo encontrado.</div>
            ) : (
              filteredSavedBooks.map((book) => (
                <div key={book.id} className="lc_saved-card">
                  <div className="lc_saved-card__cover" style={{ backgroundColor: book.coverColor }}>
                    <button
                      type="button"
                      className="lc_saved-card__unsave"
                      onClick={() => handleUnsaveBook(book)}
                      aria-label={`Remover "${book.title}" dos salvos`}
                    >
                      <IconBookmarkFilled />
                    </button>
                    <span
                      className="lc_saved-card__cover-label"
                      style={book.coverTextColor ? { color: book.coverTextColor } : undefined}
                    >
                      {renderCoverLabel(book.coverLabel)}
                    </span>
                  </div>
                  <div className="lc_saved-card__info">
                    <h3 className="lc_saved-card__title">{book.title}</h3>
                    <p className="lc_saved-card__author">{book.author}</p>

                    <button
                      type="button"
                      className="lc_btn lc_btn--outline lc_btn--small lc_btn--full"
                      onClick={() => handleContinueReading(book)}
                      disabled={loadingBookId === book.id}
                    >
                      {loadingBookId === book.id ? <span className="lc_spinner" /> : 'Começar Leitura'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ---------- Reading tip banner ---------- */}
        <section className="lc_tip-banner">
          <span className="lc_tip-banner__icon">
            <IconSparkleBooks />
          </span>
          <div className="lc_tip-banner__text">
            <p className="lc_tip-banner__eyebrow">Dica de Leitura</p>
            <h3 className="lc_tip-banner__title">Que tal explorar algo novo?</h3>
            <p className="lc_tip-banner__subtitle">Encontre livros que combinam com seu momento atual.</p>
          </div>
          <button type="button" className="lc_btn lc_btn--outline" onClick={handleExploreLibrary}>
            Explorar Biblioteca
            <IconArrowRight />
          </button>
        </section>
      </main>

      {/* ---------- Footer links ---------- */}
      <footer className="lc_footer">
        {FOOTER_LINKS.map((link) => (
          <button
            key={link.title}
            type="button"
            className="lc_footer__link"
            onClick={() => handleFooterLinkClick(link)}
          >
            <span className="lc_footer__link-icon">{link.icon}</span>
            <span>
              <span className="lc_footer__link-title">{link.title}</span>
              <span className="lc_footer__link-subtitle">{link.subtitle}</span>
            </span>
          </button>
        ))}
      </footer>
      {/* <footer id="library_footer">
        {[
          { icon: '📖', label: 'Continue lendo', sub: 'Retome suas leituras de onde parou' },
          { icon: '❤️', label: 'Lista de desejos', sub: 'Salve livros para ler depois' },
          { icon: '📝', label: 'Notas e marcações', sub: 'Organize pensamentos e trechos favoritos' },
          { icon: '🔄', label: 'Sincronize', sub: 'Acesse sua biblioteca em qualquer lugar' },
        ].map(item => (
          <button key={item.label} onClick={() => showToast(item.label)}>
            <span>{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <small>{item.sub}</small>
            </div>
          </button>
        ))}
      </footer> */}
    </div>
  );
};

