import { entries } from '../entries/index.js';

export class EntryRepository {
    static getEntries() {
        return [...entries];
    }

    static getEntriesReversed() {
        return this.getEntries().reverse();
    }

    static getEntry(slug) {
        return entries.find((entry) => entry.slugs.includes(slug));
    }

    static getLatestEntry() {
        return [...entries].pop();
    }

    static getLatestEntrySlug() {
        const latestEntry = this.getLatestEntry();
        return latestEntry.slugs[0];
    }

    static getPreviousEntrySlug(currentEntrySlug) {
        const currentIndex = entries.findIndex(entry => entry.slugs.includes(currentEntrySlug));
        const isSlugNotfound = currentIndex === -1;
        const isCurrentEntryOldest = currentIndex === 0;

        if (isSlugNotfound || isCurrentEntryOldest) return null;
        return entries[currentIndex - 1].slugs[0];
    }

    static getNextEntrySlug(currentEntrySlug) {
        const currentIndex = entries.findIndex(entry => entry.slugs.includes(currentEntrySlug));
        const isSlugNotfound = currentIndex === -1;
        const isCurrentEntryNewest = currentIndex === entries.length - 1;

        if (isSlugNotfound || isCurrentEntryNewest) return null;
        return entries[currentIndex + 1].slugs[0];
    }
}