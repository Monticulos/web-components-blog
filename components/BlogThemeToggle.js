import { sunIcon } from "../icons/sunIcon.js";
import { moonIcon } from "../icons/moonIcon.js";
import { Theme } from "../utils/Theme.js";
import { themes } from "../constants/themes.js";
import { BaseComponent } from "./BaseComponent.js";

export class BlogThemeToggle extends BaseComponent {

    connectedCallback() {
        Theme.updateClassList();
        this.renderButton()
        this.renderIcon();
        this.addClickEventListener();
    }

    renderButton() {
        const styles = `
            button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                border: none;
                border-radius: 0.5rem;
                font-size: inherit;
                font-family: inherit;
                background: none;
                padding: 0.5rem;
                color: inherit;
            }

            button:hover {
                background-color: var(--hover-color);
                cursor: pointer;
            }
        `;
        
        const html = `<button aria-label="Bytt tema"></button>`;
        
        this.shadowRoot.innerHTML = this.createTemplate(html, styles);
    }

    renderIcon() {
        const button = this.shadowRoot.querySelector("button");
        button.innerHTML = Theme.isLight() ? moonIcon : sunIcon ;
    }

    addClickEventListener() {
        const button = this.shadowRoot.querySelector("button")
        button.addEventListener("click", () => this.handleClick());
    }

    handleClick() {
        Theme.switch();
        this.renderIcon();
    }
}

customElements.define("blog-theme-switch", BlogThemeToggle);