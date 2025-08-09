import { EntryManager } from "../utils/EntryManager.js";

export class EntryNavigation extends HTMLElement {
    #current = "#current"

    set current(value) {
        this.#current = `${value}`;
        if (this.shadowRoot) {
            this.renderNavigation();
        }
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.renderNavigation();
    }

    async renderNavigation() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <style>
                nav {
                    margin-top: 50%;
                    text-align: center;
                }

                a {
                    font-size: 90%;
                }

                a:after {
                    content: "|";
                    padding-inline: 1rem;
                }
                
                a:last-child:after {
                    content: "";
                }
            </style>
            <nav>
                ${await this.renderPreviousLink()}
                ${await this.renderNextLink()}
            </nav>
        `;
    }

    async renderPreviousLink() {
        const slug = await EntryManager.getPreviousEntrySlug(this.#current)
        if (slug) {
            return `<a href="#${slug}">Forrige innlegg</a>`
        }
        return "";
    }

    async renderNextLink() {
        const slug = await EntryManager.getNextEntrySlug(this.#current)
        if (slug) {
            return `<a href="#${slug}">Neste innlegg</a>`
        }
        return "";
    }
};

customElements.define("entry-navigation", EntryNavigation);