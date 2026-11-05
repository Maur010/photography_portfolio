/**
 * ============================================================================
 * MAURO RAMIREZ — APPLICATION CORE ENGINE
 * Handles client-side routing, view rendering, gallery layout, lightbox,
 * mobile drawer interactions, and contact form handling.
 * ============================================================================
 */

// Lightbox state
let currentLightboxList = [];
let currentLightboxIndex = 0;

// ============================================================================
// 1. ROUTER & NAVIGATION
// ============================================================================

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.replace(/^#/, '');
}

function navigateTo(route) {
  window.location.hash = '#' + route;
}

function updateNavState(currentRoute) {
  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');
  const navContact = document.getElementById('nav-contact');

  const isWork = currentRoute === '/' || currentRoute === '' || currentRoute.startsWith('/work');
  const isAbout = currentRoute === '/about';
  const isContact = currentRoute === '/contact';

  if (navWork) {
    navWork.className = isWork 
      ? "nav-item text-xs font-grotesk uppercase tracking-widest text-textPrimary py-1 border-b-2 border-textPrimary transition-all duration-200"
      : "nav-item text-xs font-grotesk uppercase tracking-widest text-textSecondary hover:text-textPrimary py-1 border-b-2 border-transparent transition-all duration-200";
  }
  if (navAbout) {
    navAbout.className = isAbout 
      ? "nav-item text-xs font-grotesk uppercase tracking-widest text-textPrimary py-1 border-b-2 border-textPrimary transition-all duration-200"
      : "nav-item text-xs font-grotesk uppercase tracking-widest text-textSecondary hover:text-textPrimary py-1 border-b-2 border-transparent transition-all duration-200";
  }
  if (navContact) {
    navContact.className = isContact 
      ? "nav-item text-xs font-grotesk uppercase tracking-widest text-textPrimary py-1 border-b-2 border-textPrimary transition-all duration-200"
      : "nav-item text-xs font-grotesk uppercase tracking-widest text-textSecondary hover:text-textPrimary py-1 border-b-2 border-transparent transition-all duration-200";
  }
}

function handleRoute() {
  const rawRoute = getRoute();
  updateNavState(rawRoute);
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Close mobile drawer if open
  closeMobileMenu();

  const app = document.getElementById('app-view');
  if (!app) return;

  if (rawRoute === '/' || rawRoute === '') {
    renderHomePage(app);
  } else if (rawRoute.startsWith('/work/')) {
    const slug = rawRoute.replace('/work/', '');
    renderProjectPage(app, slug);
  } else if (rawRoute === '/about') {
    renderAboutPage(app);
  } else if (rawRoute === '/contact') {
    renderContactPage(app);
  } else {
    render404(app);
  }
}

// ============================================================================
// 2. HOMEPAGE VIEW
// ============================================================================

