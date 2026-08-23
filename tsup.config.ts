import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    globalName: 'Notify',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    publicDir: 'src',
});