import { entries } from '../entries/index.js';

export class EntryManager {
    static slugToFilenameMap = new Map();
    static filenameToFirstSlugMap = new Map();
    static isSlugMapBuilt = false;

    static async getEntries() {
        return entries;
    }

    static async getEntry(slug) {
        return entries.find((entry) => entry.slugs.includes(slug));
    }

    static async getLatestEntry() {
        return [...entries].pop();
    }

    static async getLatestEntrySlug() {
        const latestEntry = await this.getLatestEntry();
        return latestEntry.slugs[0];
    }

    static async getPreviousEntrySlug(currentEntrySlug) {
        const currentIndex = entries.findIndex(entry => entry.slugs.includes(currentEntrySlug));
        const isSlugNotfound = currentIndex === -1;
        const isCurrentEntryOldest = currentIndex === 0;

        if (isSlugNotfound || isCurrentEntryOldest) return null;
        return entries[currentIndex - 1].slugs[0];
    }

    static async getNextEntrySlug(currentEntrySlug) {
        const currentIndex = entries.findIndex(entry => entry.slugs.includes(currentEntrySlug));
        const isSlugNotfound = currentIndex === -1;
        const isCurrentEntryNewest = currentIndex === entries.length - 1;

        if (isSlugNotfound || isCurrentEntryNewest) return null;
        return entries[currentIndex + 1].slugs[0];
    }

    static async getFilenameFromSlug(slug) {
        await this.buildSlugMap();
        return this.slugToFilenameMap.get(slug);
    }

    static async buildSlugMap() {
        if (this.isSlugMapBuilt) return;

        for (const filename of entryFileNames) {
            await this.processEntryForSlugMap(filename);
        }

        this.isSlugMapBuilt = true;
    }

    static async processEntryForSlugMap(filename) {
        try {
            const entry = await this.loadEntryModule(filename);
            if (this.hasValidSlugs(entry)) {
                this.mapSlugsToFilename(entry.slugs, filename);
                this.filenameToFirstSlugMap.set(filename, entry.slugs[0]);
            }
        } catch (error) {
            console.error(`Failed to load entry ${filename}:`, error);
        }
    }

    static hasValidSlugs(entry) {
        return entry.slugs && Array.isArray(entry.slugs) && entry.slugs.length > 0;
    }

    static mapSlugsToFilename(slugs, filename) {
        slugs.forEach(slug => this.slugToFilenameMap.set(slug, filename));
    }
}