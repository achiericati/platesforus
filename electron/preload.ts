import { contextBridge, ipcRenderer } from 'electron';
import { Dish } from './database/interfaces';

console.log('Preload script caricato!'); // <-- per debug

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAllDishes: () => ipcRenderer.invoke('getAllDishes'),
  deleteDish: (id: number) => ipcRenderer.invoke('deleteDish', id),
  addDish: (dish: Dish) => ipcRenderer.invoke('addDish', dish)
});