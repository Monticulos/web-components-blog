import { EntryRepository } from "../../utils/EntryRepository.js";
import { BaseComponent } from "../BaseComponent.js";
import { styles } from "./EntryNavigationStyles.js"

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
        const html = `
            <nav>
                ${await this.renderPreviousLink()}
                ${await this.renderNextLink()}
            </nav>
        `;

        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }

    async renderPreviousLink() {
        const slug = EntryRepository.getPreviousEntrySlug(this.#current)
        if (slug) {
            return `<a href="./#${slug}">Forrige innlegg</a>`
        }
        return "";
    }

    async renderNextLink() {
        const slug = EntryRepository.getNextEntrySlug(this.#current)
        if (slug) {
            return `<a href="./#${slug}">Neste innlegg</a>`
        }
        return "";
    }
};

customElements.define("entry-navigation", EntryNavigation);