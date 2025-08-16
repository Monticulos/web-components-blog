import { entryFileNames } from '../entries/index.js';

export class EntryManager {
    static slugToFilenameMap = new Map();
    static filenameToFirstSlugMap = new Map();
    static isSlugMapBuilt = false;

    static async loadEntryModule(filename) {
        const entryModule = await import(`../entries/${filename}.js`);
        return entryModule.default;
    }

    static async getEntry(slug) {
        const filename = await this.getFilenameFromSlug(slug) || slug;
        return await this.loadEntryModule(filename);
    }

    static async getLatestEntry() {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        return EntryManager.getEntry(latestSlug);
    }

    static async getEntriesAsArray() {
        return Promise.all(entryFileNames.map(this.loadEntryModule))
    }

    static async getLatestEntrySlug() {
        const latestFilename = entryFileNames[0];
        const entry = await this.loadEntryModule(latestFilename);
        return entry.slugs[0];
    }

    static async getPreviousEntrySlug(currentEntrySlug) {
        await this.buildSlugMap();
        
        const currentFilename = this.slugToFilenameMap.get(currentEntrySlug);
        if (!currentFilename) return null;
        
        const currentIndex = entryFileNames.indexOf(currentFilename);
        if (currentIndex === -1 || currentIndex === entryFileNames.length - 1) return null;
        
        const previousFilename = entryFileNames[currentIndex + 1];
        return this.filenameToFirstSlugMap.get(previousFilename);
    }

    static async getNextEntrySlug(currentEntrySlug) {
        await this.buildSlugMap();
        
        const currentFilename = this.slugToFilenameMap.get(currentEntrySlug);
        if (!currentFilename) return null;
        
        const currentIndex = entryFileNames.indexOf(currentFilename);
        if (currentIndex === -1 || currentIndex === 0) return null;
        
        const nextFilename = entryFileNames[currentIndex - 1];
        return this.filenameToFirstSlugMap.get(nextFilename);
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