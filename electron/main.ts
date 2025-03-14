import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { setupDatabase, insertMockDish } from './database/db';
import dataContext from './database/dataContext';

const IS_DEV = true

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (IS_DEV) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(async () => {

  await setupDatabase(); 

  await insertMockDish(); // MOCK TO REMOVE

  createWindow();

  ipcMain.handle('getAllDishes', async () => {
    return await dataContext.getAllDishes();
  });

  // ..altri 
  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
