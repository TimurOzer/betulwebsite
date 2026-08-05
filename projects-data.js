// Real project data for the "My Projects" carousel + detail overlay.
// Edit titles/descriptions freely — these are first-pass drafts.
var PROJECTS = [
  {
    slug: "pigmentia",
    title: "Pigmentia",
    desc: "A concept e-commerce site for a watercolor and art-supply brand, built around soft ink-wash textures and a shopping experience that feels as tactile as the paint itself.",
    type: "gallery",
    count: 17
  },
  {
    slug: "nox",
    title: "Nox",
    desc: "A mobile app onboarding concept — a warm, gradient-driven sign-in flow with playful color transitions between each step.",
    type: "gallery",
    count: 11
  },
  {
    slug: "catch",
    title: "Catch",
    desc: "A retro pixel-style word game: catch the falling letters to complete the word before you run out of lives. A full neon-on-navy UI system covering difficulty, category, and case modes.",
    type: "gallery",
    count: 6
  },
  {
    slug: "igu-obis",
    title: "IGÜ OBİS Redesign",
    desc: "A course-schedule interface redesign for Istanbul Gelişim University's student portal, focused on legibility and a calmer weekly timetable view.",
    type: "gallery",
    count: 2
  },
  {
    slug: "poster",
    title: "What Unites Us",
    desc: "A typographic poster built around a magnet motif — visualizing connection and shared identity through color-blocked letterforms.",
    type: "gallery",
    files: [4] // only media/poster/4.jpg exists on disk right now
  },
  {
    slug: "after-effects",
    title: "Motion Reel",
    desc: "A short After Effects animation exploring kinetic typography and motion transitions.",
    type: "video",
    video: "PROJELER/after effects animasyon/art-contact.mp4"
  }
];

// Expand gallery projects into full image/thumb path lists.
PROJECTS.forEach(function (p) {
  if (p.type === "gallery") {
    var indexes = p.files || Array.from({ length: p.count }, function (_, i) { return i + 1; });
    p.images = indexes.map(function (i) { return "media/" + p.slug + "/" + i + ".jpg"; });
    p.thumbs  = indexes.map(function (i) { return "media/" + p.slug + "/" + i + "-t.jpg"; });
  }
});
