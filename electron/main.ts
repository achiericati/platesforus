import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { setupDatabase, getDb } from './database/db';
import dataContext from './database/dataContext';
import { Dish } from './database/interfaces';
import { dialog } from 'electron';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const IS_DEV = false;

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
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

  ipcMain.handle('exportDishesToCSV', async (event, dishes: Dish[]) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Salva i piatti come CSV',
      defaultPath: 'piatti.csv',
      filters: [{ name: 'CSV', extensions: ['csv'] }],
    });

    if (!filePath) return;

    const header = 'Nome,Categoria,Difficoltà,Tempo Preparazione,Ricetta,Piatto Speciale';
    const rows = dishes.map(d =>
      `"${d.name}","${d.category}","${d.difficulty}","${d.prepTime}","${(d.recipe || '').replace(/"/g, '""')}","${d.isSpecial ? 'Si' : 'No'}"`
    );

    const csvContent = [header, ...rows].join('\n');

    fs.writeFileSync(filePath, csvContent, 'utf8');
  });

  ipcMain.handle('importDishesFromCSV', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'Importa CSV di piatti',
      filters: [{ name: 'CSV', extensions: ['csv'] }],
      properties: ['openFile'],
    });

    if (canceled || filePaths.length === 0) return [];

    const db = getDb();

    const content = fs.readFileSync(filePaths[0], 'utf8');
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    const existing = await db.all('SELECT name FROM dish');
    const existingNames = new Set(existing.map((r: any) => r.name.trim().toLowerCase()));

    const newDishes = records
      .filter((r: any) => r['Nome'] && !existingNames.has(r['Nome'].trim().toLowerCase()))
      .map((r: any) => ({
        name: r['Nome'],
        category: r['Categoria'],
        difficulty: r['Difficoltà'],
        prepTime: parseInt(r['Tempo Preparazione']) || 0,
        recipe: r['Ricetta'] || '',
        isSpecial: r['Piatto Speciale']?.toLowerCase() === 'sì' ? 1 : 0
      }));

    const stmt = await db.prepare('INSERT INTO dish (name, category, difficulty, prepTime, recipe, isSpecial) VALUES (?, ?, ?, ?, ?, ?)');
    for (const dish of newDishes) {
      await stmt.run(dish.name, dish.category, dish.difficulty, dish.prepTime, dish.recipe, dish.isSpecial ? 1 : 0);
    }
    await stmt.finalize();

    dataContext.invalidateDishesCache();

    return newDishes;
  });

  ipcMain.handle('askSaveFile', async (_, options) => {
    const { filePath, canceled } = await dialog.showSaveDialog(options);
    return canceled ? undefined : filePath;
  });

  ipcMain.handle('saveBufferToFile', async (_, filePath: string, buffer: Buffer) => {
    await fs.promises.writeFile(filePath, buffer);
  });

  ipcMain.handle('saveImage', async (_event, buffer: Buffer) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Esporta menu come immagine',
      defaultPath: 'menu-settimanale.png',
      filters: [{ name: 'PNG Image', extensions: ['png'] }],
    });

    if (canceled || !filePath) return false;

    try {
      fs.writeFileSync(filePath, buffer);
      return true;
    } catch (error) {
      console.error('Errore nel salvataggio immagine:', error);
      return false;
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});