import { useState } from 'react';
import type { UserSession } from '../model/types';

export function useSessionController() {
  const [session, setSession] = useState<UserSession | null>(null);
  // Acceso local para revisar el frontend. El backend integrará la autenticación.
  function signIn() {
    setSession({ name: 'Estudiante', mode: 'demo' });
  }
  function signOut() { setSession(null); }
  return { session, signIn, signOut };
}
