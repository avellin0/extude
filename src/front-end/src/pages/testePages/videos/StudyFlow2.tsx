import { useState, useRef, useCallback, useEffect } from 'react';
import './styles2.css';
import { useNavigate, useParams } from 'react-router-dom';

// ── Types ──────────────────────────────────────────────────────────────────

interface Note {
  id: number;
  timestamp: string;
  timestampSeconds: number;
  title: string;
  body: string;
  tag: string;
  tagColor: 'purple' | 'orange' | 'blue';
}

interface TranscriptLine {
  id: number;
  time: string;
  timeSeconds: number;
  text: string;
  highlight?: string;
  active?: boolean;
}

interface Marker {
  id: number;
  position: number;
  time: string;
  timeSeconds: number;
}

// ── Mock data ──────────────────────────────────────────────────────────────

const INITIAL_NOTES: Note[] = [
  {
    id: 1,
    timestamp: '03:21',
    timestampSeconds: 201,
    title: 'Present Perfect',
    body: 'Usamos o present perfect para ações que começaram no passado e continuam no presente.',
    tag: '#gramática',
    tagColor: 'purple',
  },
  {
    id: 2,
    timestamp: '07:42',
    timestampSeconds: 462,
    title: 'Exceção',
    body: 'Alguns verbos não são usados no present perfect, como: know, believe, understand.',
    tag: '#importante',
    tagColor: 'orange',
  },
  {
    id: 3,
    timestamp: '10:15',
    timestampSeconds: 615,
    title: 'Since vs For',
    body: 'Since + ponto no tempo\nFor + período de tempo',
    tag: '#dúvida',
    tagColor: 'blue',
  },
];

const TRANSCRIPT_LINES: TranscriptLine[] = [
  {
    id: 1,
    time: '03:15',
    timeSeconds: 195,
    text: 'The present perfect is used to talk about actions that started in the past and continue in the present.',
  },
  {
    id: 2,
    time: '03:21',
    timeSeconds: 201,
    text: 'I {have studied} English for 3 years.',
    highlight: 'have studied',
  },
  {
    id: 3,
    time: '03:24',
    timeSeconds: 204,
    text: 'She {has visited} many countries.',
    highlight: 'has visited',
  },
  {
    id: 4,
    time: '03:27',
    timeSeconds: 207,
    text: 'We {have learned} a lot of new things.',
    highlight: 'have learned',
  },
];

