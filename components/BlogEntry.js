import { EntryManager } from '../utils/EntryManager.js';
import { BlogTags } from './BlogTags.js';

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
            <style>
                .metadata {
                    display: flex;
                    align-items: baseline;
                    gap: 0.5rem;
                }
            </style>
            <main>
                <h1>${entry.title}</h1>
                <span class="metadata">
                    <p>${entry.publishedDate}</p> 
                    <span>|</span>
                </span>
                <div>${entry.bodyText}</div>
            </main>
        `;
        
        const blogTags = document.createElement('blog-tags');
        blogTags.tags = entry.tags;
        shadow.querySelector('.metadata').appendChild(blogTags);
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

customElements.define("blog-entry", BlogEntry);
