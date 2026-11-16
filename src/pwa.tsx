import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface PwaState {
  online: boolean;
  offlineReady: boolean; // service worker je keširao sve fajlove
  swSupported: boolean;
  needRefresh: boolean;
  standalone: boolean;
  applyUpdate: () => void;
}

const PwaCtx = createContext<PwaState>({
  online: true,
  offlineReady: false,
  swSupported: false,
  needRefresh: false,
  standalone: false,
  applyUpdate: () => undefined
});

const READY_KEY = 'pariz-offline-ready';

let updateFn: ((reload?: boolean) => Promise<void>) | null = null;

export function PwaProvider({ children }: { children: ReactNode }) {
  const swSupported = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
  const [online, setOnline] = useState(navigator.onLine);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(() => {
    try {
      return localStorage.getItem(READY_KEY) === '1' && !!navigator.serviceWorker?.controller;
    } catch {
      return false;
    }
  });
  const standalone =
    (typeof window !== 'undefined' && window.matchMedia?.('(display-mode: standalone)').matches) ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    if (!swSupported || import.meta.env.DEV) return;
    const markReady = () => {
      setOfflineReady(true);
      try {
        localStorage.setItem(READY_KEY, '1');
      } catch {
        /* */
      }
    };
    updateFn = registerSW({
      immediate: true,
      onOfflineReady: markReady,
      onNeedRefresh: () => setNeedRefresh(true),
      onRegisteredSW: (_url, reg) => {
        // Ako je SW već aktivan i kontroliše stranicu, keš je spreman
        if (reg?.active && navigator.serviceWorker.controller) markReady();
        // Proveri novu verziju kad je internet dostupan (bez uticaja na offline rad)
        if (reg) {
          window.setInterval(() => {
            if (navigator.onLine) reg.update().catch(() => undefined);
          }, 60 * 60 * 1000);
        }
      }
    });
    navigator.serviceWorker.ready.then(() => {
      if (navigator.serviceWorker.controller) markReady();
    });
    const onCtrl = () => markReady();
    navigator.serviceWorker.addEventListener('controllerchange', onCtrl);
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onCtrl);
  }, [swSupported]);

  const applyUpdate = () => {
    if (updateFn) updateFn(true);
    else window.location.reload();
  };

  return (
    <PwaCtx.Provider value={{ online, offlineReady, swSupported, needRefresh, standalone, applyUpdate }}>{children}</PwaCtx.Provider>
  );
}

export const usePwa = () => useContext(PwaCtx);

export function OfflineBadge({ compact = false }: { compact?: boolean }) {
  const { online, offlineReady } = usePwa();
  let tone = 'ok';
  let label = 'Spremno za offline';
  if (!offlineReady) {
    tone = 'warn';
    label = online ? 'Priprema za offline…' : 'Offline keš nije spreman';
  }
  if (!online && offlineReady) {
    tone = 'off';
    label = 'Bez interneta · sve radi';
  }
  return (
    <span className={'offline-badge offline-badge--' + tone + (compact ? ' offline-badge--compact' : '')}>
      <span className="offline-badge__dot" />
      {label}
    </span>
  );
}
