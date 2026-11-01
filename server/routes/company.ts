import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/company - Public company configuration
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM company_settings').all() as { key: string; value: string }[];
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch company settings.' });
  }
});

// PUT /api/company - Admin update settings
router.put('/', requireAdmin, (req, res) => {
  try {
    const newSettings = req.body;
    if (!newSettings || typeof newSettings !== 'object') {
      res.status(400).json({ success: false, message: 'Settings object is required.' });
      return;
    }

    const upsert = db.prepare(`
      INSERT INTO company_settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);

    const updateMany = db.transaction((settings: Record<string, string>) => {
      for (const [key, value] of Object.entries(settings)) {
        upsert.run(key, String(value));
      }
    });

    updateMany(newSettings);

    res.json({ success: true, message: 'Company settings updated successfully.' });
  } catch (error) {
    console.error('Update company settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update company settings.' });
  }
});

// POST /api/contact - Public general contact form submission
router.post('/contact', (req, res) => {
  try {
    const { name, emailOrPhone, subject, message } = req.body;
    if (!name || !emailOrPhone || !message) {
      res.status(400).json({ success: false, message: 'Name, email/phone, and message are required.' });
      return;
    }

    // Insert into enquiries table as a general contact inquiry
    const refCode = `RG-MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const isEmail = emailOrPhone.includes('@');
    
    db.prepare(`
      INSERT INTO enquiries (
        refCode, fullName, phone, email, projectLocation, projectType,
        plotArea, budget, expectedStartDate, projectDescription,
        preferredContactMethod, status, adminNotes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)
    `).run(
      refCode,
      name.trim(),
      isEmail ? 'Provided in message' : emailOrPhone.trim(),
      isEmail ? emailOrPhone.trim() : 'Provided in message',
      'Direct Message',
      subject?.trim() || 'General Inquiry',
      'N/A',
      'N/A',
      'N/A',
      message.trim(),
      isEmail ? 'Email' : 'Phone',
      `Subject: ${subject || 'Contact Form Inquiry'}`
    );

    console.log(`[CONTACT RECEIVED] Ref: ${refCode} from ${name}`);

    res.json({
      success: true,
      message: 'Thank you for reaching out. A senior project representative will respond shortly.',
      refCode
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to process message.' });
  }
});

export default router;
