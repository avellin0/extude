import { useState, useRef, useEffect, useCallback } from "react";
import "./styles.css";
import image from "./image.png"
import { useNavigate } from "react-router-dom";
// ============================================================
// TYPES
// ============================================================

interface NavItem {
  label: string;
  hasDropdown: boolean;
}

interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

interface TrustBadge {
  label: string;
  icon: string;
}

interface LanguageFeature {
  label: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const NAV_ITEMS: NavItem[] = [
  { label: "Como funciona", hasDropdown: true },
  { label: "Recursos", hasDropdown: true },
  { label: "Idiomas", hasDropdown: true },
  { label: "Comunidade", hasDropdown: true },
  { label: "Preços", hasDropdown: false },
];

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "video",
    icon: "▶",
    title: "Estude com qualquer vídeo",
    description:
      "Importe vídeos do YouTube ou faça upload de arquivos. Suportamos mais de 10 idiomas.",
  },
  {
    id: "transcription",
    icon: "≡",
    title: "Transcrição automática",
    description:
      "Gere transcrições precisas automaticamente e navegue pelo conteúdo com facilidade.",
  },
  {
    id: "notes",
    icon: "📝",
    title: "Notas sincronizadas",
    description:
      "Crie notas no momento exato do vídeo. Tudo fica sincronizado automaticamente.",
  },
  {
    id: "clips",
    icon: "✂",
    title: "Clips e destaques",
    description:
      "Corte trechos importantes e monte sua biblioteca de melhores momentos.",
  },
];

const STEPS: Step[] = [
  {
    id: 1,
    number: "1",
    title: "Importe um vídeo",
    description: "Cole o link do YouTube ou faça upload do seu arquivo de vídeo.",
    icon: "⬆",
  },
  {
    id: 2,
    number: "2",
    title: "Geramos a transcrição",
    description: "Nossa IA gera a transcrição automática para você.",
    icon: "📄",
  },
  {
    id: 3,
    number: "3",
    title: "Crie notas e clips",
    description: "Adicione notas, marque trechos importantes e crie clips.",
    icon: "📋",
  },
  {
    id: 4,
    number: "4",
    title: "Revise e aprenda",
    description:
      "Revise suas anotações, reassista aos clips e fixe o conhecimento.",
    icon: "🧠",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "O Estude.ex mudou completamente minha forma de estudar. Consigo transformar qualquer vídeo em material de revisão em minutos.",
    name: "Mariana Santos",
    role: "Estudante de Medicina",
    avatar: "MS",
  },
  {
    id: "t2",
    quote:
      "Perfeito para aprender idiomas! As transcrições e traduções me ajudam a entender muito mais rápido.",
    name: "João Ferreira",
    role: "Estudante de Inglês",
    avatar: "JF",
  },
  {
    id: "t3",
    quote:
      "Uso para estudar para concursos. Os clips e notas me ajudam a revisar só o que realmente importa, recomendo bastante.",
    name: "Lucas Almeida",
    role: "Concurseiro",
    avatar: "LA",
  },
];

const TRUST_BADGES: TrustBadge[] = [
  { icon: "📍", label: "Gratuito para começar" },
  { icon: "💳", label: "Sem cartão de crédito" },
  { icon: "🔒", label: "Privado e seguro" },
];

const LANGUAGE_FEATURES: LanguageFeature[] = [
  { label: "Transcrição bilíngue" },
  { label: "Tradução com um clique" },
  { label: "Salve palavras e expressões" },
  { label: "Revisão espaçada (em breve)" },
];

const TRUSTED_BY = ["Google", "YouTube", "Coursera", "Udemy", "edX", "Harvard University"];

// ============================================================
// SUB-COMPONENTS
// ============================================================

interface FeatureCardProps {
  card: FeatureCard;
}
function FeatureCardItem({ card }: FeatureCardProps) {
  return (
    <div className="lp_feature_card">
      <div className="lp_feature_card_icon">{card.icon}</div>
      <h3 className="lp_feature_card_title">{card.title}</h3>
      <p className="lp_feature_card_desc">{card.description}</p>
    </div>
  );
}

