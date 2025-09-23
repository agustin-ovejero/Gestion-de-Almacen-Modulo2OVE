// frontend/src/renderer.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Función asíncrona para preparar e iniciar el worker
async function enableMocking() {
  // Solo queremos ejecutar MSW en el entorno de desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Importamos el worker que configuramos
  const { worker } = await import('./mocks/browser');

  // Iniciamos el worker. La opción 'onUnhandledRequest' es útil para depurar.
  // 'bypass' significa que si una petición no tiene un manejador, se dejará pasar a la red real.
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

// Llamamos a la función y, una vez que el worker está listo, renderizamos la aplicación
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
