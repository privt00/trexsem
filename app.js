const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const API_BASE_URL = 'http://us2-p.plutonodes.net:25000/wallet';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1360,
      height: 726,
      minWidth: 1360,
      minHeight: 726,
      frame: false,
      transparent: true,
      backgroundColor: '#00FFFFFF',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools();
}

ipcMain.handle('close-app', () => {
  app.quit();
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

async function saveWallet(wallet) {
    const filePath = path.join(app.getPath('userData'), 'wallets.json');
    let wallets = await loadWallets();
    
    wallets.push(wallet);

    await fs.promises.writeFile(filePath, JSON.stringify(wallets, null, 2));
}

ipcMain.handle('create-wallet', async (event, walletName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/external/create`);
        const walletData = response.data;

        const wallet = {
            name: walletName,
            address: walletData.address,
            privateKey: walletData.privateKey,
            xpl: walletData.xpl,
            xrs: walletData.xrs
        };
        await saveWallet(wallet);

        return wallet;
    } catch (error) {
        console.error('Error creating wallet:', error);
        throw new Error('Failed to create wallet. Please try again.');
    }
});

async function loadWallets() {
    const filePath = path.join(app.getPath('userData'), 'wallets.json');
    if (fs.existsSync(filePath)) {
        const data = await fs.promises.readFile(filePath);
        return JSON.parse(data);
    }
    return [];
}

ipcMain.handle('load-wallets', async () => {
    return await loadWallets();
});

ipcMain.handle('get-wallet', async (event, address) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/external/${address}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wallet:', error);
        throw new Error('Could not fetch wallet data. Please try again later.');
    }
});

ipcMain.handle('get-transactions', async (event, address) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/external/${address}/transactions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Could not fetch transactions. Please try again later.');
    }
});

ipcMain.handle('transfer', async (event, transferData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/external/transfer`, transferData);
        return response.data;
    } catch (error) {
        console.error('Error transferring funds:', error);
        throw new Error('Transfer failed. Please try again.');
    }
});
