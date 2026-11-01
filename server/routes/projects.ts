import { Router } from 'express';
import { db } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/projects - Public list of projects
router.get('/', (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY featured DESC, id DESC';
    const projects = db.prepare(query).all(...params);
    res.json({ success: true, projects });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ success: false, message: 'Could not fetch projects.' });
  }
});

// GET /api/projects/:slugOrId - Public single project
router.get('/:slugOrId', (req, res) => {
  try {
    const { slugOrId } = req.params;
    let project = db.prepare('SELECT * FROM projects WHERE slug = ?').get(slugOrId);
    if (!project && !isNaN(Number(slugOrId))) {
      project = db.prepare('SELECT * FROM projects WHERE id = ?').get(slugOrId);
    }

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve project.' });
  }
});

// Admin routes
// POST /api/projects - Add new project
router.post('/', requireAdmin, (req, res) => {
  try {
    const {
      title,
      category,
      location,
      client,
      completionYear,
      area,
      status,
      summary,
      description,
      designConcept,
      scope,
      materials,
      coverImage,
      galleryImages,
      featured = 0
    } = req.body;

    if (!title || !category || !location || !coverImage) {
      res.status(400).json({ success: false, message: 'Title, category, location, and cover image are required.' });
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);

    const galleryJson = typeof galleryImages === 'string' ? galleryImages : JSON.stringify(galleryImages || [coverImage]);

    const insert = db.prepare(`
      INSERT INTO projects (
        slug, title, category, location, client, completionYear,
        area, status, summary, description, designConcept, scope,
        materials, coverImage, galleryImages, featured
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      slug, title, category, location, client || 'RG Client',
      completionYear || '2026', area || '3,000 sq.ft.',
      status || 'Completed (Demonstration Model)',
      summary || description?.slice(0, 150) || 'Architectural project by RG BUILDERS ENGINEERS AND CONTRACTORS',
      description || 'High standard construction and architectural engineering.',
      designConcept || 'Modern functional architecture.',
      scope || 'Full architectural design and construction.',
      materials || 'Reinforced concrete, glass, steel, natural stone.',
      coverImage, galleryJson, featured ? 1 : 0
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project: { id: result.lastInsertRowid, slug, title }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id - Edit project
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      location,
      client,
      completionYear,
      area,
      status,
      summary,
      description,
      designConcept,
      scope,
      materials,
      coverImage,
      galleryImages,
      featured
    } = req.body;

    const current = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;
    if (!current) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    const galleryJson = typeof galleryImages === 'string'
      ? galleryImages
      : galleryImages ? JSON.stringify(galleryImages) : current.galleryImages;

    db.prepare(`
      UPDATE projects SET
        title = ?, category = ?, location = ?, client = ?,
        completionYear = ?, area = ?, status = ?, summary = ?,
        description = ?, designConcept = ?, scope = ?, materials = ?,
        coverImage = ?, galleryImages = ?, featured = ?
      WHERE id = ?
    `).run(
      title ?? current.title,
      category ?? current.category,
      location ?? current.location,
      client ?? current.client,
      completionYear ?? current.completionYear,
      area ?? current.area,
      status ?? current.status,
      summary ?? current.summary,
      description ?? current.description,
      designConcept ?? current.designConcept,
      scope ?? current.scope,
      materials ?? current.materials,
      coverImage ?? current.coverImage,
      galleryJson,
      featured !== undefined ? (featured ? 1 : 0) : current.featured,
      id
    );

    res.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});

export default router;
