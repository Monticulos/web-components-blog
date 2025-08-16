import { EntryManager } from "../utils/EntryManager.js";
import { BaseComponent } from "./BaseComponent.js";

export class EntryNavigation extends BaseComponent {
    #current = "#current"

    set current(value) {
        this.#current = value;
        if (this.shadowRoot) {
            this.renderNavigation();
        }
    }

    connectedCallback() {
        this.renderNavigation();
    }

    async renderNavigation() {
        this.shadowRoot.innerHTML = `
            ${this.addGlobalStyles()}
            <style>
                nav {
                    margin-top: 2rem;
                    border-top: 1px solid var(--border-color);
                    padding-top: 1rem;
                    text-align: center;
                }

                a {
                    font-style: italic;
                    font-size: 85%;
                }

                a:after {
                    content: "|";
                    padding-inline: 0.5rem;
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
            return `<a href="./#${slug}">Forrige innlegg</a>`
        }
        return "";
    }

    async renderNextLink() {
        const slug = await EntryManager.getNextEntrySlug(this.#current)
        if (slug) {
            return `<a href="./#${slug}">Neste innlegg</a>`
        }
        return "";
    }
};

customElements.define("entry-navigation", EntryNavigation);