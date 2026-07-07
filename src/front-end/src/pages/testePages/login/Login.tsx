import React, { useState, useRef, useCallback, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

// ---------- Types ----------

interface BenefitItem {
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

interface FooterLinkItem {
  id: string;
  label: string;
}

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ---------- Icons ----------

const IconPlay = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
  </svg>
);

const IconBarChart = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 16v3M12 11v8M18 6v13" strokeLinecap="round" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.5 8.5 0 01-12.4 7.55L3 20l1.05-5.4A8.5 8.5 0 1121 11.5z" strokeLinejoin="round" />
  </svg>
);

const IconBookmark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4h12v17l-6-4-6 4V4z" strokeLinejoin="round" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
  </svg>
);

const IconEye = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M3 3l18 18" strokeLinecap="round" />
        <path d="M10.6 5.2A10.6 10.6 0 0112 5c6.5 0 10 7 10 7a14.5 14.5 0 01-3 3.9M6.2 6.2A14.6 14.6 0 002 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 9.6a3 3 0 004.1 4.2" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGoogle = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M22.5 12.2c0-.8-.07-1.4-.2-2H12v3.9h6c-.1 1-.8 2.4-2.3 3.4l3.6 2.7c2.1-2 3.2-4.8 3.2-8z" />
    <path fill="#34A853" d="M12 23c2.7 0 5-.9 6.7-2.4l-3.6-2.7c-1 .7-2.3 1.1-3.1 1.1-2.5 0-4.6-1.7-5.4-4l-3.7 2.8C4.2 20.6 7.8 23 12 23z" />
    <path fill="#FBBC05" d="M6.6 14.9a6.5 6.5 0 010-4.2L2.9 7.9a10.7 10.7 0 000 9.7l3.7-2.7z" />
    <path fill="#EA4335" d="M12 5.9c1.7 0 2.9.7 3.6 1.3l2.7-2.6C16.9 2.9 14.6 2 12 2 7.8 2 4.2 4.4 2.9 7.9l3.7 2.8c.8-2.3 2.9-4.8 5.4-4.8z" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M16.5 1c.1 1.2-.4 2.4-1.1 3.3-.8.9-2 1.6-3.1 1.5-.1-1.2.4-2.5 1.1-3.3.8-.9 2.2-1.6 3.1-1.5zM20.6 17.2c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.4 3.2-4.1 3.2-1.5 0-1.9-1-3.9-1-2 0-2.5 1-4 1-1.7 0-3-1.7-4-3.1-2.7-3.9-3-8.5-1.3-10.9.8-1.2 2.2-2 3.6-2 1.5 0 2.4 1 3.7 1 1.2 0 1.9-1 3.7-1 1.3 0 2.6.7 3.5 1.9-3.1 1.7-2.6 6.2.3 8.2z" />
  </svg>
);

const IconDiscord = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#5865F2">
    <path d="M20.3 5.3A17.5 17.5 0 0016 4l-.3.6a13 13 0 014 1.6 14.5 14.5 0 00-12.4 0 13 13 0 014-1.6L11 4a17.5 17.5 0 00-4.3 1.3C4.5 8.6 3.8 11.9 4 15.1a14.7 14.7 0 004.5 2.3l.7-1.2a9.5 9.5 0 01-1.5-.7l.4-.3a13 13 0 008 0l.4.3c-.5.3-1 .5-1.5.7l.7 1.2a14.7 14.7 0 004.5-2.3c.3-3.6-.7-6.8-2.9-9.8zM9.3 13.4c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.4.7 1.3 1.5c0 .8-.6 1.5-1.3 1.5zm5.4 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" />
  </svg>
);

const IconLockSmall = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
  </svg>
);

// ---------- Mock data ----------

const BENEFITS: BenefitItem[] = [
  {
    id: 'continue',
    icon: <IconPlay />,
    title: 'Continue seus estudos',
    description: 'Acesse seus vídeos, notas e livros de onde parou.',
  },
  {
    id: 'progress',
    icon: <IconBarChart />,
    title: 'Acompanhe seu progresso',
    description: 'Veja suas estatísticas, metas e evolução diária.',
  },
  {
    id: 'connect',
    icon: <IconChat />,
    title: 'Conecte-se com amigos',
    description: 'Converse em tempo real e compartilhe seus conhecimentos.',
  },
  {
    id: 'all-in-one',
    icon: <IconBookmark />,
    title: 'Tudo em um só lugar',
    description: 'Vídeos, livros, notas, traduções e ferramentas de estudo.',
  },
];

