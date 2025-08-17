import { sunIcon } from "../../icons/sunIcon.js";
import { moonIcon } from "../../icons/moonIcon.js";
import { Theme } from "../../utils/Theme.js";
import { BaseComponent } from "../BaseComponent.js";
import { styles } from "./BlogThemeToggleStyles.js";

export class BlogThemeToggle extends BaseComponent {

    connectedCallback() {
        Theme.updateClassList();
        this.renderButton()
        this.renderIcon();
        this.addClickEventListener();
    }

    renderButton() {
        const html = /*html*/`<button aria-label="Bytt tema"></button>`;
        
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

customElements.define("blog-theme-toggle", BlogThemeToggle);