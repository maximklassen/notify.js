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
    outExtension({ format }) {
        if (format === 'iife') return { js: '.js' };      // dist/notify.js (for <script>)
        if (format === 'esm') return { js: '.esm.js' };   // dist/notify.esm.js
        return { js: '.cjs.js' };                         // dist/notify.cjs.js
    },
});