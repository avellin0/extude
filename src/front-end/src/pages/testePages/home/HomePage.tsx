import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { IconBookmark, IconHeart, IconComment, IconDots, IconSearch, IconChevronDown } from "./components/icons/icons";

import "./styles.css";
import { useParams } from "react-router-dom";
import { LeftBar } from "./components/leftBar/LeftBar";
import { RightBar } from "./components/rightBar/RightBar";
import { INITIAL_POSTS } from "./components/mockDatas/homeMock";
// ─── Types ────────────────────────────────────────────────────────────────────

type PostType = "RESUMO" | "VÍDEO" | "LIVRO" | "CLIP" | "TRANSCRIÇÃO";

interface Post {
  id: number;
  type: PostType;
  title: string;
  description: string;
  author: string;
  username: string;
  avatarInitials: string;
  avatarColor: string;
  timeAgo: string;
  tags: string[];
  likes: number;
  comments: number;
  bookmarked: boolean;
  liked: boolean;
  thumbnailType: "sql" | "audio" | "book" | "code" | "default";
  duration?: string;
}

type FeedTab = "Para você" | "Todas" | "Resumo" | "Vídeo" | "Livro" | "Transcrição" | "Clip";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FEED_TABS: FeedTab[] = ["Para você", "Todas", "Resumo", "Vídeo", "Livro", "Transcrição", "Clip"];

// ─── Thumbnail Components ─────────────────────────────────────────────────────

const SqlThumbnail = () => (
  <div className="hp_thumbnail hp_thumb_sql">
    <span className="hp_thumb_sql_text">SQL</span>
    <span className="hp_thumb_sql_sub">SQL</span>
  </div>
);

const AudioThumbnail = ({ duration }: { duration?: string }) => (
  <div className="hp_thumbnail hp_thumb_audio">
    <div className="hp_audio_bars">
      {[3, 6, 9, 7, 5, 8, 4, 7, 6, 9, 5, 4].map((h, i) => (
        <div key={i} className="hp_audio_bar" style={{ height: `${h * 4}px` }} />
      ))}
    </div>
    {duration && <span className="hp_thumb_duration">{duration}</span>}
  </div>
);

const BookThumbnail = () => (
  <div className="hp_thumbnail hp_thumb_book">
    <span className="hp_thumb_book_title">CLEAN<br />CODE</span>
    <span className="hp_thumb_book_author">Robert C. Martin</span>
  </div>
);

const CodeThumbnail = ({ duration }: { duration?: string }) => (
  <div className="hp_thumbnail hp_thumb_code">
    <pre className="hp_code_snippet">{`SELECT u.name,
  COUNT(o.id) as total
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
GROUP BY u.id`}</pre>
    {duration && <span className="hp_thumb_duration">✦ {duration}</span>}
  </div>
);

