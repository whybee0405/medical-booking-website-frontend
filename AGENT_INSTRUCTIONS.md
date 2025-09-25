# Agent Development Instructions

## ⚠️ CRITICAL PORT CONFIGURATION RULES

### Standard Development Ports - **NEVER CHANGE THESE**

1. **Frontend (Vue.js Customer Portal)**
   - **Port**: `5173`
   - **URL**: `http://localhost:5173`
   - **Application**: `medical-booking-customer-portal`

2. **Backend (Laravel Management Dashboard)**
   - **Port**: `8000` 
   - **URL**: `http://localhost:8000`
   - **Application**: `medical-booking-management-dashboard`

### 🔒 Port Change Policy

**ABSOLUTELY PROHIBITED:**
- ❌ Changing frontend port from 5173
- ❌ Changing backend port from 8000
- ❌ Using alternative ports (5174, 8001, etc.)
- ❌ Suggesting port changes for "convenience"

**REQUIRED ACTIONS:**
- ✅ Always use standard ports in all configurations
- ✅ Update environment files to use correct ports if found incorrect
- ✅ Maintain consistency across all configuration files
- ✅ Test with standard ports only

### Configuration Files That Must Use Standard Ports

#### Frontend (`medical-booking-customer-portal`)
```bash
# .env file
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:8000
BACKEND_API_URL=http://localhost:8000/api
VITE_NAVIGATION_API_URL=http://localhost:8000/api/navigation/config

# vite.config.js
server: {
  port: 5173,
  host: true,
}
```

#### Backend (`medical-booking-management-dashboard`)
```bash
# .env file
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# When starting server
php artisan serve --host=127.0.0.1 --port=8000
```

#### Service Files
- `src/services/auth.js` → fallback: `http://localhost:8000`
- `src/services/crossDomainAuth.js` → fallback: `http://localhost:8000`
- `src/config/api.js` → fallback: `http://localhost:5173`
- `src/constants/navigation.js` → fallback: `http://localhost:5173`

### Reasoning Behind Standard Ports

1. **Consistency**: Same ports across all development environments
2. **Documentation**: All guides and README files reference these ports
3. **CORS Configuration**: Backend CORS is configured for these specific ports
4. **Cross-domain Authentication**: Session sharing configured for these ports
5. **Team Collaboration**: All developers use the same port configuration

### If Ports Are In Use

**DO NOT change the port numbers. Instead:**

1. **Check what's using the port:**
   ```bash
   netstat -ano | findstr :5173
   netstat -ano | findstr :8000
   ```

2. **Stop conflicting processes:**
   ```bash
   taskkill /F /PID [process_id]
   ```

3. **Use standard start commands:**
   ```bash
   # Frontend
   cd medical-booking-customer-portal
   npm run dev

   # Backend  
   cd medical-booking-management-dashboard
   php artisan serve --host=127.0.0.1 --port=8000
   ```

### Emergency Port Recovery

If configurations are found with wrong ports, immediately fix them:

1. **Frontend .env**: Change all URLs to use `localhost:5173` and `localhost:8000`
2. **Backend .env**: Change `APP_URL` to `localhost:8000` and `FRONTEND_URL` to `localhost:5173`
3. **All service files**: Update fallback URLs to standard ports
4. **Configuration files**: Ensure consistency across all config files

### Development Workflow

```bash
# Always start servers with standard ports
cd medical-booking-management-dashboard
php artisan serve --host=127.0.0.1 --port=8000

cd medical-booking-customer-portal  
npm run dev # Will use port 5173 from vite.config.js
```

---

## 🎯 Agent Compliance

**Every agent working on this project MUST:**
1. ✅ Verify port configurations before making any changes
2. ✅ Use only the standard ports (5173 frontend, 8000 backend)
3. ✅ Fix any incorrect port configurations immediately
4. ✅ Reference this document when port questions arise
5. ✅ Never suggest alternative ports as solutions

**Failure to follow these port standards will break:**
- Cross-domain authentication
- API communications
- CORS configuration
- Session sharing
- Documentation accuracy

---

**Last Updated**: September 25, 2025
**Standard Ports**: Frontend 5173, Backend 8000
**Status**: LOCKED - DO NOT CHANGE