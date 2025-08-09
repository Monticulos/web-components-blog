export class BlogTags extends HTMLElement {
    constructor() {
        super();
        this._tags = [];
    }

    set tags(value) {
        this._tags = value || [];
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
            ${this._tags.map(tag => `${tag}`).join(', ')}
            </span>
        `;
    }
}

customElements.define('blog-tags', BlogTags);