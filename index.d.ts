export {};

declare global {
  interface Window {
    debug: boolean;
    lang: string;
    isPackaged: boolean;
    ipcRenderer: Electron.IpcRenderer;
  }
}
