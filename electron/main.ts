import { app, BrowserWindow } from 'electron';
import path from 'path';
import { setupDatabase, insertMockDish } from './database/db';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Usa questo solo se necessario
      contextIsolation: false, // Disabilita per maggiore compatibilità
    },
  });

  // Carica la pagina di Vite
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(async () => {

  await setupDatabase(); 

  await insertMockDish();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
