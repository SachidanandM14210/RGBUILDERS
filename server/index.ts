import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { initDatabase } from './db';
import authRoutes from './routes/auth';
import enquiryRoutes from './routes/enquiries';
import projectRoutes from './routes/projects';
import serviceRoutes from './routes/services';
import faqRoutes from './routes/faqs';
import testimonialRoutes from './routes/testimonials';
import companyRoutes from './routes/company';
import galleryRoutes from './routes/gallery';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Seed
initDatabase();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public', 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'RG BUILDERS ENGINEERS AND CONTRACTORS Core API',
    timestamp: new Date().toISOString()
  });
});

// In production, serve frontend from 'dist'
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Express Server (when not running inside serverless platform like Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🏗️ RG BUILDERS ENGINEERS AND CONTRACTORS Backend Server Running`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });
}

export default app;
