import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { setupDatabase } from './database/db';
import dataContext from './database/dataContext';

const IS_DEV = true

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,     
      contextIsolation: true
    }    
  });

  if (IS_DEV) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(async () => {

  await setupDatabase(); 

  createWindow();

  ipcMain.handle('getAllDishes', async () => {
    try {
      const dishes = await dataContext.getAllDishes();
      return dishes;
    } catch (error) {
      console.error('Errore in ipcMain handle getAllDishes:', error);
      throw error;
    }
  });

  ipcMain.handle('deleteDish', async (event, dishId) => {
    try {
      await dataContext.deleteDish(dishId);
      return;
    } catch (error) {
      console.error('Errore durante la eliminazione piatto:', error);
      return;
    }
  });

  ipcMain.handle('addDish', async (event, newDish) => {
    try {
      const dish = await dataContext.addDish(newDish);
      return dish;
    } catch (error) {
      console.error('Errore durante la creazione del piatto:', error);
      throw error;
    }
  });

  ipcMain.handle('updateDish', async (event, newDish) => {
    try {
      await dataContext.updateDish(newDish);
      return;
    } catch (error) {
      console.error('Errore durante la modifica del piatto:', error);
      throw error;
    }
  });

  ipcMain.handle('loadMenuFromDb', async (event) => {
    try {
      const menu = await dataContext.loadMenuFromDb();
      return menu;
    } catch (error) {
      console.error('Errore durante la get del menu:', error);
      throw error;
    }
  });

  ipcMain.handle('saveMenuToDb', async (event, menu) => {
    try {
      await dataContext.saveMenuToDb(menu);
      return;
    } catch (error) {
      console.error('Errore durante la modifica del menu:', error);
      throw error;
    }
  });

  ipcMain.handle('deleteMenuFromDb', async (event) => {
    try {
      await dataContext.deleteMenuFromDb();
      return;
    } catch (error) {
      console.error('Errore durante la eliminazione del menu:', error);
      throw error;
    }
  });
  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
