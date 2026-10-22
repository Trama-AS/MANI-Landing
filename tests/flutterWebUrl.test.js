import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolverUrlFlutter, urlFlutterInicial } from '../src/config/flutterWebUrl.js';

const ubicacion = (url) => {
  const { protocol, hostname, port, origin } = new URL(url);
  return { protocol, hostname, port, origin };
};

const hostDev = ubicacion('http://10.0.0.5:3001/');

test('la URL de compilación del ambiente tiene prioridad', () => {
  assert.equal(resolverUrlFlutter('http://10.0.0.5:8080', hostDev), 'http://10.0.0.5:8080');
  assert.equal(resolverUrlFlutter('  https://app.mani.com.co  ', hostDev), 'https://app.mani.com.co');
});

test('sin URL de compilación, la landing en :3001 apunta a Flutter en :8080 del mismo host', () => {
  assert.equal(resolverUrlFlutter(undefined, hostDev), 'http://10.0.0.5:8080');
  assert.equal(resolverUrlFlutter('', ubicacion('https://mani.test:3001/')), 'https://mani.test:8080');
});

test('sin URL de compilación, la landing en el puerto estándar usa el despliegue unificado /app', () => {
  assert.equal(resolverUrlFlutter(undefined, ubicacion('https://mani.com.co/')), 'https://mani.com.co/app');
});

test('en un equipo local apunta a localhost:8080', () => {
  assert.equal(resolverUrlFlutter(undefined, ubicacion('http://localhost:5173/')), 'http://localhost:8080');
  assert.equal(resolverUrlFlutter(undefined, ubicacion('http://127.0.0.1:3001/')), 'http://localhost:8080');
  assert.equal(resolverUrlFlutter(undefined, undefined), 'http://localhost:8080');
});

test('un ajuste manual guardado se respeta', () => {
  assert.equal(urlFlutterInicial('http://otra:9090', 'http://10.0.0.5:8080', hostDev), 'http://otra:9090');
  assert.equal(urlFlutterInicial(null, 'http://10.0.0.5:8080', hostDev), 'http://10.0.0.5:8080');
});

test('se descartan los respaldos que guardaban versiones anteriores', () => {
  const porDefecto = 'http://10.0.0.5:8080';
  assert.equal(urlFlutterInicial('http://10.0.0.5:3001/app', porDefecto, hostDev), porDefecto);
  assert.equal(urlFlutterInicial('http://10.0.0.5:3001/app/', porDefecto, hostDev), porDefecto);
  assert.equal(urlFlutterInicial('http://localhost:8080', porDefecto, hostDev), porDefecto);
});

test('en un equipo local se conserva localhost guardado', () => {
  const local = ubicacion('http://localhost:5173/');
  assert.equal(urlFlutterInicial('http://localhost:9000', 'http://localhost:8080', local), 'http://localhost:9000');
});
