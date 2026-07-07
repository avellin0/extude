import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

// interface SignupForm {
//   fullName: string;
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   acceptTerms: boolean;
// }

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SocialProvider {
  id: 'google' | 'apple' | 'discord';
  label: string;
  icon: React.ReactNode;
}

interface UserData {
  success: boolean;
  message?: string;
  data?: {
    access_token: string,
    id: string
  }
}

interface DataPayload {
  username: string,
  email: string,
  password: string,
}

interface Email {
  email: string
}


type SubmitStatus = 'idle' | 'loading' | 'success';

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────

const IconUser = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
);

const IconAt = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v4a4 4 0 008 0V12A8 8 0 104 12c0 4.4 3.6 8 8 8" strokeLinecap="round" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
  </svg>
);

const IconEye = ({ open }: { open: boolean }) =>
  open ? (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.6 5.2A10.6 10.6 0 0112 5c6.5 0 10 7 10 7a14.5 14.5 0 01-3 3.9M6.2 6.2A14.6 14.6 0 002 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.5" strokeLinecap="round" />
      <path d="M9.5 9.6a3 3 0 004.1 4.2" strokeLinecap="round" />
    </svg>
  );

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLockSm = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinejoin="round" />
  </svg>
);

const IconBarChart = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 16v3M12 11v8M18 6v13" strokeLinecap="round" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
    <path d="M16 3.1a4 4 0 010 7.8M21 20c0-3-1.8-5.5-5-6.2" strokeLinecap="round" />
  </svg>
);

const IconGoogle = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M22.5 12.2c0-.8-.07-1.4-.2-2H12v3.9h6c-.1 1-.8 2.4-2.3 3.4l3.6 2.7c2.1-2 3.2-4.8 3.2-8z" />
    <path fill="#34A853" d="M12 23c2.7 0 5-.9 6.7-2.4l-3.6-2.7c-1 .7-2.3 1.1-3.1 1.1-2.5 0-4.6-1.7-5.4-4l-3.7 2.8C4.2 20.6 7.8 23 12 23z" />
    <path fill="#FBBC05" d="M6.6 14.9a6.5 6.5 0 010-4.2L2.9 7.9a10.7 10.7 0 000 9.7l3.7-2.7z" />
    <path fill="#EA4335" d="M12 5.9c1.7 0 2.9.7 3.6 1.3l2.7-2.6C16.9 2.9 14.6 2 12 2 7.8 2 4.2 4.4 2.9 7.9l3.7 2.8c.8-2.3 2.9-4.8 5.4-4.8z" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M16.5 1c.1 1.2-.4 2.4-1.1 3.3-.8.9-2 1.6-3.1 1.5-.1-1.2.4-2.5 1.1-3.3.8-.9 2.2-1.6 3.1-1.5zM20.6 17.2c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.4 3.2-4.1 3.2-1.5 0-1.9-1-3.9-1-2 0-2.5 1-4 1-1.7 0-3-1.7-4-3.1-2.7-3.9-3-8.5-1.3-10.9.8-1.2 2.2-2 3.6-2 1.5 0 2.4 1 3.7 1 1.2 0 1.9-1 3.7-1 1.3 0 2.6.7 3.5 1.9-3.1 1.7-2.6 6.2.3 8.2z" />
  </svg>
);

const IconDiscord = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#5865F2">
    <path d="M20.3 5.3A17.5 17.5 0 0016 4l-.3.6a13 13 0 014 1.6 14.5 14.5 0 00-12.4 0 13 13 0 014-1.6L11 4a17.5 17.5 0 00-4.3 1.3C4.5 8.6 3.8 11.9 4 15.1a14.7 14.7 0 004.5 2.3l.7-1.2a9.5 9.5 0 01-1.5-.7l.4-.3a13 13 0 008 0l.4.3c-.5.3-1 .5-1.5.7l.7 1.2a14.7 14.7 0 004.5-2.3c.3-3.6-.7-6.8-2.9-9.8zM9.3 13.4c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.4.7 1.3 1.5c0 .8-.6 1.5-1.3 1.5zm5.4 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" />
  </svg>
);

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const FEATURES: FeatureItem[] = [
  {
    id: 'learn',
    icon: <IconBook />,
    title: 'Aprenda do seu jeito',
    description: 'Acesse conteúdos em vídeo, leitura e ferramentas que se adaptam a você.',
  },
  {
    id: 'progress',
    icon: <IconBarChart />,
    title: 'Acompanhe seu progresso',
    description: 'Estatísticas detalhadas para você evoluir todos os dias.',
  },
  {
    id: 'community',
    icon: <IconUsers />,
    title: 'Conecte-se com outros',
    description: 'Compartilhe conhecimento e cresça com uma comunidade incrível.',
  },
];

