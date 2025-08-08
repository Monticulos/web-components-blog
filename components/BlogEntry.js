import { getLatestEntrySlug } from '../entries/index.js';

const getEntrySlugFromHash = () => window.location.hash.slice(1);
const getEntrySlug = () => getEntrySlugFromHash() || getLatestEntrySlug();
const loadEntry = async (slug) => {
    const entryModule = await import(`../entries/${slug}.js`);
    return entryModule.default;
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
        const entrySlug = getEntrySlug();
        
        try {
            const entry = await loadEntry(entrySlug);
            this.renderEntry(shadow, entry);
        } catch (error) {
            this.renderError(shadow);
        }
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
    
    renderError(shadow, ) {
        shadow.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${getLatestEntrySlug()}">Gå til siste innlegg</a></p>
            </main>
        `;
    }
}