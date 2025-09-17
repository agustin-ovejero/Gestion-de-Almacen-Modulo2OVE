import { contextBridge } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí puedes exponer funciones específicas que tu React puede llamar.
  // Ejemplo: ping: () => ipcRenderer.invoke('ping')
  // Por ahora, lo dejamos vacío.
});