function renderHomePage(container) {
  document.title = `${SITE_CONFIG.photographerName} — PORTFOLIO & ARCHIVE`;
  
  const allCategories = [
    "ALL", 
    "FASHION / EDITORIAL", 
    "CAMPAIGNS", 
    "PORTRAITS", 
    "STREET CULTURE", 
    "EXPERIMENTAL", 
    "PERSONAL WORK"
  ];

  container.innerHTML = `
    <!-- HERO SECTION -->
    <section class="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden">
      <!-- Lead Hero Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="${ASSETS.HERO_NOIR}" alt="Hero Editorial Photograph: avant-garde model in leather trench coat in midnight alleyway" class="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.12]">
        <div class="absolute inset-0 bg-gradient-to-t from-bgPrimary via-bgPrimary/30 to-black/60"></div>
      </div>

      <!-- Hero Top Metadata Strip -->
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono tracking-widest uppercase text-textSecondary">
        <div class="flex items-center gap-3">
          <span class="inline-block w-2 h-2 rounded-full bg-accentRed animate-pulse"></span>
          <span class="text-textPrimary font-semibold">SELECTED ARCHIVE 2024—2026</span>
        </div>
        <div>
          <span>${SITE_CONFIG.locations}</span>
        </div>
      </div>

      <!-- Hero Monumental Editorial Typography -->
      <div class="relative z-10 my-auto py-12 md:py-16 max-w-7xl">
        <p class="text-xs md:text-sm font-mono tracking-widest uppercase text-textSecondary mb-3">
          ${SITE_CONFIG.descriptor}
        </p>
        <h1 class="text-hero-giant font-grotesk font-bold tracking-tighter text-textPrimary uppercase">
          ${SITE_CONFIG.photographerName}
        </h1>
        <div class="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 editorial-border-t pt-6 max-w-5xl">
          <p class="text-sm md:text-base text-textPrimary/90 font-sans max-w-xl leading-relaxed">
            ${SITE_CONFIG.heroSubtext}
          </p>
          <a href="#selected-work-section" class="btn-editorial flex items-center gap-3 self-start md:self-auto group">
            <span>VIEW PORTFOLIO</span>
            <span class="text-accentRed group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>
      </div>

      <!-- Hero Bottom Indicator -->
      <div class="relative z-10 flex items-center justify-between text-[11px] font-mono text-textMuted uppercase pt-4 editorial-border-t border-white/10">
        <span>FIGURE 01 // NOCTURNE</span>
        <div class="flex items-center gap-2">
          <span>SCROLL DOWN</span>
          <span class="animate-bounce">↓</span>
        </div>
      </div>
    </section>

    <!-- EDITORIAL STATEMENT INTRO SECTION -->
    <section class="py-20 md:py-32 px-6 md:px-12 lg:px-16 bg-bgPrimary editorial-border-b">
      <div class="max-w-6xl mx-auto flex flex-col gap-10">
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono tracking-widest text-accentRed font-semibold uppercase">[ STATEMENT 001 ]</span>
          <div class="h-px bg-borderSubtle flex-1"></div>
        </div>
        <h2 class="text-editorial-quote font-serif-quote font-normal text-textPrimary leading-tight max-w-5xl">
          "${SITE_CONFIG.heroStatement}"
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          <div class="md:col-span-4 font-mono text-xs text-textSecondary uppercase tracking-wider space-y-3">
            <p>PROVOCATION OVER PRESERVATION.</p>
            <p>HARD XENON STROBES · 35MM / 6X7 MEDIUM FORMAT GRAIN · ZERO RETOUCHING DRIFT.</p>
          </div>
          <div class="md:col-span-8 text-sm md:text-base text-textSecondary font-sans leading-relaxed space-y-4">
            <p>
              Photography is not an exercise in cataloging garments or rendering polite likenesses. It is an act of seizure. Using unsoftened camera flash, brutalist urban backdrops, and kinetic velocity, the work captures human presence in its most electric, uncompromising state.
            </p>
            <p class="text-xs font-mono text-textMuted uppercase tracking-widest">
              COMMISSIONED ACROSS EDITORIAL SPREADS, GLOBAL CAMPAIGNS, AND UNDERGROUND ARCHIVES.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SELECTED WORK GALLERY SECTION -->
    <section id="selected-work-section" class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-bgPrimary">
      <div class="max-w-7xl mx-auto">
        <!-- Gallery Section Header & Category Filters -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 editorial-border-b">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-textMuted block mb-2">INDEX / ARCHIVE</span>
            <h2 class="text-title-display font-grotesk font-bold tracking-tight text-textPrimary uppercase">
              SELECTED WORK
            </h2>
          </div>
          
          <!-- Category Filter Chips -->
          <div class="flex flex-wrap items-center gap-2" id="category-filter-group" role="group" aria-label="Filter projects by category">
            ${allCategories.map(cat => `
              <button type="button" data-category="${cat}" class="category-filter-btn px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-200 border ${cat === 'ALL' ? 'bg-textPrimary text-bgPrimary border-textPrimary font-semibold' : 'bg-transparent text-textSecondary border-borderSubtle hover:border-textSecondary hover:text-textPrimary'}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Dynamic Project Grid Container -->
        <div id="projects-grid-container" class="mt-16 flex flex-col gap-24 md:gap-32">
          <!-- Populated by renderProjectCards() -->
        </div>
      </div>
    </section>

    <!-- TYPOGRAPHIC EDITORIAL BREAKOUT BANNER -->
    <section class="py-24 px-6 md:px-12 lg:px-16 bg-bgSecondary editorial-border-t editorial-border-b overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col gap-6">
        <span class="text-xs font-mono tracking-widest uppercase text-accentRed">[ PERSPECTIVE ]</span>
        <blockquote class="font-grotesk font-bold text-2xl md:text-5xl lg:text-6xl tracking-tight text-textPrimary leading-none uppercase max-w-5xl">
          "WE DON’T SOFTEN THE SHADOWS. WE MAKE THEM SHARPER."
        </blockquote>
        <p class="font-mono text-xs text-textMuted uppercase tracking-widest mt-2">
          — STUDIO ${SITE_CONFIG.photographerName} / NOTES ON FLASH &amp; NEGATIVE SPACE
        </p>
      </div>
    </section>

    <!-- COMMISSIONS CALLOUT SECTION -->
    <section class="py-24 px-6 md:px-12 lg:px-16 bg-bgPrimary">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10 p-8 md:p-14 bg-bgSecondary border border-borderSubtle">
        <div class="space-y-4 max-w-2xl">
          <span class="text-xs font-mono uppercase tracking-widest text-textMuted">[ COMMISSIONS &amp; ASSIGNMENTS ]</span>
          <h3 class="font-grotesk text-2xl md:text-4xl font-bold tracking-tight text-textPrimary uppercase">
            ACCEPTING GLOBAL EDITORIAL &amp; COMMERCIAL PROJECTS
          </h3>
          <p class="text-sm text-textSecondary font-sans leading-relaxed">
            Currently booking for Autumn/Winter 2026 and Spring 2027 worldwide across Paris, New York, and special assignment locations.
          </p>
        </div>
        <a href="#/contact" class="btn-editorial btn-editorial-red whitespace-nowrap self-start md:self-center">
          INITIATE INQUIRY →
        </a>
      </div>
    </section>
  `;

  // Render cards for 'ALL'
  renderProjectCards('ALL');

  // Filter Buttons Event Delegation
  const filterBtns = container.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterBtns.forEach(b => {
        if (b.getAttribute('data-category') === cat) {
          b.className = "category-filter-btn px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-200 border bg-textPrimary text-bgPrimary border-textPrimary font-semibold";
        } else {
          b.className = "category-filter-btn px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-200 border bg-transparent text-textSecondary border-borderSubtle hover:border-textSecondary hover:text-textPrimary";
        }
      });
      renderProjectCards(cat);
    });
  });
}

function renderProjectCards(category) {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  const filtered = category === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-20 text-center text-textSecondary font-mono text-xs">
        NO PROJECTS FOUND IN THIS CATEGORY.
      </div>
    `;
    return;
  }

  let html = '';

  filtered.forEach((project, index) => {
    const itemNumber = String(index + 1).padStart(2, '0');
    const totalItems = String(filtered.length).padStart(2, '0');
    const isFullWidth = (index === 0) || (index === 3 && filtered.length > 3);

    if (isFullWidth) {
      html += `
        <article class="project-entry group relative flex flex-col gap-6" data-project-slug="${project.slug}">
          <div class="flex items-center justify-between text-xs font-mono text-textSecondary editorial-border-b pb-4">
            <div class="flex items-center gap-3">
              <span class="text-accentRed font-semibold">[ ${itemNumber} // ${totalItems} ]</span>
              <span class="uppercase tracking-widest text-textPrimary">${project.category}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="hidden sm:inline-block">${project.client}</span>
              <span class="text-textMuted">${project.year}</span>
            </div>
          </div>

          <a href="#/work/${project.slug}" class="block relative w-full h-[52vh] sm:h-[68vh] md:h-[75vh] img-zoom-container bg-bgSecondary overflow-hidden" aria-label="View project ${project.title}">
            <img src="${project.coverImage}" alt="${project.title}: ${project.category}" class="w-full h-full object-cover img-zoom-target">
            <div class="absolute bottom-6 right-6 z-10 hidden sm:flex items-center gap-2 bg-black/80 px-4 py-2 border border-borderSubtle text-xs font-mono tracking-widest uppercase text-textPrimary opacity-90 group-hover:bg-accentRed group-hover:border-accentRed group-hover:text-white transition-colors duration-200">
              <span>EXPLORE PROJECT</span>
              <span>→</span>
            </div>
          </a>

          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <h3 class="font-grotesk font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-textPrimary uppercase group-hover:text-accentRed transition-colors duration-200">
                <a href="#/work/${project.slug}">${project.title}</a>
              </h3>
              <p class="text-xs md:text-sm text-textSecondary font-sans max-w-2xl mt-2 line-clamp-2">
                ${project.description}
              </p>
            </div>
            <a href="#/work/${project.slug}" class="text-xs font-mono uppercase tracking-widest text-textPrimary hover:text-accentRed flex items-center gap-2 self-start md:self-auto py-2">
              <span>VIEW FULL EDITORIAL (${project.gallery.length} IMAGES)</span>
              <span>→</span>
            </a>
          </div>
        </article>
      `;
    } else {
      const isEven = index % 2 === 0;
      html += `
        <article class="project-entry group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center" data-project-slug="${project.slug}">
          <div class="md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}">
            <a href="#/work/${project.slug}" class="block relative w-full aspect-[4/5] md:aspect-[3/4] img-zoom-container bg-bgSecondary overflow-hidden" aria-label="View project ${project.title}">
              <img src="${project.coverImage}" alt="${project.title}" class="w-full h-full object-cover img-zoom-target">
              <div class="absolute top-4 left-4 bg-black/75 px-2.5 py-1 text-[10px] font-mono text-textPrimary uppercase tracking-wider border border-borderSubtle">
                ${project.category}
              </div>
            </a>
          </div>

          <div class="md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'} flex flex-col justify-between h-full py-4 space-y-6">
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-xs font-mono text-textMuted uppercase tracking-widest">
                <span class="text-accentRed font-semibold">[ ${itemNumber} ]</span>
                <span>${project.year}</span>
                <span>/</span>
                <span class="truncate">${project.client}</span>
              </div>

              <h3 class="font-grotesk font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-textPrimary uppercase group-hover:text-accentRed transition-colors duration-200">
                <a href="#/work/${project.slug}">${project.title}</a>
              </h3>

              <p class="text-xs md:text-sm text-textSecondary font-sans leading-relaxed">
                ${project.description}
              </p>
            </div>

            <div class="editorial-border-t pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span class="text-[11px] font-mono text-textMuted uppercase tracking-wider">
                ${project.gallery.length} PHOTOGRAPHS
              </span>
              <a href="#/work/${project.slug}" class="btn-editorial py-2 px-4 self-start sm:self-auto text-[11px]">
                VIEW PROJECT →
              </a>
            </div>
          </div>
        </article>
      `;
    }
  });

  container.innerHTML = html;
}

