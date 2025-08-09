export class BlogTags extends HTMLElement {
    #tags = [];

    set tags(value) {
        this.#tags = value || [];
        if (this.shadowRoot) {
            this.render();
        }
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/global.css" />
            <style>
                .tags {
                    font-style: italic;
                }
            </style>
            <span class="tags">
            ${this.#tags.map(tag => `${tag}`).join(', ')}
            </span>
        `;
    }
}

customElements.define('blog-tags', BlogTags);