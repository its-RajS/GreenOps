# Deployment Guide

# GreenOps AI Deployment

This guide explains how to deploy the GreenOps AI application, including the frontend and backend services.

---

# Deployment Architecture

```text
Frontend (React + Vite)
        │
        ▼
      Vercel
        │
        ▼
Backend API (FastAPI)
        │
        ▼
      Render
```

---

# Prerequisites

* GitHub Account
* Vercel Account
* Render Account
* Node.js (v18+)
* Python (v3.10+)

---

# Frontend Deployment (Vercel)

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Deployment Ready"
git push origin main
```

---

## Step 2: Import Project into Vercel

1. Login to Vercel.
2. Click **Add New Project**.
3. Import the GitHub repository.
4. Select the frontend folder if using a monorepo.

---

## Step 3: Configure Build Settings

### Framework

```text
Vite
```

### Build Command

```bash
npm run build
```

### Output Directory

```text
dist
```

---

## Step 4: Add Environment Variables

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## Step 5: Deploy

Click **Deploy**.

After deployment, Vercel generates a public frontend URL.

---

# Backend Deployment (Render)

## Step 1: Push Backend Code

Ensure all backend files are available in GitHub.

---

## Step 2: Create a New Web Service

1. Login to Render.
2. Click **New Web Service**.
3. Connect GitHub repository.
4. Select backend project folder.

---

## Step 3: Configure Build Settings

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Step 4: Add Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

---

## Step 5: Deploy

Click **Create Web Service**.

Render will generate a backend API URL.

Example:

```text
https://greenops-api.onrender.com
```

---

# Connect Frontend and Backend

Update the frontend environment variable:

```env
VITE_API_URL=https://greenops-api.onrender.com
```

Redeploy the frontend after updating the environment variable.

---

# Verification Checklist

## Frontend

* Homepage loads successfully
* Dashboard displays correctly
* Charts render properly

## Backend

* API responds successfully
* Endpoints return expected data
* No deployment errors in logs

## Integration

* Frontend communicates with backend
* Dashboard data loads correctly
* Recommendations and analytics display properly

---

# Monitoring

Monitor deployment logs through:

* Vercel Dashboard
* Render Dashboard

Check for:

* Build failures
* Runtime errors
* API response issues

---

# Future Production Improvements

* Docker-based deployment
* CI/CD pipelines using GitHub Actions
* HTTPS security enhancements
* Cloud provider integrations
* Automated testing before deployment
* Kubernetes deployment support

---

# Deployment Status

| Service  | Platform | Status       |
| -------- | -------- | ------------ |
| Frontend | Vercel   | Active       |
| Backend  | Render   | Active       |
| Database | MongoDB  | Configurable |

GreenOps AI is successfully deployed using a modern cloud-native architecture with Vercel for frontend hosting and Render for backend services.