// ============================================================================
// 3. PROJECT DETAIL PAGE VIEW
// ============================================================================

function renderProjectPage(container, slug) {
  const projectIndex = PROJECTS.findIndex(p => p.slug === slug);
  if (projectIndex === -1) {
    render404(container);
    return;
  }

  const project = PROJECTS[projectIndex];
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  document.title = `${project.title} — ${SITE_CONFIG.photographerName}`;

  // Populate lightbox list for this project
  currentLightboxList = project.gallery.map(img => ({
    src: img.src,
    title: project.title,
    caption: img.caption || img.title,
    alt: img.alt
  }));

  container.innerHTML = `
    <article class="pt-28 pb-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <!-- Back Link & Index Navigation -->
      <div class="flex items-center justify-between pb-8 editorial-border-b text-xs font-mono uppercase tracking-widest text-textSecondary">
        <a href="#/" class="hover:text-textPrimary flex items-center gap-2 group transition-colors">
          <span class="group-hover:-translate-x-1 transition-transform">←</span>
          <span>RETURN TO WORK INDEX</span>
        </a>
        <span class="text-textMuted">${project.category} · ${project.year}</span>
      </div>

      <!-- Project Header & Metadata Grid -->
      <header class="py-12 md:py-16">
        <h1 class="text-title-display font-grotesk font-bold tracking-tighter text-textPrimary uppercase">
          ${project.title}
        </h1>
        <p class="text-sm md:text-base text-textSecondary font-sans max-w-3xl mt-4 leading-relaxed">
          ${project.description}
        </p>

        <!-- Metadata Box -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 p-6 bg-bgSecondary border border-borderSubtle font-mono text-xs">
          <div>
            <span class="text-[10px] uppercase text-textMuted block mb-1">CLIENT / PUBLICATION</span>
            <span class="text-textPrimary font-semibold">${project.client}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-textMuted block mb-1">YEAR</span>
            <span class="text-textPrimary">${project.year}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-textMuted block mb-1">CATEGORY</span>
            <span class="text-textPrimary">${project.category}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-textMuted block mb-1">CURATION</span>
            <span class="text-textPrimary">${project.gallery.length} Plates</span>
          </div>
        </div>
      </header>

      <!-- SEQUENCED GALLERY -->
      <div class="flex flex-col gap-16 md:gap-24 my-10" id="project-gallery-list">
        ${project.gallery.map((img, idx) => {
          const figNum = String(idx + 1).padStart(2, '0');
          const totalFigs = String(project.gallery.length).padStart(2, '0');
          const isLandscape = img.aspect === 'landscape';

          return `
            <figure class="flex flex-col gap-4 group">
              <div class="relative w-full ${isLandscape ? 'aspect-[16/9] max-h-[80vh]' : 'aspect-[3/4] md:max-w-3xl mx-auto max-h-[85vh]'} bg-bgSecondary overflow-hidden cursor-pointer" data-gallery-index="${idx}" tabindex="0" role="button" aria-label="Expand image ${figNum}: ${img.title}">
                <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <div class="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 border border-borderSubtle text-[10px] font-mono tracking-widest uppercase text-textPrimary opacity-0 group-hover:opacity-100 transition-opacity">
                  EXPAND ⤢
                </div>
              </div>
              <figcaption class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs font-mono text-textSecondary pt-2 ${isLandscape ? '' : 'md:max-w-3xl mx-auto w-full'}">
                <div>
                  <span class="text-accentRed font-semibold mr-2">[ FIG. ${figNum}/${totalFigs} ]</span>
                  <span class="text-textPrimary font-semibold font-grotesk uppercase">${img.title}</span>
                </div>
                <span class="text-textMuted text-[11px]">${img.caption}</span>
              </figcaption>
            </figure>
          `;
        }).join('')}
      </div>

      <!-- PRODUCTION CREDITS BLOCK -->
      <div class="my-16 p-8 bg-bgSecondary border border-borderSubtle flex flex-col md:flex-row justify-between gap-6">
        <div class="space-y-2">
          <span class="text-[10px] font-mono tracking-widest uppercase text-textMuted">PRODUCTION CREDITS</span>
          <p class="text-xs font-mono text-textSecondary leading-relaxed">${project.credits}</p>
        </div>
        <div class="flex items-center gap-4 self-start md:self-center">
          <button type="button" id="open-first-lightbox-btn" class="btn-editorial py-2 px-4 text-xs">
            VIEW FULLSCREEN SERIES
          </button>
        </div>
      </div>

      <!-- PREVIOUS & NEXT PROJECT NAVIGATION -->
      <nav class="pt-16 editorial-border-t grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Project Navigation">
        <a href="#/work/${prevProject.slug}" class="p-6 bg-bgSecondary border border-borderSubtle hover:border-textSecondary transition-colors group flex flex-col justify-between">
          <span class="text-[10px] font-mono uppercase tracking-widest text-textMuted group-hover:text-accentRed transition-colors">← PREVIOUS PROJECT</span>
          <span class="font-grotesk font-bold text-2xl text-textPrimary uppercase mt-3">${prevProject.title}</span>
          <span class="text-xs font-mono text-textSecondary mt-1">${prevProject.category}</span>
        </a>
        <a href="#/work/${nextProject.slug}" class="p-6 bg-bgSecondary border border-borderSubtle hover:border-textSecondary transition-colors group flex flex-col justify-between text-left md:text-right">
          <span class="text-[10px] font-mono uppercase tracking-widest text-textMuted group-hover:text-accentRed transition-colors">NEXT PROJECT →</span>
          <span class="font-grotesk font-bold text-2xl text-textPrimary uppercase mt-3">${nextProject.title}</span>
          <span class="text-xs font-mono text-textSecondary mt-1">${nextProject.category}</span>
        </a>
      </nav>
    </article>
  `;

  // Attach Lightbox Triggers
  const figureBtns = container.querySelectorAll('[data-gallery-index]');
  figureBtns.forEach(fig => {
    fig.addEventListener('click', () => {
      const idx = parseInt(fig.getAttribute('data-gallery-index'), 10);
      openLightbox(idx);
    });
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(fig.getAttribute('data-gallery-index'), 10);
        openLightbox(idx);
      }
    });
  });

  const openFirstBtn = container.querySelector('#open-first-lightbox-btn');
  if (openFirstBtn) {
    openFirstBtn.addEventListener('click', () => openLightbox(0));
  }
}

