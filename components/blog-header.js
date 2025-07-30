export class BlogHeader extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/global.css" />
        <style>
            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 2px solid #ccc;
                padding-inline: 3rem;
                padding-block: 1rem;
            }

            h1 {
                margin-bottom: 0;
            }
        </style>
        
        <header>
            <h1><a href="./index.html">The Blog</a></h1>
            <a href="./archive.html">Archive</a>
        </header>
        `;
    }
}
