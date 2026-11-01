import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/gallery - Public list of gallery items
router.get('/', (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM gallery WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY displayOrder ASC, id DESC';
    const gallery = db.prepare(query).all(...params);
    res.json({ success: true, gallery });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    res.status(500).json({ success: false, message: 'Could not fetch gallery items.' });
  }
});

// GET /api/gallery/:id - Single gallery item
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve gallery item.' });
  }
});

// POST /api/gallery - Admin create gallery item
router.post('/', requireAdmin, (req, res) => {
  try {
    const {
      title,
      category,
      description,
      imageUrl,
      displayOrder = 0,
      featured = 0
    } = req.body;

    if (!title || !category || !imageUrl) {
      res.status(400).json({ success: false, message: 'Title, category, and image URL are required.' });
      return;
    }

    const insert = db.prepare(`
      INSERT INTO gallery (title, category, description, imageUrl, displayOrder, featured)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      title,
      category,
      description || '',
      imageUrl,
      Number(displayOrder) || 0,
      featured ? 1 : 0
    );

    const newItem = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Gallery item added successfully.',
      item: newItem
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ success: false, message: 'Failed to create gallery item.' });
  }
});

// PUT /api/gallery/:id - Admin update gallery item
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      description,
      imageUrl,
      displayOrder,
      featured
    } = req.body;

    const current = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }

    db.prepare(`
      UPDATE gallery SET
        title = ?,
        category = ?,
        description = ?,
        imageUrl = ?,
        displayOrder = ?,
        featured = ?
      WHERE id = ?
    `).run(
      title ?? current.title,
      category ?? current.category,
      description ?? current.description,
      imageUrl ?? current.imageUrl,
      displayOrder !== undefined ? Number(displayOrder) : current.displayOrder,
      featured !== undefined ? (featured ? 1 : 0) : current.featured,
      id
    );

    const updated = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id);

    res.json({
      success: true,
      message: 'Gallery item updated successfully.',
      item: updated
    });
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({ success: false, message: 'Failed to update gallery item.' });
  }
});

// DELETE /api/gallery/:id - Admin delete gallery item
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM gallery WHERE id = ?').run(id);
    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }

    res.json({ success: true, message: 'Gallery item removed successfully.' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gallery item.' });
  }
});

export default router;

