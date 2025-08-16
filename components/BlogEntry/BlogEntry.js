import { EntryManager } from '../../utils/EntryManager.js';
import '../BlogTags/BlogTags.js';
import '../EntryNavigation/EntryNavigation.js';
import { BaseComponent } from '../BaseComponent.js';
import { styles } from './BlogEntryStyles.js';

export class BlogEntry extends BaseComponent {
    async connectedCallback() {
        await this.loadAndRenderEntry();
        window.addEventListener('hashchange', () => this.loadAndRenderEntry());
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
        const entry = await EntryManager.getLatestEntry();
        this.renderEntry(entry);
    }

    renderEntry(entry) {
        const html = `
            <main>
                <h1>${entry.title}</h1>
                <span class="metadata">
                    <p>${entry.publishedDate}</p> 
                    <span>|</span>
                    <blog-tags></blog-tags>
                </span>
                <div>${entry.bodyText}</div>
                    ${this.renderSources(entry.sources)}
                <entry-navigation></entry-navigation>
            </main>
        `;

        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
        this.shadowRoot.querySelector('blog-tags').tags = entry.tags;
        this.shadowRoot.querySelector('entry-navigation').current = entry.slugs[0];
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

        const html = `
            <main>
                <h1>Innlegg ikke funnet</h1>
                <p><a href="#${latestSlug}">Gå til siste innlegg</a></p>
            </main>
        `;

        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }
}

customElements.define("blog-entry", BlogEntry);