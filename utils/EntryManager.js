import { entryFileNames } from '../entries/index.js';

export class EntryManager {
    static slugToFilenameMap = new Map();
    static isSlugMapBuilt = false;

    static async loadEntryModule(filename) {
        const entryModule = await import(`../entries/${filename}.js`);
        return entryModule.default;
    }

    static async getEntry(slug) {
        const filename = await this.getFilenameFromSlug(slug) || slug;
        return await this.loadEntryModule(filename);
    }

    static async getEntriesAsArray() {
        return Promise.all(entryFileNames.map(this.loadEntryModule))
    }

    static async getLatestEntrySlug() {
        const latestFilename = entryFileNames[entryFileNames.length - 1];
        const entry = await this.loadEntryModule(latestFilename);
        return entry.slugs[0];
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