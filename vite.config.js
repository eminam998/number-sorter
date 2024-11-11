import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.jsx']),
        react(),
    ],
    css: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
});
