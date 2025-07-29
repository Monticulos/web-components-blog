export class BlogHeader extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <style>
            header {
                border-bottom: 2px solid #ccc;
                padding: 20px;
            }
        </style>
        
        <header>
            <h1>The Blog</h1>
        </header>
        `;
    }
}
