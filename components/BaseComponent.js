export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    addGlobalStyles() {
        return `<link rel="stylesheet" href="./global.css" />`;
    }
}