interface StepItemProps {
  step: Step;
  isLast: boolean;
}
function StepItem({ step, isLast }: StepItemProps) {
  return (
    <div className="lp_step_item">
      <div className="lp_step_icon_wrap">
        <span className="lp_step_number_badge">{step.number}</span>
        <div className="lp_step_icon">{step.icon}</div>
      </div>
      <h3 className="lp_step_title">{step.title}</h3>
      <p className="lp_step_desc">{step.description}</p>
      {!isLast && <span className="lp_step_arrow" aria-hidden="true">→</span>}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}
function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="lp_testimonial_card">
      <p className="lp_testimonial_quote">"{testimonial.quote}"</p>
      <div className="lp_testimonial_author">
        <div className="lp_testimonial_avatar" aria-label={testimonial.name}>
          {testimonial.avatar}
        </div>
        <div className="lp_testimonial_meta">
          <span className="lp_testimonial_name">{testimonial.name}</span>
          <span className="lp_testimonial_role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export  function Page() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const navigate = useNavigate()
  
  // Navbar scroll shadow
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for fade-in
  useEffect(() => {
    const refs = [featuresRef, howItWorksRef, languageRef, testimonialsRef, ctaRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  }, []);

  const handlePrevTestimonial = () =>
    setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleNextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div id="lp_root">
      {/* ===== NAVBAR ===== */}
      <nav id="lp_navbar" className={navScrolled ? "lp_navbar_scrolled" : ""}>
        <div id="lp_navbar_inner">
          <a href="#" id="lp_logo" aria-label="Estude.ex home">
            Estude<span className="lp_logo_dot">.ex</span>
          </a>

          <ul id="lp_nav_links" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="lp_nav_item">
                <button
                  className="lp_nav_link"
                  onClick={() => item.label === "Como funciona" && scrollTo(howItWorksRef)}
                  aria-haspopup={item.hasDropdown}
                >
                  {item.label}
                  {item.hasDropdown && <span className="lp_nav_chevron" aria-hidden="true">▾</span>}
                </button>
              </li>
            ))}
          </ul>

          <div id="lp_navbar_actions">
            <button className="lp_btn_ghost" onClick={() => navigate("/login")}>Entrar</button>
            <button
              className="lp_btn_primary"
              onClick={() => scrollTo(heroRef)}
            >
              Começar gratuitamente →
            </button>
          </div>

          <button
            id="lp_mobile_menu_toggle"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <span className={`lp_hamburger ${mobileMenuOpen ? "lp_hamburger_open" : ""}`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="lp_mobile_menu" role="dialog" aria-label="Menu mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="lp_mobile_nav_link"
                onClick={() => {
                  if (item.label === "Como funciona") scrollTo(howItWorksRef);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <hr className="lp_mobile_divider" />
            <button className="lp_btn_ghost lp_mobile_btn" onClick={() => navigate("/login")}>Entrar</button>
            <button className="lp_btn_primary lp_mobile_btn" onClick={() => navigate("/cadastro")}>Começar gratuitamente →</button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="lp_hero_section" ref={heroRef}>
        <div id="lp_hero_inner">
          <div id="lp_hero_content">
            <span id="lp_hero_eyebrow">⚡ ESTUDE. ORGANIZE. EVOLUA.</span>

            <h1 id="lp_hero_headline">
              Estude qualquer vídeo.{" "}
              <span id="lp_hero_headline_break">
                Transforme conhecimento em{" "}
                <span className="lp_accent_notes">notas</span>,{" "}
                <span className="lp_accent_clips">clips</span> e{" "}
                <span className="lp_accent_reviews">revisões</span>.
              </span>
            </h1>

            <p id="lp_hero_subheadline">
              Importe vídeos do YouTube, gere transcrições automáticas, crie notas
              sincronizadas e revise quando quiser. Tudo em um só lugar.
            </p>

            <div id="lp_hero_cta_row">
              <button
                className="lp_btn_primary lp_btn_lg"
                onClick={() => navigate("/cadastro")}
              >
                Começar gratuitamente →
              </button>
              <button
                className="lp_btn_outline lp_btn_lg"
                onClick={() => navigate("/home/Avelino/0001")}
              >
                Ver como funciona ▶
              </button>
            </div>

            <div id="lp_hero_badges">
              {TRUST_BADGES.map((b) => (
                <span key={b.label} className="lp_trust_badge">
                  <span className="lp_trust_badge_icon">{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            <div id="lp_hero_social_proof">
              <div id="lp_avatar_stack" aria-label="Avatares de estudantes">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={i} className="lp_avatar_chip">{l}</div>
                ))}
              </div>
              <div id="lp_social_proof_text">
                <span id="lp_stars" aria-label="5 estrelas">★★★★★</span>
                <span id="lp_student_count">Mais de 2.000 estudantes já estão evoluindo.</span>
              </div>
            </div>
          </div>

          <div id="lp_hero_app_preview" aria-hidden="true">
            <img src={image} alt="" />
          </div>

          
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section id="lp_trusted_section">
        <p id="lp_trusted_label">CONFIADO POR ESTUDANTES DE TODO O MUNDO</p>
        <div id="lp_trusted_logos">
          {TRUSTED_BY.map((name) => (
            <span key={name} className="lp_trusted_logo">{name}</span>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section
        id="lp_features_section"
        ref={featuresRef}
        className={isVisible("lp_features_section") ? "lp_section_visible" : "lp_section_hidden"}
      >
        <div className="lp_section_inner">
          <h2 className="lp_section_title">Tudo que você precisa para aprender melhor</h2>
          <p className="lp_section_subtitle">
            Ferramentas poderosas para transformar qualquer conteúdo em conhecimento duradouro.
          </p>
          <div id="lp_features_grid">
            {FEATURE_CARDS.map((card) => (
              <FeatureCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section
        id="lp_how_section"
        ref={howItWorksRef}
        className={isVisible("lp_how_section") ? "lp_section_visible" : "lp_section_hidden"}
      >
        <div className="lp_section_inner">
          <h2 className="lp_section_title">Como funciona</h2>
          <div id="lp_steps_row">
            {STEPS.map((step, i) => (
              <StepItem key={step.id} step={step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LANGUAGE FEATURE ===== */}
      <section
        id="lp_language_section"
        ref={languageRef}
        className={isVisible("lp_language_section") ? "lp_section_visible" : "lp_section_hidden"}
      >
        <div id="lp_language_inner">
          <div id="lp_language_content">
            <span id="lp_language_eyebrow">FEITO PARA ESTUDANTES</span>
            <h2 id="lp_language_title">
              Aprenda <span className="lp_accent_lang">idiomas</span> de forma mais inteligente
            </h2>
            <p id="lp_language_desc">
              Use vídeos, podcasts e transcrições para acelerar sua compreensão auditiva,
              expandir vocabulário e dominar novos idiomas.
            </p>
            <ul id="lp_language_list">
              {LANGUAGE_FEATURES.map((f) => (
                <li key={f.label} className="lp_language_list_item">
                  <span className="lp_language_check" aria-hidden="true">✓</span>
                  {f.label}
                </li>
              ))}
            </ul>
            <button className="lp_btn_primary lp_btn_md" onClick={() => scrollTo(heroRef)}>
              Experimentar agora →
            </button>
          </div>

          <div id="lp_language_mockup" aria-hidden="true">
            <div id="lp_lang_app_topbar">
              <span className="lp_app_logo_small">Estude.ex</span>
              <div className="lp_app_search_bar_sm">🔍 Buscar na transcrição...</div>
              <div id="lp_lang_topbar_icons">⚙ 🔔 👤</div>
            </div>
            <div id="lp_lang_app_body">
              <aside id="lp_lang_sidebar">
                {["Biblioteca", "Notas", "Clips", "Revisões", "Flashcards", "Configurações"].map((item) => (
                  <div key={item} className="lp_app_sidebar_item lp_app_sidebar_item_dark">{item}</div>
                ))}
              </aside>
              <main id="lp_lang_main">
                <div id="lp_lang_tabs">
                  <button className="lp_lang_tab">Notas</button>
                  <button className="lp_lang_tab lp_lang_tab_active">Inglês</button>
                  <button className="lp_lang_tab lp_lang_tab_pt">🇧🇷 Português</button>
                </div>
                <div id="lp_lang_rows">
                  {[
                    { time: "03:15", en: "The present perfect is used to talk about actions that started in the past and continue in the present.", pt: "O present perfect é usado para falar sobre ações que começaram no passado e continuam no presente." },
                    { time: "03:21", en: "I have studied English for 3 years.", pt: "Eu tenho estudado inglês há 3 anos.", highlight: true },
                    { time: "09:24", en: "She has visited many countries.", pt: "Ela visitou muitos países." },
                    { time: "02:27", en: "We have learned a lot of new things.", pt: "Nós aprendemos muitas coisas novas." },
                  ].map((row, i) => (
                    <div key={i} className={`lp_lang_row ${row.highlight ? "lp_lang_row_highlight" : ""}`}>
                      <span className="lp_lang_time">{row.time}</span>
                      <span className="lp_lang_en">{row.en}</span>
                      {row.highlight && <button className="lp_lang_play">▶</button>}
                      <span className="lp_lang_pt">{row.pt}</span>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section
        id="lp_testimonials_section"
        ref={testimonialsRef}
        className={isVisible("lp_testimonials_section") ? "lp_section_visible" : "lp_section_hidden"}
      >
        <div className="lp_section_inner">
          <h2 className="lp_section_title">O que nossos usuários dizem</h2>
          <div id="lp_testimonials_wrapper">
            <div id="lp_testimonials_track">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  className={`lp_testimonial_slide ${i === testimonialIndex ? "lp_testimonial_active" : ""}`}
                  aria-hidden={i !== testimonialIndex}
                >
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
            <div id="lp_testimonials_controls">
              <button
                className="lp_testimonial_btn"
                onClick={handlePrevTestimonial}
                aria-label="Depoimento anterior"
              >
                ‹
              </button>
              <button
                className="lp_testimonial_btn"
                onClick={handleNextTestimonial}
                aria-label="Próximo depoimento"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        id="lp_final_cta_section"
        ref={ctaRef}
        className={isVisible("lp_final_cta_section") ? "lp_section_visible" : "lp_section_hidden"}
      >
        <div id="lp_final_cta_inner">
          <div id="lp_final_cta_text">
            <h2 id="lp_final_cta_title">
              Pronto para transformar sua forma de aprender?
            </h2>
            <p id="lp_final_cta_sub">
              Comece gratuitamente agora e descubra o poder de aprender com qualquer conteúdo.
            </p>
          </div>
          <div id="lp_final_cta_badges">
            <div className="lp_final_badge">
              <span className="lp_final_badge_icon">⏱</span>
              <span>Setup em 30 segundos</span>
            </div>
            <div className="lp_final_badge">
              <span className="lp_final_badge_icon">💳</span>
              <span>Sem cartão de crédito</span>
            </div>
            <div className="lp_final_badge">
              <span className="lp_final_badge_icon">✕</span>
              <span>Cancele quando quiser</span>
            </div>
          </div>

          <button
            className="lp_btn_primary lp_btn_lg lp_btn_yellow"
            onClick={() => scrollTo(heroRef)}
          >
            Começar gratuitamente →
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="lp_footer">
        <div id="lp_footer_inner">
          <span id="lp_footer_logo">
            Estude<span className="lp_logo_dot">.ex</span>
          </span>
          <p id="lp_footer_copy">© 2026 Extude.ex - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
