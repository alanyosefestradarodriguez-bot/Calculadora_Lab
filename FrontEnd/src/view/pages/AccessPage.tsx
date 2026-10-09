import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Eye, EyeOff, FlaskConical, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import InstitutionalWatermark from '../components/InstitutionalWatermark';

interface Props {
  signIn: () => void;
  loading?: boolean;
  error?: string;
}

export default function AccessPage({ signIn, loading = false, error = '' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loading) signIn();
  }

  return (
    <div className="access-page">
      <section className="access-hero">
        <div className="access-brand">
          <img className="access-crest" src="/labmat-icon.svg" alt="Icono del Laboratorio Matemático" />
          <span>LAB<span>MAT</span></span>
        </div>
        <div className="access-hero-content">
          <span className="eyebrow light">LABORATORIO DE APRENDIZAJE</span>
          <h1>Las matemáticas se entienden <em>resolviendo.</em></h1>
          <p>Explora conceptos, calcula paso a paso y transforma cada ejercicio en aprendizaje.</p>
          <div className="access-highlights">
            <span><BookOpenCheck size={19} /> Cuatro áreas de estudio</span>
            <span><FlaskConical size={19} /> Procedimientos claros</span>
          </div>
        </div>
        <InstitutionalWatermark variant="access" />
        <div className="access-pattern" aria-hidden="true">∑<span>ƒ(x)</span></div>
      </section>

      <section className="access-form-area" aria-labelledby="login-title">
        <div className="access-card">
          <div className="access-card-icon"><img src="/labmat-icon.svg" alt="" /></div>
          <span className="eyebrow">BIENVENIDO A LABMAT</span>
          <h2 id="login-title">Inicia sesión</h2>
          <p className="muted">Accede a tu cuenta y continúa aprendiendo en el laboratorio.</p>

          <form onSubmit={submit} className="access-form" aria-busy={loading} noValidate>
            <div className="access-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <div className="input-icon">
                <Mail size={19} aria-hidden="true" />
                <input
                  id="login-email"
                  name="correo"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@correo.com"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="access-field">
              <label htmlFor="login-password">Contraseña</label>
              <div className="input-icon access-password">
                <LockKeyhole size={19} aria-hidden="true" />
                <input
                  id="login-password"
                  name="contrasena"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => setCapsLock(event.getModifierState('CapsLock'))}
                  onKeyUp={(event) => setCapsLock(event.getModifierState('CapsLock'))}
                  onBlur={() => setCapsLock(false)}
                  placeholder="Escribe tu contraseña"
                  autoComplete="current-password"
                  aria-describedby={capsLock ? 'login-caps-lock' : undefined}
                  disabled={loading}
                />
                <button
                  className="access-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  aria-controls="login-password"
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
                </button>
              </div>
              {capsLock && <p id="login-caps-lock" className="access-field-hint" role="status">El bloqueo de mayúsculas está activado.</p>}
            </div>

            {error && <p className="error-message access-error" role="alert">{error}</p>}
            <button type="submit" className="button button-primary full access-submit" disabled={loading}>
              {loading ? <><LoaderCircle className="access-spinner" size={18} aria-hidden="true" /> Iniciando sesión…</> : <>Iniciar sesión <ArrowRight size={18} aria-hidden="true" /></>}
            </button>
          </form>

          <p className="access-account-note">Utiliza la cuenta proporcionada por tu institución. Si necesitas ayuda con tu acceso, contacta al administrador del laboratorio.</p>
          <Link className="access-copyright" to="/derechos">Derechos de autor</Link>
        </div>
      </section>
    </div>
  );
}
