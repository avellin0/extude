"use client"

import { useState } from "react"
import "./post.css"
import { useNavigate } from "react-router-dom"

/* ============================= TYPES ============================= */
interface ptTag {
  ptId: string
  ptLabel: string
}

interface ptTocItem {
  ptId: string
  ptLabel: string
}

interface ptRelatedContent {
  ptId: string
  ptTitle: string
  ptReadTime: string
  ptLikes: number
  ptBadge: string
  ptBadgeColor: string
}

interface ptSection {
  ptId: string
  ptTitle: string
  ptParagraphs: string[]
  ptCode?: ptCodeLine[]
}

interface ptCodeToken {
  ptText: string
  ptKind: "keyword" | "func" | "prop" | "plain"
}

interface ptCodeLine {
  ptTokens: ptCodeToken[]
}

/* ============================= ICONS ============================= */
function ptIconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}
function ptIconBookmark({ ptFilled }: { ptFilled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={ptFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  )
}
function ptIconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8 11l8-4M8 13l8 4" />
    </svg>
  )
}
function ptIconMore() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  )
}
function ptIconCopy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h8" />
    </svg>
  )
}
function ptIconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3 1.2 4 2.5 1-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
    </svg>
  )
}
function ptIconBulb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-4 10.5c.6.6 1 1.3 1 2.5h6c0-1.2.4-1.9 1-2.5A6 6 0 0012 3z" />
    </svg>
  )
}

function ptIconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/* ============================= MOCK DATA ============================= */


const ptTags: ptTag[] = [
  { ptId: "sql", ptLabel: "#sql" },
  { ptId: "database", ptLabel: "#database" },
  { ptId: "iniciante", ptLabel: "#iniciante" },
]

const ptTocItems: ptTocItem[] = [
  { ptId: "introducao", ptLabel: "Introdução" },
  { ptId: "select", ptLabel: "1. SELECT" },
  { ptId: "where", ptLabel: "2. WHERE" },
  { ptId: "groupby", ptLabel: "3. GROUP BY" },
  { ptId: "join", ptLabel: "4. JOIN" },
  { ptId: "indexes", ptLabel: "5. INDEXES" },
  { ptId: "boas-praticas", ptLabel: "6. Boas práticas" },
  { ptId: "conclusao", ptLabel: "Conclusão" },
]

const ptRelatedList: ptRelatedContent[] = [
  {
    ptId: "r1",
    ptTitle: "SQL Avançado: Window Functions",
    ptReadTime: "15 min de leitura",
    ptLikes: 80,
    ptBadge: "SQL",
    ptBadgeColor: "#1e293b",
  },
  {
    ptId: "r2",
    ptTitle: "Entendendo índices no PostgreSQL",
    ptReadTime: "10 min de leitura",
    ptLikes: 64,
    ptBadge: "PG",
    ptBadgeColor: "#0f766e",
  },
  {
    ptId: "r3",
    ptTitle: "Normalização de bancos de dados",
    ptReadTime: "12 min de leitura",
    ptLikes: 55,
    ptBadge: "DB",
    ptBadgeColor: "#6366f1",
  },
]

const ptSelectCode: ptCodeLine[] = [
  {
    ptTokens: [
      { ptText: "SELECT", ptKind: "keyword" },
      { ptText: " id, name, email", ptKind: "plain" },
    ],
  },
  {
    ptTokens: [
      { ptText: "FROM", ptKind: "keyword" },
      { ptText: " users", ptKind: "plain" },
    ],
  },
  {
    ptTokens: [
      { ptText: "WHERE", ptKind: "keyword" },
      { ptText: " active = ", ptKind: "plain" },
      { ptText: "true", ptKind: "func" },
    ],
  },
  {
    ptTokens: [
      { ptText: "ORDER BY", ptKind: "keyword" },
      { ptText: " created_at ", ptKind: "plain" },
      { ptText: "DESC", ptKind: "prop" },
      { ptText: ";", ptKind: "plain" },
    ],
  },
]

const ptWhereCode: ptCodeLine[] = [
  {
    ptTokens: [
      { ptText: "SELECT", ptKind: "keyword" },
      { ptText: " *", ptKind: "plain" },
    ],
  },
  {
    ptTokens: [
      { ptText: "FROM", ptKind: "keyword" },
      { ptText: " orders", ptKind: "plain" },
    ],
  },
  {
    ptTokens: [
      { ptText: "WHERE", ptKind: "keyword" },
      { ptText: " total > ", ptKind: "plain" },
      { ptText: "100", ptKind: "func" },
      { ptText: " AND status = ", ptKind: "plain" },
      { ptText: "'paid'", ptKind: "prop" },
      { ptText: ";", ptKind: "plain" },
    ],
  },
]

