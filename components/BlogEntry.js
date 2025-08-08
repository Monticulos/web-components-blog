import { getLatestEntrySlug, getFilenameFromSlug } from '../entries/index.js';

const loadEntryModule = async (filename) => {
    const entryModule = await import(`../entries/${filename}.js`);
    return entryModule.default;
};
const getEntry = async (slug) => {
    const filename = await getFilenameFromSlug(slug) || slug;
    return await loadEntryModule(filename);
};

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
        const hasHash = window.location.hash.length > 1;
        if (hasHash) {
            this.renderEntryFromSlug(shadow);
        } else {
            this.renderLatestEntry(shadow);
        }
    }

    async renderEntryFromSlug(shadow) {
        const slug = window.location.hash.slice(1);
        try {
            const entry = await getEntry(slug);
            this.renderEntry(shadow, entry);
        } catch (error) {
            await this.renderError(shadow);
        }
    }

    async renderLatestEntry(shadow) {
        const latestSlug = await getLatestEntrySlug();
        const entry = await getEntry(latestSlug);
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
        const latestSlug = await getLatestEntrySlug();
        shadow.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${latestSlug}">Gå til siste innlegg</a></p>
            </main>
        `;
    }
}