import { contextBridge, ipcRenderer } from 'electron';

console.log('Preload script caricato!'); // <-- per debug

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAllDishes: () => ipcRenderer.invoke('getAllDishes')
});