// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Esta configuración es SOLO para el Proceso de Renderizado (React)
export default defineConfig({
  plugins: [react()],
  server: {
    // Configuración para permitir que MSW intercepte las peticiones
    middlewareMode: false,
    // Configurar proxy para las rutas de API si es necesario
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        // Importante: no reescribir la ruta para que MSW pueda interceptarla
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
