import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/services - Public list
router.get('/', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY id ASC').all();
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch services.' });
  }
});

// GET /api/services/:slugOrId - Public single service
router.get('/:slugOrId', (req, res) => {
  try {
    const { slugOrId } = req.params;
    let service = db.prepare('SELECT * FROM services WHERE slug = ?').get(slugOrId);
    if (!service && !isNaN(Number(slugOrId))) {
      service = db.prepare('SELECT * FROM services WHERE id = ?').get(slugOrId);
    }

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found.' });
      return;
    }

    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve service.' });
  }
});

// Admin update service
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDesc, fullDesc, image, features, processSteps } = req.body;

    const current = db.prepare('SELECT * FROM services WHERE id = ?').get(id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'Service not found.' });
      return;
    }

    const featJson = typeof features === 'string' ? features : JSON.stringify(features || []);
    const procJson = typeof processSteps === 'string' ? processSteps : JSON.stringify(processSteps || []);

    db.prepare(`
      UPDATE services SET
        title = ?, shortDesc = ?, fullDesc = ?, image = ?,
        features = ?, processSteps = ?
      WHERE id = ?
    `).run(
      title ?? current.title,
      shortDesc ?? current.shortDesc,
      fullDesc ?? current.fullDesc,
      image ?? current.image,
      featJson,
      procJson,
      id
    );

    res.json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update service.' });
  }
});

export default router;
