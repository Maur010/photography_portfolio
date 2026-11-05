/**
 * ============================================================================
 * PORTFOLIO PROJECTS & IMAGE REPOSITORY
 * Add, edit, or reorder your photographic projects here.
 * Place your image files inside the "images/" folder and update their paths below.
 * ============================================================================
 */

// Image Assets Registry (Relative paths in the images/ folder)
const ASSETS = {
  HERO_NOIR: "images/hero-noir.jpg",
  PHOTOGRAPHER_ABOUT: "images/photographer-about.jpg",
  PORTRAIT_MINIMAL: "images/portrait-minimal.jpg",
  STREET_CLUB: "images/street-club.jpg",
  CAMPAIGN_DESERT: "images/campaign-desert.jpg",
  BRUTALIST_MOTION: "images/brutalist-motion.jpg",
  MACRO_BEAUTY: "images/macro-beauty.jpg",
  BACKSTAGE_CHAINMAIL: "images/backstage-chainmail.jpg",
  KINETIC_SHADOW: "images/kinetic-shadow.jpg"
};

// Complete Project Catalog
const PROJECTS = [
  {
    id: "project-1",
    slug: "nocturne-protocol",
    title: "NOCTURNE PROTOCOL",
    category: "FASHION / EDITORIAL",
    year: "2026",
    client: "Dazed Magazine / Autumn Special",
    description: "A high-velocity nocturnal fashion story shot throughout the industrial alleys of Lower Manhattan. Harsh direct strobe flash tears through damp midnight asphalt, freezing avant-garde structured leather against raw iron roll-up gates. A study in razor tailoring and defiant velocity.",
    coverImage: ASSETS.HERO_NOIR,
    leadAspect: "landscape",
    credits: "Styling: Elena Moreau · Hair & Makeup: Kenji Sato · Casting: Midland NYC · Model: Sasha V.",
    gallery: [
      {
        src: ASSETS.HERO_NOIR,
        title: "Look 01 — Structured Lambskin Trench & Razor Optics",
        caption: "Direct on-camera strobe in midnight rain. 35mm film grain, 1/250s at f/8.",
        aspect: "landscape",
        alt: "Avant-garde model in oversized structured black leather trench coat in midnight city alley"
      },
      {
        src: ASSETS.PORTRAIT_MINIMAL,
        title: "Look 02 — Chiaroscuro Tailoring & Direct Flash Exposure",
        caption: "Sharp minimalist suiting against graphite backdrop with intense ocular reflection.",
        aspect: "portrait",
        alt: "Direct flash portrait of model with slicked hair and tailored black jacket"
      },
      {
        src: ASSETS.BACKSTAGE_CHAINMAIL,
        title: "Look 03 — Chainmail Texture & Backstage Atmospheric Haze",
        caption: "Candid backstage exposure capturing metallic shimmer through lingering haze.",
        aspect: "landscape",
        alt: "Backstage runway candid with chainmail metallic top and cigarette smoke"
      }
    ]
  },
  {
    id: "project-2",
    slug: "scarlet-meridian",
    title: "SCARLET MERIDIAN",
    category: "CAMPAIGNS",
    year: "2026",
    client: "Atelier Haute Couture Campaign",
    description: "Monumental crimson silks cast against barren twilight desert terrain. Twin halogen headlights from a vintage muscle car slice through volcanic dust, fusing brutal mechanical velocity with the sculpted, billowing grandeur of modern couture.",
    coverImage: ASSETS.CAMPAIGN_DESERT,
    leadAspect: "landscape",
    credits: "Art Direction: Studio Ramirez · Production: North West Desert Works · Styling: Clara Dupont",
    gallery: [
      {
        src: ASSETS.CAMPAIGN_DESERT,
        title: "Plate 01 — Crimson Silk Taffeta in Desert Dusk",
        caption: "Twin tungsten vehicle beams cutting through high wind and volcanic sand. 6x7 medium format.",
        aspect: "landscape",
        alt: "Model in billowing crimson gown in the desert backlit by glowing car headlights"
      },
      {
        src: ASSETS.MACRO_BEAUTY,
        title: "Plate 02 — Macro Beauty Detail / Gloss Lacquer No. 04",
        caption: "Direct ring-flash macro study of hyper-pigmented crimson lacquer and raw skin topography.",
        aspect: "square",
        alt: "Macro beauty photograph of glossy red lips under direct camera flash"
      },
      {
        src: ASSETS.BRUTALIST_MOTION,
        title: "Plate 03 — Kinetic Architectural Silhouette",
        caption: "High-contrast monochrome capture of sculpted drape in rapid descent.",
        aspect: "portrait",
        alt: "Avant-garde black dress moving past brutalist concrete wall"
      }
    ]
  },
  {
    id: "project-3",
    slug: "subterranean-saints",
    title: "SUBTERRANEAN SAINTS",
    category: "STREET CULTURE",
    year: "2025",
    client: "Independent Archive / Monograph Series",
    description: "An unvarnished personal document of nocturnal street subcultures outside brutalist club architectures in Tokyo and Berlin. Unposed, raw 35mm grain, handheld tungsten ambient spill, and spontaneous sartorial defiance documented between 3:00 AM and sunrise.",
    coverImage: ASSETS.STREET_CLUB,
    leadAspect: "portrait",
    credits: "Photography & Curation: Mauro Ramirez · Hand Printed at Darkroom Oberkampf, Paris",
    gallery: [
      {
        src: ASSETS.STREET_CLUB,
        title: "Archive 01 — Club Entrance Concrete Exterior, 03:42 AM",
        caption: "Deconstructed Japanese denim, silver hardware, and candid motion under harsh yellow sodium vapor.",
        aspect: "portrait",
        alt: "Two street culture models walking outside a brutalist concrete building at night"
      },
      {
        src: ASSETS.BACKSTAGE_CHAINMAIL,
        title: "Archive 02 — Backstage Metallic Shimmer",
        caption: "Direct flash freezing chainmail rings and rising cigarette smoke.",
        aspect: "landscape",
        alt: "Direct flash backstage candid of model with metallic silver top"
      },
      {
        src: ASSETS.PORTRAIT_MINIMAL,
        title: "Archive 03 — Ocular Gaze & Minimalist Suiting",
        caption: "Stripped-back direct portraiture with zero diffusion.",
        aspect: "portrait",
        alt: "Intense direct flash portrait with wet-look hair and black blazer"
      }
    ]
  },
  {
    id: "project-4",
    slug: "brutal-forms",
    title: "BRUTAL FORMS",
    category: "EXPERIMENTAL",
    year: "2025",
    client: "032c Magazine Special Monograph",
    description: "Monochrome architectural studies exploring severe brutalist concrete structures contrasted against sculpted geometric latex. Investigating the visual tension between heavy, static modernist aggregate and the fleeting kinetic blur of human movement.",
    coverImage: ASSETS.BRUTALIST_MOTION,
    leadAspect: "portrait",
    credits: "Location: Centre National de la Danse, Paris · Special thanks to Bureau Betak",
    gallery: [
      {
        src: ASSETS.BRUTALIST_MOTION,
        title: "Study 01 — Kinetic Displacement on Concrete Tier",
        caption: "Double-exposure strobe freezing the architectural shoulder line while recording movement blur.",
        aspect: "portrait",
        alt: "Model in sculptural black dress against textured concrete steps"
      },
      {
        src: ASSETS.KINETIC_SHADOW,
        title: "Study 02 — High-Velocity Strobe on Raw Aggregate",
        caption: "Severe diagonal perspective and deep shadow pools cast onto industrial stairs.",
        aspect: "portrait",
        alt: "Avant-garde black dress captured with strobe freeze on concrete staircase"
      },
      {
        src: ASSETS.HERO_NOIR,
        title: "Study 03 — Full-Bleed Urban Grid Contrast",
        caption: "Industrial garage shutter and deep night textures.",
        aspect: "landscape",
        alt: "Editorial model in black leather trench coat in urban alley"
      }
    ]
  },
  {
    id: "project-5",
    slug: "raw-protocol",
    title: "RAW PROTOCOL",
    category: "PORTRAITS",
    year: "2026",
    client: "Interview Magazine / Close-Up Series",
    description: "Radical direct-flash portraiture stripped of all beauty dish diffusion, softboxes, or post-production skin smoothing. Human identity rendered with crystalline optical fidelity, sharp pupil catchlights, and visceral psychological immediacy.",
    coverImage: ASSETS.PORTRAIT_MINIMAL,
    leadAspect: "portrait",
    credits: "Commissioned by Interview Magazine · Assistant: Mathieu Girard · Grooming: Nina Ross",
    gallery: [
      {
        src: ASSETS.PORTRAIT_MINIMAL,
        title: "Frame 01 — High-Key Flash Portrait in Minimalist Wool",
        caption: "Direct bracket-mounted strobe fired at 1/1 power. Unretouched film negative scan.",
        aspect: "portrait",
        alt: "High-contrast direct flash portrait of model with wet slicked hair"
      },
      {
        src: ASSETS.MACRO_BEAUTY,
        title: "Frame 02 — Hyper-Detail Pigment Topography",
        caption: "Close-range macro capture highlighting genuine surface texture and reflective gloss.",
        aspect: "square",
        alt: "Macro close-up portrait of red lips"
      },
      {
        src: ASSETS.STREET_CLUB,
        title: "Frame 03 — Nocturnal Dual Portrait",
        caption: "Candid double portrait under mixed sodium and direct xenon strobe.",
        aspect: "portrait",
        alt: "Two models in street fashion at night outside venue"
      }
    ]
  },
  {
    id: "project-6",
    slug: "kinetic-shadows",
    title: "KINETIC SHADOWS",
    category: "PERSONAL WORK",
    year: "2025",
    client: "Personal Edition / Signed Portfolio Box",
    description: "An ongoing darkroom and digital experiment investigating slow 1/4s shutter speeds synchronised with rear-curtain flash triggers. Freezing razor micro-expressions inside swirling, painterly ribbons of optical kinetic trace.",
    coverImage: ASSETS.KINETIC_SHADOW,
    leadAspect: "portrait",
    credits: "Curated by Studio Mauro Ramirez · Printed on Hahnemühle Baryta 315gsm",
    gallery: [
      {
        src: ASSETS.KINETIC_SHADOW,
        title: "Movement 01 — Rear-Curtain Sync on Brutalist Stair",
        caption: "1/8th second panning stroke with 200ws strobe burst freezing the apex of motion.",
        aspect: "portrait",
        alt: "Model in black gown on concrete stairs with kinetic motion blur"
      },
      {
        src: ASSETS.CAMPAIGN_DESERT,
        title: "Movement 02 — Wind-Driven Silk Trails",
        caption: "Dusk exposure combining incandescent vehicle beams and natural sky gradient.",
        aspect: "landscape",
        alt: "Flowing red dress in desert winds with car headlights"
      },
      {
        src: ASSETS.BACKSTAGE_CHAINMAIL,
        title: "Movement 03 — Backstage Silver Specular Highlights",
        caption: "Specular reflections dancing off chainmail under rapid handheld flash.",
        aspect: "landscape",
        alt: "Candid backstage photo of model in silver top"
      }
    ]
  }
];
