import { contextBridge, ipcRenderer } from 'electron';
import { Dish, WeeklyMenuType } from './database/interfaces';

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAllDishes: () => ipcRenderer.invoke('getAllDishes'),
  deleteDish: (id: number) => ipcRenderer.invoke('deleteDish', id),
  addDish: (dish: Dish) => ipcRenderer.invoke('addDish', dish),
  updateDish: (dish: Dish) => ipcRenderer.invoke('updateDish', dish),
  loadMenuFromDb: () => ipcRenderer.invoke('loadMenuFromDb'),
  saveMenuToDb: (menu: WeeklyMenuType) => ipcRenderer.invoke('saveMenuToDb', menu),
  deleteMenuFromDb: () => ipcRenderer.invoke('deleteMenuFromDb'),
  exportDishesToCSV: (dishes: Dish[]) => ipcRenderer.invoke('exportDishesToCSV', dishes),
  importDishesFromCSV: () => ipcRenderer.invoke('importDishesFromCSV')
});