import { test } from 'node:test';
import assert from 'node:assert/strict';

import { SERVICES_DATA } from '../src/constants/servicesData.js';
import {
  ALCANCES,
  AVISO_ESTIMACION,
  URGENCIAS,
  estimarRango,
  formatearCop,
} from '../src/utils/estimator.js';

test('CA-1: toda categoría del catálogo tiene tarifa base en COP', () => {
  assert.ok(SERVICES_DATA.length > 0);
  for (const s of SERVICES_DATA) {
    assert.ok(Number.isInteger(s.tarifaBase) && s.tarifaBase > 0, s.id);
  }
});

test('CA-2: el rango depende de categoría, urgencia y alcance', () => {
  const plomeria = { tarifaBase: 80000 };
  assert.deepEqual(estimarRango(plomeria, 'programado', 'sencillo'), { min: 80000, max: 120000 });
  assert.deepEqual(estimarRango(plomeria, 'hoy', 'sencillo'), { min: 104000, max: 156000 });
  assert.deepEqual(estimarRango(plomeria, 'programado', 'amplio'), { min: 240000, max: 360000 });
});

test('CA-2: más urgencia o más alcance nunca bajan el rango', () => {
  for (const s of SERVICES_DATA) {
    for (const a of ALCANCES) {
      const valores = URGENCIAS.map((u) => estimarRango(s, u.id, a.id).min);
      assert.deepEqual([...valores].sort((x, y) => y - x), valores, `${s.id}/${a.id}`);
    }
    for (const u of URGENCIAS) {
      const valores = ALCANCES.map((a) => estimarRango(s, u.id, a.id).min);
      assert.deepEqual([...valores].sort((x, y) => x - y), valores, `${s.id}/${u.id}`);
    }
  }
});

test('CA-2: el rango es un intervalo, redondeado a miles', () => {
  for (const s of SERVICES_DATA) {
    const { min, max } = estimarRango(s, 'manana', 'medio');
    assert.ok(min < max, s.id);
    assert.equal(min % 1000, 0);
    assert.equal(max % 1000, 0);
  }
});

test('CA-2: opciones desconocidas o categoría sin tarifa fallan en vez de inventar un valor', () => {
  assert.throws(() => estimarRango({ tarifaBase: 80000 }, 'ayer', 'sencillo'));
  assert.throws(() => estimarRango({ tarifaBase: 80000 }, 'hoy', 'enorme'));
  assert.throws(() => estimarRango({}, 'hoy', 'sencillo'));
});

test('CA-2: el aviso dice que no es una cotización formal', () => {
  assert.match(AVISO_ESTIMACION, /estimación/i);
  assert.match(AVISO_ESTIMACION, /no una cotización formal/i);
});

test('formatearCop usa pesos colombianos sin decimales', () => {
  assert.match(formatearCop(104000), /^\$\s?104\.000$/);
});
