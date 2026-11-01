import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/testimonials - Public
router.get('/', (req, res) => {
  try {
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY displayOrder ASC, id ASC').all();
    res.json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch testimonials.' });
  }
});

// POST /api/testimonials - Admin create
router.post('/', requireAdmin, (req, res) => {
  try {
    const { clientName, projectType, feedback, rating = 5, location, isVerified = 0, displayOrder = 1 } = req.body;
    if (!clientName || !feedback) {
      res.status(400).json({ success: false, message: 'Client name and feedback are required.' });
      return;
    }
    const result = db.prepare(`
      INSERT INTO testimonials (clientName, projectType, feedback, rating, location, isVerified, displayOrder)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(clientName, projectType || 'Construction Project', feedback, rating, location || '', isVerified ? 1 : 0, displayOrder);

    res.status(201).json({ success: true, message: 'Testimonial added successfully.', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add testimonial.' });
  }
});

// PUT /api/testimonials/:id - Admin update
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, projectType, feedback, rating, location, isVerified, displayOrder } = req.body;

    const current = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'Testimonial not found.' });
      return;
    }

    db.prepare(`
      UPDATE testimonials SET
        clientName = ?, projectType = ?, feedback = ?, rating = ?,
        location = ?, isVerified = ?, displayOrder = ?
      WHERE id = ?
    `).run(
      clientName ?? current.clientName,
      projectType ?? current.projectType,
      feedback ?? current.feedback,
      rating ?? current.rating,
      location ?? current.location,
      isVerified !== undefined ? (isVerified ? 1 : 0) : current.isVerified,
      displayOrder ?? current.displayOrder,
      id
    );

    res.json({ success: true, message: 'Testimonial updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial.' });
  }
});

// DELETE /api/testimonials/:id - Admin delete
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial.' });
  }
});

export default router;
