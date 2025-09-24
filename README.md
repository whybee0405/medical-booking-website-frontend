# Medical Booking Customer Portal

A modern Vue.js 3 frontend for the medical booking system, providing a clean and responsive interface for patients to book and manage their medical appointments.

## Features

- 🔐 **Secure Authentication** - Token-based authentication with auto-refresh
- 📅 **Appointment Booking** - Interactive calendar for scheduling appointments  
- 👥 **Patient Management** - Manage patient records and information
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS for beautiful, accessible design
- ⚡ **Fast Performance** - Vue 3 Composition API with Vite for lightning-fast development

## Tech Stack

- **Frontend Framework:** Vue.js 3
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Authentication:** JWT tokens via Laravel Sanctum API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (medical-booking-management-dashboard)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components
├── router/             # Vue Router configuration
├── stores/             # Pinia stores for state management
├── services/           # API service layer
└── style.css           # Global styles and Tailwind imports
```

## API Integration

The frontend communicates with the Laravel backend API running on `http://localhost:8001`. All API calls are handled through the Axios service layer with automatic token management.

## License

MIT License
