// SCRUM-1735 (QAS-34, WCAG 2.3.3 y 2.2.2): con «reducir movimiento» activo la landing no anima ni reproduce el video sola.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { prefiereMovimientoReducido, CONSULTA_MOVIMIENTO_REDUCIDO } from '../src/utils/movimientoReducido.js';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const video = readFileSync(new URL('../src/components/sections/video/MascotVideoSection.jsx', import.meta.url), 'utf8');

const ventana = (reduce) => ({ matchMedia: (q) => ({ matches: q === CONSULTA_MOVIMIENTO_REDUCIDO && reduce }) });

test('detecta la preferencia del sistema', () => {
  assert.equal(prefiereMovimientoReducido(ventana(true)), true);
  assert.equal(prefiereMovimientoReducido(ventana(false)), false);
});

test('sin ventana, sin matchMedia o con un error, se asume que no hay preferencia', () => {
  assert.equal(prefiereMovimientoReducido(undefined), false);
  assert.equal(prefiereMovimientoReducido({}), false);
  assert.equal(prefiereMovimientoReducido({ matchMedia: () => { throw new Error('x'); } }), false);
});

test('la hoja de estilos desactiva animaciones, transiciones y el desplazamiento suave con la preferencia activa', () => {
  const bloque = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}\n?/.exec(css);
  assert.ok(bloque, 'falta @media (prefers-reduced-motion: reduce) en index.css');
  assert.match(bloque[1], /animation-duration:\s*0\.01ms\s*!important/);
  assert.match(bloque[1], /animation-iteration-count:\s*1\s*!important/);
  assert.match(bloque[1], /transition-duration:\s*0\.01ms\s*!important/);
  assert.match(bloque[1], /scroll-behavior:\s*auto/);
});

test('el video de la mascota no arranca solo con la preferencia activa', () => {
  assert.match(video, /prefiereMovimientoReducido\(\)/);
  assert.match(video, /autoPlay=\{!sinMovimiento\}/);
  assert.doesNotMatch(video, /^\s*autoPlay\s*$/m, 'autoPlay fijo: no respeta la preferencia');
});

test('el carrusel de la app solo avanza con una acción de la persona (no hay temporizador)', () => {
  const carrusel = readFileSync(new URL('../src/components/sections/appPreview/AppPreviewSection.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(carrusel, /setInterval|setTimeout|requestAnimationFrame/);
});
