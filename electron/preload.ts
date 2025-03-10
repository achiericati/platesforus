import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Esempio base per testare comunicazione
  ping: () => ipcRenderer.invoke('ping'),
});