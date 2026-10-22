export interface ProjectOverride {
  title?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  year?: string | number;
  featured?: boolean;
  order?: number;
  tags?: string[];
}

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  "kaalanni-kalipina-tera": {
    title: "Kaalanni Kalipina Tera (The Sage Beyond Time)",
    category: "Historical Stories",
    shortDescription: "A telepathic bridge connecting ancient Vedic sages and contemporary horizons through cinematic visual storytelling.",
    description: "Kaalanni Kalipina Tera explores the intersection of ancient Indian wisdom, telepathic communion, and modern curiosity. Conceived and crafted with AI-assisted visual sequences, this project brings together period-accurate cultural textures, dialogue across millennia between Aditya and Acharya Atreya, and imaginative speculative design.",
    featured: true,
    order: 1,
    tags: ["Historical Sci-Fi", "Acharya Atreya", "Telepathy", "Kadha Cheppana Meeku"],
  },
  "chandrapur-letter-mystery": {
    title: "Chandrapur Letter Mystery",
    category: "Historical Stories",
    shortDescription: "An atmospheric period investigation unraveling forgotten correspondence, hidden missives, and palace conspiracies.",
    description: "Set against the backdrop of 19th-century Chandrapur, this historical drama follows the discovery of an enigmatic letter that reopens long-buried political and family secrets. Crafted with dramatic lighting and meticulous period composition.",
    featured: true,
    order: 2,
    tags: ["Historical Mystery", "Period Drama", "Cinematic Sequences", "Kadha Cheppana Meeku"],
  },
  "telugu-palace-mystery": {
    title: "Telugu Palace Mystery in the Rain",
    category: "Historical Stories",
    shortDescription: "Dramatic monsoon cinematography capturing royal courtyards, rain-slicked stones, and imperial intrigue.",
    description: "Set against relentless rains sweeping across an ancient Telugu kingdom's citadel, this narrative weaves together architectural grandeur, shadowy royal chambers, and cinematic pacing.",
    featured: true,
    order: 3,
    tags: ["Telugu History", "Palace Drama", "Monsoon Cinematography", "Atmospheric"],
  },
  "cinematic-video-showcase": {
    title: "Cinematic Storytelling Showcase",
    category: "AI Films",
    shortDescription: "High-impact video production combining multi-model AI synthesis, camera sweeps, and immersive soundscapes.",
    description: "A comprehensive motion showcase demonstrating advanced visual prompt engineering, fluid camera motions, and synchronized audio design across multiple narrative scenes.",
    featured: true,
    order: 4,
    tags: ["Cinematic Showcase", "Video Production", "Multi-Scene", "AI Filmmaking"],
  },
  "chanakya-chandragupta": {
    title: "Chanakya & Chandragupta",
    category: "Historical Stories",
    shortDescription: "Cinematic exploration of the strategic mind and imperial vision that shaped ancient India.",
    description: "An evocative visual recreation of the profound partnership between master strategist Chanakya and Emperor Chandragupta Maurya.",
    featured: false,
    order: 5,
    tags: ["Indian History", "Maurya Empire", "Cinematic Epic", "Character Design"],
  },
  "yaksha-prashna": {
    title: "Yaksha Prashna",
    category: "AI Films",
    shortDescription: "A mythology-inspired short film exploring the timeless philosophical dialogue by the enchanted lake.",
    description: "Based on the iconic episode from the Mahabharata, depicting Yudhishthira confronting the enigmatic Yaksha with questions on righteousness, grief, life, and destiny.",
    featured: false,
    order: 6,
    tags: ["Mythology", "Mahabharata", "Philosophical Short", "Atmospheric"],
  },
  "ancient-indian-knowledge": {
    title: "Ancient Indian Knowledge",
    category: "Historical Stories",
    shortDescription: "Educational and cinematic narratives uncovering ancient astronomy, architecture, and sciences.",
    description: "A visually rich documentary series tracing the remarkable scientific and architectural innovations of ancient Indian scholars.",
    featured: false,
    order: 7,
    tags: ["Ancient Sciences", "Temple Architecture", "Documentary Narrative"],
  },
  "galaxy-s26-ultra": {
    title: "Galaxy S26 Ultra Concept",
    category: "Science Fiction",
    shortDescription: "Speculative futuristic product commercial featuring volumetric lighting and sleek industrial aesthetics.",
    description: "A forward-looking cinematic advertisement concept exploring futuristic device interfaces and holographic displays.",
    featured: false,
    order: 8,
    tags: ["Science Fiction", "Cinematic Commercial", "Industrial Design"],
  },
  "bindus-kitchen": {
    title: "Bindu's Kitchen",
    category: "Cinematic Advertisements",
    shortDescription: "AI-assisted culinary commercial featuring macro gastronomy visuals and warm cinematic lighting.",
    description: "A creative commercial concept transforming everyday culinary art into a feast for the senses.",
    featured: false,
    order: 9,
    tags: ["Culinary Commercial", "Macro Cinematography", "AI Visuals"],
  },
};
