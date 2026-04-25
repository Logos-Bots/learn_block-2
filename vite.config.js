import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { htmlControlPlugin } from './vite-plugin-html-control.js';

export default defineConfig({
  plugins: [tailwindcss(), htmlControlPlugin()],
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '',

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',

        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';

          // CSS файлы — в корень dist/
          if (name.endsWith('.css')) {
            return '[name].[hash][extname]';
          }

          // Шрифты
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
            return 'assets/fonts/[name].[hash][extname]';
          }

          // Иконки (SVG, ICO)
          if (/\.(svg|ico|icns)$/i.test(name)) {
            return 'assets/icons/[name].[hash][extname]';
          }

          // Изображения
          if (/\.(png|jpe?g|gif|webp|avif)$/i.test(name)) {
            return 'assets/images/[name].[hash][extname]';
          }

          // Видео и аудио
          if (/\.(mp4|webm|ogg|mp3|wav)$/i.test(name)) {
            return 'assets/media/[name].[hash][extname]';
          }

          // Остальные файлы
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
    },
  },
});
