{
  "name": "fly-chicken-pos",
  "version": "1.2.0",
  "description": "Advanced POS System for Fly Chicken",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win",
    "pack": "electron-builder --dir"
  },
  "author": "New Syrian",
  "build": {
    "appId": "com.newsyrian.flychickenpos",
    "productName": "Fly Chicken POS",
    "win": {
      "target": "nsis"
    },
    "directories": {
      "output": "dist"
    }
  },
  "devDependencies": {
    "electron": "^29.0.0",
    "electron-builder": "^24.9.1"
  }
}
