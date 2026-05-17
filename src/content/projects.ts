// ─────────────────────────────────────────────────────────────
// Auto-loaded project list
//
// HOW TO ADD A NEW PROJECT:
//   1. Create a new folder inside `src/content/projects/`
//      Example: `src/content/projects/05-myproject/`
//      ⚠ Folder name is used for sorting. Prefix with a number
//        (e.g. `05-`, `06-`) to control display order.
//   2. Put your thumbnail image inside that folder.
//      Accepted filenames: thumb.jpg | thumb.jpeg | thumb.png | thumb.webp
//   3. Create a `meta.json` in that folder with the fields:
//        {
//          "projectName": "...",
//          "year": "2025",
//          "type": "Self-Initiated" | "Client: ...",
//          "tags": ["Brand Identity", "Graphic", ...]
//        }
//   4. Add photos/videos to a `photos/` subfolder inside the project folder.
//   5. In meta.json, add "layout" to control the detail page grid:
//        "layout": [
//          ["photo-01.jpg"],                        ← 1 image (full width)
//          ["photo-02.jpg", "photo-03.jpg"],         ← 2 images side by side
//          ["video.mp4"]                             ← video (auto-plays)
//        ]
//      If layout is omitted, photos are stacked one per row automatically.
//   6. To hide a project from the home grid (accessible via "more" toggle):
//        "hidden": true
//   7. Save. Vite will auto-detect and render everything.
// ─────────────────────────────────────────────────────────────

export type Project = {
  projectName: string;
  year: string;
  type: string;
  tags: string[];
  image: string;
  /** If true, shows a green "Award" label on hover */
  award?: boolean;
  /** If true, shows "WORK IN PROGRESS" on hover (desktop) / dim+tap (mobile) */
  wip?: boolean;
  /** If true, project is hidden from the home grid (accessible via the hidden toggle) */
  hidden?: boolean;
  /** Internal: folder key used for sorting (e.g. "01-degreeshow") */
  _key: string;

  // ── Detail page fields (all optional) ──
  /** Project description; use \n to separate paragraphs. Wrap in **text** for semi-bold. */
  overview?: string;
  /** Scope of work label, e.g. "Space, Graphic" */
  scope?: string;
  /** Team disciplines, e.g. ["Space", "Graphic"] */
  team?: string[];
  /** Collaborator names, e.g. ["Hannes Weikert, animator"] */
  collaborators?: string[];
  /** Award entries for detail page, e.g. ["IDEA 2025 Student Featured Finalist"] */
  awards?: string[];
  /**
   * Detail page image layout.
   * Each array = one row. Images in the same row share equal width.
   * Use filenames (e.g. "photo-01.jpg") — resolved automatically.
   *
   * Examples:
   *   ["photo-01.jpg"]                          → full-width single image
   *   ["photo-02.jpg", "photo-03.jpg"]          → two images side by side
   *   ["video.mp4"]                             → auto-playing video
   *
   * If omitted, all photos are stacked one per row.
   */
  layout?: string[][];
  /** Auto-globbed media URLs from the project folder */
  photos: string[];
  /** filename → resolved URL map for layout lookups */
  photoMap: Record<string, string>;
};

type ProjectMeta = Omit<Project, "image" | "_key" | "photos" | "photoMap">;

// Eager-load all meta.json files under src/content/projects/*/
const metaModules = import.meta.glob("./projects/[0-9]*/meta.json", {
  eager: true,
}) as Record<string, { default: ProjectMeta }>;

// Eager-load all thumbnail images and videos
const imageModules = import.meta.glob(
  "./projects/[0-9]*/thumb.{jpg,jpeg,png,webp,mp4,webm,mov}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Eager-load all media from photos/ subfolders (images, gif, video)
// + photo-* files directly in the project folder (legacy support)
const photoModules = import.meta.glob(
  [
    "./projects/[0-9]*/photos/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}",
    "./projects/[0-9]*/photo-*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}",
  ],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Build a folder-key → image URL map
const imageByFolder: Record<string, string> = {};
for (const [path, url] of Object.entries(imageModules)) {
  const match = path.match(/\/projects\/([^/]+)\/thumb\./);
  if (match) imageByFolder[match[1]] = url;
}

// Build a folder-key → sorted photo URL array map
// Build a folder-key → { filename: url } map for layout lookups
const photosByFolder: Record<string, string[]> = {};
const photoMapByFolder: Record<string, Record<string, string>> = {};

for (const [path, url] of Object.entries(photoModules)) {
  const folderMatch = path.match(/\/projects\/([^/]+)\//);
  const filenameMatch = path.match(/\/([^/]+)$/);
  if (folderMatch && filenameMatch) {
    const folder = folderMatch[1];
    const filename = filenameMatch[1];
    // photos array
    if (!photosByFolder[folder]) photosByFolder[folder] = [];
    photosByFolder[folder].push(url);
    // photoMap
    if (!photoMapByFolder[folder]) photoMapByFolder[folder] = {};
    photoMapByFolder[folder][filename] = url;
  }
}
// Sort each folder's photos alphabetically by filename
for (const folder of Object.keys(photosByFolder)) {
  photosByFolder[folder].sort();
}

// Build final project list, sorted by folder name
export const projects: Project[] = Object.entries(metaModules)
  .map(([path, mod]) => {
    const folder = path.match(/\/projects\/([^/]+)\/meta\.json$/)?.[1] ?? "";
    const image = imageByFolder[folder];
    if (!image) {
      console.warn(
        `[projects] No thumbnail found for "${folder}". ` +
          `Add a thumb.(jpg|png|webp) file in that folder.`
      );
    }
    return {
      ...mod.default,
      image: (mod.default as any).thumbUrl || image || "",
      _key: folder,
      photos: photosByFolder[folder] ?? [],
      photoMap: photoMapByFolder[folder] ?? {},
    };
  })
  .sort((a, b) => a._key.localeCompare(b._key));
