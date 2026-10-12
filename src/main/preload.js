'use strict';
/* جسر آمن بين الواجهة والعملية الرئيسية — يُعرض كـ window.warshaNative */
const { contextBridge, ipcRenderer, webUtils } = require('electron');

const invoke = (ch, ...a) => ipcRenderer.invoke(ch, ...a);
let openFileCb = null;
const queue = [];
ipcRenderer.on('warsha:open-file', (_e, p) => { if (openFileCb) openFileCb(p); else queue.push(p); });

contextBridge.exposeInMainWorld('warshaNative', {
  info: () => invoke('warsha:info'),
  openFile: (o) => invoke('warsha:openFile', o),
  saveFile: (o) => invoke('warsha:saveFile', o),
  saveMany: (files) => invoke('warsha:saveMany', files),
  readFile: (p) => invoke('warsha:readFile', p),
  allowMedia: (paths) => invoke('warsha:allowMedia', paths),
  getPathForFile: (file) => { try { return webUtils.getPathForFile(file); } catch (e) { return null; } },
  htmlToPDF: (html, o) => invoke('warsha:htmlToPDF', html, o),
  printHTML: (html, o) => invoke('warsha:printHTML', html, o),
  openExternal: (url) => invoke('warsha:openExternal', url),
  showItemInFolder: (p) => invoke('warsha:showItemInFolder', p),
  setCloseGuard: (g) => ipcRenderer.send('warsha:closeGuard', g),
  getPendingFiles: () => invoke('warsha:pendingFiles'),
  onOpenFile: (cb) => { openFileCb = cb; queue.splice(0).forEach((p) => cb(p)); },
  newWindow: () => invoke('warsha:newWindow'),
  hub: {
    state: () => invoke('hub:state'),
    install: (id) => invoke('hub:install', id),
    uninstall: (id) => invoke('hub:uninstall', id),
    launch: (id) => invoke('hub:launch', id),
    checkUpdate: () => invoke('hub:checkUpdate')
  }
});