const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: 'google', label: 'Google', icon: <IconGoogle /> },
  { id: 'apple', label: 'Apple', icon: <IconApple /> },
  { id: 'discord', label: 'Discord', icon: <IconDiscord /> },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const PASSWORD_HINT_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const Cadastro: React.FC = () => {

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [toast, setToast] = useState<string | null>(null);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    fullNameRef.current?.focus();
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);

  const handleSocial = useCallback(
    (id: string) => showToast(`Cadastrando com ${id}...`),
    [showToast]
  );

  const handleTerms = useCallback(
    (e: React.MouseEvent) => { e.preventDefault(); showToast('Abrindo Termos de Uso…'); },
    [showToast]
  );

  const handlePrivacy = useCallback(
    (e: React.MouseEvent) => { e.preventDefault(); showToast('Abrindo Política de Privacidade…'); },
    [showToast]
  );

  const isLoading = submitStatus === 'loading';
  const isSuccess = submitStatus === 'success';


  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [UserId, setUserId] = useState<string>('');
  const navigate = useNavigate();


  // password strength
  const pwStrength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const pwStrengthLabel = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'][pwStrength] ?? '';
  const pwStrengthClass = ['', 'weak', 'fair', 'good', 'strong'][pwStrength] ?? '';




  const navigateToHome = async (userId: string) => {
    navigate(`/home/${username}/${userId}`);
  }

  const validateInput = (): boolean => {
    const newErrors: FormErrors = {};

    if (!USERNAME_RE.test(username)) {
      newErrors.username = 'Nome de usuário inválido. Use apenas letras, números e sublinhados (3-20 caracteres).';
    }

    if (!USERNAME_RE.test(fullName)) {
      newErrors.fullName = 'Nome completo inválido. Use apenas letras, números e sublinhados (3-20 caracteres).';
    }

    if (!EMAIL_RE.test(email)) {
      newErrors.email = 'Email inválido.';
    }

    if (!PASSWORD_HINT_RE.test(password)) {
      newErrors.password = 'Senha inválida. Use pelo menos 8 caracteres com letras e números.';
    }

    if (!PASSWORD_HINT_RE.test(confirmPassword)) {
      newErrors.confirmPassword = 'Senha inválida. Use pelo menos 8 caracteres com letras e números.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AlreadySign = async (email: Email | string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        return true;
      }

      return false;
    } catch (err) {
      console.log("Erro ao verificar usuário:", err);
    }
  }

  const sendData = async (data: DataPayload): Promise<UserData> => {
    try {
      const alreadyExists = await AlreadySign(email, password);

      if (alreadyExists) {
        console.log("Usuário já existe. Redirecionando para login...");
        return { "success": false, "message": "Usuário já existe" };
      }

      const createAccount = await fetch("http://localhost:3000/CreateUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!createAccount.ok) {
        throw new Error('network response not ok');
      }

      const responseData = await createAccount.json();
      setUserId(responseData.id)
      return { "success": true, data: responseData.data };

    } catch (err) {
      console.log("erro:", err);
      return { "success": false, "message": "Erro ao criar usuário" };
    }
  }

  const EnviarDados = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!validateInput()) {
        return;
      }

      setSubmitStatus('loading');

      const data: DataPayload = { username: username, email: email, password: password };

      if (data) {
        setEmail('')
        setPassword('')
        setUsername('')
      }

      const criandoUsuario = await sendData(data);

      if (!criandoUsuario.success) {
        console.error("Erro ao criar usuário:", criandoUsuario?.message);
        return;
      }
      await navigateToHome(criandoUsuario.data?.id || '');
      console.log(UserId);
      
    } catch (err) {
      console.log("erro aqui:", err);
    }
  }


  return (
    <div className="sp-app-shell">
      {/* ── Floating particles ── */}
      <div className="sp-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`sp-particle sp-particle--${i % 4}`} />
        ))}
      </div>

      {/* ── Toast ── */}
      {toast && <div className="sp-toast" role="status">{toast}</div>}



      {/* ── Main ── */}
      <main className="sp-main">

        {/* ────── Left panel ────── */}
        <section className="sp-brand-panel">
          <h1 className="sp-brand-panel__title">
            Sua jornada<br />
            de aprendizado<br />
            <em>começa agora.</em>
          </h1>
          <p className="sp-brand-panel__subtitle">
            Crie sua conta e tenha acesso a uma plataforma completa para organizar seus estudos,
            acompanhar seu progresso e muito mais.
          </p>

          <ul className="sp-feature-list">
            {FEATURES.map(f => (
              <li key={f.id} className="sp-feature-item">
                <span className="sp-feature-item__icon">{f.icon}</span>
                <div>
                  <p className="sp-feature-item__title">{f.title}</p>
                  <p className="sp-feature-item__desc">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* ── Device mock ── */}
          <div className="sp-device-mock" aria-hidden="true">
            <div className="sp-device-mock__laptop">
              <div className="sp-device-mock__screen">
                <div className="sp-device-mock__bar">
                  <span className="sp-device-mock__brand">Estude.ex</span>
                  <span className="sp-device-mock__dot" />
                  <span className="sp-device-mock__dot" />
                  <span className="sp-device-mock__dot" />
                </div>
                <div className="sp-device-mock__body">
                  <div className="sp-device-mock__sidebar">
                    {['Início', 'Biblioteca', 'Conquistas', 'Estatísticas', 'Flashcards', 'Configurações'].map(s => (
                      <span key={s} className="sp-device-mock__nav-item">{s}</span>
                    ))}
                  </div>
                  <div className="sp-device-mock__content">
                    <div className="sp-device-mock__card sp-device-mock__card--hero">
                      <span className="sp-device-mock__card-label">Frase inspiradora</span>
                    </div>
                    <div className="sp-device-mock__grid">
                      <div className="sp-device-mock__card sp-device-mock__card--sm sp-device-mock__card--blue">Conectado</div>
                      <div className="sp-device-mock__card sp-device-mock__card--sm">Metas</div>
                      <div className="sp-device-mock__card sp-device-mock__card--sm sp-device-mock__card--purple">Streak</div>
                    </div>
                    <div className="sp-device-mock__card sp-device-mock__card--progress">
                      <span>Estatísticas</span>
                      <div className="sp-device-mock__progress-bars">
                        <div className="sp-device-mock__bar-fill" style={{ width: '70%' }} />
                        <div className="sp-device-mock__bar-fill sp-device-mock__bar-fill--dim" style={{ width: '45%' }} />
                        <div className="sp-device-mock__bar-fill" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div className="sp-device-mock__card sp-device-mock__card--narrow">Livros</div>
                  </div>
                </div>
              </div>
              <div className="sp-device-mock__chin" />
            </div>
          </div>
        </section>

        {/* ────── Right panel: form ────── */}
        <section className="sp-signup-card">
          <h2 className="sp-signup-card__title">Criar sua conta</h2>
          <p className="sp-signup-card__subtitle">Preencha as informações abaixo para começar.</p>

          <form className="sp-signup-form" onSubmit={EnviarDados} noValidate>

            {/* Row 1: name + username */}
            <div className="sp-form-row sp-form-row--two">
              <div className="sp-field">
                <label className="sp-field__label" htmlFor="fullName">Nome completo</label>
                <div className={`sp-field__control ${errors.fullName ? 'sp-field__control--error' : ''}`}>
                  <span className="sp-field__icon"><IconUser /></span>
                  <input
                    ref={fullNameRef}
                    id="fullName"
                    type="text"
                    className="sp-field__input"
                    placeholder="Seu nome completo"
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && <span className="sp-field__error">{errors.fullName}</span>}
              </div>

              <div className="sp-field">
                <label className="sp-field__label" htmlFor="username">Nome de usuário</label>
                <div className={`sp-field__control ${errors.username ? 'sp-field__control--error' : ''}`}>
                  <span className="sp-field__icon"><IconAt /></span>
                  <input
                    id="username"
                    type="text"
                    className="sp-field__input"
                    placeholder="seu_usuario"
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                {errors.username && <span className="sp-field__error">{errors.username}</span>}
              </div>
            </div>

            {/* Row 2: email */}
            <div className="sp-field">
              <label className="sp-field__label" htmlFor="email">Email</label>
              <div className={`sp-field__control ${errors.email ? 'sp-field__control--error' : ''}`}>
                <span className="sp-field__icon"><IconMail /></span>
                <input
                  id="email"
                  type="email"
                  className="sp-field__input"
                  placeholder="seu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="sp-field__error">{errors.email}</span>}
            </div>

            {/* Row 3: password + confirm */}
            <div className="sp-form-row sp-form-row--two">
              <div className="sp-field">
                <label className="sp-field__label" htmlFor="password">Senha</label>
                <div className={`sp-field__control ${errors.password ? 'sp-field__control--error' : ''}`}>
                  <span className="sp-field__icon"><IconLock /></span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="sp-field__input"
                    placeholder="Crie uma senha"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="sp-field__toggle"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
                {/* {errors.password && <span className="sp-field__error">{errors.password}</span>} */}
              </div>

              <div className="sp-field">
                <label className="sp-field__label" htmlFor="confirmPassword">Confirmar senha</label>
                <div className={`sp-field__control ${errors.confirmPassword ? 'field__control--error' : ''}`}>
                  <span className="sp-field__icon"><IconLock /></span>
                  <input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className="sp-field__input"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="sp-field__toggle"
                    onClick={() => setShowConfirm(v => !v)}
                    aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                  >
                    <IconEye open={showConfirm} />
                  </button>
                </div>
                {errors.confirmPassword && <span className="sp-field__error">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Password hint + strength */}
            <div className="sp-password-hint-row">
              <span className="sp-password-hint">Use pelo menos 8 caracteres com letras e números.</span>
              {password && (
                <div className="sp-pw-strength">
                  <div className="sp-pw-strength__bars">
                    {[1, 2, 3, 4].map(n => (
                      <span key={n} className={`sp-pw-strength__bar ${n <= pwStrength ? `sp-pw-strength__bar--${pwStrengthClass}` : ''}`} />
                    ))}
                  </div>
                  <span className={`sp-pw-strength__label sp-pw-strength__label--${pwStrengthClass}`}>{pwStrengthLabel}</span>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="sp-terms-row">
              <label className="sp-checkbox">
                <input
                  type="checkbox"
                />
                <span className="sp-checkbox__box" />
                <span>
                  Eu aceito os{' '}
                  <button type="button" className="sp-inline-link" onClick={handleTerms}>Termos de Uso</button>
                  {' '}e a{' '}
                  <button type="button" className="sp-inline-link" onClick={handlePrivacy}>Política de Privacidade</button>
                </span>
              </label>
              {/* {errors.acceptTerms && <span className="sp-field__error">{errors.acceptTerms}</span>} */}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`sp-btn sp-btn--primary sp-btn--full sp-btn--large ${isSuccess ? 'sp-btn--success' : ''}`}
              disabled={isLoading}
            >
              {isLoading
                ? <span className="sp-spinner" aria-hidden="true" />
                : isSuccess
                  ? 'Conta criada! ✓'
                  : <><span>Criar conta</span><IconArrowRight /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="sp-divider"><span>ou cadastre-se com</span></div>

          {/* Social */}
          <div className="sp-social-row">
            {SOCIAL_PROVIDERS.map(p => (
              <button
                key={p.id}
                type="button"
                className="sp-btn sp-btn--social"
                onClick={() => handleSocial(p.label)}
              >
                <span className="sp-btn__social-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>

          {/* Security note */}
          <p className="sp-security-note">
            <IconLockSm /> Seus dados são protegidos com criptografia de ponta a ponta.
          </p>
        </section>
      </main>
    </div>
  );
};

