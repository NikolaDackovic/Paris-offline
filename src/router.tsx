import { useEffect, useState } from 'react';

export type Route = string[]; // npr. ['vise', 'prevoz', 'montmartre']

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean).map(decodeURIComponent);
  return parts.length ? parts : ['danas'];
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function go(path: string) {
  const target = '#/' + path.replace(/^#?\/?/, '');
  if (window.location.hash !== target) window.location.hash = target;
}

export function back(fallback: string) {
  // Ako postoji istorija unutar aplikacije, vrati se; inače idi na roditeljsku stranu
  if (window.history.length > 1 && sessionStorage.getItem('navCount') !== '0') {
    window.history.back();
  } else {
    go(fallback);
  }
}
