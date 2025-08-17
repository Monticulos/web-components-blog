import { pencilLineIcon } from "../../icons/pencilLineIcon.js";
import "../BlogThemeToggle/BlogThemeToggle.js";
import { BaseComponent } from "../BaseComponent.js";
import { styles } from "./BlogHeaderStyles.js";

export class BlogHeader extends BaseComponent {
    connectedCallback() {
        const html = /*html*/`
            <header>
                <h1>
                    <a class="heading-link" href="./index.html">Bloggen ${pencilLineIcon}</a>
                </h1>
                <div class="action-bar">
                    <a href="./archive.html">Arkiv</a>
                    <blog-theme-toggle></blog-theme-switch>
                </div>
            </header>
        `;
        
        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }
}

customElements.define("blog-header", BlogHeader);