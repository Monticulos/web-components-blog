// Add new entries here (newest first)
export const entries = [
    '2025-08-08',
];

const slugToFilenameMap = new Map();

const loadEntry = async (filename) => {
    const entryModule = await import(`./${filename}.js`);
    return entryModule.default;
};

const hasValidSlugs = (entry) => entry.slugs && Array.isArray(entry.slugs) && entry.slugs.length > 0;
const mapSlugsToFilename = (slugs, filename) => {
    slugs.forEach(slug => slugToFilenameMap.set(slug, filename));
};

async function processEntryForSlugMap(filename) {
    try {
        const entry = await loadEntry(filename);
        if (hasValidSlugs(entry)) {
            mapSlugsToFilename(entry.slugs, filename);
        }
    } catch (error) {
        console.error(`Failed to load entry ${filename}:`, error);
    }
}

async function buildSlugMap() {
    if (slugToFilenameMap.size > 0) return;

    for (const filename of entries) {
        await processEntryForSlugMap(filename);
    }
}

export async function getFilenameFromSlug(slug) {
    await buildSlugMap();
    return slugToFilenameMap.get(slug);
}

export async function getLatestEntrySlug() {
    const latestFilename = entries[0];
    const entry = await loadEntry(latestFilename);
    return entry.slugs[0];

}