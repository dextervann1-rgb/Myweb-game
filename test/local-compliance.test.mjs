import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Android Target SDK 36 Configuration', () => {
  const gradleApp = fs.readFileSync('android/app/build.gradle', 'utf8');
  assert.match(gradleApp, /targetSdk\s+rootProject\.ext\.targetSdkVersion\s+\?:\s+36/, 'App build.gradle must target SDK 36');
  assert.match(gradleApp, /compileSdk\s+rootProject\.ext\.compileSdkVersion\s+\?:\s+36/, 'App build.gradle must compile with SDK 36');

  const variablesGradle = fs.readFileSync('android/variables.gradle', 'utf8');
  assert.match(variablesGradle, /targetSdkVersion\s*=\s*36/, 'variables.gradle must specify targetSdkVersion = 36');
  assert.match(variablesGradle, /compileSdkVersion\s*=\s*36/, 'variables.gradle must specify compileSdkVersion = 36');

  const twaManifest = JSON.parse(fs.readFileSync('packages/frontend/public/twa-manifest.json', 'utf8'));
  assert.equal(twaManifest.targetSdkVersion, 36, 'TWA manifest targetSdkVersion must be 36');
});

test('Zero Dangerous Storage Permissions Compliance', () => {
  const manifest = fs.readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
  assert.ok(!manifest.includes('READ_EXTERNAL_STORAGE'), 'Must not declare READ_EXTERNAL_STORAGE');
  assert.ok(!manifest.includes('WRITE_EXTERNAL_STORAGE'), 'Must not declare WRITE_EXTERNAL_STORAGE');
  assert.ok(!manifest.includes('MANAGE_EXTERNAL_STORAGE'), 'Must not declare MANAGE_EXTERNAL_STORAGE');
  assert.ok(manifest.includes('android.permission.INTERNET'), 'Must declare INTERNET');
});

test('Native Deep Linking (omega://wallet-return)', () => {
  const manifest = fs.readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
  assert.match(manifest, /android:scheme="omega"/, 'AndroidManifest must handle omega scheme');
  assert.match(manifest, /android:host="wallet-return"/, 'AndroidManifest must handle wallet-return host');
});

test('Capacitor Configuration & App Identity', () => {
  const capConfig = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));
  assert.equal(capConfig.appId, 'com.abbadivinevision.omega');
  assert.equal(capConfig.server?.androidScheme, 'https');
  assert.ok(capConfig.server?.allowNavigation?.includes('base.org'), 'Must allow Base L2 navigation');
});

test('Frontend Production Build Verification', () => {
  assert.ok(fs.existsSync('packages/frontend/.next'), 'Frontend .next build directory must exist');
});
