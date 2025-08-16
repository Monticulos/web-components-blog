import { EntryManager } from "../utils/EntryManager.js"
import { BaseComponent } from "./BaseComponent.js";

export class BlogArchive extends BaseComponent {
    async connectedCallback() {
        this.renderArchive();
    }

    async renderArchive() {
        const entries = await EntryManager.getEntriesAsArray();

        const styles = `
            h1 {
                margin-bottom: 1rem;
            }

            h2 {
                font-size: 1rem;
                line-height: 150%;
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }

            li {
                margin-bottom: 1rem;
            }
        `;
        
        const html = `
            <main>
                <h1>Arkiv</h1>
                <ul>
                    ${this.renderEntries(entries)}
                </ul>
            </main>
        `;
        
        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }

    renderEntries(entries) {
        return entries.map((entry) => `
            <li>
                <a href="./#${entry.slugs[0]}">
                    <h2>
                        ${entry.title}
                    </h2>
                    ${entry.publishedDate}
                </a>
            </li>
        `).join('');
    }
}

customElements.define("blog-archive", BlogArchive);
