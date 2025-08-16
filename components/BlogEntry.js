import { EntryManager } from '../utils/EntryManager.js';
import './BlogTags.js';
import './EntryNavigation.js';
import { BaseComponent } from './BaseComponent.js';

export class BlogEntry extends BaseComponent {
    async connectedCallback() {

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
            await this.renderNotFound();
        }
    }

    async renderLatestEntry() {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        const entry = await EntryManager.getEntry(latestSlug);
        this.renderEntry(entry);
    }

    renderEntry(entry) {
        this.shadowRoot.innerHTML = `
            ${this.addGlobalStyles()}
            <style>
                h1, h2, h3, h4, h5, h6 {
                    line-height: 150%;
                }

                p {
                    margin-bottom: 1rem;
                    line-height: 150%;
                }

                ul {
                    margin-bottom: 1rem;
                }

                li {
                    line-height: 150%;
                }

                ul > li {
                    margin-inline-start: 1rem;
                }

                ol > li {
                    margin-inline-start: 1.25rem;
                }

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
                ${this.renderSources(entry.sources)}
            </main>
        `;

        const blogTags = document.createElement("blog-tags");
        blogTags.tags = entry.tags;
        this.shadowRoot.querySelector('.metadata').appendChild(blogTags);

        const entryNavigation = document.createElement("entry-navigation");
        entryNavigation.current = entry.slugs[0];
        this.shadowRoot.querySelector('main').appendChild(entryNavigation);
    }

    renderSources(sources) {
        if (!sources) return ``;

        const generateListItems = () => {
            return Array.from(sources.entries())
            .map(([key, value]) => `<li><a href="${value}" target="_blank">${key}</a></li>`)
            .join('')
        }

        return `
            <h2>Kilder</h2>
            <ol>
                ${generateListItems()}
            </ol>

        `
    }

    async renderNotFound() {
        const latestSlug = await EntryManager.getLatestEntrySlug();
        this.shadowRoot.innerHTML = `
            ${this.addGlobalStyles()}
            <style>
            h1 {
                line-height: 150%;
            }
            </style>
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${latestSlug}">Gå til siste innlegg</a></p>
            </main>
        `;
    }
}

customElements.define("blog-entry", BlogEntry);
