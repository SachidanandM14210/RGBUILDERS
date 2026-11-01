import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/faqs - Public
router.get('/', (req, res) => {
  try {
    const faqs = db.prepare('SELECT * FROM faqs ORDER BY displayOrder ASC, id ASC').all();
    res.json({ success: true, faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch FAQs.' });
  }
});

// POST /api/faqs - Admin create
router.post('/', requireAdmin, (req, res) => {
  try {
    const { question, answer, category = 'General', displayOrder = 1 } = req.body;
    if (!question || !answer) {
      res.status(400).json({ success: false, message: 'Question and answer are required.' });
      return;
    }
    const result = db.prepare(`
      INSERT INTO faqs (question, answer, category, displayOrder)
      VALUES (?, ?, ?, ?)
    `).run(question, answer, category, displayOrder);

    res.status(201).json({ success: true, message: 'FAQ created successfully.', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create FAQ.' });
  }
});

// PUT /api/faqs/:id - Admin update
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category, displayOrder } = req.body;

    const current = db.prepare('SELECT * FROM faqs WHERE id = ?').get(id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'FAQ not found.' });
      return;
    }

    db.prepare(`
      UPDATE faqs SET
        question = ?, answer = ?, category = ?, displayOrder = ?
      WHERE id = ?
    `).run(
      question ?? current.question,
      answer ?? current.answer,
      category ?? current.category,
      displayOrder ?? current.displayOrder,
      id
    );

    res.json({ success: true, message: 'FAQ updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update FAQ.' });
  }
});

// DELETE /api/faqs/:id - Admin delete
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'FAQ not found.' });
      return;
    }
    res.json({ success: true, message: 'FAQ removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete FAQ.' });
  }
});

export default router;
