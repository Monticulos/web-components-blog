export class BlogHeader extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/global.css" />
        <style>
            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 2px solid var(--border-color);
                padding-inline: min(3rem, 5%);
                padding-block: 1rem;
            }

            h1 {
                margin-bottom: 0;
            }

            :host h1 > a {
                text-decoration: none;
            }

            .action-bar {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
        </style>
        
        <header>
            <h1><a href="./index.html">Bloggen</a></h1>
            <div class="action-bar">
                <a href="./archive.html">Arkiv</a>
                <blog-theme-switch></blog-theme-switch>
            </div>
        </header>
        `;
    }
}
