export {};

declare global {
  interface Window {
    debug: boolean;
    lang: string;
    electron: {
      isPackaged: boolean;
      ipcRenderer: Electron.IpcRenderer;
    };
  }
}
