const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.maximize();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// استقبال طلب قائمة الطابعات من الواجهة
ipcMain.handle('get-printers', async () => {
  return await mainWindow.webContents.getPrintersAsync();
});

// استقبال أمر الطباعة الصامتة
ipcMain.on('print-silent', (event, printerName) => {
  const printOptions = {
    silent: true,
    printBackground: true,
    margins: { marginType: 'none' } // مهم جداً للطابعات الحرارية
  };

  if (printerName) {
    printOptions.deviceName = printerName;
  }

  mainWindow.webContents.print(printOptions, (success, errorType) => {
    if (!success) console.error("خطأ في الطباعة:", errorType);
  });
});
