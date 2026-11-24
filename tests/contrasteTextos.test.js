// SCRUM-1734 (QAS-34, WCAG 1.4.3): ningún texto de la landing usa el naranja de marca (#E4572E, 3,68:1 sobre blanco) ni el
// amarillo como color de texto sobre fondos claros. Lee los colores de src/index.css y de los componentes, así que si
// alguien cambia un color o agrega un texto naranja el contraste se vuelve a medir solo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MINIMO_AA = 4.5;
const raiz = fileURLToPath(new URL('../src/', import.meta.url));
const css = readFileSync(join(raiz, 'index.css'), 'utf8');
const variables = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contraste = (a, b) => {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
};

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const ruta = join(dir, n);
    return statSync(ruta).isDirectory() ? archivos(ruta) : /\.jsx?$/.test(n) ? [ruta] : [];
  });
}
const fuentes = archivos(raiz).map((ruta) => ({ ruta: ruta.replace(raiz, 'src/'), texto: readFileSync(ruta, 'utf8') }));

// Fondos claros sobre los que puede ir texto naranja.
const FONDOS_CLAROS = ['#FFFFFF', variables['color-cream'], variables['color-cream-soft'], variables['color-cream-dark'], variables['color-red-light'], variables['color-yellow-light'], '#F8FAFC'];

test('el naranja para texto (--color-red-text) cumple 4,5:1 sobre todos los fondos claros', () => {
  const texto = variables['color-red-text'];
  assert.ok(texto, 'falta --color-red-text en index.css');
  for (const fondo of FONDOS_CLAROS) {
    assert.ok(contraste(texto, fondo) >= MINIMO_AA, `${texto} sobre ${fondo}: ${contraste(texto, fondo).toFixed(2)}:1`);
  }
});

test('el naranja de marca no alcanza 4,5:1: por eso no puede ser color de texto', () => {
  assert.ok(contraste(variables['color-red'], '#FFFFFF') < MINIMO_AA);
});

test('ningún componente usa --color-red ni --color-yellow como color de TEXTO sobre fondo claro', () => {
  const infractores = [];
  for (const { ruta, texto } of fuentes) {
    // `color: 'var(--color-red)'` (no `backgroundColor`, `borderColor` ni `color=` de un icono).
    for (const m of texto.matchAll(/(?<![A-Za-z])color:\s*'var\(--color-(red|yellow)\)'/g)) {
      const linea = texto.slice(0, m.index).split('\n').length;
      infractores.push(`${ruta}:${linea} (${m[0]})`);
    }
  }
  // El amarillo sí es texto legible sobre el azul marino (barra de desarrollo, banner y pie): se permite solo ahí.
  const permitidos = ['Navbar.jsx', 'CallToActionBanner.jsx', 'Footer.jsx'];
  const reales = infractores.filter((i) => !permitidos.some((p) => i.includes(p)));
  assert.deepEqual(reales, [], `texto naranja o amarillo sin contraste suficiente:\n${reales.join('\n')}`);
});

test('el amarillo como texto solo aparece en componentes con fondo azul marino y rinde 4,5:1 sobre él', () => {
  assert.ok(contraste(variables['color-yellow'], variables['color-navy']) >= MINIMO_AA);
  for (const nombre of ['Navbar.jsx', 'CallToActionBanner.jsx', 'Footer.jsx']) {
    const f = fuentes.find((x) => x.ruta.endsWith(nombre));
    assert.ok(f && /--color-navy\)/.test(f.texto), `${nombre} debería tener fondo azul marino`);
  }
});

test('el texto blanco sobre fondo naranja usa la variante oscura (4,5:1 o más)', () => {
  const f = fuentes.find((x) => x.ruta.endsWith('CallToActionBanner.jsx')).texto;
  assert.match(f, /backgroundColor: 'var\(--color-red-hover\)', color: 'white'/);
  assert.ok(contraste(variables['color-red-hover'], '#FFFFFF') >= MINIMO_AA);
});

test('los valores de marca usan un color de texto aparte del de acento, con 4,5:1 sobre blanco y crema', async () => {
  const { BRAND_VALUES } = await import('../src/constants/brandData.js');
  for (const v of BRAND_VALUES) {
    assert.ok(v.textColor, `${v.id}: falta textColor (el acento ${v.accentColor} es solo para iconos y decoración)`);
    for (const fondo of ['#FFFFFF', variables['color-cream'], variables['color-cream-soft']]) {
      assert.ok(contraste(v.textColor, fondo) >= MINIMO_AA, `${v.id}: ${v.textColor} sobre ${fondo} = ${contraste(v.textColor, fondo).toFixed(2)}:1`);
    }
  }
});

test('el texto de derechos del pie rinde 4,5:1 sobre el azul marino oscuro', () => {
  const pie = fuentes.find((x) => x.ruta.endsWith('layout/Footer.jsx')).texto;
  const color = /color:\s*'(#[0-9A-Fa-f]{6})',\s*fontSize: '0\.85rem'/.exec(pie)?.[1];
  assert.ok(color, 'no encontré el color del texto de derechos');
  assert.ok(contraste(color, variables['color-navy-dark']) >= MINIMO_AA, `${color}: ${contraste(color, variables['color-navy-dark']).toFixed(2)}:1`);
});
