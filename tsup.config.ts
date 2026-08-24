import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        notify: 'src/index.ts',
    },
    format: ['cjs', 'esm', 'iife'],
    globalName: 'Notify',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    publicDir: 'src',
    footer({ format }) {
        if (format === 'iife') {
            return {
                js: 'if (typeof window !== "undefined" && window.Notify && window.Notify.default) { window.Notify = window.Notify.default; }',
            };
        }
    },
    outExtension({ format }) {
        if (format === 'iife') return { js: '.js' };
        if (format === 'esm') return { js: '.esm.js' };
        return { js: '.cjs.js' };
    },
});