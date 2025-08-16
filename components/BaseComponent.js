export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    createTemplate(html, styles = undefined) {
        return `
            <link rel="stylesheet" href="./global.css" />
            ${styles ? `<style>${styles}</style>` : ''}
            ${html}
        `;
    }
}