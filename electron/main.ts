import { app, BrowserWindow } from 'electron';
import path from 'path';
import { setupDatabase } from './database/db'; // La collegheremo a breve!

// Riferimento alla finestra principale
let mainWindow: BrowserWindow | null;

import { ipcMain } from 'electron';

ipcMain.handle('ping', async () => {
  console.log('Ping ricevuto da React');
  return 'Pong dal Main!';
});


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // il preload va transpiled prima
      contextIsolation: true, // sicurezza
      nodeIntegration: false, // sicurezza
    },
  });

  // Durante lo sviluppo carica da Vite
  mainWindow.loadURL('http://localhost:5173');

  // Apri DevTools se vuoi (facoltativo)
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Su macOS riapre la finestra se non ce ne sono
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // Su macOS non chiude l'app quando chiudi la finestra
  if (process.platform !== 'darwin') app.quit();
});
