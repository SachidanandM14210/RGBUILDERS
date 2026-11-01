import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure multer for safe image uploads
const uploadDir = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only valid image files (JPG, PNG, WEBP, AVIF) are allowed.'));
    }
  }
});

// GET /api/admin/dashboard - High-level statistics
router.get('/dashboard', requireAdmin, (req, res) => {
  try {
    const totalEnquiries = (db.prepare('SELECT count(*) as count FROM enquiries').get() as any).count;
    const newEnquiries = (db.prepare("SELECT count(*) as count FROM enquiries WHERE status = 'New'").get() as any).count;
    const inProgressEnquiries = (db.prepare("SELECT count(*) as count FROM enquiries WHERE status = 'In Progress' OR status = 'Consultation Scheduled' OR status = 'Quotation Sent'").get() as any).count;
    const completedEnquiries = (db.prepare("SELECT count(*) as count FROM enquiries WHERE status = 'Completed'").get() as any).count;

    const totalProjects = (db.prepare('SELECT count(*) as count FROM projects').get() as any).count;
    const totalServices = (db.prepare('SELECT count(*) as count FROM services').get() as any).count;
    const totalFaqs = (db.prepare('SELECT count(*) as count FROM faqs').get() as any).count;
    const totalGallery = (db.prepare('SELECT count(*) as count FROM gallery').get() as any).count;

    const recentEnquiries = db.prepare(`
      SELECT id, refCode, fullName, phone, email, projectType, budget, status, createdAt
      FROM enquiries
      ORDER BY id DESC
      LIMIT 5
    `).all();

    const statusBreakdown = db.prepare(`
      SELECT status, count(*) as count
      FROM enquiries
      GROUP BY status
    `).all();

    res.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        inProgressEnquiries,
        completedEnquiries,
        totalProjects,
        totalServices,
        totalFaqs,
        totalGallery,
      },
      statusBreakdown,
      recentEnquiries
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to compile dashboard statistics.' });
  }
});

// POST /api/admin/upload - Image upload
router.post('/upload', requireAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file uploaded.' });
      return;
    }

    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: publicUrl,
      fileName: req.file.filename,
      size: req.file.size
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'File upload failed.' });
  }
});

export default router;