const MARKERS: Marker[] = [
  { id: 1, position: 21.5, time: '03:21', timeSeconds: 201 },
  { id: 2, position: 34.2, time: '05:22', timeSeconds: 322 },
  { id: 3, position: 51.8, time: '08:09', timeSeconds: 489 },
  { id: 4, position: 67.4, time: '10:38', timeSeconds: 638 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function renderTranscriptText(line: TranscriptLine) {
  if (!line.highlight) return <span>{line.text}</span>;
  const [before, rest] = line.text.split('{');
  const [highlighted, after] = rest.split('}');
  return (
    <span>
      {before}
      <mark className="video_transcript-highlight">{highlighted}</mark>
      {after}
    </span>
  );
}

// ── UploadOverlay ──────────────────────────────────────────────────────────

function UploadOverlay({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) onFile(file);
  }

  return (
    <div
      className={`video_upload-overlay${dragging ? ' video_upload-overlay--drag' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="video_upload-input"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
      <div className="video_upload-overlay__icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" >
          <circle cx="24" cy="24" r="24" fill="var(--color-primary-light)" />
          <polygon points="19,15 35,24 19,33" fill="var(--color-primary)" />
        </svg>
      </div>
      <p className="video_upload-overlay__title">Arraste um vídeo ou clique para selecionar</p>
      <p className="video_upload-overlay__sub">MP4, WebM, MOV, AVI…</p>
      <button className="video_btn-primary video_upload-overlay__btn" onClick={() => inputRef.current?.click()}>
        
        Escolher vídeo
      </button>
    </div>
  );
}

// ── VideoPlayer ────────────────────────────────────────────────────────────

function VideoPlayer({
  src,
  videoRef,
  currentTime,
  duration,
  playing,
  onTogglePlay,
  onSeekFraction,
  onVolumeToggle,
  muted,
  playbackRate,
  onRateCycle,
}: {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  duration: number;
  playing: boolean;
  onTogglePlay: () => void;
  onSeekFraction: (f: number) => void;
  onVolumeToggle: () => void;
  muted: boolean;
  playbackRate: number;
  onRateCycle: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? currentTime / duration : 0;

  function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    onSeekFraction(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  }

  return (
    <div className="video_video-player">
      <video ref={videoRef} src={src} className="video_video-element" onClick={onTogglePlay} />

      <div className="video_video-controls">
        <div className="video_video-progress-bar" ref={barRef} onClick={handleBarClick} role="slider" aria-valuenow={Math.round(progress * 100)}>
          <div className="video_video-progress-bar__fill" style={{ width: `${progress * 100}%` }} />
          <div className="video_video-progress-bar__thumb" style={{ left: `${progress * 100}%` }} />
        </div>

        <div className="video_video-controls__row">
          <div className="video_video-controls__left">
            <button className="video_ctrl-btn" onClick={onTogglePlay} aria-label={playing ? 'Pausar' : 'Reproduzir'}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
            <button className="video_ctrl-btn" onClick={onVolumeToggle} aria-label={muted ? 'Ativar som' : 'Silenciar'}>
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <span className="video_video-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="video_video-controls__right">
            <button className="video_ctrl-btn video_ctrl-btn--text" onClick={onRateCycle}>{playbackRate.toFixed(1)}x</button>
            <button
              className="video_ctrl-btn"
              aria-label="Tela cheia"
              onClick={() => videoRef.current?.requestFullscreen()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────

function Timeline({
  markers,
  duration,
  onSeekSeconds,
  currentTime,
  onAddNote,
}: {
  markers: Marker[];
  duration: number;
  onSeekSeconds: (s: number) => void;
  currentTime: number;
  onAddNote: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? currentTime / duration : 0;

  function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!barRef.current || duration === 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeekSeconds(frac * duration);
  }

  const ticks = duration > 0
    ? ['00:00', formatTime(duration * 0.33), formatTime(duration * 0.66), formatTime(duration)]
    : ['00:00', '05:00', '10:00', '15:42'];

  const dynamicMarkers = duration > 0
    ? markers.map(m => ({ ...m, position: (m.timeSeconds / duration) * 100 }))
    : markers;

  return (
    <div className="video_timeline">
      <div className="video_timeline__header">
        <span className="video_timeline__title">Marcação do vídeo</span>
        <div className="video_timeline__actions">
          <button className="video_btn-outline" onClick={onAddNote}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nota
          </button>
          <button className="video_btn-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" />
              <line x1="8.46" y1="7.54" x2="15.54" y2="16.46" />
            </svg>
            Clip
          </button>
        </div>
      </div>

      <div className="video_timeline__track">
        <div className="video_timeline__markers-row">
          {dynamicMarkers.map((m) => (
            <button
              key={m.id}
              className="video_timeline__marker"
              style={{ left: `${m.position}%` }}
              title={m.time}
              onClick={() => onSeekSeconds(m.timeSeconds)}
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <rect x="1" y="1" width="18" height="14" rx="4" fill="#5B5BF6" />
                <path d="M10 15 L6 21 L14 21 Z" fill="#5B5BF6" />
                <rect x="5" y="5" width="10" height="2" rx="1" fill="white" />
                <rect x="5" y="9" width="6" height="2" rx="1" fill="white" />
              </svg>
            </button>
          ))}
        </div>

        <div className="video_timeline__bar" ref={barRef} onClick={handleBarClick}>
          <div className="video_timeline__bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="video_timeline__ticks">
          {ticks.map((t, i) => <span key={i} className="video_timeline__tick">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

// ── Transcript ─────────────────────────────────────────────────────────────

function Transcript({
  lines,
  currentTime,
  onSeek,
}: {
  lines: TranscriptLine[];
  currentTime: number;
  onSeek: (s: number) => void;
}) {
  const activeId = [...lines].reverse().find(l => l.timeSeconds <= currentTime)?.id;

  return (
    <div className="video_transcript">
      <h2 className="video_transcript__title">Transcrição</h2>
      <ul className="video_transcript__list">
        {lines.map((line) => {
          const isActive = line.id === activeId;
          return (
            <li
              key={line.id}
              className={`video_transcript__line${isActive ? ' video_transcript__line--active' : ''}`}
              onClick={() => onSeek(line.timeSeconds)}
            >
              {isActive && <div className="video_transcript__active-bar" />}
              <span className="video_transcript__time">{line.time}</span>
              {isActive && (
                <button className="video_transcript__play-btn" aria-label="Reproduzir" onClick={(e) => { e.stopPropagation(); onSeek(line.timeSeconds); }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </button>
              )}
              <p className="video_transcript__text">{renderTranscriptText(line)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── NoteCard ───────────────────────────────────────────────────────────────

function NoteCard({ note, onDelete, onSeek }: { note: Note; onDelete: (id: number) => void; onSeek: (s: number) => void }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="video_note-card">
      <div className="video_note-card__header">
        <button className="video_note-card__timestamp" onClick={() => onSeek(note.timestampSeconds)}>
          {note.timestamp}
        </button>
        <div className="video_note-card__menu-wrap">
          <button className="video_note-card__menu" onClick={() => setMenu(v => !v)} aria-label="Opções">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          {menu && (
            <div className="video_note-card__dropdown">
              <button onClick={() => { onDelete(note.id); setMenu(false); }}>Excluir nota</button>
            </div>
          )}
        </div>
      </div>
      <h3 className="video_note-card__title">{note.title}</h3>
      <p className="video_note-card__body">{note.body}</p>
      <span className={`video_note-card__tag video_note-card__tag--${note.tagColor}`}>{note.tag}</span>
    </div>
  );
}

// ── AddNoteModal ───────────────────────────────────────────────────────────

function AddNoteModal({
  currentTime,
  onClose,
  onSave,
}: {
  currentTime: number;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id'>) => void;
}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [tagColor, setTagColor] = useState<Note['tagColor']>('purple');

  function handleSave() {
    if (!title.trim()) return;
    onSave({
      timestamp: formatTime(currentTime),
      timestampSeconds: currentTime,
      title: title.trim(),
      body: body.trim(),
      tag: tag.trim() ? `#${tag.trim().replace(/^#/, '')}` : '#nota',
      tagColor,
    });
    onClose();
  }

  return (
    <div className="video_modal-backdrop" onClick={onClose}>
      <div className="video_modal" onClick={e => e.stopPropagation()}>
        <div className="video_modal__header">
          <h2 className="video_modal__title">Nova nota — {formatTime(currentTime)}</h2>
          <button className="video_modal__close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="video_modal__body">
          <label className="video_modal__label">Título *</label>
          <input className="video_modal__input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Regra importante" />
          <label className="video_modal__label">Conteúdo</label>
          <textarea className="video_modal__textarea" value={body} onChange={e => setBody(e.target.value)} placeholder="Anotações sobre este momento…" rows={4} />
          <div className="video_modal__row">
            <div className="video_modal__col">
              <label className="video_modal__label">Tag</label>
              <input className="video_modal__input" value={tag} onChange={e => setTag(e.target.value)} placeholder="gramática" />
            </div>
            <div className="video_modal__col">
              <label className="video_modal__label">Cor</label>
              <div className="video_modal__colors">
                {(['purple', 'orange', 'blue'] as Note['tagColor'][]).map(c => (
                  <button
                    key={c}
                    className={`video_modal__color video_modal__color--${c}${tagColor === c ? ' video_modal__color--active' : ''}`}
                    onClick={() => setTagColor(c)}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="video_modal__footer">
          <button className="video_btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="video_btn-primary" onClick={handleSave}>Salvar nota</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export function StudyFlow2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoName, setVideoName] = useState('');
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [showModal, setShowModal] = useState(false);

  // Sync time from video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onDuration = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onDuration);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onDuration);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [videoSrc]);

  const handleFile = useCallback((file: File) => {
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    setVideoSrc(URL.createObjectURL(file));
    setVideoName(file.name);
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);
  }, [videoSrc]);

  function handleTogglePlay() {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
  }

  function handleSeekFraction(f: number) {
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = f * duration;
  }

  function handleSeekSeconds(s: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = s;
    if (!playing) v.play();
  }

  function handleVolumeToggle() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function handleRateCycle() {
    const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  }

  function handleAddNote(note: Omit<Note, 'id'>) {
    setNotes(prev => [{ ...note, id: Date.now() }, ...prev].sort((a, b) => a.timestampSeconds - b.timestampSeconds));
  }

  function handleDeleteNote(id: number) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  // Handle search bar import
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  // Handle navigation
  const navigate = useNavigate();
  const {name,id} = useParams<{name: string, id: string}>(); // Placeholder for future route params if needed

  return (
    <div className="video_video_app">
      {/* ── Header ── */}
      <header className="video_header">
        <div className="video_header__brand" onClick={() => navigate(`/home/${name}/${id}`)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#5B5BF6" />
            <polygon points="9,7 18,12 9,17" fill="white" />
          </svg>
          <span className="video_header__logo-text">Extude</span>
        </div>

        <div className="video_header__search">
          
          <input
            ref={searchInputRef}
            type="text"
            className="video_header__search-input"
            placeholder="Buscar vídeo ou colar link..."
          />
        </div>

        <div className="video_header__actions">
          <input ref={filePickerRef} type="file" accept="video/*" className="video_upload-input" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          <button className="video_btn-import" onClick={() => filePickerRef.current?.click()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Importar
          </button>
          <button className="video_btn-avatar">JS</button>
          <button className="video_btn-chevron" aria-label="Menu">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main layout ── */}
      <main className="video_main">
        {/* Left column */}
        <section className="video_content-col">
          {videoSrc ? (
            <>
              <div className="video_video-name">{videoName}</div>
              <VideoPlayer
                src={videoSrc}
                videoRef={videoRef}
                currentTime={currentTime}
                duration={duration}
                playing={playing}
                onTogglePlay={handleTogglePlay}
                onSeekFraction={handleSeekFraction}
                onVolumeToggle={handleVolumeToggle}
                muted={muted}
                playbackRate={playbackRate}
                onRateCycle={handleRateCycle}
              />
            </>
          ) : (
            <UploadOverlay onFile={handleFile} />
          )}

          <Timeline
            markers={MARKERS}
            duration={duration}
            currentTime={currentTime}
            onSeekSeconds={handleSeekSeconds}
            onAddNote={() => setShowModal(true)}
          />

          <Transcript
            lines={TRANSCRIPT_LINES}
            currentTime={currentTime}
            onSeek={handleSeekSeconds}
          />
        </section>

        {/* Right column – Notes */}
        <aside className="video_notes-col">
          <div className="video_notes-header">
            <h2 className="video_notes-header__title">Notas</h2>
            <button className="video_btn-primary" onClick={() => setShowModal(true)}>
              +
              Nova nota
            </button>
          </div>

          {notes.length > 0 ? (
            <div className="video_notes-list">
              {notes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onSeek={handleSeekSeconds}
                />
              ))}
            </div>
          ) : null}

          <div className="video_notes-empty-hint">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="6" width="28" height="36" rx="3" fill="#E8E8FA" />
              <rect x="14" y="14" width="16" height="2.5" rx="1.25" fill="#B0B0E8" />
              <rect x="14" y="20" width="12" height="2.5" rx="1.25" fill="#B0B0E8" />
              <rect x="14" y="26" width="8" height="2.5" rx="1.25" fill="#B0B0E8" />
              <circle cx="36" cy="36" r="9" fill="#fff" stroke="#E8E8FA" strokeWidth="1.5" />
              <line x1="33" y1="36" x2="39" y2="36" stroke="#B0B0E8" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="33" x2="36" y2="39" stroke="#B0B0E8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="video_notes-empty-hint__text">
              Selecione um momento do vídeo<br />
              ou da transcrição para criar uma nota.
            </p>
          </div>
        </aside>
      </main>

      {/* ── Modal ── */}
      {showModal && (
        <AddNoteModal
          currentTime={currentTime}
          onClose={() => setShowModal(false)}
          onSave={handleAddNote}
        />
      )}
    </div>
  );
}
