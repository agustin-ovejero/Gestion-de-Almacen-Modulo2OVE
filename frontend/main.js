// frontend/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Maneja la creación/eliminación de accesos directos en Windows al instalar/desinstalar.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Crea la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // __dirname apunta al directorio del script actual (la raíz de frontend/)
      // y funcionará de forma nativa porque estamos en un archivo CommonJS.
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // --- ¡AQUÍ ESTÁ EL CAMBIO CLAVE! ---
  // Comprueba si la aplicación NO está empaquetada (es decir, estamos en desarrollo)
  if (!app.isPackaged) {
    // Carga la URL del servidor de desarrollo de Vite.
    // Asegúrate de que el puerto coincida con el que Vite usa (5173 es el default).
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Carga el index.html de la app en producción (desde la carpeta dist).
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

// Este método se llamará cuando Electron haya finalizado la inicialización.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cierra la app cuando todas las ventanas se han cerrado (excepto en macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
