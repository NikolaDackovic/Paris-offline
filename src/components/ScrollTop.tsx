import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Plutajuće dugme „na vrh” — pojavljuje se kad se skroluje niže od ~1,5 ekrana.
export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > window.innerHeight * 0.8));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
    };
  }, []);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  return (
    <button
      type="button"
      className={'scroll-top' + (show ? ' is-visible' : '')}
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      aria-label="Nazad na vrh"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={22} />
    </button>
  );
}
