// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Esta configuración es SOLO para el Proceso de Renderizado (React)
export default defineConfig({
  plugins: [react()],
});
