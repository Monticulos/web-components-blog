export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    createTemplate(html, styles = undefined) {
        return /*html*/`
            <link rel="stylesheet" href="./global.css" />
            ${styles ? `<style>${styles}</style>` : ''}
            ${html}
        `;
    }
}