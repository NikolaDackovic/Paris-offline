// Generiše PNG ikonice iz SVG-a (iOS ne podržava SVG ikonice za početni ekran).
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

const tower = (cx, top, h, color) => {
  // Stilizovana Ajfelova kula, skalirana prema visini h
  const s = h / 100;
  const X = (v) => (cx + v * s).toFixed(1);
  const Y = (v) => (top + v * s).toFixed(1);
  return `
  <g fill="${color}">
    <rect x="${X(-1.2)}" y="${Y(0)}" width="${(2.4 * s).toFixed(1)}" height="${(8 * s).toFixed(1)}"/>
    <path d="M${X(-4)} ${Y(8)} H${X(4)} L${X(6)} ${Y(40)} H${X(-6)} Z"/>
    <rect x="${X(-10)}" y="${Y(40)}" width="${(20 * s).toFixed(1)}" height="${(4 * s).toFixed(1)}" rx="${s}"/>
    <path d="M${X(-8)} ${Y(44)} H${X(8)} L${X(13)} ${Y(64)} H${X(-13)} Z"/>
    <rect x="${X(-17)}" y="${Y(64)}" width="${(34 * s).toFixed(1)}" height="${(4.5 * s).toFixed(1)}" rx="${s}"/>
    <path d="M${X(-15)} ${Y(68.5)} H${X(15)} L${X(26)} ${Y(100)} H${X(14)} Q${X(0)} ${Y(76)} ${X(-14)} ${Y(100)} H${X(-26)} Z"/>
  </g>`;
};

const iconSvg = (size, { pad = 0, rounded = true } = {}) => {
  const r = rounded ? size * 0.22 : 0;
  const inner = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4A7DB0"/>
      <stop offset="1" stop-color="#24476E"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/>
  <circle cx="${size * 0.5}" cy="${pad + inner * 0.46}" r="${inner * 0.34}" fill="#F7F2EA" opacity="0.10"/>
  ${tower(size / 2, pad + inner * 0.14, inner * 0.62, '#F7F2EA')}
  <rect x="${pad + inner * 0.22}" y="${pad + inner * 0.82}" width="${inner * 0.56}" height="${inner * 0.012}" fill="#E9C9A0" opacity="0.9"/>
</svg>`;
};

mkdirSync('public/icons', { recursive: true });
const jobs = [
  ['public/icons/icon-192.png', 192, {}],
  ['public/icons/icon-512.png', 512, {}],
  ['public/icons/icon-maskable-512.png', 512, { pad: 70, rounded: false }],
  // iOS sam zaobljava ikonicu, zato bez zaobljenja
  ['public/icons/apple-touch-icon.png', 180, { rounded: false }]
];
for (const [file, size, opts] of jobs) {
  await sharp(Buffer.from(iconSvg(size, opts))).png().toFile(file);
  console.log('napravljeno', file);
}
writeFileSync('public/icons/icon.svg', iconSvg(512));