// ─── Post Card ────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  commentRef: React.RefObject<HTMLTextAreaElement>;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onBookmark, commentRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLike = () => {
    setLikeAnim(true);
    onLike(post.id);
    setTimeout(() => setLikeAnim(false), 300);
  };

  const handleComment = () => {
    commentRef.current?.focus();
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const typeColors: Record<PostType, string> = {
    RESUMO: "#f59e0b",
    "VÍDEO": "#6366f1",
    LIVRO: "#10b981",
    CLIP: "#8b5cf6",
    "TRANSCRIÇÃO": "#3b82f6",
  };

  const renderThumbnail = () => {
    switch (post.thumbnailType) {
      case "sql": return <SqlThumbnail />;
      case "audio": return <AudioThumbnail duration={post.duration} />;
      case "book": return <BookThumbnail />;
      case "code": return <CodeThumbnail duration={post.duration} />;
      default: return <div className="hp_thumbnail hp_thumb_default" />;
    }
  };

  return (
    <article className="hp_post_card">
      {renderThumbnail()}
      <div className="hp_post_body">
        <div className="hp_post_header">
          <span className="hp_post_type" style={{ color: typeColors[post.type] }}>
            {post.type}
          </span>
          <div className="hp_post_actions_top">
            <button
              className={`hp_bookmark_btn ${post.bookmarked ? "hp_bookmarked" : ""}`}
              onClick={() => onBookmark(post.id)}
              aria-label="Salvar post"
            >
              <IconBookmark filled={post.bookmarked} />
            </button>
          </div>
        </div>
        <h2 className="hp_post_title">{post.title}</h2>
        <p className="hp_post_desc">{post.description}</p>
        <div className="hp_post_meta">
          <div className="hp_post_author">
            <span className="hp_avatar hp_avatar_sm" style={{ background: post.avatarColor }}>
              {post.avatarInitials}
            </span>
            <span className="hp_author_name">{post.author}</span>
            <span className="hp_meta_dot">·</span>
            <span className="hp_time_ago">{post.timeAgo}</span>
          </div>
          <div className="hp_post_tags">
            {post.tags.map((tag) => (
              <span key={tag} className="hp_tag_badge">{tag}</span>
            ))}
          </div>
          <div className="hp_post_actions_bottom">
            <button
              className={`hp_action_btn hp_like_btn ${post.liked ? "hp_liked" : ""} ${likeAnim ? "hp_like_anim" : ""}`}
              onClick={handleLike}
              aria-label="Curtir post"
            >
              <IconHeart filled={post.liked} />
              <span>{post.likes}</span>
            </button>
            <button className="hp_action_btn" onClick={handleComment} aria-label="Comentar">
              <IconComment />
              <span>{post.comments}</span>
            </button>
            <div className="hp_more_menu_wrap" ref={menuRef}>
              <button
                className="hp_action_btn hp_dots_btn"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Mais opções"
              >
                <IconDots />
              </button>
              {menuOpen && (
                <div className="hp_dropdown_menu">
                  <button className="hp_dropdown_item" onClick={() => { navigator.clipboard?.writeText(post.title); setMenuOpen(false); }}>
                    Copiar link
                  </button>
                  <button className="hp_dropdown_item" onClick={() => { onBookmark(post.id); setMenuOpen(false); }}>
                    Salvar
                  </button>
                  <button className="hp_dropdown_item hp_dropdown_danger" onClick={() => setMenuOpen(false)}>
                    Reportar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard: React.FC = () => (
  <div className="hp_post_card hp_skeleton_card">
    <div className="hp_skeleton hp_skel_thumb" />
    <div className="hp_post_body">
      <div className="hp_skeleton hp_skel_type" />
      <div className="hp_skeleton hp_skel_title" />
      <div className="hp_skeleton hp_skel_desc" />
      <div className="hp_skeleton hp_skel_meta" />
    </div>
  </div>
);


// ─── Main Component ───────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>("Para você");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { name } = useParams<{ name: string; }>();

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Tab filter
    if (activeTab !== "Para você" && activeTab !== "Todas") {
      const typeMap: Record<string, PostType> = {
        Resumo: "RESUMO",
        Vídeo: "VÍDEO",
        Livro: "LIVRO",
        Transcrição: "TRANSCRIÇÃO",
        Clip: "CLIP",
      };
      filtered = filtered.filter((p) => p.type === typeMap[activeTab]);
    }

    // Search filter
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [posts, activeTab, debouncedQuery]);

  const handleLike = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }, []);

  const handleBookmark = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div id="hp_app_root">

      <div id="hp_layout">
        {/* SIDEBAR */}
        <LeftBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


        {/* MAIN CONTENT */}
        <main id="hp_main">
          {/* Feed */}
          <section id="hp_feed_section">

            <div id="hp_feed_header">
              <button
                className="hp_sidebar_toggle"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Menu"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div id="hp_search_wrap">

                <span id="hp_search_icon"><IconSearch /></span>

                <input
                  id="hp_search_input"
                  type="search"
                  placeholder="Buscar conteúdos, tópicos ou pessoas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar"
                />
              </div>

              <h1 id="hp_greeting">
                olá, <span id="hp_greeting_name">{name}</span>
              </h1>
              <p id="hp_greeting_sub">Descubra algo novo para estudar hoje.</p>
            </div>

            {/* Tabs */}
            <div id="hp_tabs" role="tablist">
              {FEED_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`hp_tab ${activeTab === tab ? "hp_tab_active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Feed */}
            <div id="hp_feed" aria-live="polite">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : filteredPosts.length === 0 ? (
                <div id="hp_feed_empty">
                  <p>Nenhum post encontrado.</p>
                  {debouncedQuery && (
                    <button className="hp_btn_secondary" onClick={() => setSearchQuery("")}>
                      Limpar busca
                    </button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    commentRef={commentRef}
                  />
                ))
              )}
            </div>

            {/* Load more */}
            {!loading && filteredPosts.length > 0 && (
              <button id="hp_load_more" onClick={handleLoadMore}>
                Carregar mais <IconChevronDown />
              </button>
            )}

            {/* Hidden comment textarea for scroll-to */}
            <textarea
              ref={commentRef}
              className="hp_hidden_comment"
              placeholder="Escreva um comentário..."
              aria-label="Campo de comentário"
            />
          </section>
        </main>

        {/* RIGHT PANEL */}
        <RightBar />
      </div>


    </div>
  );
};

export default HomePage;