const ptSections: ptSection[] = [
  {
    ptId: "introducao",
    ptTitle: "Introdução",
    ptParagraphs: [
      "SQL (Structured Query Language) é a linguagem padrão para interação com bancos de dados relacionais. Neste guia, vamos explorar os principais comandos e conceitos que você precisa para começar.",
    ],
  },
  {
    ptId: "select",
    ptTitle: "1. SELECT",
    ptParagraphs: [
      "O comando SELECT é usado para recuperar dados de uma tabela.",
      "Esse comando retorna o id, nome e email de todos os usuários ativos, ordenados do mais recente para o mais antigo.",
    ],
    ptCode: ptSelectCode,
  },
  {
    ptId: "where",
    ptTitle: "2. WHERE",
    ptParagraphs: [
      "A cláusula WHERE filtra os registros de acordo com uma ou mais condições, retornando apenas as linhas que atendem aos critérios definidos.",
      "Aqui buscamos todos os pedidos com valor acima de 100 e que já foram pagos.",
    ],
    ptCode: ptWhereCode,
  },
]

/* ============================= INTERNAL COMPONENTS ============================= */

function PtCodeBlock({ ptLines, ptShowCopy }: { ptLines: ptCodeLine[]; ptShowCopy: boolean }) {
  const [ptCopied, ptSetCopied] = useState<boolean>(false)

  const ptHandleCopy = () => {
    const ptText = ptLines.map((ptLine) => ptLine.ptTokens.map((ptTok) => ptTok.ptText).join("")).join("\n")
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(ptText).catch(() => undefined)
    }
    ptSetCopied(true)
    window.setTimeout(() => ptSetCopied(false), 1600)
  }

  return (
    <div className="pt-code-block">
      {ptShowCopy && (
        <button type="button" className="pt-copy-btn" onClick={ptHandleCopy}>
          <span className="pt-copy-icon">{ptIconCopy()}</span>
          {ptCopied ? "Copiado!" : "Copiar"}
        </button>
      )}
      <pre className="pt-code-pre">
        <code>
          {ptLines.map((ptLine, ptIdx) => (
            <div className="pt-code-line" key={ptIdx}>
              {ptLine.ptTokens.map((ptTok, ptTokIdx) => (
                <span className={`pt-tok pt-tok-${ptTok.ptKind}`} key={ptTokIdx}>
                  {ptTok.ptText}
                </span>
              ))}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

function PtRelatedCard({ ptItem }: { ptItem: ptRelatedContent }) {
  const [ptLiked, ptSetLiked] = useState<boolean>(false)

  const ptHandleLike = (ptEvent: React.MouseEvent) => {
    ptEvent.stopPropagation()
    ptSetLiked((ptPrev) => !ptPrev)
  }

  const ptDisplayLikes = ptLiked ? ptItem.ptLikes + 1 : ptItem.ptLikes

  return (
    <button type="button" className="pt-related-card">
      <span className="pt-related-thumb" style={{ backgroundColor: ptItem.ptBadgeColor }}>
        {ptItem.ptBadge}
      </span>
      <span className="pt-related-body">
        <span className="pt-related-title">{ptItem.ptTitle}</span>
        <span className="pt-related-meta">
          <span className="pt-related-time">{ptItem.ptReadTime}</span>
          <span
            className={`pt-related-likes${ptLiked ? " pt-related-likes-active" : ""}`}
            onClick={ptHandleLike}
            role="button"
            tabIndex={0}
          >
            <span className="pt-heart-icon">{ptIconHeart()}</span>
            {ptDisplayLikes}
          </span>
        </span>
      </span>
    </button>
  )
}

/* ============================= MAIN COMPONENT ============================= */

export function Post() {
  const [ptActiveToc, ptSetActiveToc] = useState<string>("introducao")
  const [ptSaved, ptSetSaved] = useState<boolean>(false)
  const [ptActiveTag, ptSetActiveTag] = useState<string | null>(null)
  const [ptMenuOpen, ptSetMenuOpen] = useState<boolean>(false)
  const [ptSidebarOpen, ptSetSidebarOpen] = useState<boolean>(false)

  const ptHandleTagClick = (ptId: string) => {
    ptSetActiveTag((ptPrev) => (ptPrev === ptId ? null : ptId))
  }

  const navigate = useNavigate()

  return (
    <div className="pt-app">
      {/* ===================== SIDEBAR ===================== */}
     
      {ptSidebarOpen && <div className="pt-overlay" onClick={() => ptSetSidebarOpen(false)} />}

      {/* ===================== MAIN ===================== */}
      <div className="pt-main">
        <header className="pt-topbar">
          <div className="pt-topbar-left">
            <button type="button" className="pt-menu-toggle" onClick={() => ptSetSidebarOpen(true)} aria-label="Abrir menu">
              <span>{ptIconMore()}</span>
            </button>
            <button type="button" className="pt-back-btn" onClick={() => navigate(-1)}>
              <span className="pt-back-icon">{ptIconBack()}</span>
              Voltar
            </button>
          </div>
          <div className="pt-topbar-right">
            <button
              type="button"
              className={`pt-action-btn${ptSaved ? " pt-action-btn-active" : ""}`}
              onClick={() => ptSetSaved((ptPrev) => !ptPrev)}
            >
              <span className="pt-action-icon">{ptIconBookmark({ ptFilled: ptSaved })}</span>
              {ptSaved ? "Salvo" : "Salvar"}
            </button>
            <button type="button" className="pt-action-btn">
              <span className="pt-action-icon">{ptIconShare()}</span>
              Compartilhar
            </button>
            <div className="pt-more-wrap">
              <button
                type="button"
                className="pt-icon-btn"
                onClick={() => ptSetMenuOpen((ptPrev) => !ptPrev)}
                aria-label="Mais opções"
              >
                <span className="pt-action-icon">{ptIconMore()}</span>
              </button>
              {ptMenuOpen && (
                <div className="pt-more-menu">
                  <button type="button" className="pt-more-item" onClick={() => ptSetMenuOpen(false)}>
                    Reportar
                  </button>
                  <button type="button" className="pt-more-item" onClick={() => ptSetMenuOpen(false)}>
                    Imprimir
                  </button>
                  <button type="button" className="pt-more-item" onClick={() => ptSetMenuOpen(false)}>
                    Copiar link
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="pt-content-wrap">
          {/* ===================== ARTICLE ===================== */}
          <article className="pt-article">
            <div className="pt-kicker">RESUMO</div>
            <h1 className="pt-title">Guia completo de SQL para iniciantes</h1>
            <p className="pt-subtitle">Um guia prático com exemplos reais para você entender SQL de verdade.</p>

            <div className="pt-author-row">
              <span className="pt-author-avatar">LM</span>
              <span className="pt-author-name">Lucas Mendes</span>
              <span className="pt-dot">·</span>
              <span className="pt-author-meta">3 horas atrás</span>
              <span className="pt-dot">·</span>
              <span className="pt-author-meta">12 min de leitura</span>
            </div>

            <div className="pt-tags">
              {ptTags.map((ptTag) => (
                <button
                  key={ptTag.ptId}
                  type="button"
                  className={`pt-tag${ptActiveTag === ptTag.ptId ? " pt-tag-active" : ""}`}
                  onClick={() => ptHandleTagClick(ptTag.ptId)}
                >
                  {ptTag.ptLabel}
                </button>
              ))}
            </div>

            <div className="pt-banner">
              <span className="pt-banner-title">SQL</span>
              <div className="pt-banner-code">
                <div>
                  <span className="pt-tok-keyword">SELECT</span> *
                </div>
                <div>
                  <span className="pt-tok-keyword">FROM</span> users
                </div>
                <div>
                  <span className="pt-tok-keyword">WHERE</span> active = <span className="pt-tok-func">true</span>;
                </div>
              </div>
              <div className="pt-banner-db">
                <span className="pt-db-disc" />
                <span className="pt-db-disc" />
                <span className="pt-db-disc" />
              </div>
            </div>

            {ptSections.map((ptSection) => (
              <section className="pt-section" key={ptSection.ptId}>
                <h2 className="pt-section-title">{ptSection.ptTitle}</h2>
                {ptSection.ptId === "introducao" ? (
                  <>
                    <p className="pt-paragraph">{ptSection.ptParagraphs[0]}</p>
                    <div className="pt-tip">
                      <div className="pt-tip-head">
                        <span className="pt-tip-icon">{ptIconBulb()}</span>
                        Dica
                      </div>
                      <p className="pt-tip-text">
                        Sempre utilize <strong>EXPLAIN ANALYZE</strong> para verificar se um índice está realmente sendo
                        utilizado.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {ptSection.ptParagraphs[0] && <p className="pt-paragraph">{ptSection.ptParagraphs[0]}</p>}
                    {ptSection.ptCode && <PtCodeBlock ptLines={ptSection.ptCode} ptShowCopy={true} />}
                    {ptSection.ptParagraphs[1] && <p className="pt-paragraph">{ptSection.ptParagraphs[1]}</p>}
                  </>
                )}
              </section>
            ))}
          </article>

          {/* ===================== RIGHT RAIL ===================== */}
          <aside className="pt-rail">
            <div className="pt-card pt-toc-card">
              <div className="pt-card-title">Índice do conteúdo</div>
              <ul className="pt-toc-list">
                {ptTocItems.map((ptItem) => (
                  <li key={ptItem.ptId}>
                    <button
                      type="button"
                      className={`pt-toc-item${ptActiveToc === ptItem.ptId ? " pt-toc-item-active" : ""}`}
                      onClick={() => ptSetActiveToc(ptItem.ptId)}
                    >
                      <span className="pt-toc-bullet" />
                      {ptItem.ptLabel}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-card pt-related-card-wrap">
              <div className="pt-card-title">Conteúdos relacionados</div>
              <div className="pt-related-list">
                {ptRelatedList.map((ptItem) => (
                  <PtRelatedCard key={ptItem.ptId} ptItem={ptItem} />
                ))}
              </div>
              <button type="button" className="pt-see-all">
                Ver todos <span className="pt-see-all-icon">{ptIconArrow()}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