const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: 'google', label: 'Continuar com Google', icon: <IconGoogle /> },
  { id: 'apple', label: 'Continuar com Apple', icon: <IconApple /> },
  { id: 'discord', label: 'Continuar com Discord', icon: <IconDiscord /> },
];

const FOOTER_LINKS: FooterLinkItem[] = [
  { id: 'privacidade', label: 'Privacidade' },
  { id: 'termos', label: 'Termos' },
  { id: 'contato', label: 'Contato' },
  { id: 'ajuda', label: 'Ajuda' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Component ----------

export const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus] = useState<SubmitStatus>('idle');
  const [toast, setToast] = useState<string | null>(null);

  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Focus the email field on mount, mirroring a real sign-in page
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setFormState((prev) => ({ ...prev, email: value }));
  //   setErrors((prev) => ({ ...prev, email: undefined }));
  // }, []);

  // const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setFormState((prev) => ({ ...prev, password: value }));
  //   setErrors((prev) => ({ ...prev, password: undefined }));
  // }, []);

  const handleRememberMeToggle = useCallback(() => {
    setFormState((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  }, []);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const validate = useCallback((email: string, password: string): boolean => {
    const nextErrors: FormErrors = {};
    if (!email.trim()) {
      nextErrors.email = 'Informe seu email.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Informe um email válido.';
    }
    if (!password) {
      nextErrors.password = 'Informe sua senha.';
    } else if (password.length < 5) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formState.email, formState.password]);

    // const handleSubmit = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const isValid = validate(email, senha);
  //     if (!isValid) {
  //       if (errors.email) emailInputRef.current?.focus();
  //       else passwordInputRef.current?.focus();
  //       return;
  //     }

  //     setSubmitStatus('loading');

  //     window.setTimeout(() => {
  //       setSubmitStatus('success');
  //       showToast(`Bem-vindo de volta, ${formState.email.split('@')[0]}!`);
  //       window.setTimeout(() => setSubmitStatus('idle'), 1800);
  //     }, 1400);
  //   },
  //   [validate, errors.email, formState.email, showToast]
  // );

  const handleForgotPassword = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      showToast('Um link de redefinição foi enviado para seu email.');
    },
    [showToast]
  );

  const handleCreateAccount = useCallback(() => {
    showToast('Redirecionando para a criação de conta...');
    navigate('/teste-cadastro');
  }, [showToast, navigate]);

  const handleSocialLogin = useCallback(
    (provider: SocialProvider) => {
      showToast(`Conectando com ${provider.label.replace('Continuar com ', '')}...`);
    },
    [showToast]
  );

  const handleFooterLinkClick = useCallback(
    (link: FooterLinkItem) => {
      showToast(`Abrindo "${link.label}"...`);
    },
    [showToast]
  );

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const verificacao = async () => {
    try {
      
      console.log("Enviado dados para login...");


      if (!validate(email, senha)) {
        return;
      }

      console.log("email:", email, "senha:", senha);


      const { data } = await fetch("http://localhost:3000/login", { //Preciso mudar isso aqui, no back-end é /login/:id. Como passar o id antes de saber o usuario ? talvez seja melhor mudar a lógica
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, "password": senha, "refresh_email": email }),
        credentials: "include"
      }).then((res) => res.json());

      navigate(`/home/${data.username}/${data.id}`);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };


  const isLoading = submitStatus === 'loading';
  const isSuccess = submitStatus === 'success';

  return (
    <div className="lg-app-shell">
      {toast && (
        <div className="lg-toast" role="status">
          {toast}
        </div>
      )}

      {/* ---------- Top bar ---------- */}
      {/* <header className="lg-topbar">
        <span className="lg-topbar__logo">Estude.ex</span>
        <div className="lg-topbar__right">
          <span className="lg-topbar__prompt">Ainda não tem uma conta?</span>
          <button type="button" className="lg-btn btn--primary btn--compact" onClick={handleCreateAccount}>
            Criar conta
          </button>
        </div>
      </header> */}

      <main className="lg-main">
        {/* ---------- Left: brand panel ---------- */}
        <section className="lg-brand-panel">
          <h1 className="lg-brand-panel__title">
            Bem-vindo
            <br />
            de <em>volta!</em>
          </h1>
          <p className="lg-brand-panel__subtitle">
            Entre para continuar sua jornada de aprendizado e organização.
          </p>

          <ul className="lg-benefits-list">
            {BENEFITS.map((benefit) => (
              <li key={benefit.id} className="lg-benefit-item">
                <span className="lg-benefit-item__icon">{benefit.icon}</span>
                <div>
                  <p className="lg-benefit-item__title">{benefit.title}</p>
                  <p className="lg-benefit-item__description">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="lg-device-mock" aria-hidden="true">
            <div className="lg-device-mock__laptop">
              <div className="lg-device-mock__screen">
                <div className="lg-device-mock__topbar">
                  <span>Estude.ex</span>
                </div>
                <div className="lg-device-mock__body">
                  <div className="lg-device-mock__sidebar">
                    <span>Biblioteca</span>
                    <span>Notas</span>
                    <span>Clipes</span>
                    <span>Revisões</span>
                    <span>Flashcards</span>
                    <span>Configurações</span>
                  </div>
                  <div className="lg-device-mock__content">
                    <div className="lg-device-mock__video">
                      <span className="lg-device-mock__caption">PRESENT PERFECT</span>
                      <span className="lg-device-mock__subtitle">I have studied English for 3 years.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg-device-mock__base" />
            </div>
          </div>
        </section>

        {/* ---------- Right: login card ---------- */}
        <div className="lg-login-panel">
          <div className="lg-topbar__right">
            <span className="lg-topbar__prompt">Ainda não tem uma conta?</span>
            <button type="button" className="lg-btn lg-btn--primary lg-btn--compact" onClick={handleCreateAccount}>
              Criar conta
            </button>
          </div>

          <section className="lg-login-card">
            <h2 className="lg-login-card__title">Entrar na sua conta</h2>
            <p className="lg-login-card__subtitle">Use seu email e senha para acessar o Estude.ex</p>

            <div className="lg-login-form">
              <div className="lg-field">
                <label className="lg-field__label" htmlFor="email">
                  Email
                </label>
                <div className={`lg-field__control ${errors.email ? 'lg-field__control--error' : ''}`}>
                  <span className="lg-field__icon">
                    <IconMail />
                  </span>
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    className="lg-field__input"
                    placeholder="seu@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="lg-field__error">{errors.email}</span>}
              </div>

              <div className="lg-field">
                <label className="lg-field__label" htmlFor="password">
                  Senha
                </label>
                <div className={`lg-field__control ${errors.password ? 'lg-field__control--error' : ''}`}>
                  <span className="lg-field__icon">
                    <IconLock />
                  </span>
                  <input
                    ref={passwordInputRef}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="lg-field__input"
                    placeholder="Sua senha"
                    onChange={(e) => setSenha(e.target.value)}
                    autoComplete="current-password"
                    
                  />
                  <button
                    type="button"
                    className="lg-field__toggle"
                    onClick={handleTogglePasswordVisibility}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
                {errors.password && <span className="lg-field__error">{errors.password}</span>}
              </div>

              <div className="lg-form-row">
                <label className="lg-checkbox">
                  <input
                    type="checkbox"
                    checked={formState.rememberMe}
                    onChange={handleRememberMeToggle}
                  />
                  <span className="lg-checkbox__box" />
                  Lembrar de mim
                </label>
                <button type="button" className="lg-link-btn" onClick={handleForgotPassword}>
                  Esqueci minha senha
                </button>
              </div>

              <button type="submit"
                className={`
                lg-btn 
                lg-btn--primary 
                lg-btn--full 
                lg-btn--large ${isSuccess ? 'lg-btn--success' : ''}
                `} 
                disabled={isLoading}
                onClick={() => verificacao()}>
                {isLoading ? (
                  <span className="lg-spinner" aria-hidden="true" />
                ) : isSuccess ? (
                  'Entrando...'
                ) : (
                  <>
                    Entrar <IconArrowRight />
                  </>
                )}
              </button>
            </div>

            <div className="lg-divider">
              <span>ou continue com</span>
            </div>

            <div className="lg-social-list">
              {SOCIAL_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  className="lg-btn lg-btn--social"
                  onClick={() => handleSocialLogin(provider)}
                >
                  <span className="lg-btn--social__icon">{provider.icon}</span>
                  {provider.label}
                </button>
              ))}
            </div>

            <p className="lg-security-note">
              <IconLockSmall /> Seus dados são protegidos com criptografia de ponta a ponta.
            </p>
          </section>

        </div>

      </main>

      {/* ---------- Footer ---------- */}
      <footer className="lg-footer">
        <span className="lg-footer__copyright">© 2024 Estude.ex. Todos os direitos reservados.</span>
        <nav className="lg-footer__links">
          {FOOTER_LINKS.map((link) => (
            <button key={link.id} type="button" className="lg-footer__link" onClick={() => handleFooterLinkClick(link)}>
              {link.label}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

