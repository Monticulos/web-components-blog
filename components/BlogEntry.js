import { EntryManager } from '../utils/EntryManager.js';
import './BlogTags.js';
import './EntryNavigation.js';

export class BlogEntry extends HTMLElement {
    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        await this.loadAndRenderEntry();
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    async handleRouteChange() {
        await this.loadAndRenderEntry();
    }

    async loadAndRenderEntry() {
        const slug = window.location.hash.slice(1);
        if (slug) {
            this.renderEntryFromSlug(slug);
        } else {
            this.renderLatestEntry();
        }
    }

    async renderEntryFromSlug(slug) {
        try {
            const entry = await EntryManager.getEntry(slug);
            this.renderEntry(entry);
        } catch (error) {
            await this.renderError();
        }
    }

    async renderLatestEntry() {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        const entry = await EntryManager.getEntry(latestSlug);
        this.renderEntry(entry);
    }

    renderEntry(entry) {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./global.css" />
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

        const blogTags = document.createElement("blog-tags");
        blogTags.tags = entry.tags;
        this.shadowRoot.querySelector('.metadata').appendChild(blogTags);

        const entryNavigation = document.createElement("entry-navigation");
        entryNavigation.current = entry.slugs[0];
        this.shadowRoot.querySelector('main').appendChild(entryNavigation);
    }

    async renderError() {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./global.css" />
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${latestSlug}">Gå til siste innlegg</a></p>
            </main>
        `;
    }
}

customElements.define("blog-entry", BlogEntry);
