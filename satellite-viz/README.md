# 🛰️ 3D Satellite Visualization

A production-ready, real-time 3D satellite tracking application built with React, Three.js (globe.gl), and the Cryptik API. Track satellites orbiting Earth in stunning 3D visualization with live position updates.

![3D Satellite Visualization](./screenshots/hero.png)

## ✨ Features

### 🌍 Interactive 3D Globe
- **Realistic Earth Rendering**: High-quality Earth textures with topography
- **Smooth Controls**: Rotate, zoom, and pan with intuitive mouse controls
- **Auto-rotation**: Gentle automatic rotation for ambient display
- **Space Background**: Immersive night sky backdrop

### 🛰️ Real-time Satellite Tracking
- **Live Data**: Fetches satellite positions from Cryptik API
- **Auto-refresh**: Updates every 30 seconds automatically
- **Color-coded Markers**: 
  - 🟢 Green: International Space Station (ISS)
  - 🟠 Orange: Starlink satellites
  - 🔵 Cyan: GPS satellites
  - ⚪ White: Other satellites
- **Interactive Tooltips**: Hover over satellites for quick info

### 📊 Detailed Information Panel
- **Click to View**: Click any satellite for detailed information
- **Comprehensive Data**:
  - Satellite name and NORAD ID
  - Real-time latitude, longitude, altitude
  - Epoch timestamp
  - Risk assessment with color coding
- **Smooth Animations**: Elegant slide-in panel transitions

### 🎨 Premium UI/UX
- **Modern Design**: Glassmorphism effects and gradient accents
- **Dark Theme**: Easy on the eyes with space-inspired colors
- **Responsive Layout**: Works on desktop and tablet devices
- **Status Indicators**: Real-time connection status and last update time
- **Error Handling**: Graceful degradation with helpful error messages

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with Vite
- **3D Visualization**: Three.js via globe.gl
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: JavaScript (ES6+)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 16+ and npm
- Cryptik API key ([Get one here](https://api.cryptik.tech))

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd satellite-viz
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Cryptik API key:

```env
VITE_CRYPTIK_API_KEY=your_actual_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🌐 Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variable:
```bash
vercel env add VITE_CRYPTIK_API_KEY
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project" and import your repository

4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - Go to Settings → Environment Variables
   - Add `VITE_CRYPTIK_API_KEY` with your API key
   - Select all environments (Production, Preview, Development)

6. Click "Deploy"

Your application will be live at `https://your-project.vercel.app`

### Updating Environment Variables

After deployment, you can update environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Update `VITE_CRYPTIK_API_KEY`
4. Redeploy the application

## 📡 API Usage

### Endpoint
```
GET https://api.cryptik.tech/positions
```

### Headers
```
X-API-Key: your_api_key
```

### Response Format
```json
{
  "timestamp": "2026-02-08T04:00:00Z",
  "satellites": [
    {
      "norad_id": 25544,
      "name": "ISS (ZARYA)",
      "lat": 45.1234,
      "lon": -122.5678,
      "alt": 408.5,
      "epoch": "2026-02-08T03:45:00Z",
      "risk": "Low"
    }
  ]
}
```

### Rate Limits
- The application polls every 30 seconds to respect rate limits
- Implements exponential backoff on errors
- Displays user-friendly messages on rate limit errors

## 📁 Project Structure

```
satellite-viz/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # App header with branding
│   │   ├── Footer.jsx              # Status bar with connection info
│   │   ├── GlobeScene.jsx          # 3D globe with satellites
│   │   └── SatelliteInfoPanel.jsx  # Satellite details panel
│   ├── hooks/
│   │   └── usePositions.js         # Custom hook for API data
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
├── public/                         # Static assets
├── .env.example                    # Environment template
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🎯 Key Components

### `usePositions` Hook
Custom React hook that:
- Fetches satellite data from Cryptik API
- Polls every 30 seconds
- Handles errors gracefully
- Tracks connection status
- Provides loading states

### `GlobeScene` Component
3D visualization that:
- Renders Earth with realistic textures
- Plots satellites with color coding
- Handles user interactions (click, hover)
- Responsive to window resizing
- Shows helpful UI overlays

### `SatelliteInfoPanel` Component
Information display that:
- Shows detailed satellite data
- Color-codes risk levels
- Smooth slide-in animation
- Closable with button or new selection

## 🎨 Color Coding

| Satellite Type | Color | Hex Code |
|---------------|-------|----------|
| ISS | Green | `#00ff00` |
| Starlink | Orange | `#ff8800` |
| GPS | Cyan | `#00ffff` |
| Others | White | `#ffffff` |

## 🐛 Troubleshooting

### "API key not configured" Error
- Ensure `.env` file exists in root directory
- Verify `VITE_CRYPTIK_API_KEY` is set correctly
- Restart dev server after changing `.env`

### "Unable to reach API server" Error
- Check your internet connection
- Verify API endpoint is accessible
- Check for firewall/proxy issues

### "Rate limit exceeded" Error
- Wait 30-60 seconds before refreshing
- The app will automatically retry
- Consider reducing poll frequency if persistent

### Globe Not Rendering
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Try disabling browser extensions
- Clear browser cache

## 📸 Screenshots

### Main View
![Main Application View](./screenshots/main-view.png)

### Satellite Details
![Satellite Information Panel](./screenshots/satellite-details.png)

### Mobile Responsive
![Mobile View](./screenshots/mobile-view.png)

*Note: Add actual screenshots to `/screenshots` directory*

## 🔒 Security Notes

- **Never commit `.env` file** to version control
- API key is exposed in client-side code (normal for frontend apps)
- For production, consider implementing a backend proxy
- Use environment-specific API keys

## 📝 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

This is a technical assignment submission. For production use:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Check the troubleshooting section
- Review Cryptik API documentation
- Open an issue in the repository

## 🙏 Acknowledgments

- **Cryptik API** for satellite position data
- **globe.gl** for the amazing 3D globe library
- **Three.js** for WebGL rendering
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for satellite enthusiasts and space lovers**
