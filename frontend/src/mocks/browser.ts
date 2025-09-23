// frontend/src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Esta configuración prepara el Service Worker con los manejadores de peticiones que definimos.
export const worker = setupWorker(...handlers);
