// SCRUM-1721 (QAS-34, WCAG 2.2 AA): texto y fondo de cada variante del botón con relleno cumplen 4,5:1 o más.
// Lee los colores de src/index.css y de src/components/common/Button.jsx, así que si alguien cambia un color el
// contraste se vuelve a medir solo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const MINIMO_AA = 4.5;
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const boton = readFileSync(new URL('../src/components/common/Button.jsx', import.meta.url), 'utf8');

const variables = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));

/** `var(--color-navy)` o `#FFFFFF` a `#RRGGBB`. */
function resolver(valor) {
  const v = valor.trim();
  const m = /^var\(--([a-z0-9-]+)\)$/.exec(v);
  if (m) {
    assert.ok(variables[m[1]], `la variable --${m[1]} no está definida en index.css`);
    return variables[m[1]];
  }
  assert.match(v, /^#[0-9a-fA-F]{6}$/, `color no reconocido: ${v}`);
  return v;
}

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a, b) {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

/** Variantes con relleno sólido: `case 'x': return { backgroundColor: ..., color: ... }`. `ghost` es transparente: su texto va sobre la página. */
const variantes = [...boton.matchAll(/case '([a-z]+)':\s*(?:\/\/[^\n]*\n\s*)*return \{\s*backgroundColor: '([^']+)',\s*color: '([^']+)'/g)]
  .filter((m) => m[2] !== 'transparent')
  .map((m) => ({
    nombre: m[1],
    fondo: resolver(m[2]),
    texto: resolver(m[3]),
  }));

test('se encontraron las variantes con relleno del botón', () => {
  const nombres = variantes.map((v) => v.nombre);
  for (const esperada of ['primary', 'secondary', 'navy', 'outline']) assert.ok(nombres.includes(esperada), `falta la variante ${esperada}`);
});

for (const v of variantes) {
  test(`botón ${v.nombre}: contraste de texto ${v.texto} sobre ${v.fondo} de ${MINIMO_AA}:1 o más`, () => {
    const medido = contraste(v.texto, v.fondo);
    assert.ok(medido >= MINIMO_AA, `la variante ${v.nombre} da ${medido.toFixed(2)}:1 y AA pide ${MINIMO_AA}:1`);
  });
}

test('SCRUM-1721: el botón principal ya no usa el rojo base con texto blanco (3,68:1)', () => {
  const principal = variantes.find((v) => v.nombre === 'primary');
  assert.ok(contraste(principal.texto, principal.fondo) >= MINIMO_AA);
  assert.ok(contraste('#FFFFFF', variables['color-red']) < MINIMO_AA, 'si el rojo base ya cumple, esta prueba sobra');
});

test('la función de contraste coincide con valores conocidos', () => {
  assert.equal(contraste('#000000', '#FFFFFF').toFixed(1), '21.0');
  assert.equal(contraste('#FFFFFF', '#E4572E').toFixed(2), '3.68');
});
