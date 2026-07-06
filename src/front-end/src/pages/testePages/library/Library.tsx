import { useState, useRef, useCallback, useEffect } from 'react';
import './styles2.css';
import { useNavigate, useParams } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  cover: string;
  category: string;
  bookmarked: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: 1, name: 'Filosofia', icon: '🏛️', count: 128 },
  { id: 2, name: 'Psicologia', icon: '🧠', count: 95 },
  { id: 3, name: 'Romance', icon: '❤️', count: 312 },
  { id: 4, name: 'Fantasia', icon: '✨', count: 198 },
  { id: 5, name: 'Negócios', icon: '💼', count: 156 },
  { id: 6, name: 'História', icon: '🏰', count: 89 },
];

const BESTSELLERS: Book[] = [
  { id: 122, title: 'Sobre a brevidade da vida', author: 'Sêneca', rating: 4.8, cover: 'seneca', category: 'Filosofia', bookmarked: false },
  { id: 125, title: 'white nights', author: 'Fiódor Dostoievisky', rating: 4.6, cover: 'white nights', category: 'Romance', bookmarked: false },
  { id: 115, title: 'What Would Freud Do?', author: 'Sarah Tomley', rating: 4.7, cover: 'freud', category: 'Psicologia', bookmarked: false },
  { id: 112, title: 'O Conde de Monte Cristo', author: 'Alexandre Dumas', rating: 4.9, cover: 'monte-cristo', category: 'Romance', bookmarked: true },
  { id: 121, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', rating: 4.9, cover: 'little-prince', category: 'Fantasia', bookmarked: false },
  { id: 119, title: 'Poor folks', author: 'Fiódor Dostoievisky', rating: 4.6, cover: 'poor folks', category: 'Romance', bookmarked: false },
  { id: 111, title: 'Alice in Wonderland', author: 'Lewis Carroll', rating: 4.8, cover: 'alice', category: 'Fantasia', bookmarked: false },
  { id: 118, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', rating: 4.7, cover: 'dorian-gray', category: 'Romance', bookmarked: false },
];

const RECOMMENDED: Book[] = [
  { id: 119, title: 'Poor folks', author: 'Fiódor Dostoievisky', rating: 4.6, cover: 'poor folks', category: 'Romance', bookmarked: false },
  { id: 111, title: 'Alice in Wonderland', author: 'Lewis Carroll', rating: 4.8, cover: 'alice', category: 'Fantasia', bookmarked: false },
  { id: 118, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', rating: 4.7, cover: 'dorian-gray', category: 'Romance', bookmarked: false },
  { id: 110, title: 'As Aventuras de Tom Sawyer', author: 'Mark Twain', rating: 4.6, cover: 'tom-sawyer', category: 'História', bookmarked: false },
  { id: 125, title: 'white nights', author: 'Fiódor Dostoievisky', rating: 4.6, cover: 'white nights', category: 'Romance', bookmarked: false },  
  { id: 117, title: 'Moby Dick', author: 'Herman Melville', rating: 4.7, cover: 'moby-dick', category: 'Fantasia', bookmarked: true },
  { id: 124, title: 'War and Peace', author: 'Leo Tolstoy', rating: 4.9, cover: 'war-and-peace', category: 'História', bookmarked: false },
  { id: 113, title: 'Crime and Punishment', author: 'Fiódor Dostoievisky', rating: 4.9, cover: 'Crime and Punishment', category: 'Romance', bookmarked: false },
];

const COVER_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  'seneca': { bg: 'linear-gradient(145deg,#3d4a2e,#6b7c45)', color: '#e8dbb0', label: 'SÊNECA' },
  'freud': { bg: 'linear-gradient(145deg,#2c3e6e,#4a6fa5)', color: '#f0e6d3', label: 'FREUD' },
  'monte-cristo': { bg: 'linear-gradient(145deg,#8b1a1a,#c0392b)', color: '#f5e6d3', label: 'MONTE\nCRISTO' },
  'little-prince': { bg: 'linear-gradient(145deg,#1a3a6b,#2e6db4)', color: '#ffd700', label: 'LITTLE\nPRINCE' },
  'poemas': { bg: 'linear-gradient(145deg,#1a1a2e,#2d2d5e)', color: '#c8a8e9', label: 'Poemas' },
  'dorian-gray': { bg: 'linear-gradient(145deg,#2d1b1b,#5c2323)', color: '#e8d5b0', label: 'DORIAN\nGRAY' },
  'alice': { bg: 'linear-gradient(145deg,#1a3a2e,#2e7d5a)', color: '#f0e6d3', label: 'ALICE' },
  'tom-sawyer': { bg: 'linear-gradient(145deg,#6b4800,#b07800)', color: '#ffd700', label: 'TOM\nSAWYER' },
  'moby-dick': { bg: 'linear-gradient(145deg,#c43800,#f05a1a)', color: '#fff', label: 'MOBY\nDICK' },
  'war-and-peace': { bg: 'linear-gradient(145deg,#3d2000,#7a4500)', color: '#ffd700', label: 'WAR\n&\nPEACE' },

  'poor folks': { bg: 'linear-gradient(145deg,#6b4800,#b07800)', color: '#ffd700', label: 'POOR\nFOLKS' },
  'Crime and Punishment': { bg: 'linear-gradient(145deg,#8b1a1a,#c0392b)', color: '#f5e6d3', label: 'CRIME AND\nPUNISHMENT' },
  'white nights': { bg: 'linear-gradient(145deg,#1a3a2e,#2e7d5a)', color: '#f0e6d3', label: 'WHITE\nNIGHTS' },
};

// ─── BookCover ────────────────────────────────────────────────────────────────

function BookCover({ coverKey, title, size = 'md' }: { coverKey: string; title: string; size?: 'sm' | 'md' | 'lg' }) {
  const s = COVER_STYLES[coverKey] ?? { bg: '#2a2a2a', color: '#fff', label: title };
  return (
    <div id={`cover_${coverKey}`} data-size={size} style={{ background: s.bg }} aria-label={`Capa: ${title}`}>
      <span style={{ color: s.color }}>{s.label}</span>
    </div>
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  return (
    <span id="library_rating" aria-label={`${value} estrelas`}>
      <b>★</b> {value.toFixed(1)}
    </span>
  );
}

// ─── BookCard ─────────────────────────────────────────────────────────────────

function BookCard({ book, onBookmark, onOpen }: { book: Book; onBookmark: (id: number) => void; onOpen: (b: Book) => void }) {
  return (
    <article id={`library_card_${book.id}`} data-bookmarked={book.bookmarked}>
      <div id={`library_card_cover_${book.id}`}>
        <BookCover coverKey={book.cover} title={book.title} />
        <button className="library_btn"
          id={`library_card_bookmark_${book.id}`}
          onClick={e => { e.stopPropagation(); onBookmark(book.id); }}
          aria-label={book.bookmarked ? 'Remover dos favoritos' : 'Salvar'}
        >
          {book.bookmarked ? '🔖' : '🏷️'}
        </button>
      </div>
      <button className="library_btn" id={`library_card_info_${book.id}`} onClick={() => onOpen(book)}>
        <StarRating value={book.rating} />
        <p>{book.title}</p>
        <small>{book.author}</small>
      </button>
    </article>
  );
}

// ─── ScrollRow ────────────────────────────────────────────────────────────────

export function ScrollRow({ children, scrollId }: { children: React.ReactNode; scrollId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useCallback((dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'right' ? 310 : -310, behavior: 'smooth' });
  }, []);
  return (
    <div id={`library_scroll_${scrollId}`}>
      <button className="library_btn" onClick={() => scroll('left')} aria-label="Anterior">‹</button>
      <div ref={ref}>{children}</div>
      <button className="library_btn" onClick={() => scroll('right')} aria-label="Próximo">›</button>
    </div>
  );
}

// ─── BookModal ────────────────────────────────────────────────────────────────

function BookModal({ book, onClose, onBookmark }: { book: Book | null; onClose: () => void; onBookmark: (id: number) => void }) {
  useEffect(() => {
    if (!book) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [book, onClose]);

  const navigate = useNavigate()
  const { name, id } = useParams<{ name: string, id: string }>()
  if (!book) return null;

  return (
    <div id="library_modal_overlay" onClick={onClose} role="dialog" aria-modal aria-label={book.title}>
      <div id="library_modal" onClick={e => e.stopPropagation()}>
        <button className="library_btn" id="library_modal_close" onClick={onClose} aria-label="Fechar">×</button>
        <div id="library_modal_body">
          <BookCover coverKey={book.cover} title={book.title} size="lg" />
          <div id="library_modal_info">
            <span id="library_modal_category">{book.category}</span>
            <h2>{book.title}</h2>
            <p id="library_modal_author">{book.author}</p>
            <StarRating value={book.rating} />
            <p id="library_modal_desc">
              Um dos livros mais importantes de sua categoria, <em>{book.title}</em> de {book.author} é
              uma leitura essencial para quem busca expandir horizontes e mergulhar em novas perspectivas.
            </p>
            <div id="library_modal_actions">
              <button className="library_btn" id="library_modal_read" onClick={() => navigate(`/book/${name}/${id}/${book.id}/${book.author}`)}>Ler agora →</button>
              <button className="library_btn"
                id="library_modal_save"
                data-saved={book.bookmarked}
                onClick={() => onBookmark(book.id)}
              >
                {book.bookmarked ? '🔖 Salvo' : '☆ Salvar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function BookLibrary() {
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Início');
  const [bestsellers, setBestsellers] = useState<Book[]>(BESTSELLERS);
  const [recommended, setRecommended] = useState<Book[]>(RECOMMENDED);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate()
  const { name, id } = useParams<{ name: string; id: string }>();

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const handleBookmark = useCallback((id: number) => {
    const toggle = (arr: Book[]) => arr.map(b => b.id === id ? { ...b, bookmarked: !b.bookmarked } : b);
    setBestsellers(toggle);
    setRecommended(toggle);
    setSelectedBook(prev => prev?.id === id ? { ...prev, bookmarked: !prev.bookmarked } : prev);
    const found = [...BESTSELLERS, ...RECOMMENDED].find(b => b.id === id);
    showToast(found?.bookmarked ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  }, [showToast]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) showToast(`Buscando por "${query}"…`);
  }, [query, showToast]);

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

  const catName = CATEGORIES.find(c => c.id === activeCategory)?.name;
  const filteredBS = activeCategory ? bestsellers.filter(b => b.category === catName) : bestsellers;
  const filteredRec = activeCategory ? recommended.filter(b => b.category === catName) : recommended;

  const NAV_ITEMS = [{ label: 'Início', url: 'books' }, { label: 'Biblioteca', url: 'biblioteca' }, { label: 'Traduzir', url: 'traduzir' }];

  const [userMenuOpen, setUserMenuOpen] = useState(false);


  return (
    <div id="library_root">

      {/* ══ HEADER ══ */}
      <header id="library_header">
        <div id="library_header_logo">√·1</div>

        <form id="library_header_search" onSubmit={handleSearch} role="search">
          <span>🔍</span>
          <input
            ref={searchRef}
            type="search"
            placeholder="Buscar livros, autores, gêneros…"
            value={query}
            onChange={e => setQuery(e.target.value)}
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
        <div id="library_user_menu">
          <button className="library_dropdown_item">Perfil</button>
          <button className="library_dropdown_item">Configurações</button>
          <button className="lc_dropdown_item lc_dropdown_danger" onClick={() => handleNav('home')}>Sair</button>
        </div>
      )}


      <main id="library_main">

        {/* ══ HERO ══ */}
        <section id="library_hero">
          <div id="library_hero_content">
            <p id="library_hero_eyebrow">COMECE SUA JORNADA DE LEITURA</p>
            <h1 id="library_hero_headline">
              Onde cada página <br />
              é uma <em>nova aventura.</em>
            </h1>
            <p id="library_hero_sub">
              Dos clássicos atemporais aos lançamentos mais recentes.
              Encontre livros que inspiram, desafiam e transformam.
            </p>
            <div id="library_hero_ctas">
              <button className="library_btn" id="library_hero_cta_primary" onClick={() => showToast('Explorando a biblioteca…')}>
                Explorar biblioteca →
              </button>
              <button className="library_btn" id="library_hero_cta_ghost" onClick={() => showToast('Carregando recomendações…')}>
                Ver recomendações ☆
              </button>
            </div>
          </div>
          <div className="library_hero__visual" aria-hidden="true">
            <div className="library_hero__book-stack">
              <div className="library_hero__book library_hero__book--back" />
              <div className="library_hero__book library_hero__book--mid" />
              <BookCover coverKey="seneca" title="Sêneca" size="lg" />
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <div id="library_statsbar" role="list">
          {[
            { icon: '📚', label: 'Milhares de livros', sub: 'Explore nossa coleção' },
            { icon: '⭐', label: 'Recomendações', sub: 'Feitas para você' },
            { icon: '🗂️', label: 'Sua biblioteca', sub: 'Organize e salve' },
            { icon: '💬', label: 'Traduza textos', sub: 'Aprenda sem limites' },
          ].map(s => (
            <div key={s.label} role="listitem">
              <span>{s.icon}</span>
              <div>
                <p>{s.label}</p>
                <small>{s.sub}</small>
              </div>
            </div>
          ))}
        </div>

        {/* ══ CATEGORIES ══ */}
        <section id="library_categories">
          <div id="library_categories_header">
            <h2>Categorias</h2>
            <div>
              <button className="library_btn" onClick={() => showToast('Ver todas as categorias')}>Ver todas</button>
              <button className="library_btn" onClick={() => showToast('Anterior')} aria-label="Anterior">‹</button>
              <button className="library_btn" onClick={() => showToast('Próximo')} aria-label="Próximo">›</button>
            </div>
          </div>
          <div id="library_categories_grid" role="list">
            {CATEGORIES.map(cat => (
              <button className="library_btn"
                key={cat.id}
                id={`library_category_${cat.id}`}
                data-active={activeCategory === cat.id}
                onClick={() => {
                  setActiveCategory(prev => prev === cat.id ? null : cat.id);
                  showToast(`Categoria: ${cat.name}`);
                }}
                role="listitem"
                aria-pressed={activeCategory === cat.id}
              >
                <span>{cat.icon}</span>
                <p>{cat.name}</p>
                <small>{cat.count} livros</small>
              </button>
            ))}
          </div>
        </section>

        {/* ══ BESTSELLERS ══ */}
        <section id="library_bestsellers">
          <div id="library_bestsellers_header">
            <div>
              <h2>Best Sellers</h2>
              <p>Os livros mais lidos da semana.</p>
            </div>
            <button className="library_btn" onClick={() => showToast('Ver todos os best sellers')}>Ver todos</button>
          </div>
          <ScrollRow scrollId="bestsellers">
            {(filteredBS.length ? filteredBS : bestsellers).map(book => (
              <BookCard key={book.id} book={book} onBookmark={handleBookmark} onOpen={setSelectedBook} />
            ))}
          </ScrollRow>
        </section>

        {/* ══ RECOMMENDED ══ */}
        <section id="library_recommended">
          <div id="library_recommended_header">
            <div>
              <h2>Mais recomendados para você</h2>
              <p>Selecionados com base nos seus interesses.</p>
            </div>
            <button className="library_btn" onClick={() => showToast('Ver todas as recomendações')}>Ver todos</button>
          </div>
          <ScrollRow scrollId="recommended">
            {(filteredRec.length ? filteredRec : recommended).map(book => (
              <BookCard key={book.id} book={book} onBookmark={handleBookmark} onOpen={setSelectedBook} />
            ))}
          </ScrollRow>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer id="library_footer">
        {[
          { icon: '📖', label: 'Continue lendo', sub: 'Retome suas leituras de onde parou' },
          { icon: '❤️', label: 'Lista de desejos', sub: 'Salve livros para ler depois' },
          { icon: '📝', label: 'Notas e marcações', sub: 'Organize pensamentos e trechos favoritos' },
          { icon: '🔄', label: 'Sincronize', sub: 'Acesse sua biblioteca em qualquer lugar' },
        ].map(item => (
          <button className="library_btn" key={item.label} onClick={() => showToast(item.label)}>
            <span>{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <small>{item.sub}</small>
            </div>
          </button>
        ))}
      </footer>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onBookmark={handleBookmark} />

      {toast && <div id="library_toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}