// ============================================================================
// 4. ABOUT PAGE VIEW
// ============================================================================

function renderAboutPage(container) {
  document.title = `ABOUT — ${SITE_CONFIG.photographerName}`;

  container.innerHTML = `
    <article class="pt-28 pb-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div class="flex items-center justify-between pb-8 editorial-border-b text-xs font-mono uppercase tracking-widest text-textSecondary">
        <span>BIOGRAPHY &amp; ART DIRECTION</span>
        <span class="text-textMuted">STUDIO ${SITE_CONFIG.photographerName}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 items-start">
        <!-- Left Column: Portrait & Studio Spec -->
        <div class="lg:col-span-5 space-y-6">
          <div class="relative w-full aspect-[3/4] bg-bgSecondary overflow-hidden border border-borderSubtle">
            <img src="${ASSETS.PHOTOGRAPHER_ABOUT}" alt="Portrait of ${SITE_CONFIG.photographerName} with medium format camera" class="w-full h-full object-cover">
          </div>
          <div class="p-4 bg-bgSecondary border border-borderSubtle text-xs font-mono space-y-2">
            <div class="flex justify-between text-textMuted">
              <span>SUBJECT</span>
              <span class="text-textPrimary font-semibold">${SITE_CONFIG.photographerName}</span>
            </div>
            <div class="flex justify-between text-textMuted">
              <span>CAMERA SYSTEMS</span>
              <span class="text-textPrimary">${SITE_CONFIG.cameraSystems}</span>
            </div>
            <div class="flex justify-between text-textMuted">
              <span>PRIMARY BASE</span>
              <span class="text-textPrimary">${SITE_CONFIG.locations}</span>
            </div>
          </div>

          <!-- Availability Status Card -->
          <div class="p-6 bg-bgElevated border border-accentRed/40 space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-accentRed animate-ping"></span>
              <span class="text-xs font-mono tracking-widest uppercase text-textPrimary font-semibold">BOOKING STATUS</span>
            </div>
            <p class="text-xs text-textSecondary font-sans leading-relaxed">
              Accepting editorial commissions, worldwide commercial campaigns, and personal monographs for Q4 2026 / Q1 2027.
            </p>
            <a href="#/contact" class="btn-editorial btn-editorial-red w-full text-center block text-xs py-2 mt-2">
              CONTACT STUDIO
            </a>
          </div>
        </div>

        <!-- Right Column: Narrative, Philosophy & Client List -->
        <div class="lg:col-span-7 space-y-12">
          <div class="space-y-6">
            <h1 class="text-title-display font-grotesk font-bold tracking-tight text-textPrimary uppercase">
              PHOTOGRAPHER &amp; VISUAL DIRECTOR
            </h1>
            <p class="font-serif-quote text-2xl text-textPrimary leading-snug">
              "Light should not merely flatter; it must interrogate."
            </p>
            <div class="text-sm md:text-base text-textSecondary font-sans leading-relaxed space-y-4">
              <p>${SITE_CONFIG.bio}</p>
              <p>
                Trained in classical black-and-white silver gelatin printing before turning to experimental high-output strobe optics, the work treats the photographic frame as a physical confrontation. Each series balances raw subcultural authenticity with high-fashion technical precision.
              </p>
            </div>
          </div>

          <!-- Specializations -->
          <div class="space-y-4 pt-6 editorial-border-t">
            <span class="text-xs font-mono tracking-widest uppercase text-accentRed font-semibold">[ SPECIALIZATIONS ]</span>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-textPrimary">
              ${SITE_CONFIG.specializations.map(spec => `
                <li class="p-3 bg-bgSecondary border border-borderSubtle flex items-center gap-2">
                  <span class="text-accentRed">▪</span>
                  <span>${spec}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Selected Clients -->
          <div class="space-y-4 pt-6 editorial-border-t">
            <div class="flex justify-between items-baseline">
              <span class="text-xs font-mono tracking-widest uppercase text-textMuted font-semibold">[ SELECTED CLIENTS &amp; EDITORIALS ]</span>
              <span class="text-[10px] font-mono text-textMuted">2021—2026</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              ${SITE_CONFIG.clientList.map(item => `
                <div class="p-3 bg-bgSecondary border border-borderSubtle">
                  <span class="font-grotesk font-semibold text-xs text-textPrimary block">${item.name}</span>
                  <span class="text-[10px] font-mono text-textMuted uppercase">${item.type}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Exhibitions -->
          <div class="space-y-4 pt-6 editorial-border-t">
            <span class="text-xs font-mono tracking-widest uppercase text-textMuted font-semibold">[ SELECTED EXHIBITIONS ]</span>
            <div class="space-y-3 font-mono text-xs">
              ${SITE_CONFIG.exhibitions.map(ex => `
                <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 editorial-border-b gap-1">
                  <div>
                    <span class="text-accentRed mr-2">${ex.year}</span>
                    <span class="text-textPrimary font-semibold">${ex.title}</span>
                  </div>
                  <span class="text-textMuted">${ex.venue}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Representation Info -->
          <div class="p-6 bg-bgSecondary border border-borderSubtle text-xs font-mono space-y-3">
            <span class="text-textMuted uppercase tracking-wider block">COMMERCIAL REPRESENTATION</span>
            <p class="text-textPrimary font-semibold">${SITE_CONFIG.representation.agency}</p>
            <div class="flex flex-wrap gap-6 text-textSecondary text-[11px]">
              <span>NEW YORK: ${SITE_CONFIG.representation.nycEmail}</span>
              <span>PARIS: ${SITE_CONFIG.representation.parisEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ============================================================================
// 5. CONTACT PAGE VIEW
// ============================================================================

function renderContactPage(container) {
  document.title = `CONTACT & COMMISSIONS — ${SITE_CONFIG.photographerName}`;

  container.innerHTML = `
    <article class="pt-28 pb-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div class="flex items-center justify-between pb-8 editorial-border-b text-xs font-mono uppercase tracking-widest text-textSecondary">
        <span>COMMISSIONS &amp; STUDIO ENQUIRIES</span>
        <span class="text-textMuted">DIRECT INTAKE</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12">
        <!-- Left Column: Direct Info -->
        <div class="lg:col-span-5 space-y-8">
          <div>
            <h1 class="text-title-display font-grotesk font-bold tracking-tight text-textPrimary uppercase">
              LET'S MAKE SOMETHING.
            </h1>
            <p class="text-sm md:text-base text-textSecondary font-sans leading-relaxed mt-4">
              For fashion editorials, global advertising campaigns, private portrait sessions, print acquisitions, and creative direction discussions.
            </p>
          </div>

          <div class="space-y-4 p-6 bg-bgSecondary border border-borderSubtle font-mono text-xs">
            <div>
              <span class="text-[10px] text-textMuted uppercase block mb-1">STUDIO DIRECT</span>
              <a href="mailto:${SITE_CONFIG.email}" class="text-textPrimary hover:text-accentRed font-semibold text-sm transition-colors">
                ${SITE_CONFIG.email}
              </a>
            </div>
            <div>
              <span class="text-[10px] text-textMuted uppercase block mb-1">TELEPHONE</span>
              <span class="text-textPrimary">${SITE_CONFIG.phone}</span>
            </div>
            <div>
              <span class="text-[10px] text-textMuted uppercase block mb-1">INSTAGRAM</span>
              <a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer" class="text-textPrimary hover:text-accentRed transition-colors">
                ${SITE_CONFIG.instagram} ↗
              </a>
            </div>
            <div>
              <span class="text-[10px] text-textMuted uppercase block mb-1">LOCATIONS</span>
              <span class="text-textPrimary">${SITE_CONFIG.locations}</span>
            </div>
          </div>

          <div class="p-6 bg-bgElevated border border-borderSubtle text-xs font-sans text-textSecondary leading-relaxed">
            <span class="font-mono text-[10px] uppercase tracking-widest text-accentRed block mb-2 font-semibold">TURNAROUND NOTICE</span>
            All commercial and editorial proposals receive an initial response within 24 to 48 hours. For immediate call-sheet emergencies or urgent bookings, please contact Maison 44 directly.
          </div>
        </div>

        <!-- Right Column: Interactive Inquiry Form -->
        <div class="lg:col-span-7">
          <div class="p-8 md:p-10 bg-bgSecondary border border-borderSubtle">
            <div class="pb-6 mb-6 editorial-border-b flex justify-between items-center">
              <h2 class="font-grotesk font-bold text-xl text-textPrimary uppercase">PROJECT INQUIRY FORM</h2>
              <span class="text-[10px] font-mono text-textMuted uppercase">* REQUIRED FIELDS</span>
            </div>

            <form id="contact-form" class="space-y-6" novalidate>
              <div class="space-y-2">
                <label for="contact-name" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                  FULL NAME / BRAND *
                </label>
                <input type="text" id="contact-name" name="name" required placeholder="e.g. Elena Rostova / Acne Studios" class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors">
                <p id="name-error" class="hidden text-xs font-mono text-accentRed mt-1">Please provide your name or company.</p>
              </div>

              <div class="space-y-2">
                <label for="contact-email" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                  WORK EMAIL *
                </label>
                <input type="email" id="contact-email" name="email" required placeholder="e.g. artdirector@studio.com" class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors">
                <p id="email-error" class="hidden text-xs font-mono text-accentRed mt-1">Please provide a valid email address.</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="contact-type" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                    PROJECT SCOPE
                  </label>
                  <select id="contact-type" name="type" class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors">
                    <option value="Fashion Editorial">Fashion Editorial</option>
                    <option value="Commercial Advertising Campaign">Commercial Advertising Campaign</option>
                    <option value="Cultural / Celebrity Portraiture">Cultural / Celebrity Portraiture</option>
                    <option value="Lookbook & Runway Coverage">Lookbook &amp; Runway Coverage</option>
                    <option value="Creative Direction & Film">Creative Direction &amp; Film</option>
                    <option value="Print Acquisition / Monograph">Print Acquisition / Monograph</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label for="contact-budget" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                    ESTIMATED BUDGET
                  </label>
                  <select id="contact-budget" name="budget" class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors">
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                    <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                    <option value="Standard Editorial Day Rate">Standard Editorial Day Rate</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label for="contact-timeline" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                  PROPOSED TIMELINE &amp; LOCATION
                </label>
                <input type="text" id="contact-timeline" name="timeline" placeholder="e.g. October 2026, Paris Fashion Week" class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors">
              </div>

              <div class="space-y-2">
                <label for="contact-details" class="block font-mono text-xs uppercase tracking-wider text-textPrimary">
                  PROJECT BRIEF &amp; OBJECTIVES *
                </label>
                <textarea id="contact-details" name="details" rows="5" required placeholder="Describe the creative vision, deliverables, dates, and references..." class="w-full px-4 py-3 bg-bgPrimary border border-borderSubtle focus:border-accentRed text-textPrimary text-sm font-sans focus:outline-none transition-colors resize-y"></textarea>
                <p id="details-error" class="hidden text-xs font-mono text-accentRed mt-1">Please provide project details.</p>
              </div>

              <div class="pt-2">
                <button type="submit" id="submit-btn" class="btn-editorial btn-editorial-red w-full py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-3">
                  <span id="btn-text">TRANSMIT INQUIRY</span>
                  <span id="btn-spinner" class="hidden w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                </button>
              </div>
            </form>

            <div id="form-feedback" class="hidden mt-6 p-6 bg-bgElevated border border-borderActive text-center space-y-3" role="status" aria-live="polite">
              <div class="w-10 h-10 rounded-full bg-accentRed/20 border border-accentRed text-accentRed flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h3 class="font-grotesk font-bold text-lg text-textPrimary uppercase">INQUIRY RECEIVED</h3>
              <p class="text-xs text-textSecondary font-sans max-w-md mx-auto">
                Thank you. Your message has been logged under docket <span id="inquiry-ref" class="font-mono text-textPrimary">#MR-2026-08</span>. Studio ${SITE_CONFIG.photographerName} will review your brief within 24 hours.
              </p>
              <button type="button" id="reset-form-btn" class="btn-editorial py-2 px-4 text-[11px] mt-2">
                SEND ANOTHER MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;

  // Attach Form Validation and Submission handler
  const form = container.querySelector('#contact-form');
  const submitBtn = container.querySelector('#submit-btn');
  const btnText = container.querySelector('#btn-text');
  const btnSpinner = container.querySelector('#btn-spinner');
  const feedback = container.querySelector('#form-feedback');
  const inquiryRef = container.querySelector('#inquiry-ref');
  const resetBtn = container.querySelector('#reset-form-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const detailsInput = document.getElementById('contact-details');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const detailsError = document.getElementById('details-error');

      let hasError = false;

      if (!nameInput.value.trim()) {
        nameError.classList.remove('hidden');
        nameInput.classList.add('border-accentRed');
        hasError = true;
      } else {
        nameError.classList.add('hidden');
        nameInput.classList.remove('border-accentRed');
      }

      const emailVal = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailPattern.test(emailVal)) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-accentRed');
        hasError = true;
      } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-accentRed');
      }

      if (!detailsInput.value.trim()) {
        detailsError.classList.remove('hidden');
        detailsInput.classList.add('border-accentRed');
        hasError = true;
      } else {
        detailsError.classList.add('hidden');
        detailsInput.classList.remove('border-accentRed');
      }

      if (hasError) return;

      btnText.textContent = "TRANSMITTING...";
      btnSpinner.classList.remove('hidden');
      submitBtn.disabled = true;

      setTimeout(() => {
        btnText.textContent = "TRANSMIT INQUIRY";
        btnSpinner.classList.add('hidden');
        submitBtn.disabled = false;
        form.classList.add('hidden');
        feedback.classList.remove('hidden');

        const randomId = Math.floor(1000 + Math.random() * 9000);
        if (inquiryRef) inquiryRef.textContent = `#MR-2026-${randomId}`;

        try {
          localStorage.setItem('mr_last_inquiry', JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            time: new Date().toISOString()
          }));
        } catch (err) {}
      }, 900);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      feedback.classList.add('hidden');
    });
  }
}

