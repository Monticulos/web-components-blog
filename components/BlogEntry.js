import { EntryManager } from '../utils/EntryManager.js';

export class BlogEntry extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        await this.loadAndRenderEntry(shadow);
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    async handleRouteChange() {
        await this.loadAndRenderEntry(this.shadowRoot);
    }

    async loadAndRenderEntry(shadow) {
        const slug = window.location.hash.slice(1);
        if (slug) {
            this.renderEntryFromSlug(shadow, slug);
        } else {
            this.renderLatestEntry(shadow);
        }
    }

    async renderEntryFromSlug(shadow, slug) {
        try {
            const entry = await EntryManager.getEntry(slug);
            this.renderEntry(shadow, entry);
        } catch (error) {
            await this.renderError(shadow);
        }
    }

    async renderLatestEntry(shadow) {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        const entry = await EntryManager.getEntry(latestSlug);
        this.renderEntry(shadow, entry);
    }

    renderEntry(shadow, entry) {
        shadow.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <main>
                <h1>${entry.title}</h1>
                <p>${entry.publishedDate}</p>
                <div>${entry.bodyText}</div>
            </main>
        `;
    }

    async renderError(shadow) {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        shadow.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${latestSlug}">Gå til siste innlegg</a></p>
            </main>
        `;
    }
}