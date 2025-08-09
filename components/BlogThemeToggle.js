import { sunIcon } from "../icons/sunIcon.js";
import { moonIcon } from "../icons/moonIcon.js";
import { Theme } from "../utils/Theme.js";
import { themes } from "../constants/themes.js";

export class BlogThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.applyCss();
        this.renderButton()
        this.renderIcon();
        this.addClickEventListener();
    }

    renderButton() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./global.css" />
        <style>
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
        </style>
        <button aria-label="Bytt tema">
        </button>
        `;
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
        Theme.toggle();
        this.renderIcon();
        this.applyCss();
    }

    applyCss() {
        const isLight = Theme.isLight();
        document.body.classList.toggle(themes.light, isLight);
        document.body.classList.toggle(themes.dark, !isLight);
    }
}

customElements.define("blog-theme-switch", BlogThemeToggle);