// ============================================================================
// 6. 404 NOT FOUND VIEW
// ============================================================================

function render404(container) {
  document.title = `404 — NOT FOUND — ${SITE_CONFIG.photographerName}`;
  container.innerHTML = `
    <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-32 space-y-6">
      <span class="text-accentRed font-mono text-sm tracking-widest">[ 404 ERROR ]</span>
      <h1 class="text-5xl md:text-7xl font-grotesk font-bold text-textPrimary tracking-tight">FRAME NOT FOUND</h1>
      <p class="text-textSecondary font-mono text-xs max-w-md">
        The plate or editorial index you requested does not exist or has been archived.
      </p>
      <a href="#/" class="btn-editorial py-3 px-6 mt-4">
        RETURN TO ARCHIVE
      </a>
    </div>
  `;
}

// ============================================================================
// 7. LIGHTBOX CONTROLLER
// ============================================================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxTitle = document.getElementById('lightbox-project-title');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

function openLightbox(index) {
  if (!currentLightboxList || currentLightboxList.length === 0) return;
  currentLightboxIndex = (index + currentLightboxList.length) % currentLightboxList.length;
  updateLightboxContent();
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = currentLightboxList[currentLightboxIndex];
  if (!item) return;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || item.title || 'Portfolio Image';
    lightboxCaption.textContent = item.caption || item.title || '';
    lightboxTitle.textContent = item.title || SITE_CONFIG.photographerName;
    lightboxCounter.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} / ${String(currentLightboxList.length).padStart(2, '0')}`;
    lightboxImg.style.opacity = '1';
  }, 100);
}

function prevLightboxImage() {
  if (!currentLightboxList || currentLightboxList.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length;
  updateLightboxContent();
}

function nextLightboxImage() {
  if (!currentLightboxList || currentLightboxList.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxList.length;
  updateLightboxContent();
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);
if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);

// Keyboard controls (Esc, Left arrow, Right arrow)
window.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
  }
});

// Touch swipe gestures
let touchStartX = 0;
let touchEndX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) nextLightboxImage();
    else prevLightboxImage();
  }
}, { passive: true });

// ============================================================================
// 8. MOBILE MENU & HEADER SCROLL
// ============================================================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const menuText = document.getElementById('menu-text');
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  if (isMobileMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  isMobileMenuOpen = true;
  mobileNav.classList.remove('hidden');
  mobileNav.classList.add('flex');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  if (menuText) menuText.textContent = "CLOSE";
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  isMobileMenuOpen = false;
  mobileNav.classList.add('hidden');
  mobileNav.classList.remove('flex');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  if (menuText) menuText.textContent = "MENU";
  document.body.style.overflow = '';
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Header scroll background transition
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    siteHeader.classList.add('bg-bgPrimary/95', 'backdrop-blur-md', 'border-borderSubtle', 'py-4');
    siteHeader.classList.remove('py-5', 'border-transparent');
  } else {
    siteHeader.classList.remove('bg-bgPrimary/95', 'backdrop-blur-md', 'border-borderSubtle', 'py-4');
    siteHeader.classList.add('py-5', 'border-transparent');
  }
}, { passive: true });

// Return to top
const footerTopBtn = document.getElementById('footer-top-btn');
if (footerTopBtn) {
  footerTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dynamic copyright year
const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
  copyrightYear.textContent = `© ${new Date().getFullYear()} ${SITE_CONFIG.photographerName}.`;
}

// Initial route trigger
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
