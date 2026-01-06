# Setup Guide

## Python Installation (Required for Backend)

Since Python is not installed on your system, you have a few options:

### Option 1: Install Python from python.org (Recommended)

1. **Download Python:**
   - Go to https://www.python.org/downloads/
   - Download Python 3.11 or 3.12 for Windows
   - Choose the "Windows installer (64-bit)" version

2. **Install Python:**
   - Run the installer
   - **IMPORTANT:** Check the box "Add Python to PATH" at the bottom of the installer
   - Click "Install Now"
   - Wait for installation to complete

3. **Verify Installation:**
   ```powershell
   python --version
   ```
   You should see something like `Python 3.11.x` or `Python 3.12.x`

4. **Install pip (if not included):**
   ```powershell
   python -m ensurepip --upgrade
   ```

### Option 2: Install via Microsoft Store

1. Open Microsoft Store
2. Search for "Python 3.11" or "Python 3.12"
3. Click "Install"
4. After installation, restart your terminal/PowerShell

### Option 3: Use Frontend-Only Mode (No Backend Required)

If you want to test the frontend without setting up the backend:

1. The frontend will automatically fall back to manual coordinates
2. All plant parts will use the predefined coordinates from `plants.json`
3. No Python installation needed

Just run:
```powershell
npm install
npm run dev
```

## After Python Installation

Once Python is installed, set up the backend:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Troubleshooting

### "python is not recognized"
- Make sure you checked "Add Python to PATH" during installation
- Restart your terminal/PowerShell after installation
- Try using `py` instead of `python` (Windows Python launcher)

### "pip is not recognized"
- Run: `python -m ensurepip --upgrade`
- Or reinstall Python with "Add Python to PATH" checked

### Virtual environment issues
- Make sure you're in the `backend` directory
- Use `venv\Scripts\activate` (Windows) not `source venv/bin/activate` (Linux/Mac)

