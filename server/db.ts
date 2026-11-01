import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);
const dbPath = isServerless
  ? path.resolve('/tmp', 'rg_construction.sqlite')
  : path.resolve(process.cwd(), 'server', 'rg_construction.sqlite');

// Ensure server directory exists
const serverDir = path.dirname(dbPath);
if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
}

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // 1. Admins Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Enquiries / Quotation Requests Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      refCode TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      projectLocation TEXT NOT NULL,
      projectType TEXT NOT NULL,
      plotArea TEXT,
      budget TEXT,
      expectedStartDate TEXT,
      projectDescription TEXT NOT NULL,
      preferredContactMethod TEXT DEFAULT 'Phone',
      status TEXT DEFAULT 'New',
      adminNotes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      client TEXT,
      completionYear TEXT,
      area TEXT,
      status TEXT NOT NULL,
      summary TEXT NOT NULL,
      description TEXT NOT NULL,
      designConcept TEXT,
      scope TEXT,
      materials TEXT,
      coverImage TEXT NOT NULL,
      galleryImages TEXT,
      featured INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Services Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      shortDesc TEXT NOT NULL,
      fullDesc TEXT NOT NULL,
      iconName TEXT NOT NULL,
      image TEXT NOT NULL,
      features TEXT,
      processSteps TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Testimonials Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientName TEXT NOT NULL,
      projectType TEXT NOT NULL,
      feedback TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      location TEXT,
      isVerified INTEGER DEFAULT 0,
      displayOrder INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. FAQs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT DEFAULT 'General',
      displayOrder INTEGER DEFAULT 1
    );
  `);

  // 7. Company Settings Table (Key/Value)
  db.exec(`
    CREATE TABLE IF NOT EXISTS company_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // 8. Gallery Table (Office Showcase)
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT DEFAULT 'Office',
      description TEXT,
      imageUrl TEXT NOT NULL,
      displayOrder INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default Admin if not exists
  const adminCheck = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
  if (!adminCheck) {
    const passwordHash = bcrypt.hashSync('Admin@RG2026!', 10);
    db.prepare(`
      INSERT INTO admins (username, passwordHash, name, role)
      VALUES (?, ?, ?, ?)
    `).run('admin', passwordHash, 'RG Executive Admin', 'superadmin');
    console.log('✔ Default admin created: admin / Admin@RG2026!');
  }

  // Seed Company Settings if not exists
  const settingsCheck = db.prepare('SELECT count(*) as count FROM company_settings').get() as { count: number };
  if (settingsCheck.count === 0) {
    const defaultSettings: Record<string, string> = {
      companyName: 'RG BUILDERS ENGINEERS AND CONTRACTORS',
      tagline: 'Building Dreams. Creating Landmarks.',
      secondaryTagline: 'Your Vision. Our Foundation.',
      phone: '+91 98765 43210',
      email: 'contact@rgconstruction.com',
      whatsapp: '+919876543210',
      address: 'RG Tower, Plot 42, Civil & Architectural Enclave, Phase 2, Metro City, India',
      businessHours: 'Monday – Saturday: 9:00 AM – 7:00 PM (IST) | Sunday: Closed',
      socialInstagram: 'https://instagram.com/rgconstruction',
      socialLinkedIn: 'https://linkedin.com/company/rg-construction',
      socialFacebook: 'https://facebook.com/rgconstruction',
      rateStandardSqFt: '1850',
      ratePremiumSqFt: '2400',
      rateLuxurySqFt: '3200',
    };

    const insertSetting = db.prepare('INSERT INTO company_settings (key, value) VALUES (?, ?)');
    for (const [key, value] of Object.entries(defaultSettings)) {
      insertSetting.run(key, value);
    }
  }

  // Seed Projects if empty
  const projectCount = db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
  if (projectCount.count === 0) {
    const initialProjects = [
      {
        slug: 'horizon-luxury-villa',
        title: 'The Horizon Cantilever Villa',
        category: 'Villas',
        location: 'Coastal Ridge, Bay District',
        client: 'Private Client',
        completionYear: '2025',
        area: '6,400 sq.ft.',
        status: 'Completed (Demonstration Model)',
        summary: 'A breathtaking contemporary residence blending board-formed concrete, cantilevered terraces, and expansive glass overlooking the water.',
        description: 'Engineered on an undulating topography, The Horizon Cantilever Villa demonstrates modern architectural restraint and structural daring. Featuring dramatic post-tensioned slabs that float effortlessly over an infinity pool, the design seamlessly merges interior living spaces with coastal landscape.',
        designConcept: 'Biophilic minimalism prioritizing natural cross-ventilation, panoramic water views, and seamless indoor-outdoor transitions.',
        scope: 'Turnkey architectural planning, structural engineering, civil construction, landscape integration, and luxury interior finishing.',
        materials: 'Board-formed exposed concrete, thermal-break double glazing, natural slate masonry, sustainable teak wood accents, floating travertine stairs.',
        coverImage: '/images/hero.jpg',
        galleryImages: JSON.stringify(['/images/hero.jpg', '/images/residence.jpg', '/images/renovation.jpg']),
        featured: 1
      },
      {
        slug: 'nexus-corporate-center',
        title: 'Nexus Innovation Headquarters',
        category: 'Commercial',
        location: 'Central Business District, Metro City',
        client: 'Nexus Group',
        completionYear: '2024',
        area: '48,000 sq.ft.',
        status: 'Completed (Demonstration Model)',
        summary: 'A 5-story landmark commercial headquarters featuring parametric kinetic sun louvers and an illuminated civic plaza.',
        description: 'The Nexus Innovation Headquarters was engineered as a high-performance commercial space meeting international efficiency standards. The sculptural curved glass facade is wrapped in custom-engineered acoustic louvers that reduce solar heat gain by 38% while framing panoramic city views.',
        designConcept: 'High-performance workplace architecture celebrating organic curvature and technological precision.',
        scope: 'Full commercial structural shell, high-load foundation piles, energy-efficient curtain wall envelope, MEP systems, and corporate plaza hardscaping.',
        materials: 'Low-E laminated curved glass, anodized aerospace-grade aluminum louvers, high-strength reinforced concrete frame, volcanic granite plaza paving.',
        coverImage: '/images/commercial.jpg',
        galleryImages: JSON.stringify(['/images/commercial.jpg', '/images/site.jpg']),
        featured: 1
      },
      {
        slug: 'zen-courtyard-residence',
        title: 'Zenith Courtyard Residence',
        category: 'Residential',
        location: 'Suburban Hillside Sanctuary',
        client: 'Private Family',
        completionYear: '2025',
        area: '4,850 sq.ft.',
        status: 'Completed (Demonstration Model)',
        summary: 'An introspective residential retreat built around an authentic tranquil koi pond and Japanese-inspired garden courtyard.',
        description: 'Designed as a sanctuary from urban density, the Zenith Residence wraps three wings around a central stone and water courtyard. Floor-to-ceiling glass sliding portals connect the dining and formal living spaces directly to the natural elements.',
        designConcept: 'Inward-focused tranquil living utilizing natural materials, shadow play, and authentic water features.',
        scope: 'Architectural concept, structural foundation, precision carpentry, acoustic isolation, and courtyard landscape development.',
        materials: 'Natural red cedar cladding, smooth white plaster finish, honed basalt paving, blackened steel window frames, custom koi biotope.',
        coverImage: '/images/residence.jpg',
        galleryImages: JSON.stringify(['/images/residence.jpg', '/images/hero.jpg']),
        featured: 1
      },
      {
        slug: 'fluted-oak-penthouse-renovation',
        title: 'Grand Penthouse Architectural Remodel',
        category: 'Renovation',
        location: 'Highland Heights, Tower 4',
        client: 'Private Residence',
        completionYear: '2025',
        area: '3,800 sq.ft.',
        status: 'Completed (Demonstration Model)',
        summary: 'A complete interior architectural transformation featuring double-height fluted oak walls and a floating terrazzo staircase.',
        description: 'This structural renovation transformed two compartmentalized duplex levels into a grand, light-flooded architectural statement. Structural load-bearing pillars were reinforced to allow a soaring double-height atrium crowned by a bespoke floating terrazzo staircase.',
        designConcept: 'Modern architectural warmth utilizing vertical rhythmic oak slats, concealed ambient cove lighting, and seamless terrazzo surfaces.',
        scope: 'Structural slab modification, steel stringer installation, bespoke acoustic millwork, smart home automation, and HVAC concealment.',
        materials: 'Custom-milled fluted American white oak, precast terrazzo steps with glass balustrades, Italian marble countertops, concealed linear LED arrays.',
        coverImage: '/images/renovation.jpg',
        galleryImages: JSON.stringify(['/images/renovation.jpg', '/images/residence.jpg']),
        featured: 1
      },
      {
        slug: 'skyline-tower-construction',
        title: 'Aura Heights Structural Execution',
        category: 'Turnkey Construction',
        location: 'Uptown Extension Sector 18',
        client: 'Development Partner',
        completionYear: 'In Progress (Active Site)',
        area: '92,000 sq.ft.',
        status: 'Under Construction (Demonstration Model)',
        summary: 'Heavy civil and structural execution of a multi-story mixed-use development utilizing self-climbing formwork.',
        description: 'Demonstrating RG BUILDERS ENGINEERS AND CONTRACTORS’s capacity for complex civil engineering, this project showcases precision reinforced concrete framing, rigorous on-site safety protocols, and daily digital milestone tracking.',
        designConcept: 'High-density vertical urbanism engineered for superior seismic resilience and long-term structural durability.',
        scope: 'Deep earth shoring, cast-in-place concrete superstructure, post-tensioned floor plates, crane logistics, and occupational safety compliance.',
        materials: 'M40 and M50 high-grade concrete, Fe550D TMT high-ductility rebar, advanced waterproof admixtures, modular aluminum formwork.',
        coverImage: '/images/site.jpg',
        galleryImages: JSON.stringify(['/images/site.jpg', '/images/commercial.jpg']),
        featured: 1
      },
      {
        slug: 'parametric-pavilion-design',
        title: 'Organic Pavilion Architectural Concept',
        category: 'Architectural Design',
        location: 'Cultural Arts Precinct',
        client: 'Design Exposition',
        completionYear: '2026',
        area: '2,200 sq.ft.',
        status: 'Design Phase (Demonstration Model)',
        summary: 'Parametric timber architecture exploring organic rib curvature, computational design, and lightweight sustainable engineering.',
        description: 'An advanced architectural design study combining computational modeling, CNC timber milling, and passive shade geometry. Developed using parametric algorithms to optimize solar shielding while maintaining structural elegance.',
        designConcept: 'Biomimicry and computational geometry translated into sustainable timber architecture.',
        scope: 'Parametric 3D modeling, structural stress simulation, digital fabrication prototyping, and architectural construction documentation.',
        materials: 'Curved cross-laminated timber (CLT), recyclable steel connectors, micro-perforated acoustic skins.',
        coverImage: '/images/architecture.jpg',
        galleryImages: JSON.stringify(['/images/architecture.jpg', '/images/hero.jpg']),
        featured: 1
      }
    ];

    const insertProject = db.prepare(`
      INSERT INTO projects (slug, title, category, location, client, completionYear, area, status, summary, description, designConcept, scope, materials, coverImage, galleryImages, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of initialProjects) {
      insertProject.run(
        p.slug, p.title, p.category, p.location, p.client, p.completionYear,
        p.area, p.status, p.summary, p.description, p.designConcept, p.scope,
        p.materials, p.coverImage, p.galleryImages, p.featured
      );
    }
  }

  // Seed Services if empty
  const serviceCount = db.prepare('SELECT count(*) as count FROM services').get() as { count: number };
  if (serviceCount.count === 0) {
    const initialServices = [
      {
        slug: 'residential-construction',
        title: 'Residential Construction',
        shortDesc: 'Custom luxury homes, contemporary independent residences, and bespoke villas engineered with uncompromising structural integrity.',
        fullDesc: 'At RG BUILDERS ENGINEERS AND CONTRACTORS, residential construction is an art form. We engineer homes that stand as private landmarks, balancing modern aesthetics with enduring comfort. From deep foundation engineering to artisanal finishing, we handle every square foot with precision craftsmanship.',
        iconName: 'Home',
        image: '/images/residence.jpg',
        features: JSON.stringify([
          'Bespoke architectural layout customization',
          'High-grade earthquake-resistant RCC structure',
          'Premium thermal and acoustic insulation',
          'Smart home electrical & plumbing infrastructure',
          'Transparent milestone-based progress tracking'
        ]),
        processSteps: JSON.stringify([
          'Site topographical survey and soil load analysis',
          'Architectural 3D modeling & structural blue-printing',
          'Substructure piling, foundation & waterproofing',
          'Superstructure framing & masonry execution',
          'Artisanal finishing & rigorous quality handover'
        ])
      },
      {
        slug: 'commercial-construction',
        title: 'Commercial Construction',
        shortDesc: 'High-performance office complexes, modern retail hubs, and institutional spaces engineered for operational efficiency and prestige.',
        fullDesc: 'We construct commercial buildings that enhance brand prestige and optimize operational workflows. Our commercial projects combine advanced structural engineering with energy-efficient building envelopes and flexible open-span floor plates.',
        iconName: 'Building2',
        image: '/images/commercial.jpg',
        features: JSON.stringify([
          'Large clear-span structural engineering',
          'Advanced facade curtain walls and solar shading',
          'High-capacity MEP (Mechanical, Electrical, Plumbing) integration',
          'Fire safety, accessibility, and emergency compliance',
          'Rigorous on-site safety management protocols'
        ]),
        processSteps: JSON.stringify([
          'Commercial feasibility and site logistics planning',
          'Statutory compliance and structural approval',
          'Heavy civil foundation and structural framing',
          'Building envelope, curtain walls & glazing',
          'Interior fit-out coordination & occupancy certification'
        ])
      },
      {
        slug: 'architectural-design',
        title: 'Architectural Design',
        shortDesc: 'Comprehensive space planning, 3D conceptual modeling, and technical construction drawings tailored to your lifestyle and site context.',
        fullDesc: 'Our architectural team creates buildings that respond harmoniously to their natural surroundings and functional needs. We integrate parametric design tools, natural lighting studies, and computational airflow modeling into our blueprints.',
        iconName: 'Compass',
        image: '/images/architecture.jpg',
        features: JSON.stringify([
          'Conceptual space planning & circulation studies',
          'Photorealistic 3D rendering and VR walkthroughs',
          'Detailed structural and civil working drawings',
          'Passive solar and natural ventilation modeling',
          'Material selection and specification palettes'
        ]),
        processSteps: JSON.stringify([
          'Client vision discovery & spatial requirement mapping',
          'Site microclimate & sun-path analysis',
          'Conceptual schematics & massing models',
          'Design refinement & 3D client presentation',
          'Comprehensive construction documentation release'
        ])
      },
      {
        slug: 'renovation-remodeling',
        title: 'Renovation and Remodeling',
        shortDesc: 'Transformative structural modernization, interior remodeling, and architectural upgrades that breathe new life into existing spaces.',
        fullDesc: 'We specialize in complex structural renovations that elevate existing properties into modern masterpieces. From removing load-bearing walls with steel beams to complete interior redesigns, we preserve historical character while delivering contemporary luxury.',
        iconName: 'Hammer',
        image: '/images/renovation.jpg',
        features: JSON.stringify([
          'Structural stability assessment & wall removal',
          'Complete interior layout reconfiguration',
          'Plumbing, wiring, and HVAC modernization',
          'Architectural ceiling, lighting & millwork upgrades',
          'Clean, low-disruption construction protocols'
        ]),
        processSteps: JSON.stringify([
          'Structural audit and laser scan of existing spaces',
          'Architectural redesign & structural reinforcement plans',
          'Protective isolation & controlled demolition',
          'Structural alterations and MEP retrofitting',
          'Fine architectural finishing and thorough cleaning'
        ])
      },
      {
        slug: 'project-management',
        title: 'Project Management & Oversight',
        shortDesc: 'Independent construction supervision, rigorous quality audits, contractor coordination, and timeline enforcement.',
        fullDesc: 'Construction excellence requires uncompromising oversight. Our project management team acts as your trusted advocate on the ground, supervising material quality, verifying adherence to blueprints, managing schedules, and preventing budget overruns.',
        iconName: 'ClipboardCheck',
        image: '/images/site.jpg',
        features: JSON.stringify([
          'Daily on-site supervision and progress reporting',
          'Independent material laboratory test verification',
          'Critical-path schedule management (Gantt tracking)',
          'Subcontractor coordination and quality verification',
          'Cost monitoring and transparent invoice auditing'
        ]),
        processSteps: JSON.stringify([
          'Detailed project scheduling and milestone definition',
          'Contractor alignment & material benchmark setting',
          'Daily site logs and weekly digital progress audits',
          'Continuous quality inspections & slump/cube testing',
          'Defect liability verification & project close-out'
        ])
      },
      {
        slug: 'turnkey-construction',
        title: 'Turnkey Construction Solutions',
        shortDesc: 'End-to-end single-point accountability from raw land evaluation to final key handover, delivering peace of mind.',
        fullDesc: 'Our Turnkey Construction model takes complete responsibility for your project from the ground up. You enjoy a single point of contact, fixed milestone agreements, clear timelines, and flawless execution without the stress of managing dozens of individual contractors.',
        iconName: 'KeyRound',
        image: '/images/hero.jpg',
        features: JSON.stringify([
          'Single-point accountability from design to handover',
          'Fixed-scope milestone contracts with zero surprises',
          'Comprehensive material procurement from certified vendors',
          'Full statutory clearance and liaison support',
          'Post-handover warranty and maintenance support'
        ]),
        processSteps: JSON.stringify([
          'Initial feasibility, budget alignment & master contract',
          'Integrated design development and authority approvals',
          'Complete civil, structural, and architectural execution',
          'Interior fit-out, joinery, and landscape completion',
          'Comprehensive testing, commissioning, and key handover'
        ])
      }
    ];

    const insertService = db.prepare(`
      INSERT INTO services (slug, title, shortDesc, fullDesc, iconName, image, features, processSteps)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const s of initialServices) {
      insertService.run(s.slug, s.title, s.shortDesc, s.fullDesc, s.iconName, s.image, s.features, s.processSteps);
    }
  }

  // Seed FAQs if empty
  const faqCount = db.prepare('SELECT count(*) as count FROM faqs').get() as { count: number };
  if (faqCount.count === 0) {
    const initialFaqs = [
      {
        question: 'What types of construction projects do you handle?',
        answer: 'RG BUILDERS ENGINEERS AND CONTRACTORS handles premium residential construction (custom homes, independent villas, estates), commercial buildings (corporate offices, retail complexes), complete architectural remodeling and structural renovations, as well as turnkey development solutions.',
        category: 'Services',
        displayOrder: 1
      },
      {
        question: 'How can I request a construction quotation?',
        answer: 'You can request a free quotation directly through our online "Request a Quote" form, by using our interactive Project Cost Estimator, or by contacting our team via WhatsApp or phone. We will review your site details and arrange an initial technical consultation.',
        category: 'Quotations',
        displayOrder: 2
      },
      {
        question: 'Can I discuss a customized house design?',
        answer: 'Yes, customized design is one of our core specialties. Our architectural and engineering team works closely with you to understand your lifestyle, spatial priorities, aesthetic preferences, and budget to design a completely bespoke architectural blueprint.',
        category: 'Design',
        displayOrder: 3
      },
      {
        question: 'Do you provide renovation services?',
        answer: 'Yes. We offer comprehensive structural and interior renovation services. We conduct thorough structural evaluations, reinforce load-bearing elements where needed, replace outdated plumbing and electrical networks, and deliver contemporary architectural upgrades.',
        category: 'Services',
        displayOrder: 4
      },
      {
        question: 'Can I monitor project progress remotely?',
        answer: 'We provide structured weekly photographic and video progress reports, updated milestone schedules, and designated project managers who conduct scheduled video walk-throughs for out-of-town or overseas clients.',
        category: 'Process',
        displayOrder: 5
      },
      {
        question: 'What information is needed for an initial estimate?',
        answer: 'To prepare a realistic preliminary estimate, we typically require your plot or building location, approximate built-up area (in sq. ft. or sq. m.), preferred construction category (Standard, Premium, or Luxury specifications), and any architectural drawings or layout preferences you may have.',
        category: 'Quotations',
        displayOrder: 6
      },
      {
        question: 'How is the project timeline determined?',
        answer: 'Project timelines are determined during the planning and proposal phase based on building square footage, structural complexity, foundation requirements, soil conditions, and municipal clearance schedules. We establish milestone schedules with clear progress checkpoints.',
        category: 'Process',
        displayOrder: 7
      },
      {
        question: 'How can I contact RG BUILDERS ENGINEERS AND CONTRACTORS?',
        answer: 'You can reach us through our verified phone line at +91 98765 43210, email us at contact@rgconstruction.com, connect instantly via our floating WhatsApp button, or visit our office during standard business hours.',
        category: 'Contact',
        displayOrder: 8
      }
    ];

    const insertFaq = db.prepare('INSERT INTO faqs (question, answer, category, displayOrder) VALUES (?, ?, ?, ?)');
    for (const f of initialFaqs) {
      insertFaq.run(f.question, f.answer, f.category, f.displayOrder);
    }
  }

  // Seed Testimonials Placeholder (Clearly identified demonstration content as instructed)
  const testimonialCount = db.prepare('SELECT count(*) as count FROM testimonials').get() as { count: number };
  if (testimonialCount.count === 0) {
    const initialTestimonials = [
      {
        clientName: 'Demonstration Client — Residential Villa',
        projectType: 'Turnkey Luxury Villa',
        feedback: 'RG BUILDERS ENGINEERS AND CONTRACTORS demonstrated exceptional transparency from soil testing to final handover. The structural finish and cantilevered terraces exceeded our highest expectations.',
        rating: 5,
        location: 'Bay District',
        isVerified: 0,
        displayOrder: 1
      },
      {
        clientName: 'Demonstration Client — Commercial HQ',
        projectType: 'Commercial Corporate Building',
        feedback: 'The team managed complex curved glass engineering and structural steel framing ahead of schedule with zero safety incidents. True architectural craftsmanship.',
        rating: 5,
        location: 'Metro City CBD',
        isVerified: 0,
        displayOrder: 2
      },
      {
        clientName: 'Demonstration Client — Penthouse Remodel',
        projectType: 'Architectural Renovation',
        feedback: 'Transforming an older duplex into a light-flooded modern home required serious structural ingenuity. RG Builders Engineers and Contractors delivered seamless execution with flawless woodwork.',
        rating: 5,
        location: 'Highland Heights',
        isVerified: 0,
        displayOrder: 3
      }
    ];

    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (clientName, projectType, feedback, rating, location, isVerified, displayOrder)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const t of initialTestimonials) {
      insertTestimonial.run(t.clientName, t.projectType, t.feedback, t.rating, t.location, t.isVerified, t.displayOrder);
    }
  }

  // Seed sample initial enquiries so the Admin Dashboard has realistic, actionable data
  const enquiryCount = db.prepare('SELECT count(*) as count FROM enquiries').get() as { count: number };
  if (enquiryCount.count === 0) {
    const sampleEnquiries = [
      {
        refCode: 'RG-2026-7841',
        fullName: 'Vikramaditya Sharma',
        phone: '+91 98234 11223',
        email: 'vikram.sharma@example.com',
        projectLocation: 'North Hill Sector 12, Metro City',
        projectType: 'New House Construction',
        plotArea: '3,600 sq.ft.',
        budget: '₹50 Lakhs–₹1 Crore',
        expectedStartDate: 'Next 30 Days',
        projectDescription: 'Looking to construct a 3-storey contemporary independent villa with natural stone cladding, double-height foyer, and basement parking.',
        preferredContactMethod: 'Phone',
        status: 'New',
        adminNotes: 'High priority lead. Client already owns clear-title plot.'
      },
      {
        refCode: 'RG-2026-5120',
        fullName: 'Dr. Ananya Sen',
        phone: '+91 97112 88440',
        email: 'ananya.sen@example.com',
        projectLocation: 'Greenwood Park, East Enclave',
        projectType: 'Renovation',
        plotArea: '2,400 sq.ft.',
        budget: '₹25–50 Lakhs',
        expectedStartDate: 'Within 2 Months',
        projectDescription: 'Complete structural remodel of an ancestral residence. Need to remove two central load-bearing walls and add steel support beams with fluted oak interior finishes.',
        preferredContactMethod: 'WhatsApp',
        status: 'Consultation Scheduled',
        adminNotes: 'Architectural consultation scheduled for Saturday 11 AM.'
      },
      {
        refCode: 'RG-2026-9032',
        fullName: 'Rajesh Mehra',
        phone: '+91 99887 66554',
        email: 'rajesh.mehra@apextech.in',
        projectLocation: 'CBD Tech Park Phase 3',
        projectType: 'Commercial Building',
        plotArea: '18,000 sq.ft.',
        budget: 'Above ₹1 Crore',
        expectedStartDate: 'Immediately',
        projectDescription: 'Corporate branch office requiring commercial grade structural construction, modern glass facade curtain wall, and green building efficiency standards.',
        preferredContactMethod: 'Email',
        status: 'Quotation Sent',
        adminNotes: 'Detailed preliminary bill of quantities and proposal sent on Oct 28.'
      }
    ];

    const insertEnquiry = db.prepare(`
      INSERT INTO enquiries (refCode, fullName, phone, email, projectLocation, projectType, plotArea, budget, expectedStartDate, projectDescription, preferredContactMethod, status, adminNotes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const e of sampleEnquiries) {
      insertEnquiry.run(
        e.refCode, e.fullName, e.phone, e.email, e.projectLocation,
        e.projectType, e.plotArea, e.budget, e.expectedStartDate,
        e.projectDescription, e.preferredContactMethod, e.status, e.adminNotes
      );
    }
  }

  // Seed Gallery if empty
  const galleryCount = db.prepare('SELECT count(*) as count FROM gallery').get() as { count: number };
  if (galleryCount.count === 0) {
    const initialGallery = [
      {
        title: 'RG Architectural Design & Engineering Studio',
        category: 'Design Studio',
        description: 'Our central studio where building plans, structural schematics, and 3D architectural models are designed.',
        imageUrl: '/images/architecture.jpg',
        displayOrder: 1,
        featured: 1
      },
      {
        title: 'Executive Client Consultation Chamber',
        category: 'Consultation Rooms',
        description: 'Comfortable consultation space for discussing custom residential layouts, BOQ estimates, and project timelines.',
        imageUrl: '/images/renovation.jpg',
        displayOrder: 2,
        featured: 1
      },
      {
        title: 'Senior Civil Engineers Drafting & Project Management',
        category: 'Workspaces',
        description: 'Our structural engineering team reviewing slab reinforcement, structural analysis, and compliance.',
        imageUrl: '/images/site.jpg',
        displayOrder: 3,
        featured: 1
      },
      {
        title: 'Corporate Headquarters Reception & Welcome Lounge',
        category: 'Reception',
        description: 'Modern, professional reception area welcoming homeowners, entrepreneurs, and architectural clients.',
        imageUrl: '/images/hero.jpg',
        displayOrder: 4,
        featured: 1
      },
      {
        title: 'Executive Blueprint Conference Suite',
        category: 'Conference',
        description: 'Dedicated presentation facility for high-level commercial project reviews and material sample selections.',
        imageUrl: '/images/commercial.jpg',
        displayOrder: 5,
        featured: 1
      },
      {
        title: 'Material Specification & Finishes Display Room',
        category: 'Sample Room',
        description: 'Showroom display showcasing certified rebar grades, Italian marble samples, and acoustic glazing.',
        imageUrl: '/images/residence.jpg',
        displayOrder: 6,
        featured: 1
      }
    ];

    const insertGallery = db.prepare(`
      INSERT INTO gallery (title, category, description, imageUrl, displayOrder, featured)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const g of initialGallery) {
      insertGallery.run(g.title, g.category, g.description, g.imageUrl, g.displayOrder, g.featured);
    }
  }

  console.log('✔ Database initialized & fully seeded with demonstration data.');
}
