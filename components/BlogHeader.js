import { pencilLineIcon } from "../icons/pencilLineIcon.js";
import "./BlogThemeToggle.js";

export class BlogHeader extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="./global.css" />
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
                font-size: 1.5rem;
                font-weight: 500;
            }

            .heading-link {
                text-decoration: none !important;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .action-bar {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-weight: 500;
            }
        </style>
        
        <header>
            <h1>
                <a class="heading-link" href="./index.html">Bloggen ${pencilLineIcon}</a>
            </h1>
            <div class="action-bar">
                <a href="./archive.html">Arkiv</a>
                <blog-theme-switch></blog-theme-switch>
            </div>
        </header>
        `;
    }
}

customElements.define("blog-header", BlogHeader);
