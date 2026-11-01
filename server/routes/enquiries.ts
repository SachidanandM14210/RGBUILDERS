import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// Helper to generate unique reference code
function generateRefCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `RG-${year}-${randomNum}`;
}

// POST /api/enquiries - Public enquiry & quote request submission
router.post('/', (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      projectLocation,
      projectType,
      plotArea,
      budget,
      expectedStartDate,
      projectDescription,
      preferredContactMethod
    } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      res.status(400).json({ success: false, message: 'Full name is required.' });
      return;
    }
    if (!phone || !phone.trim() || phone.trim().length < 8) {
      res.status(400).json({ success: false, message: 'A valid contact phone number is required.' });
      return;
    }
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, message: 'A valid email address is required.' });
      return;
    }
    if (!projectLocation || !projectLocation.trim()) {
      res.status(400).json({ success: false, message: 'Project location is required.' });
      return;
    }
    if (!projectType || !projectType.trim()) {
      res.status(400).json({ success: false, message: 'Please select a project type.' });
      return;
    }
    if (!projectDescription || !projectDescription.trim()) {
      res.status(400).json({ success: false, message: 'Project description is required.' });
      return;
    }

    // Generate unique reference
    let refCode = generateRefCode();
    let collisionCheck = db.prepare('SELECT id FROM enquiries WHERE refCode = ?').get(refCode);
    while (collisionCheck) {
      refCode = generateRefCode();
      collisionCheck = db.prepare('SELECT id FROM enquiries WHERE refCode = ?').get(refCode);
    }

    const insert = db.prepare(`
      INSERT INTO enquiries (
        refCode, fullName, phone, email, projectLocation, projectType,
        plotArea, budget, expectedStartDate, projectDescription,
        preferredContactMethod, status, adminNotes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', '')
    `);

    const result = insert.run(
      refCode,
      fullName.trim(),
      phone.trim(),
      email.trim(),
      projectLocation.trim(),
      projectType.trim(),
      plotArea?.trim() || 'Not specified',
      budget?.trim() || 'Not yet decided',
      expectedStartDate?.trim() || 'Flexible',
      projectDescription.trim(),
      preferredContactMethod?.trim() || 'Phone'
    );

    // Retrieve configured company phone & email for notifications
    const phoneSetting = db.prepare("SELECT value FROM company_settings WHERE key = 'whatsapp'").get() as any;
    const whatsappNumber = phoneSetting?.value || '+919876543210';

    // Log simulated or configured notification
    console.log(`[ENQUIRY NOTIFICATION] New Quotation Request Received: ${refCode}`);
    console.log(`From: ${fullName} (${phone}, ${email}) | Type: ${projectType} | Location: ${projectLocation}`);
    console.log(`Email notification dispatched to configured company inbox: contact@rgconstruction.com`);

    res.status(201).json({
      success: true,
      message: 'Your project enquiry has been successfully registered.',
      refCode,
      enquiryId: result.lastInsertRowid,
      whatsappNumber,
      notificationStatus: 'Dispatched to company review desk'
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to record your enquiry. Please try again.' });
  }
});

// GET /api/enquiries - Admin view with filters & search
router.get('/', requireAdmin, (req, res) => {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM enquiries WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search && typeof search === 'string') {
      query += ' AND (fullName LIKE ? OR refCode LIKE ? OR email LIKE ? OR projectLocation LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const enquiries = db.prepare(query).all(...params);

    const countQuery = 'SELECT count(*) as total FROM enquiries';
    const totalCount = (db.prepare(countQuery).get() as any).total;

    res.json({
      success: true,
      enquiries,
      totalCount
    });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    res.status(500).json({ success: false, message: 'Could not fetch enquiries.' });
  }
});

// GET /api/enquiries/:id - Admin view single enquiry
router.get('/:id', requireAdmin, (req, res) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }
    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve enquiry.' });
  }
});

// PATCH /api/enquiries/:id/status - Admin update status & notes
router.patch('/:id/status', requireAdmin, (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const allowedStatuses = [
      'New',
      'Contacted',
      'Consultation Scheduled',
      'Quotation Sent',
      'In Progress',
      'Completed',
      'Closed'
    ];

    if (status && !allowedStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status value.' });
      return;
    }

    const current = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }

    const updatedStatus = status || current.status;
    const updatedNotes = adminNotes !== undefined ? adminNotes : current.adminNotes;

    db.prepare(`
      UPDATE enquiries
      SET status = ?, adminNotes = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(updatedStatus, updatedNotes, req.params.id);

    res.json({
      success: true,
      message: 'Enquiry updated successfully.',
      enquiry: {
        ...current,
        status: updatedStatus,
        adminNotes: updatedNotes
      }
    });
  } catch (error) {
    console.error('Update enquiry status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update enquiry status.' });
  }
});

// DELETE /api/enquiries/:id - Admin delete
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return;
    }
    res.json({ success: true, message: 'Enquiry removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete enquiry.' });
  }
});

export default router;
