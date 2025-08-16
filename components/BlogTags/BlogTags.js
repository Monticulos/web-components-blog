import { BaseComponent } from "../BaseComponent.js";
import { styles } from "./BlogTagsStyles.js";

export class BlogTags extends BaseComponent {
    #tags = [];

    set tags(value) {
        this.#tags = value || [];
        if (this.shadowRoot) {
            this.renderTags();
        }
    }

    connectedCallback() {
        this.renderTags();
    }

    renderTags() {
        const html = `
            <span class="tags">
                ${this.#tags.join(', ')}
            </span>
        `;
        
        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }
}

customElements.define('blog-tags', BlogTags);