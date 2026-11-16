// Ručno nacrtana skica okoline smeštaja — samo orijentir, nije u razmeri i nije navigaciona mapa.

export default function NeighborhoodMap() {
  return (
    <figure className="hood-map">
      <svg viewBox="0 0 360 270" role="img" aria-label="Skica okoline smeštaja: Rue Lassus, crkva i metro Jourdain">
        <rect width="360" height="270" rx="14" fill="#FBF7F0" />
        {/* Parkovi u daljini */}
        <ellipse cx="46" cy="42" rx="44" ry="26" fill="#D9E6CF" />
        <ellipse cx="60" cy="236" rx="52" ry="26" fill="#D9E6CF" />

        {/* Ulice */}
        <path d="M-10 182 L 190 150 L 370 118" stroke="#E6DCCB" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M190 150 L 300 30" stroke="#E6DCCB" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M190 150 L 222 280" stroke="#E6DCCB" strokeWidth="12" strokeLinecap="round" fill="none" />

        <text x="40" y="186" className="hm-street" transform="rotate(-9 40 186)">
          Rue de Belleville
        </text>
        <text x="236" y="84" className="hm-street" transform="rotate(-47 236 84)">
          Rue Lassus
        </text>
        <text x="214" y="240" className="hm-street" transform="rotate(76 214 240)">
          Rue du Jourdain
        </text>

        {/* Crkva sa dva tornja */}
        <g transform="translate(152 104)">
          <rect x="0" y="16" width="30" height="22" fill="#fff" stroke="#1F2433" strokeWidth="1.4" />
          <path d="M2 16 V2 L6 -6 L10 2 V16 M20 16 V2 L24 -6 L28 2 V16" fill="#fff" stroke="#1F2433" strokeWidth="1.4" />
          <path d="M12 38 V28 a3 3 0 0 1 6 0 V38" fill="none" stroke="#1F2433" strokeWidth="1.2" />
        </g>
        <text x="120" y="98" className="hm-label">crkva</text>
        <text x="104" y="88" className="hm-small">(orijentir — dva tornja)</text>

        {/* Metro Jourdain */}
        <g transform="translate(206 158)">
          <circle r="13" fill="#704B1C" />
          <text y="5" textAnchor="middle" className="hm-m">
            M
          </text>
        </g>
        <text x="224" y="175" className="hm-label">Metro Jourdain</text>
        <text x="224" y="187" className="hm-small">linija 11 · 3 ulaza</text>

        {/* Smeštaj */}
        <g transform="translate(236 112)">
          <circle r="12" fill="#2F5D8C" />
          <path d="M-6 2 l6 -6 l6 6 v6 h-12 z" fill="#fff" />
        </g>
        <text x="252" y="110" className="hm-home">Smeštaj</text>
        <text x="252" y="122" className="hm-small">5 Rue Lassus (približno)</text>

        {/* Pravci */}
        <text x="10" y="18" className="hm-dir">↖ Buttes-Chaumont</text>
        <text x="10" y="30" className="hm-small">park · 10–15 min</text>
        <text x="8" y="150" className="hm-dir">← Belleville</text>
        <text x="8" y="162" className="hm-small">nizbrdo · 15 min</text>
        <text x="10" y="226" className="hm-dir">↙ Parc de Belleville</text>
        <text x="10" y="238" className="hm-small">pogled na Pariz · 15 min</text>
        <text x="282" y="18" className="hm-dir">Place des Fêtes ↗</text>

        {/* Sever */}
        <g transform="translate(334 248)">
          <circle r="11" fill="#fff" stroke="#E2D7C5" />
          <path d="M0 -7 L3.5 3.5 L0 1 L-3.5 3.5 Z" fill="#2F5D8C" />
          <text y="-13" textAnchor="middle" className="hm-small">S</text>
        </g>
      </svg>
      <figcaption className="small muted">
        Skica samo za orijentaciju — nije u razmeri, položaj zgrade je približan. Glavni orijentir: velika crkva sa dva tornja, metro je odmah kod nje.
      </figcaption>
    </figure>
  );
}
