# XyraTermux Build Setup Guide

## ✅ Automatic Dependency Setup

Semua dependencies sudah dikonfigurasi di `build.gradle`. Gradle akan **otomatis download** dependencies saat build.

## 📦 Dependencies yang Included

- `androidx.appcompat:appcompat:1.6.1`
- `androidx.constraintlayout:constraintlayout:2.1.4`
- `com.google.android.material:material:1.11.0`

## 🔧 Build Steps di AIDE

1. **Buka AIDE** di Android device
2. **Open Project** → `Android/AIDE/XyraTermux/`
3. **Build → Rebuild Project** (akan auto-download dependencies)
4. **Build → Build APK** (generate APK)
5. **Run APK** atau install ke device

## 📂 Project Structure

```
Android/AIDE/XyraTermux/
├── src/main/
│   ├── java/com/xyra/termux/
│   │   └── MainActivity.java
│   ├── res/
│   │   ├── values/
│   │   │   ├── strings.xml
│   │   │   ├── colors.xml
│   │   │   └── styles.xml
│   │   └── drawable/
│   └── AndroidManifest.xml
├── build.gradle (Dependencies configured here)
├── settings.gradle
├── proguard-rules.pro
└── .gitignore
```

## ✨ Features

✅ WebView dengan JavaScript enabled
✅ Auto-download dependencies via Gradle
✅ Material Design Support
✅ Smooth animations
✅ Deep linking support

## 🚀 Build Troubleshooting

**Jika ada error saat build:**

1. **Clean Project** → Build → Clean Project
2. **Reload Dependencies** → Build → Rebuild Project
3. **Check Internet** → Pastikan koneksi stabil (untuk download libs)
4. **Update AIDE** → Update ke versi terbaru

**Gradle akan download ke:**
- Gradle cache: `/home/.gradle/caches/`
- Project: `Android/AIDE/XyraTermux/.gradle/`

---
**Status**: Ready for AIDE Build ✅
**Last Updated**: Dec 23, 2024
