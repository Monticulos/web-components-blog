import { EntryManager } from "../utils/EntryManager.js"

export class BlogArchive extends HTMLElement {
    async connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.renderArchive();
    }

    async renderArchive() {
        const entries = await EntryManager.getEntriesAsArray();

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./global.css" />
        <style>
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }

            li {
                margin-bottom: 1rem;
            }

            .entry-title {
                font-weight: bold;
            }
        </style>
        <main>
            <h1>Arkiv</h1>
            <ul>
                ${this.renderEntries(entries)}
            </ul>
        </main>
        `;
    }

    renderEntries(entries) {
        return entries.map((entry) => `
            <li>
                <a href="./#${entry.slugs[0]}">
                    <div class="entry-title">
                        ${entry.title}
                    </div>
                    ${entry.publishedDate}
                </a>
            </li>
        `).join('');
    }
}

customElements.define("blog-archive", BlogArchive);
