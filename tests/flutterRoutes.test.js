import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { RUTAS_FLUTTER, rutaFlutter, urlFlutter } from '../src/utils/flutterRoutes.js';

test('CA-3: la categoría elegida viaja a /login como contexto', () => {
  assert.equal(rutaFlutter('login', { servicio: 'plomeria' }), '/login?servicio=plomeria');
});

test('CA-3: el estimador conserva categoría, urgencia y alcance', () => {
  assert.equal(
    rutaFlutter('login', { servicio: 'pintura', urgencia: 'hoy', alcance: 'amplio' }),
    '/login?servicio=pintura&urgencia=hoy&alcance=amplio'
  );
});

test('CA-3: el aliado elegido viaja como contexto', () => {
  assert.equal(rutaFlutter('login', { aliado: 'exp-1' }), '/login?aliado=exp-1');
});

test('CA-3: valores vacíos y claves ajenas al contrato se descartan', () => {
  assert.equal(rutaFlutter('login', { servicio: ' ', token: 'x', tenant: 'y' }), '/login');
  assert.equal(rutaFlutter('registroCliente'), '/register-cliente');
});

test('CA-3: los valores se codifican', () => {
  assert.equal(rutaFlutter('login', { aliado: 'a b&c' }), '/login?aliado=a+b%26c');
});

test('CA-3: un destino que no existe en Flutter falla', () => {
  assert.throws(() => rutaFlutter('booking'));
});

test('urlFlutter une base y ruta sin barras dobles', () => {
  assert.equal(urlFlutter('https://mani.com.co/app/', '/login?servicio=plomeria'), 'https://mani.com.co/app/login?servicio=plomeria');
  assert.equal(urlFlutter('http://localhost:8080//'), 'http://localhost:8080');
});

// Verificación cruzada: si existe una copia de MANI-Flutter junto a este repositorio,
// cada ruta del contrato debe estar declarada en su router.
test('CA-3: las rutas del contrato existen en el router de MANI-Flutter', (t) => {
  const ruta = process.env.MANI_FLUTTER_ROUTER;
  if (!ruta) {
    t.skip('Define MANI_FLUTTER_ROUTER con la ruta a app_router.dart para comprobarlo');
    return;
  }
  const router = readFileSync(ruta, 'utf8');
  for (const destino of Object.values(RUTAS_FLUTTER)) {
    assert.ok(router.includes(`path: '${destino}'`), destino);
  }
});
