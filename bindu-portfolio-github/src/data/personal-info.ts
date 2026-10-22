export interface Specialty {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CreativeTool {
  name: string;
  role: string;
  category: "AI Generation" | "Video Production" | "Visual Design" | "Editing";
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string;
}

export const PERSONAL_INFO = {
  name: "Bindu",
  brandName: "BINDU",
  brandExtended: "BINDU Creative Studio",
  tagline: "Stories Beyond Time. Visuals Beyond Imagination.",
  role: "Creative Filmmaker | AI Visual Storyteller | Cinematic Content Creator",
  channelName: "Kadha Cheppana Meeku",
  email: "kadhacheppana14@gmail.com",
  socials: {
    youtube: "https://www.youtube.com/@kadhacheppana-meeku",
    instagram: "https://www.instagram.com/kadhacheppana14/?hl=en",
    facebook: "https://www.facebook.com/profile.php?id=61594848533470",
  },
  hero: {
    headline: "I'M BINDU.",
    animatedSecondary: "Crafting Stories Beyond Imagination.",
    rotatingPhrases: [
      "Creative Filmmaker",
      "AI Visual Storyteller",
      "Cinematic Content Creator",
      "Visual Story Designer",
    ],
    intro:
      "I turn imagination, technology, and storytelling into cinematic experiences that inspire curiosity and emotion.",
  },
  about: {
    heroHeadline: "Storytelling Is My Language. Creativity Is My Signature.",
    shortBio:
      "I'm Bindu — a creative filmmaker and AI visual storyteller passionate about transforming imagination into compelling cinematic experiences. Combining traditional narrative craft with emerging visual technologies, I bring historical sagas, mythology-inspired stories, and futuristic concepts to vivid digital life.",
    fullBioParagraphs: [
      "Hello, I'm Bindu — a creative storyteller passionate about transforming imagination into compelling cinematic experiences.",
      "My work brings together storytelling, visual design, artificial intelligence, and filmmaking to create immersive digital experiences.",
      "I specialize in AI-assisted filmmaking, cinematic storytelling, historical narratives, creative video production, and visually engaging content for digital audiences.",
      "Through my storytelling channel, Kadha Cheppana Meeku, I explore imaginative narratives, fascinating historical subjects, ancient Indian knowledge, mythology-inspired storytelling, and thought-provoking concepts.",
      "I enjoy combining traditional storytelling with emerging creative technologies. From developing characters and designing environments to scripting, storyboarding, creating cinematic sequences, and assembling finished videos, I love bringing ideas to life.",
      "My creative interests span historical dramas, science-fiction narratives, cinematic advertisements, realistic AI-generated visuals, and experimental digital filmmaking.",
      "Every project is an opportunity to explore a new world, communicate an idea, and create something memorable.",
      "I believe that technology becomes most powerful when it serves human imagination.",
    ],
  },
  brandDNA: {
    mission:
      "Transform ideas, imagination, and stories into visually compelling cinematic experiences.",
    personality: [
      "Cinematic",
      "Imaginative",
      "Confident",
      "Sophisticated",
      "Modern",
      "Creative",
      "Human-centered",
      "Technology-inspired",
    ],
    voice:
      "Professional but approachable, confident without exaggeration, artistic without being confusing, imaginative but grounded.",
    colors: [
      { name: "Jet Black", hex: "#08090D", role: "Cinematic Canvas Background" },
      { name: "Blackberry Purple", hex: "#171B3A", role: "Cards, Panels & Depths" },
      { name: "Royal Blue", hex: "#3B82F6", role: "Primary Interactive Accents" },
      { name: "Hyacinth Blue", hex: "#8B5CF6", role: "Creative Glow & Highlights" },
      { name: "Pure White", hex: "#FFFFFF", role: "Editorial Contrast & Text" },
    ],
  },
  specialties: [
    {
      id: "ai-filmmaking",
      title: "AI-Assisted Filmmaking",
      description: "Harnessing cutting-edge generative video pipelines to produce cinematic sequences with dramatic scale and atmosphere.",
      iconName: "Sparkles",
    },
    {
      id: "cinematic-storytelling",
      title: "Cinematic Storytelling",
      description: "Structuring narrative tension, emotional pacing, and audiovisual rhythm for deep viewer immersion.",
      iconName: "Film",
    },
    {
      id: "scriptwriting",
      title: "Scriptwriting and Story Development",
      description: "Crafting original screenplays, character journeys, historical adaptations, and evocative spoken dialogues.",
      iconName: "PenTool",
    },
    {
      id: "character-environment",
      title: "Character and Environment Design",
      description: "Conceptualizing high-fidelity character archetypes, ancient monuments, fantastical landscapes, and sci-fi worlds.",
      iconName: "Layers",
    },
    {
      id: "storyboarding",
      title: "Visual Storyboarding",
      description: "Composing shot lists, framing camera angles, lighting schemes, and motion continuity before final synthesis.",
      iconName: "Clapperboard",
    },
    {
      id: "video-creation",
      title: "Text-to-Video and Image-to-Video Creation",
      description: "Directing multi-model generative engines with fine-tuned camera motions, physics, and fluid transitions.",
      iconName: "Video",
    },
    {
      id: "creative-direction",
      title: "Creative Direction",
      description: "Maintaining tonal consistency, thematic depth, color palettes, and stylistic cohesion across every project.",
      iconName: "Compass",
    },
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Precision non-linear editing, seamless pacing, visual effects integration, and cinematic audio design.",
      iconName: "Scissors",
    },
    {
      id: "mythology-narratives",
      title: "Historical & Mythology-Inspired Narratives",
      description: "Bringing Indian history, timeless scriptures, and epic folklore to life with respectful cultural authenticity.",
      iconName: "BookOpen",
    },
    {
      id: "cinematic-ads",
      title: "Cinematic Product Advertising",
      description: "Translating brand concepts, gastronomy, and futuristic products into hyper-visual promotional vignettes.",
      iconName: "Tv",
    },
    {
      id: "social-content",
      title: "Social Media Content Creation",
      description: "Optimizing cinematic content for YouTube, Instagram, and digital audiences without sacrificing artistry.",
      iconName: "Share2",
    },
    {
      id: "prompt-engineering",
      title: "Visual Prompt Engineering",
      description: "Mastering camera cues, lighting terminologies, render engine syntax, and prompt weighting for exact vision fidelity.",
      iconName: "Terminal",
    },
  ] as Specialty[],
  tools: [
    {
      name: "Runway",
      role: "Gen-2 / Gen-3 Alpha Cinematic Video Synthesis",
      category: "AI Generation",
    },
    {
      name: "Google Flow",
      role: "Visual Ideation & Narrative Workflow Orchestration",
      category: "AI Generation",
    },
    {
      name: "Google Vids",
      role: "AI-Assisted Video Storytelling & Motion Assembly",
      category: "Video Production",
    },
    {
      name: "Filmora",
      role: "Cinematic Timeline Editing, Color & Sound Polish",
      category: "Editing",
    },
    {
      name: "Lemonpeel AI",
      role: "Stylized Visual Generation & Aesthetic Consistency",
      category: "Visual Design",
    },
  ] as CreativeTool[],
  creativeProcess: [
    {
      step: "01",
      title: "Concept and Imagination",
      summary: "Exploring themes, mythologies, or futuristic sparks to establish an evocative core idea.",
      details: "Every narrative begins with deep curiosity. Whether researching historical accounts, philosophical inquiries, or science-fiction concepts, this phase establishes the emotional core and unique thematic resonance.",
    },
    {
      step: "02",
      title: "Story Development",
      summary: "Writing scripts, narrative beats, character arcs, and spoken narration.",
      details: "Crafting structured screenplays and voiceover manuscripts. Words are chosen with rhythm and cadence to guide the viewer through rising tension and memorable climaxes.",
    },
    {
      step: "03",
      title: "Visual Design",
      summary: "Storyboarding, prompt architecture, and establishing visual atmospheres.",
      details: "Designing character costumes, ancient architecture, lighting directions, and cinematic aspect ratios. Precise prompt recipes and reference boards ensure artistic cohesion.",
    },
    {
      step: "04",
      title: "Cinematic Production",
      summary: "Generative image synthesis, camera choreography, and motion generation.",
      details: "Transforming keyframes into dynamic video sequences using advanced image-to-video models, fine-tuning camera sweeps, zooms, pans, and atmospheric particles.",
    },
    {
      step: "05",
      title: "Editing and Final Experience",
      summary: "Non-linear assembly, sound design, color grading, and final delivery.",
      details: "Bringing all sequences into the editing timeline. Orchestrating music, sound effects, voiceovers, subtle color adjustments, and final export for an unforgettable viewer experience.",
    },
  ] as ProcessStep[],
};
