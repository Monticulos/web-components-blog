import { entries } from '../entries/index.js';

export class EntryRepository {
    static async getEntries() {
        return [...entries];
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
}