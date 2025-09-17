// frontend/preload.js
const { contextBridge } = require('electron');

// Expone APIs seguras al proceso de renderizado (tu app de React)
contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí puedes exponer funciones que tu React puede llamar.
  // Por ejemplo:
  // getAppName: () => 'Mi Aplicación WMS',
});
